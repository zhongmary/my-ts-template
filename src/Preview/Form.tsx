import React, { FC, isValidElement } from 'react';
import { Form } from '@msfe/beast-core';
import { Input, TextArea, RadioGroup, CheckboxGroup, Select, DatePicker, RangePicker } from '@msfe/beast-core';
import { FormApi, FormState, ISchema } from './type';

import Field from './FormItem';

interface IFormProps {
  config: ISchema;
}

const componentMap = {
  'string': Input,
  'textarea': TextArea,
  'radio': RadioGroup,
  'checkbox': CheckboxGroup,
  'select': Select,
  'date': DatePicker,
  'dateRange': RangePicker,
};

const Preivew: FC<IFormProps> = ({ config }) => {
  const formState = React.useRef({} as FormState);
  const formApi = React.useRef({} as FormApi);
  const { properties, actions } = config;

  return (
    <Form
      getForm={(api, state) => {
        formState.current = state;
        formApi.current = api;
        config.getForm && config.getForm(api, state);
      }}
      onSubmit={config.onSubmit}
    >
      {Object.keys(properties).map(name => {
        const item = properties[name];
        let Comp = componentMap[item.type];
        let rest = {};
        if (item.ui && item.ui.widget) {
          const { widget, ...res } = item.ui;
          rest = res;
          if (typeof widget === 'string') {
            Comp = componentMap[widget];
          } else if (typeof widget === 'function') {
            const C = widget;
            Comp = <C />;
          } else {
            Comp = widget;
          }
        }

        return (
          <Field
            key={name}
            field={name}
            label={item.label}
            required={item.required}
            validateOnChange={item.validateOnChange}
            validate={item.validate}
          >
            {isValidElement(Comp) ? Comp : <Comp name={name} {...rest} />}
          </Field>
        );
      })}
      {actions(formApi, formState)}
    </Form>
  );
};

export default Preivew;

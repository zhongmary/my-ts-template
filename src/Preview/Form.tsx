import React, { FC } from 'react';
import { Form } from '@msfe/beast-core';
import { FormApi, FormState, ISchema } from './type';

import Field from './Field';
import Actions from './Actions';

interface IFormProps {
  config?: ISchema;
  useConfig?: () => ISchema;
}

const initUseConfig = () => null as any;

const FormWrap: FC<IFormProps> = ({ config, useConfig = initUseConfig }) => {
  const formState = React.useRef({} as FormState);
  const formApi = React.useRef({} as FormApi);
  let setting: ISchema = useConfig();

  if (!setting) {
    if (config) {
      setting = config;
    } else {
      throw new Error('config or useConfig must be given');
    }
  }

  const { style, initialValues, properties, actions, scrollToError = true } = setting!;

  return (
    <section style={style}>
      <Form
        initialValues={initialValues}
        scrollToError={scrollToError}
        getForm={(api, state) => {
          formState.current = state;
          formApi.current = api;
          setting.getForm && setting.getForm(api, state);
        }}
        onSubmit={setting.onSubmit}
      >
        {Object.keys(properties).map(name => {
          return <Field key={name} name={name} {...properties[name]} />;
        })}
        <Actions actions={actions} />
      </Form>
    </section>
  );
};

export default FormWrap;

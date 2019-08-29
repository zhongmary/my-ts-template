import React, { FC, isValidElement, cloneElement } from 'react';
import {
  Form,
  Input,
  InputNumber,
  InputTofu,
  TextArea,
  RadioGroup,
  CheckboxGroup,
  Select,
  Switch,
  DatePicker,
  RangePicker,
} from '@msfe/beast-core';
import { MmsUpload } from '@msfe/beast-pro';
import { get } from 'lodash';
import { Propertie } from './type';

const { useFormState, useFormApi, FormItem, FieldArray } = Form;

const componentMap = {
  string: Input,
  input: Input,
  number: InputNumber,
  tofu: InputTofu,
  textarea: TextArea,
  radio: RadioGroup,
  checkbox: CheckboxGroup,
  select: Select,
  boolean: Switch,
  switch: Switch,
  date: DatePicker,
  dateRange: RangePicker,
  image: (
    <MmsUpload
      accept=".jpg,.jpeg,.png"
      maxNum={10}
      maxFileSize={5 * 1024 * 1024}
      showTrigger
      bucketTag="pdd_ims"
    />
  ),
};

type FieldProps = Propertie & { name: string }

const Field: FC<FieldProps> = ({
  type,
  name,
  items,
  hide,
  reactiveFieldProps,
  getHelper,
  ui,
  ...fieldProps
}) => {
  const formApi = useFormApi();
  const formState = useFormState();

  if ((typeof hide === 'function' && hide(formState, formApi) === true) || hide === true) {
    return null;
  }

  if (reactiveFieldProps && typeof reactiveFieldProps === 'function') {
    fieldProps = { ...fieldProps, ...reactiveFieldProps(formState, formApi) };
  }

  if (type === 'object') {
    if (!items) {
      return null;
    }

    let props = {};
    if (ui && typeof ui === 'object') {
      props = { ...ui };
    }

    return (
      <section {...props}>
        {Object.keys(items).map(item => {
          return <Field key={`${name}.${item}`} name={`${name}.${item}`} {...items[item]} />;
        })}
      </section>
    );
  }

  if (type === 'array') {
    if (!items) {
      return null;
    }

    let props = {};
    if (ui && typeof ui === 'object') {
      props = { ...ui };
    }

    return (
      <section {...props}>
        <FieldArray
          name={name}
          render={(helper, formState) => {
            if (getHelper && typeof getHelper === 'function') {
              getHelper(helper);
            }

            return get(formState.values, name).map((_: any, i: number) => {
              return Object.keys(items).map((item, j) => {
                return (
                  <Field
                    key={`${name}.${i}.${j}.${item}`}
                    name={`${name}[${i}].${item}`}
                    {...items[item]}
                  />
                );
              });
            });
          }}
        />
      </section>
    );
  }

  let Comp = componentMap[type];

  let widgetProps = {};
  if (ui) {
    const { widget, reactiveUIProps, ...res } = ui;
    widgetProps = res;
    if (reactiveFieldProps && typeof reactiveUIProps === 'function') {
      widgetProps = { ...widgetProps, ...reactiveUIProps(formState, formApi) };
    }

    if (widget) {
      if (typeof widget === 'string') {
        Comp = componentMap[widget];
      } else {
        Comp = widget;
      }
    }
  }

  if (type === 'custom') {
    if (isValidElement(Comp)) {
      return cloneElement(Comp, widgetProps);
    } else {
      return <Comp {...widgetProps} />;
    }
  }


  return (
    <FormItem field={name} {...fieldProps}>
      {isValidElement(Comp) ? (
        cloneElement(Comp, widgetProps)
      ) : <Comp name={name} field={name} {...widgetProps} />}
    </FormItem>
  );
};

export default Field;

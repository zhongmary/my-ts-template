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

// type === 'object' || 'wrapper'
const ObjectField: FC<FieldProps> = ({ type, items, ui }) => {
  if (!items) {
    return null;
  }

  const children = Object.keys(items).map(item => {
    let itemName = item;
    if (type === 'object') {
      itemName = `${name}.${item}`;
    }

    return <Field key={itemName} name={itemName} {...items[item]} />;
  });

  let props = {};
  if (ui && typeof ui === 'object') {
    const { widget, ...rest } = ui;
    props = { ...rest };

    if (isValidElement(widget)) {
      return cloneElement(widget, {
        ...props,
        children,
      });
    } else {
      const Comp = widget as any;
      return <Comp {...props} >{children}</Comp>;
    }

  }

  return <>{children}</>;
};

const ArrayField: FC<FieldProps> = ({ items, itemStyle, name, ui, getHelper, ...fullProps }) => {
  if (!items) {
    return null;
  }

  let props = {};
  if (ui && typeof ui === 'object') {
    props = { ...ui };
  }

  return (
    <FormItem field={name} {...fullProps}>
      <FieldArray
        name={name}
        render={(helper, formState) => {
          if (getHelper && typeof getHelper === 'function') {
            getHelper(helper);
          }

          return (
            <section {...props}>
              {get(formState.values, name).map((_: any, i: number) => (
                <section key={`${name}.${i}`} style={itemStyle}>
                  {Object.keys(items).map((item, j) => {
                    return (
                      <Field
                        key={`${name}.${i}.${j}.${item}`}
                        name={`${name}[${i}].${item}`}
                        {...items[item]}
                      />
                    );
                  })}
                </section>
              ))}
            </section>
          );
        }}
      />
    </FormItem>
  );
};

const Field: FC<FieldProps> = props => {
  const {
    type,
    name,
    hide,
    reactiveFieldProps,
    ui,
    ...fieldProps
  } = props;

  let fullProps = fieldProps;

  const formApi = useFormApi();
  const formState = useFormState();

  if ((typeof hide === 'function' && hide(formState, formApi) === true) || hide === true) {
    return null;
  }

  if (reactiveFieldProps && typeof reactiveFieldProps === 'function') {
    fullProps = { ...fullProps, ...reactiveFieldProps(formState, formApi) };
  }

  if (type === 'object' || type === 'wrapper') {
    return <ObjectField  {...Object.assign({}, props, fullProps)} />;
  }

  if (type === 'array' && !get(ui, 'widget')) {
    return <ArrayField {...Object.assign({}, props, fullProps)} />;
  }

  let Comp = componentMap[type];

  let widgetProps = {};
  if (ui) {
    const { widget, reactiveUIProps, ...res } = ui;
    widgetProps = res;
    if (reactiveUIProps && typeof reactiveUIProps === 'function') {
      widgetProps = { ...widgetProps, ...reactiveUIProps(formState, formApi) };
    }

    if (widget) {
      if (typeof widget === 'string') {
        Comp = componentMap[widget] || widget;
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
    <FormItem field={name} {...fullProps}>
      {isValidElement(Comp) ? (
        cloneElement(Comp, widgetProps)
      ) : <Comp name={name} field={name} {...widgetProps} />}
    </FormItem>
  );
};

export default Field;

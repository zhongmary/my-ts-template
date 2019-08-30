import React from 'react';
import { Checkbox, TextArea, Button } from '@msfe/beast-core';

const options = [
  { label: 'react', value: 1 },
  { label: <div>vue</div>, value: 8 },
  { label: <div>jq</div>, value: false, disabled: true },
  { label: <div>angular</div>, value: 'angular' },
];

const config: ISchema = {
  type: 'object',
  initialValues: {
    radio: 1,
    input: '12345',
    textarea: 'Somethings happen',
  },
  style: {
    width: '650px',
    margin: '0 auto',
    border: '1px solid #ccc',
  },
  onSubmit: values => { console.log(values); alert('请看控制台'); },
  properties: {
    'header': {
      type: "custom",
      label: '',
      labelWidth: 1,
      ui: {
        widget: <h1 style={{ textAlign: 'center' }}>custom config</h1>,
      },
    },
    'radio': {
      type: 'number',
      label: 'Radio',
      required: true,
      fieldWidth: 400,
      ui: {
        widget: 'radio',
        options: [
          { label: 'One', value: 1 },
          { label: 'Two', value: 2 },
        ],
      },
    },
    'input': {
      type: 'string',
      label: 'Input',
      required: true,
      fieldWidth: 400,
      validateOnBlur: true,
      ui: {
        placeholder: '请输入...',
        format: (val: string) => val.replace(/[^\d]/, ''),
        autocomplete: 'off',
      },
    },
    'number': {
      type: 'number',
      label: 'Number',
      required: true,
      fieldWidth: 400,
      validateOnChange: true,
      ui: {
        placeholder: '请输入...',
        autocomplete: 'off',
      },
    },
    'textarea': {
      type: 'string',
      label: 'Textarea',
      validateOnBlur: true,
      required: true,
      fieldWidth: 400,
      validate: v => {
        if (v.length === 0) {
          return 'Textarea不能为空';
        }
        if (v.length > 200) {
          return '不得超过200字';
        }
      },
      ui: {
        widget: TextArea,
        placeholder: '请简单描述下...',
        maxLength: 200,
      },
    },
    'tofu': {
      type: 'string',
      label: 'Tofu',
      required: true,
      fieldWidth: 400,
      validateOnBlur: true,
      ui: {
        widget: 'tofu',
        type: 'password',
      },
    },
    'checkbox': {
      type: 'array',
      label: 'Checkbox',
      required: true,
      fieldWidth: 400,
      ui: {
        widget: 'checkbox',
        options,
      },
      hide: (formState: any) => {
        return !formState.values.input;
      },
    },
    'switch': {
      type: 'boolean',
      label: 'Switch',
      alias: { value: 'checked' },
    },
    'select': {
      type: 'string',
      label: 'Select',
      fieldWidth: 300,
      validateOnBlur: true,
      required: true,
      ui: {
        widget: 'select',
        placeholder: '请输入...',
        options,
      },
    },
    'date': {
      type: 'string',
      label: 'DatePicker',
      required: true,
      validateOnChange: true,
      fieldWidth: 300,
      ui: {
        widget: 'date',
        format: "yyyy-MM-dd hh:mm:ss",
      },
    },
    'dateRange': {
      type: 'array',
      label: 'RangePicker',
      ui: {
        widget: 'dateRange',
        width: 300,
      },
    },
    'image': {
      type: 'string',
      label: 'Image',
      validateOnBlur: true,
      fieldWidth: 300,
      ui: {
        widget: 'image',
        maxNum: 1,
      },
    },
    'customCheck': {
      type: 'boolean',
      label: '',
      alias: { value: 'checked' },
      fieldWidth: 300,
      ui: {
        widget: Checkbox,
        label: (
          <span style={{ color: '#666666', lineHeight: 1.3 }}>
            请勾选协议
          </span>
        ),
      },
    },
  },
  actions: () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Button htmlType="submit">确认</Button>
      </div>
    );
  },
};

export default config;

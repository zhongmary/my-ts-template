export default `import { InputTofu, TextArea, Button } from '@msfe/beast-core';

const config: ISchema = {
  type: 'object',
  onSubmit: values => alert(JSON.stringify(values, null, 2)),
  properties: {
    'name.a.b.c': {
      type: 'string',
      label: '姓名：',
      required: true,
      validateOnChange: true,
      validate: (value) => {
        if (!value) { return '请填写姓名'; }
        if (value.length > 5) { return '姓名不能超过5个字'; }
        return null;
      },
    },
    address: {
      type: 'string',
      label: '地址：',
      ui: {
        widget: TextArea,
      },
    },
    abc: {
      type: 'string',
      label: '地址2：',
      ui: {
        widget: 'textarea',
      },
    },
    password: {
      type: 'string',
      label: '密码：',
      ui: {
        widget: InputTofu,
      },
    },
    custom: {
      type: 'string',
      label: '',
      ui: {
        widget: <p>Hello World!</p>
      }
    },
    frame: {
      type: 'string',
      label: '框架：',
      ui: {
        widget: 'radio',
        mode: 'radioButton',
        options: [
          { label: 'react', value: 1 },
          { label: 'vue', value: 4 },
          { label: 'jq', value: 5 },
          { label: 'backbone', value: 6, disabled: true },
          { label: 'angular', value: 7 },
        ],
      },
    },
    hobby: {
      type: 'array',
      label: '爱好：',
      ui: {
        widget: 'checkbox',
        asButton: true,
        options: [
          { label: '篮球', value: 'basketball' },
          { label: '足球', value: 'football' },
          { label: '滑板', value: 'skid' },
          { label: '学习', value: 'study', disabled: true },
          { label: '小说', value: 'novel' },
        ],
      },
    },
    hobby2: {
      type: 'string',
      label: '喜好：',
      ui: {
        widget: 'select',
        mode: 'single',
        placeholder: '请选择',
        options: [
          { label: '篮球', value: 'basketball' },
          { label: '足球', value: 'football' },
          { label: '滑板', value: 'skid' },
          { label: '学习', value: 'study' },
          { label: '小说', value: 'novel' },
        ],
      },
    },
    date: {
      type: 'string',
      label: '日期：',
      ui: {
        widget: 'date',
      },
    },
    range: {
      type: 'array',
      label: '范围：',
      ui: {
        widget: 'dateRange',
      },
    },
  },
  actions: (api, state) => {
    return (<Button htmlType="submit">确认</Button>)
  }
};

export default config;
`;
import React from 'react';
import { Checkbox, TextArea, Button } from '@msfe/beast-core';

const config: ISchema = {
  type: 'object',
  initialValues: {
    mallType: 1,
    modifyReason: '',
  },
  style: {
    width: '650px',
    margin: '0 auto',
    border: '1px solid #ccc',
  },
  onSubmit: values => alert(JSON.stringify(values, null, 2)),
  properties: {
    'header': {
      type: "custom",
      label: '',
      labelWidth: 1,
      ui: {
        widget: <h1 style={{ textAlign: 'center' }}>custom config</h1>,
      },
    },
    'mallType': {
      type: 'number',
      label: '店铺类型',
      required: true,
      fieldWidth: 400,
      ui: {
        widget: 'radio',
        options: [
          { label: '个人店铺', value: 1 },
          { label: '企业店铺', value: 2 },
        ],
      },
    },
    'mallId': {
      type: 'string',
      label: '店铺编号',
      required: true,
      fieldWidth: 400,
      validateOnBlur: true,
      ui: {
        placeholder: '请输入店铺编号',
        format: (val: string) => val.replace(/[^\d]/, ''),
        autocomplete: 'off',
      },
    },
    mallName: {
      type: 'string',
      label: '店铺名称',
      required: true,
      fieldWidth: 400,
      validateOnBlur: true,
      ui: {
        placeholder: '请输入店铺名称',
        autocomplete: 'off',
      },
    },
    modifyReason: {
      type: 'string',
      label: '修改原因',
      validateOnBlur: true,
      required: true,
      fieldWidth: 400,
      validate: v => {
        if (v.length === 0) {
          return '修改原因不能为空';
        }
        if (v.length > 200) {
          return '不得超过200字';
        }
      },
      ui: {
        widget: TextArea,
        placeholder: '请简单描述下原因',
        maxLength: 200,
      },
    },
    tempToken: {
      type: 'string',
      label: '人脸识别',
      required: true,
      fieldWidth: 400,
      hide: (formState: any) => {
        return !formState.values.mallId;
      },
    },
    idCardFrontalPic: {
      type: 'string',
      label: '身份证正面照',
      fieldWidth: 130,
      validateOnChange: true,
      hide: (formState: any) => {
        return formState.values && formState.values.mallType !== 1;
      },
      ui: {
        maxNum: 1,
        autocomplete: 'off',
      },
    },
    oldBindMobile: {
      type: 'string',
      label: '请输原绑定手机号',
      fieldWidth: 300,
      validateOnBlur: true,
      required: true,
      ui: {
        placeholder: '请输原绑定手机号',
        autocomplete: 'off',
      },
    },
    newBindMobile: {
      type: 'string',
      label: '新绑定手机号',
      required: true,
      validateOnBlur: true,
      fieldWidth: 300,
      ui: {
        autocomplete: 'off',
      },
    },
    verificationCode: {
      type: 'string',
      label: '手机验证码',
      required: true,
      validateOnBlur: true,
      fieldWidth: 300,
      ui: {
        autocomplete: 'off',
      },
    },
    hasKnown: {
      type: 'boolean',
      label: '',
      alias: { value: 'checked' },
      fieldWidth: 300,
      ui: {
        widget: Checkbox,
        label: (
          <span style={{ color: '#666666', lineHeight: 1.3 }}>
            上述店铺信息修改系本人/我司真实意愿，本人/我司自愿承担由此产生的一切经济和法律责任
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

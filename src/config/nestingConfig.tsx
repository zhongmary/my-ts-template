import React from 'react';
import { Button } from '@msfe/beast-core';

const config: ISchema = {
  type: 'object',
  style: {
    width: '650px',
    margin: '0 auto',
    border: '1px solid #ccc',
  },
  initialValues: {
    a: [
      {
        a1: 'this is b-1',
        a2: [
          { a21: 'this is c1-1', a22: 'this is c2-1' },
          { a21: 'this is c1-1', a22: 'this is c2-1' },
        ],
      },
      {
        a1: 'this is b-2',
        a2: [{ a21: 'this is c1-1', a22: 'this is c2-1' }],
      },
    ],
    b: {
      b1: 'this is b1',
      b2: {
        b21: 'This is b21',
        b22: '123445',
      },
    },
  },
  onSubmit(values) { console.log(values); },
  properties: {
    'array': {
      type: 'custom',
      ui: {
        widget: <h1 style={{ textAlign: 'center' }}>数组</h1>,
      },
    },
    'a': {
      type: 'array',
      label: 'a',
      items: {
        a1: {
          type: 'string',
          label: 'a1',
          fieldWidth: 400,
        },
        a2: {
          type: 'array',
          label: 'a2',
          items: {
            a21: {
              type: 'string',
              label: 'a21',
              fieldWidth: 400,
            },
            a22: {
              type: 'string',
              label: 'a22',
              fieldWidth: 400,
            },
          },
          ui: {
            style: {
              marginLeft: '40px',
            },
          },
        },
      },
      getHelper(hepler) {
        console.log(hepler);
      },
    },
    'object': {
      type: 'custom',
      ui: {
        widget: <h1>对象</h1>,
        style: { textAlign: 'center' },
      },
    },
    'b': {
      type: 'object',
      items: {
        b1: {
          type: 'string',
          label: 'b1',
          fieldWidth: 400,
        },
        b2: {
          type: 'object',
          items: {
            b21: {
              type: 'string',
              label: "b21",
              fieldWidth: 400,
            },
            b22: {
              type: 'number',
              label: "b22",
              fieldWidth: 400,
            },
          },
        },
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

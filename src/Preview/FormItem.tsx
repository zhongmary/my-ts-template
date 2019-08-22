import React, { FC } from 'react';
import { Grid, Form } from '@msfe/beast-core';

const { Field, ErrorMessage } = Form;
const { Row, Col } = Grid;

export interface IFormItemProps {
  field: string;
  label: string;
  required?: boolean;
  [key: string]: any;
}

const FormItem: FC<IFormItemProps> = ({ field, children, label, required, ...rest }) => {
  return (
    <Row>
      <Col span={3} fixed style={{ textAlign: 'right' }}>
        {required && <span style={{ color: 'red' }}>*</span>}
        <label>{label}</label>
      </Col>
      <Col span={20} offset={2} fixed>
        <Row>
          <Col>
            <Field name={field} {...rest}>
              {children}
            </Field>
          </Col>
        </Row>
        <Row style={{ height: 20 }}>
          <Col style={{ color: 'red' }}>
            <ErrorMessage name={field} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FormItem;
import React, { FC, useCallback, memo } from 'react';
import Form from './Form';
import { Input, InputTofu, TextArea, RadioGroup, CheckboxGroup, Select, DatePicker, RangePicker, Button } from '@msfe/beast-core';
import { getConfig } from '../utils';

interface IPreivewProps {
  code: string;
}

const Preivew: FC<IPreivewProps> = ({ code }) => {

  const config: any = useCallback(() => {
    return getConfig({
      code,
      scope: {
        Input, InputTofu, TextArea, RadioGroup, CheckboxGroup, Select, DatePicker, RangePicker, Button,
      },
    });
  }, [code]);

  return (
    <Form config={config()} />
  );
};

export default memo(Preivew);

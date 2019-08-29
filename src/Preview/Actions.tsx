import React, { FC, ReactNode } from 'react';
import { Form } from '@msfe/beast-core';
import { FormApi, FormState } from './type';

const { useFormState, useFormApi } = Form;

interface IHideProps {
  actions: (api: FormApi, state: FormState) => ReactNode;
}

const Actions: FC<IHideProps> = ({ actions }) => {
  const formApi = useFormApi();
  const formState = useFormState();

  return <>{actions(formApi, formState)}</>;
};

export default Actions;

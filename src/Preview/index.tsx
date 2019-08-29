import React, { FC, useCallback, memo, useMemo } from 'react';
import Form from './Form';
import * as Beast from '@msfe/beast-core';
import { getConfig } from '../utils';

interface IPreivewProps {
  code: string;
  isHooks?: boolean;
  onError: (err: Error) => void;
}

const Preivew: FC<IPreivewProps> = ({ isHooks = false, code, onError }) => {

  const config: any = useCallback(() => {
    return getConfig({
      code,
      scope: {
        ...Beast,
      },
    }, onError);
  }, [code, onError]);

  const props = useMemo(
    () => {
      if (isHooks) {
        return { useConfig: config() };
      }
      return { config: config() };
    },
    [isHooks, config]
  );

  return (
    <Form {...props} />
  );
};

export default memo(Preivew);

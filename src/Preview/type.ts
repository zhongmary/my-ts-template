import { ReactNode, MutableRefObject } from 'react';
import { FormApi, FormState, Values } from '@msfe/beast-form/lib/type';

export type SFSchemaType = 'number' | 'integer' | 'string' | 'boolean' | 'object' | 'array';

export * from '@msfe/beast-form/lib/type';

export interface ISchema {
  /**
    * 数据类型，支持 JavaScript 基础类型；注意项：
    *
    * - `integer` 表示整型，`number` 表示浮点型
    * - JSON 中 `date` 等同 `string` 类型
    * - 指定 `format` 标准参数可以自动适配渲染小部件
    * - 指定 `widget` 参数强制渲染小部件
    */
  type?: SFSchemaType;
  getForm?: (api: FormApi, state: FormState) => void;
  onSubmit: ((values: Values, desiredValues?: Values | undefined) => void) | undefined;
  properties: {
    [key: string]: {
      type: SFSchemaType;
      label: string;
      required?: boolean;
      validateOnChange?: boolean;
      validate?: ((value: any, values?: object | undefined) => string | Promise<any> | undefined) | undefined;
      ui?: {
        widget?: string | ReactNode;
        [key: string]: any;
      };
    };
  };
  actions: (api: MutableRefObject<FormApi>, state: MutableRefObject<FormState>) => ReactNode;
}
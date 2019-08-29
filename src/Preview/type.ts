import { ReactNode, CSSProperties } from 'react';
import { FormApi, FormState, Values } from '@msfe/beast-form/lib/type';
import { FormItemProps } from '@msfe/beast-core/lib/Form/interface';

export type SFSchemaType = 'number' | 'string' | 'boolean' | 'object' | 'array';

export * from '@msfe/beast-form/lib/type';

export interface ICustomPropertie extends FormItemProps {
  type: SFSchemaType;
  hide?: boolean | ((state: FormState, api: FormApi) => boolean);
  items?: { [key: string]: Propertie };
  ui?: {
    widget?: string | ReactNode;
    [key: string]: any;
    reactiveUIProps?: (state: FormState, api: FormApi) => { [key: string]: any };
  };
  reactiveFieldProps?: (state: FormState, api: FormApi) => Partial<FormItemProps>;
}

export type Propertie = Omit<ICustomPropertie, 'field'>

export interface ISchema {
  /**
   * 数据类型，支持 JavaScript 基础类型；注意项：
   *
   * - JSON 中 `date` 等同 `string` 类型
   * - 指定 `widget` 参数强制渲染小部件
   */
  type?: SFSchemaType;
  style?: Partial<CSSProperties>;
  initialValues: Values;
  getForm?: (api: FormApi, state: FormState) => void;
  onSubmit: ((values: Values, desiredValues?: Values | undefined) => void) | undefined;
  scrollToError?: boolean;
  properties: {
    [key: string]: Propertie;
  };
  actions: (api: FormApi, state: FormState) => ReactNode;
}

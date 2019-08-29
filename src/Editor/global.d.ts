import { ReactNode, CSSProperties } from 'react';
import { FormApi, FormState, Values } from '@msfe/beast-form/lib/type';

interface FormItemProps {
  /** 左边的 label 文本 */
  label?: React.ReactNode | string;
  /** required 是否必填 这个属性不用来判断，只用来显示样式 默认为 false */
  required?: boolean;
  /** top 区域的上方 */
  top?: React.ReactNode | string | HelperProps;
  /** prefix 前缀 */
  prefix?: React.ReactNode | string | HelperProps;
  /** suffix 后缀 */
  suffix?: React.ReactNode | string | HelperProps;
  /** help 用来填写 help 信息 */
  help?: React.ReactNode | string | HelperProps;
  /** field 唯一的值  必传 */
  field: string;
  /** onChange, vlaue为当前`field`的value */
  onChange?: (value: any, ...rest: any[]) => void;
  /** onBlur */
  onBlur?: () => void;
  /** validate, `value`为当前field的value
   * sync 同步的情况下，没有错误返回`undefined`，有错误的时候返回`string`
   * async 异步的情况下， 需要返回一个`Promise`
   */
  validate?: (value: any, values?: object) => undefined | string | Promise<any>;
  /** validateOnblur 失去焦点的时候校验 */
  validateOnBlur?: boolean;
  /** validateOnChange change的时候校验 */
  validateOnChange?: boolean;
  children?: React.ReactNode | FormItemChild;
  /** labelWidth label 区域的宽度 */
  labelWidth?: number;
  /** contentWidth 子组件的宽度 默认为 100% */
  fieldWidth?: number;
  labelOccupiesPosition?: boolean;
  formatValue?: (value: any) => any;
  margin?: string | number;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  padding?: string | number;
  alias?: Alias;
  status?: 'preview' | 'edit';
  /** warning 警告信息只用来提示 */
  warn?: React.ReactNode;
  /** restrict */
  restrict?: (value: any, values: Restrict) => boolean;
  /** wrapperStyle */
  wrapperStyle?: React.CSSProperties;
  /** formatOutputValue */
  formatOutputValue?: (value: any, values?: Values) => any;
}

declare global {
  declare type SFSchemaType = 'number' | 'string' | 'boolean' | 'object' | 'array';

  declare interface ICustomPropertie extends FormItemProps {
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

  declare type Propertie = Omit<ICustomPropertie, 'field'>

  declare interface ISchema {
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
}



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
  declare type SFSchemaType = 'number' | 'string' | 'boolean' | 'object' | 'array' | 'custom';

  declare interface ICustomPropertie extends FormItemProps {
    type: SFSchemaType;
    hide?: boolean | ((state: FormState, api: FormApi) => boolean);
    items?: { [key: string]: Propertie };
    itemsStyle?: Partial<CSSProperties>;
    ui?: {
      widget?: string | ReactNode;
      [key: string]: any;
      reactiveUIProps?: (state: FormState, api: FormApi) => { [key: string]: any };
    };
    getHelper?: (helper: HelpProps) => void;
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
    /** 表单样式 */
    style?: Partial<CSSProperties>;
    /** 初始化值 */
    initialValues: Values;
    /**
     * 获取formState 和 formApi 
     * 注意，这个并不会在初始化的时候就能获取到值，要在表单数据初始化之后才能使用
     */
    getForm?: (api: FormApi, state: FormState) => void;
    /** 提交时候调用的函数 */
    onSubmit: ((values: Values, desiredValues?: Values | undefined) => void) | undefined;
    /** 提交失败的回调 在提交的时候校验有错误，会触发提交失败的回调 */
    onSubmitFail?: (errors: Errors) => void;
    /** 提交成功的回调 */
    onSubmitSuccess?: () => void;
    /** 校验, 提交的时候走校验函数
      * sync 同步的情况下，返回一个错误对象`errors`，`errors`支持合并
      * async 异步的情况下, 抛出一个`errors`
      */
    validate?: Validate;
    /** disabled 是否全局禁止 disabled 全局禁止 disabled */
    disabled?: boolean;
    /** onValueChange 当 formState.values 发生改变的时候会触发这个回调 */
    onValueChange?: (values: Values) => void;
    /** 滚动到第一个错误位置 */
    scrollToError?: boolean;
    /** name 当多表单联动的时候用来对表单进行标记， 确保其唯一 */
    name?: string;
    properties: {
      [key: string]: Propertie;
    };
    actions: (api: FormApi, state: FormState) => ReactNode;
  }
}



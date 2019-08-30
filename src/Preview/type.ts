import { ReactNode, CSSProperties } from 'react';
import { FormApi, FormState, Values, Errors, Validate, HelpProps } from '@msfe/beast-form/lib/type';
import { FormItemProps } from '@msfe/beast-core/lib/Form/interface';

export type SFSchemaType = 'number' | 'string' | 'boolean' | 'object' | 'array' | 'custom';

export * from '@msfe/beast-form/lib/type';

export interface ICustomPropertie extends FormItemProps {
  type: SFSchemaType;
  hide?: boolean | ((state: FormState, api: FormApi) => boolean);
  items?: { [key: string]: Propertie };
  getHelper?: (helper: HelpProps) => void;
  /** 数组类型每个分组的样式 */
  itemStyle?: Partial<CSSProperties>;
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
  /** 类型，最外层必须是 object */
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

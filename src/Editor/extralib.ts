import globalType from '!!raw-loader!./global.d.ts';
import ReactType from '!!raw-loader!@types/react/index.d.ts';
import BeastCoreType from '!!raw-loader!@msfe/beast-core/lib/index.d.ts';
import BeastFormType from '!!raw-loader!@msfe/beast-form/lib/type.d.ts';
import BeastFormItemType from '!!raw-loader!@msfe/beast-core/lib/Form/interface.d.ts';
import CSSType from '!!raw-loader!csstype/index.d.ts';

export default [{
  content: ReactType,
  filePath: 'file:///node_modules/@types/react/index.d.ts',
}, {
  content: BeastCoreType,
  filePath: 'file:///node_modules/@msfe/beast-core/index.d.ts',
}, {
  content: BeastFormType,
  filePath: 'file:///node_modules/@msfe/beast-form/lib/type.d.ts',
}, {
  content: BeastFormItemType,
  filePath: 'file:///node_modules/@msfe/beast-core/lib/Form/interface.d.ts',
}, {
  content: CSSType,
  filePath: 'file:///node_modules/csstype/index.d.ts',
}, {
  content: globalType,
  filePath: 'global.d.ts',
}];

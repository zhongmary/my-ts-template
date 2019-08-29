import React, { FC, useState, ErrorInfo, useCallback, ComponentProps } from 'react';
import { Tab } from '@msfe/beast-core';
import Editor from './Editor';
import Preview from './Preview';
import ErrorBoundary from './ErrorBoundary';
import './style.css';

import rawConfig from '!!raw-loader!./config/rawConfig.tsx';
import nestingConfig from '!!raw-loader!./config/nestingConfig.tsx';
import hooksConfig from '!!raw-loader!./config/hooksConfig.tsx';

type TabProps = ComponentProps<typeof Tab>

export interface IError {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const App: FC = () => {
  const [activeKey, setActiveKey] = useState(0);
  const [code1, setCode1] = useState(rawConfig);
  const [code2, setCode2] = useState(nestingConfig);
  const [code3, setCode3] = useState(hooksConfig);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<IError>({ error: null, errorInfo: null });

  const codes = [code1, code2, code3];
  const setCodes = [setCode1, setCode2, setCode3];

  const handleCodeChange = useCallback((code: string) => {
    setCodes[activeKey](code);
    setHasError(false);
  }, [setCodes, activeKey, setHasError]);

  const handleError = useCallback((err: IError) => {
    if (!hasError) {
      setHasError(true);
      setError(err);
    }
  }, [hasError, setHasError, setError]);


  const getContent = useCallback((i: number, isHooks = false) => (
    <article className="wrap">
      <section className="editor">
        <Editor code={codes[i]} onChange={handleCodeChange} />
      </section>
      <section className="preview">
        <ErrorBoundary hasError={hasError} err={error} onError={handleError}>
          <Preview isHooks={isHooks} code={codes[i]} onError={() => setHasError(true)} />
        </ErrorBoundary >
      </section>
    </article>
  ), [codes, hasError, error, handleError, setHasError, handleCodeChange]);

  const dateSource: TabProps['dataSource'] = [{
    label: '基础表单',
    content: getContent(0),
  }, {
    label: '嵌套表单',
    content: getContent(1),
  }, {
    label: '联动表单',
    content: getContent(2, true),
  }];

  return (
    <Tab
      type="reunit"
      activeKey={activeKey}
      onChange={setActiveKey}
      dataSource={dateSource}
    />
  );
};

export default App;

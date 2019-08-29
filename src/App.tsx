import React, { FC, useState, ErrorInfo, useCallback, ChangeEvent } from 'react';
import Editor from './Editor';
import Preview from './Preview';
import PreviewWithHooks from './Preview';
import ErrorBoundary from './ErrorBoundary';
import './style.css';

import rawConfig from '!!raw-loader!./config/rawConfig.tsx';
import hooksConfig from '!!raw-loader!./config/hooksConfig.tsx';

export interface IError {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const App: FC = () => {
  const [isHooks, setIsHooks] = useState(true);
  const [code, setCode] = useState(hooksConfig);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<IError>({ error: null, errorInfo: null });


  const handleChangeHooks = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    if (parseInt(e.target.value) !== 1) {
      setIsHooks(true);
      setCode(hooksConfig);
    } else {
      setIsHooks(false);
      setCode(rawConfig);
    }
  }, []);

  const handleCodeChange = (code: string) => {
    setCode(code);
    setHasError(false);
  };

  const handleError = (err: IError) => {
    if (!hasError) {
      setHasError(true);
      setError(err);
    }
  };

  return (
    <>
      <select id="ishooks" value={isHooks ? 2 : 1} onChange={handleChangeHooks}>
        <option value={1}>custom config</option>
        <option value={2}>hoos config</option>
      </select>
      <article className="wrap">
        <section className="editor">
          <Editor code={code} onChange={handleCodeChange} />
        </section>
        <section className="preview">
          <ErrorBoundary hasError={hasError} err={error} onError={handleError}>
            {isHooks && <PreviewWithHooks isHooks={isHooks} code={code} onError={() => setHasError(true)} />}
            {!isHooks && <div><Preview isHooks={isHooks} code={code} onError={() => setHasError(true)} /></div>}
          </ErrorBoundary >
        </section>
      </article>
    </>
  );
};

export default App;

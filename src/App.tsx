import React, { FC, useState } from 'react';
import Editor from './Editor';
import Preview from './Preview';
import ErrorBoundary from './ErrorBoundary';
import './style.css';

import properties from './properties';

const App: FC = () => {
  const [code, setCode] = useState(properties);
  const [hasError, setHasError] = useState(false);

  const handleCodeChange = (code: string) => {
    setCode(code);
    setHasError(false);
  };

  return (
    <article className="wrap">
      <Editor code={code} onChange={handleCodeChange} />
      <section className="preview">
        <ErrorBoundary hasError={hasError} onError={() => setHasError(true)}>
          <Preview code={code} />
        </ErrorBoundary >
      </section>
    </article>
  );
};

export default App;

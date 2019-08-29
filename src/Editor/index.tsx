import React, { FC, useCallback, useRef, useLayoutEffect } from 'react';
import MonacoEditor, { EditorDidMount, EditorWillMount } from 'react-monaco-editor';

import extralib from './extralib';

interface IEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const Editor: FC<IEditorProps> = ({ code, onChange }) => {
  const monacoRef = useRef<MonacoEditor>(null);
  const options = {
    selectOnLineNumbers: true,
  };

  useLayoutEffect(() => {
    window.onresize = () => {
      (monacoRef.current!.editor as any).layout();
    };
  }, []);

  const handleEditorWillMount: EditorWillMount = useCallback((monaco) => {

    extralib.forEach(lib => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        lib.content,
        lib.filePath,
      );
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      allowSyntheticDefaultImports: true,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      jsx: monaco.languages.typescript.JsxEmit.React,
      // jsxFactory: 'React.createElement',
      reactNamespace: 'React',
      types: ['react'],
    });

    return {
      model: monaco.editor.createModel(
        code,
        'typescript',
        monaco.Uri.parse('file:///main.tsx')
      ),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorDidMount: EditorDidMount = useCallback((editor) => {
    editor.focus();
  }, []);

  return (
    <MonacoEditor
      ref={monacoRef}
      width="100%"
      height="90vh"
      language="typescript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
      editorWillMount={handleEditorWillMount}
      editorDidMount={handleEditorDidMount}
    />
  );
};

export default Editor;

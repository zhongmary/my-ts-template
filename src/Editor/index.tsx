import React, { FC, useCallback } from 'react';
import MonacoEditor, { EditorDidMount, EditorWillMount } from 'react-monaco-editor';

interface IEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const Editor: FC<IEditorProps> = ({ code, onChange }) => {
  const options = {
    selectOnLineNumbers: true,
  };

  const handleEditorWillMount: EditorWillMount = useCallback((monaco) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      'export declare function add(a: number, b: number): number',
      'file:///node_modules/@types/math/index.d.ts'
    );

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare type SFSchemaType = 'number' | 'integer' | 'string' | 'boolean' | 'object' | 'array';

      decalre const React: any = null;

      interface ISchema {
        type?: SFSchemaType;
        getForm?: (api: any, state: any) => void;
        onSubmit: ((values: object, desiredValues?: object | undefined) => void) | undefined;
        properties: {
          [key: string]: {
            type: SFSchemaType;
            label: string;
            required?: boolean;
            validateOnChange?: boolean;
            validate?: ((value: any, values?: object | undefined) => string | Promise<any> | undefined) | undefined;
            ui?: {
              widget?: string | any;
              [key: string]: any;
            };
          };
        };
        actions: (api: any, state: any) => any;
      }
      `,
      'global.d.ts'
    );

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `export declare const InputTofu: any;
       export declare const TextArea: any;
       export declare const Button: any;
      `,
      'file:///node_modules/@msfe/beast-core/index.d.ts'
    );

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: 'React.createElement',
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
      width="50vw"
      height="100vh"
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

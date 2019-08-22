import { transform, availablePresets } from '@babel/standalone';
import presetReact from '@babel/preset-react';
import presetTypescript from '@babel/preset-typescript';
import pluginSyntaxJsx from '@babel/plugin-syntax-jsx';
import pluginProposalClassProperties from '@babel/plugin-proposal-class-properties';

export default (code) => {
  const opt = {
    presets: [
      [availablePresets["es2016"], { "modules": false }],
      presetReact,
      [presetTypescript, {
        isTSX: true,
        allExtensions: true,
      }],
    ],
    plugins: [
      pluginProposalClassProperties,
      pluginSyntaxJsx,
    ],
    moduleId: "main",
  };

  return transform(code, opt).code;
};

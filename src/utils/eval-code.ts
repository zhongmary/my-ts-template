import React from 'react';

export default (code: string, scope: object = {}) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map(key => scope[key]);
  const fn = new Function('React', ...scopeKeys, code);

  return fn(React, ...scopeValues);
};

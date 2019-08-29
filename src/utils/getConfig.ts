import transform from './babel-transform';
import evalCode from './eval-code';

export default ({ code, scope }: { code: string; scope?: object }, errorCallback: (err: Error) => void) => {
  // NOTE: Remove trailing semicolon to get an actual expression.
  const codeTrimmed = code.trim().replace(/;$/, '').replace(/import\s+.+from\s+.+;?\n/g, '');

  try {
    // NOTE: Workaround for classes and arrow functions.
    const transformed = transform(codeTrimmed).trim();
    return evalCode(transformed.replace('export default', 'return'), scope);
  } catch (error) {
    errorCallback(error);
    return null;
  }
};

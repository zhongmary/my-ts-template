import transform from './babel-transform';
import evalCode from './eval-code';

export default ({ code, scope }: { code: string; scope?: object }) => {
  // NOTE: Remove trailing semicolon to get an actual expression.
  const codeTrimmed = code.trim().replace(/;$/, '').replace(/import\s+.+from\s+.+;?\n/, '');

  try {
    // NOTE: Workaround for classes and arrow functions.
    const transformed = transform(codeTrimmed).trim();
    return evalCode(transformed.replace('export default', 'return'), scope);
  } catch (error) {
    console.log(error);
    return null;
  }
};

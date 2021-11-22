import { Viewer as ToastViewer } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import Prism from 'prismjs';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';

const Viewer = () => {
  return <ToastViewer initialValue='asdsad' plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]} />;
};

export default Viewer;

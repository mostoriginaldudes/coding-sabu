import { FC, useRef } from 'react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import Prism from 'prismjs';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'prismjs/themes/prism.css';

const Editor: FC = () => {
  const toastEditorRef = useRef<ToastEditor>(null);
  const changeHandler = () => {
    const markdown = toastEditorRef.current?.getInstance().getMarkdown();
  };

  return (
    <ToastEditor
      previewStyle='vertical'
      initialEditType='markdown'
      height='600px'
      placeholder='내용을 작성해주세요.'
      plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      viewer={true}
      useCommandShortcut={true}
      usageStatistics={false}
      ref={toastEditorRef}
      onChange={changeHandler}
    />
  );
};

export default Editor;
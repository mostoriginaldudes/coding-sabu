import { FC, useEffect, useCallback, useRef } from 'react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
interface Props {
  setValue: (value: string) => void;
}

const Editor: FC<Props> = ({ setValue }) => {
  const toastEditorRef = useRef<ToastEditor>(null);
  const editType = window.innerWidth <= 768 ? 'wysiwyg' : 'markdown';

  const changeHandler = useCallback(() => {
    const html = toastEditorRef.current?.getInstance().getHTML();
    html && setValue(html);
  }, [setValue, toastEditorRef]);

  useEffect(() => {
    const currentEditorRef = toastEditorRef.current;
    return () => void currentEditorRef?.getInstance().destroy();
  }, []);

  return (
    <ToastEditor
      previewStyle="vertical"
      initialEditType={editType}
      height="600px"
      placeholder="내용을 작성해주세요."
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

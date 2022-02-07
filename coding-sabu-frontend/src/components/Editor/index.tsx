import { FC, useCallback, useEffect, useRef } from 'react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { LessonFormAction as Action } from 'types/';
interface Props {
  setValue: (value: Action) => void;
}

const Editor: FC<Props> = ({ setValue }) => {
  const toastEditorRef = useRef<ToastEditor>(null);
  const changeHandler = useCallback(() => {
    const markdown = toastEditorRef.current?.getInstance().getMarkdown();
    setValue({ name: 'description', value: markdown! });
  }, [setValue, toastEditorRef]);

  useEffect(() => {
    const currentEditorRef = toastEditorRef.current;
    return () => void currentEditorRef?.getInstance().destroy();
  }, []);

  return (
    <ToastEditor
      previewStyle="vertical"
      initialEditType="markdown"
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


import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Toolbar } from './toolbar';

interface RichEditorProps {
  onChange: (body: string) => void;
  value: string;
}

export default function Editor({ onChange, value }: RichEditorProps) {
  const extensions = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    Placeholder.configure({
      placeholder: 'Write the job description.',
    }),
    Paragraph,
    Text,
    Heading.configure({
      levels: [1, 2, 3, 4],
    }),
  ];

  const editor = useEditor({
    extensions: extensions,
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'custom-scrollable-element min-h-[250px] max-h-[250px] w-[610px] rounded-b-lg bg-neutral-100 px-8 py-6 border text-sm ring-offset-background text-neutral-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 prose max-w-none overflow-y-auto',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className='border'>
        <Toolbar editor={editor} />
      </div>
      <div className='flex justify-center'>
        <EditorContent editor={editor} value={value} />
      </div>
    </div>
  );
}
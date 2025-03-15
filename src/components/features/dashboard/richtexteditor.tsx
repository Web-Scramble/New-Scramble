import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Bold, Italic, Code, AlignLeft, AlignCenter, AlignRight, Strikethrough, List, ListOrdered, Quote, Undo2, Redo2, ChevronDown, Indent, Outdent, Underline as UnderlineIcon, Link as LinkIcon, Image as ImageIcon, Eraser, Code2, Minus } from "lucide-react";
import { useState, useRef } from "react";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      Underline,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida id etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p>
      <p class="highlighted-text"><code>code textcode textcode textcode textcode textcode text</code></p>
    `,
  });

  const [textFormat, setTextFormat] = useState("Normal text");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  if (!editor) return null;

  const handleTextFormatChange = (format: string, level?: 1 | 2 | 3 | 4 | 5 | 6) => {
    if (format === "Paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (format.includes("Heading") && level) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setTextFormat(format);
    setDropdownOpen(false);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 size={18} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 size={18} />
        </button>
        <div className="dropdown" ref={dropdownRef}>
          <button
            className="dropdown-btn"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {textFormat} <ChevronDown size={16} />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => handleTextFormatChange("Normal text")}>
                Normal text
              </button>
              <button onClick={() => handleTextFormatChange("Heading 1", 1)}>
                Heading 1
              </button>
              <button onClick={() => handleTextFormatChange("Heading 2", 2)}>
                Heading 2
              </button>
              <button onClick={() => handleTextFormatChange("Heading 3", 3)}>
                Heading 3
              </button>
            </div>
          )}
        </div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={18} />
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 size={18} />
        </button>

        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: prompt("Enter URL") || "" })
              .run()
          }
        >
          <LinkIcon size={18} />
        </button>
        <button onClick={() => alert("Image upload functionality to be added")}>
          <ImageIcon size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <Eraser size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        >
          <Outdent size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        >
          <Indent size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={18} />
        </button>
      </div>
      <div className="editor-wrapper">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;

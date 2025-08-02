import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getRoot,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RxTextAlignLeft,RxTextAlignCenter,RxTextAlignRight } from "react-icons/rx";

//  Theme config (only one instance!)
const editorConfig = {
  namespace: "MyEditor",
  theme: {
    heading: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-xl font-medium",
    },
    paragraph: "text-base",
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  onError(error) {
    throw error;
  },
};


//  Toolbar with formatting, header, and alignment
const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const applyFormat = (type) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const applyElementFormat = (type) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b border-gray-300 items-center">
      {/* Bold/Italic/Underline */}
      <button onClick={() => applyFormat("bold")} className="font-bold">B</button>
      <button onClick={() => applyFormat("italic")} className="italic">I</button>
      <button onClick={() => applyFormat("underline")} className="underline">U</button>

      {/* Header dropdown */}
      <select
        onChange={(e) => {
          const value = e.target.value;
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value === "paragraph" ? "paragraph" : value);
        }}
        className="px-2 py-1 border rounded"
      >
        <option value="paragraph">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>

      {/* Alignment */}
      <button onClick={() => applyElementFormat("left")}><RxTextAlignLeft/> </button>
      <button onClick={() => applyElementFormat("center")}><RxTextAlignCenter/> </button>
      <button onClick={() => applyElementFormat("right")}><RxTextAlignRight/> </button>
    </div>
  );
};


// ✅ Main Editor component
export default function LexicalEditor() {
  const [editorValue, setEditorValue] = useState("");

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded-md overflow-hidden shadow-sm">
        <Toolbar />

        <RichTextPlugin
          contentEditable={
            <ContentEditable className="p-4 min-h-[150px] outline-none text-left" />
          }
          placeholder={<div className="p-4 text-gray-400">Write here...</div>}
        />

        <HistoryPlugin />

        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const content = $getRoot().getTextContent();
              setEditorValue(content);
             
            });
          }}
        />
      </div>

      
    </LexicalComposer>
  );
}

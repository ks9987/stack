"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

import "~/styles/markdown.css";
import { api } from "~/trpc/react";

export function CreatePost({ channelId }: { channelId: string }) {
  const router = useRouter();
  const [text, setText] = useState("");

  const extensions = [
    StarterKit,
    CharacterCount.configure({ limit: 18000 }),
    Link.configure({
      openOnClick: false,
    }),
    Placeholder.configure({
      placeholder: 'Markdown your message...',
    }),
  ];

  const editor = useEditor({
    extensions: extensions,
    content: text,
    onUpdate: ({ editor }) => {
      const text = editor.getHTML();
      console.log(text)
      setText(text);
    },
  })

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setText("");
      editor?.commands.clearContent();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ text, channelId });
      }}
      className="flex flex-col border focus-within:shadow-sm focus-within:border-slate-300 duration-50 gap-2 bg-white p-4 rounded-lg"
      style={{ height: "auto" }}
    >
      <EditorContent editor={editor} />
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 duration-100 text-white px-4 py-2 rounded"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

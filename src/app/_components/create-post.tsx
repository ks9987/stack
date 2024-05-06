"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost({ channelId }: { channelId: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [rows, setRows] = useState(5);

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setText("");
      setRows(5);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const lines = e.target.value.split("\n");
    setRows(Math.min(Math.max(lines.length, 5), 20));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ text, channelId });
      }}
      className="flex flex-col gap-2 bg-white p-4 rounded-lg"
      style={{ height: "auto" }}
    >
      <textarea
        value={text}
        placeholder="Type your message..."
        onChange={handleChange}
        className="w-full rounded px-2 py-1 mb-2 resize-none outline-none border-none"
        rows={rows}
      />
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

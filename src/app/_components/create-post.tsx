"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

type Props = {
  currentChannel: string;
};

export function CreatePost({ currentChannel }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rows, setRows] = useState(5);

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setRows(5);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
    const lines = e.target.value.split("\n");
    setRows(Math.min(Math.max(lines.length, 5), 10));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2 bg-white p-4 rounded-lg"
      style={{ height: "auto" }}
    >
      <textarea
        value={name}
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

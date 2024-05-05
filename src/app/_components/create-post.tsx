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

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        value={name}
        placeholder="Type your message..."
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

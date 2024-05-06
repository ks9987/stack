import { db } from "~/server/db";

import { EditButton } from "~/app/_components/edit-button";
import { DeleteButton } from "~/app/_components/delete-button";

export async function Posts({ channelId }: { channelId: string }) {
  const posts = await db.post.findMany({
    where: { channelId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mb-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="mb-6 bg-white p-4 rounded-lg relative"
        >
          <p>{post.text}</p>
          <div className="absolute top-0 right-0 border rounded bg-white p-2 flex opacity-0 hover:opacity-100 transition-opacity duration-100">
            <EditButton />
            <DeleteButton />
          </div>
        </div>
      ))}
    </div>
  );
}

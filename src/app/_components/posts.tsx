import { EditButton } from "~/app/_components/edit-button";
import { DeleteButton } from "~/app/_components/delete-button";

type Post = {
  id: number;
  text: string;
  channel: string;
};

type Props = {
  posts: Post[];
};

export function Posts({ posts }: Props) {
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

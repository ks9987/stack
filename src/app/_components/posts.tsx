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
        <div key={post.id} className="mb-2">
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
}

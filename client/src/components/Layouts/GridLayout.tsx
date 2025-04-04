import React from "react"
import { LayoutProps } from "../../types/types"
import PostCard from "../PostCard"

const GridLayout: React.FC<LayoutProps> = ({
  posts,
  columns,
  rows,
  template,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridGap: "20px",
      padding: "20px",
    }}
  >
    {posts.slice(0, columns * rows).map((post) => (
      <PostCard key={post.id} post={post} template={template} />
    ))}
  </div>
)

export default GridLayout

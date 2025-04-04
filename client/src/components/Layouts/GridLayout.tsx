import React from "react"
import { LayoutProps } from "../../types/types"
import PostCard from "../PostCard"

const GridLayout: React.FC<LayoutProps> = ({
  posts,
  columns,
  rows,
  template,
}) => {
  // Рассчитываем высоту сетки на основе rows
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridAutoRows: "1fr", // Каждая строка занимает равное пространство
    gap: "20px",
    padding: "20px",
    minHeight: `calc(${rows} * (1fr + 20px))`, // Минимальная высота по количеству rows
  }

  return (
    <div style={gridStyle}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} template={template} />
      ))}
    </div>
  )
}

export default GridLayout

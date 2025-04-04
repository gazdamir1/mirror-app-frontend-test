import React from "react"
import { LayoutProps } from "../../types/types"
import PostCard from "../PostCard"
import styles from "./AlternateLayout.module.scss"

const AlternateLayout: React.FC<LayoutProps> = ({
  posts,
  columns,
  template,
}) => {
  const masonryColumns = Array.from({ length: columns }, (_, i) => i)

  const columnPosts = masonryColumns.map((colIndex) =>
    posts.filter((_, index) => index % columns === colIndex)
  )

  return (
    <div
      className={styles.masonryLayout}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "20px",
      }}
    >
      {columnPosts.map((column, colIdx) => (
        <div key={`column-${colIdx}`} className={styles.masonryColumn}>
          {column.map((post) => (
            <div key={post.id} className={styles.masonryItem}>
              <PostCard post={post} template={template} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default AlternateLayout

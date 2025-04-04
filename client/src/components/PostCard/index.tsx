import React from "react"
import { Post } from "../../types/types"
import styles from "./PostCard.module.scss"

interface PostCardProps {
  post: Post
  template: "classic" | "hover"
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`
  return date.toLocaleDateString()
}

const PostCard: React.FC<PostCardProps> = ({ post, template = "classic" }) => (
  <div className={`${styles.postCard} ${styles[`template_${template}`]}`}>
    {template === "hover" ? (
      <>
        <div className={styles.header}>{post.description}</div>
        <hr className={styles.divider} />
        <div className={styles.content}>
          <div className={styles.userInfo}>
            <span className={styles.username}>{post.user.username}</span>
            <span className={styles.date}>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className={styles.content}>
          <div className={styles.userInfo}>
            <span className={styles.username}>{post.user.username}</span>
            <span className={styles.date}>{formatDate(post.createdAt)}</span>
          </div>
        </div>
        <hr className={styles.divider} />
        <div className={styles.header}>{post.description}</div>
      </>
    )}
    <hr className={styles.divider} />
    <div className={styles.footer}>
      <div className={styles.stats}>
        <span className={styles.stat}>❤️ {post.likes}</span>
        <span className={styles.stat}>💬 {post.comments}</span>
      </div>
    </div>
  </div>
)

export default PostCard

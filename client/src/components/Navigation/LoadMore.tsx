import React from "react"
import styles from "./LoadMore.module.scss"

interface LoadMoreProps {
  onLoadMore: () => void
  isLoading: boolean
  isVisible: boolean
}

const LoadMore: React.FC<LoadMoreProps> = ({
  onLoadMore,
  isLoading,
  isVisible,
}) => {
  if (!isVisible) return null

  return (
    <div className={styles.loadMore}>
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className={`${styles.loadMoreButton} ${
          isLoading ? styles.loading : ""
        }`}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner}></span>
            Loading...
          </>
        ) : (
          "Load More"
        )}
      </button>
    </div>
  )
}

export default LoadMore

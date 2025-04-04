import React from "react"
import { NavigationType } from "../../types/types"
import Pagination from "./Pagination"
import LoadMore from "./LoadMore"

interface NavigationProps {
  type: NavigationType
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onLoadMore: () => void
  isLoading: boolean
  hasMore: boolean
}

const Navigation: React.FC<NavigationProps> = ({
  type,
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
  isLoading,
  hasMore,
}) => {
  return (
    <div className="navigation-container">
      {type === "pagination" ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          disabled={isLoading}
        />
      ) : (
        <LoadMore
          onLoadMore={onLoadMore}
          isLoading={isLoading}
          isVisible={hasMore}
        />
      )}
    </div>
  )
}

export default Navigation

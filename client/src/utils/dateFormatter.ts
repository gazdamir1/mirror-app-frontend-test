export const formatPostDate = (dateString: string): string => {
  const postDate = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor(
    (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffInDays < 7) {
    return `${Math.floor(diffInDays)} ${
      Math.floor(diffInDays) === 1 ? "day" : "days"
    } ago`
  } else {
    return `${postDate.getDate()}/${
      postDate.getMonth() + 1
    }/${postDate.getFullYear()}`
  }
}

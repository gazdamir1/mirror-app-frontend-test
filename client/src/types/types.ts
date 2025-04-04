export interface Post {
  id: string
  description: string
  likes: number
  comments: number
  createdAt: string
  user: {
    username: string
  }
}

export type LayoutType = "grid" | "masonry"
export type TemplateType = "classic" | "hover"
export type NavigationType = "load-more" | "pagination"

export interface LayoutParams {
  grid: {
    columns: number
    rows: number
  }
  masonry: {
    columns: number
    rows: number
  }
}
export interface Settings {
  navigation: NavigationType
  template: TemplateType
  layout: {
    current: LayoutType
    params: {
      grid: {
        columns: number
        rows: number
      }
      masonry: {
        columns: number
        rows: number
      }
    }
  }
}
export interface LayoutProps {
  posts: Post[]
  columns: number
  rows: number
  template: TemplateType
}

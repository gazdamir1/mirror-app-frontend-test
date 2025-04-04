const API_BASE_URL = "http://localhost:4000"

export interface ApiPost {
  id: string
  caption: string
  permalink: string
  date: string
  likes: number
  comments: number
  userId: string
}

export interface ApiUser {
  id: string
  username: string
  avatar: string
}

export interface ApiSettings {
  navigation: "load-more" | "pagination"
  template: "classic" | "hover"
  layout: {
    current: "grid" | "masonry"
    params: {
      grid: { columns: number; rows: number }
      masonry: { columns: number; rows: number }
    }
  }
}

export const fetchPosts = async (): Promise<ApiPost[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`)
  if (!response.ok) throw new Error("Failed to fetch posts")
  return await response.json()
}

export const fetchUsers = async (): Promise<ApiUser[]> => {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) throw new Error("Failed to fetch users")
  return await response.json()
}

export const fetchSettings = async (): Promise<ApiSettings> => {
  const response = await fetch(`${API_BASE_URL}/settings`)
  if (!response.ok) throw new Error("Failed to fetch settings")
  return await response.json()
}

export const updateSettings = async (settings: ApiSettings): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  })
  if (!response.ok) throw new Error("Failed to update settings")
}

import { useState, useEffect, useCallback } from "react"
import {
  fetchPosts,
  fetchUsers,
  fetchSettings,
  type ApiPost,
  type ApiUser,
  type ApiSettings,
} from "../api"
import { Post, Settings } from "../types/types"

const mapApiDataToAppData = (
  apiPosts: ApiPost[],
  apiUsers: ApiUser[],
  apiSettings: ApiSettings
): { posts: Post[]; settings: Settings } => {
  const posts = apiPosts.map((post) => {
    const user = apiUsers.find((u) => u.id === post.userId)
    return {
      id: post.id,
      description: post.caption,
      likes: post.likes,
      comments: post.comments,
      createdAt: post.date,
      user: {
        username: user?.username || "Unknown",
      },
    }
  })

  const settings = {
    navigation: apiSettings.navigation,
    template: apiSettings.template,
    layout: apiSettings.layout,
  }

  return { posts, settings }
}

export interface UsePostsResult {
  posts: Post[]
  settings: Settings | null
  loading: boolean
  error: string | null
  refreshPosts: () => void
  totalPages?: number
  hasMore?: boolean
}

export const usePosts = (): UsePostsResult => {
  const [posts, setPosts] = useState<Post[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [apiPosts, apiUsers, apiSettings] = await Promise.all([
        fetchPosts(),
        fetchUsers(),
        fetchSettings(),
      ])

      const { posts, settings } = mapApiDataToAppData(
        apiPosts,
        apiUsers,
        apiSettings
      )
      setPosts(posts)
      setSettings(settings)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const refreshPosts = useCallback(() => {
    loadData()
  }, [loadData])

  return { posts, settings, loading, error, refreshPosts }
}

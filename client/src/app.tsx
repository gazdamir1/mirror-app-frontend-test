import { useState, useEffect } from "react"
import { usePosts } from "./hooks/usePosts"
import GridLayout from "./components/Layouts/GridLayout"
import AlternateLayout from "./components/Layouts/AlternateLayout"
import Navigation from "./components/Navigation/index"
import SettingsPanel from "./components/SettingsPanel"
import { ApiSettings, fetchSettings, updateSettings } from "./api"

function App() {
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    refreshPosts,
  } = usePosts()

  const [currentPage, setCurrentPage] = useState(1)
  const [loadedPages, setLoadedPages] = useState(1)
  const [settings, setSettings] = useState<ApiSettings | null>(null)
  const [settingsLoading, setSettingsLoading] = useState(true)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await fetchSettings()

        const syncedSettings = syncLayoutParams(loadedSettings)

        setSettings(syncedSettings)
      } catch (err) {
        console.error("Settings load error:", err)
      } finally {
        setSettingsLoading(false)
      }
    }
    loadSettings()
  }, [])

  const syncLayoutParams = (settings: ApiSettings): ApiSettings => {
    const baseParams = settings.layout.params.grid

    return {
      ...settings,
      layout: {
        ...settings.layout,
        params: {
          grid: baseParams,
          masonry: baseParams,
        },
      },
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    setLoadedPages(1)
  }, [posts])

  const handleSettingsUpdate = async (newSettings: ApiSettings) => {
    try {
      setSettings(newSettings)
      await updateSettings(newSettings)
      refreshPosts()
    } catch (err) {
      console.error("Failed to update settings:", err)
      setSettings((prev) => prev!)
    }
  }

  if (settingsLoading) return <div className="loading">Loading settings...</div>
  if (!settings) return <div className="error">Settings not available</div>
  if (postsLoading && !posts.length)
    return <div className="loading">Loading posts...</div>
  if (postsError)
    return <div className="error">Error loading posts: {postsError}</div>

  const currentLayoutParams = settings.layout.params[settings.layout.current]
  const postsPerPage = currentLayoutParams.columns * currentLayoutParams.rows

  const visiblePosts =
    settings.navigation === "pagination"
      ? posts.slice(
          (currentPage - 1) * postsPerPage,
          currentPage * postsPerPage
        )
      : posts.slice(0, postsPerPage * loadedPages)

  const hasMorePosts =
    settings.navigation === "pagination"
      ? currentPage < Math.ceil(posts.length / postsPerPage)
      : loadedPages * postsPerPage < posts.length

  const handleLoadMore = () => {
    setLoadedPages((prev) => {
      const newValue = prev + 1
      console.log("Loading more. Current:", prev, "New:", newValue)
      return newValue
    })
  }

  const handlePageChange = (page: number) => {
    console.log("Changing page to:", page)
    setCurrentPage(page)
  }

  return (
    <div className="app">
      <SettingsPanel
        currentSettings={settings}
        onUpdate={handleSettingsUpdate}
      />

      {settings.layout.current === "grid" ? (
        <GridLayout
          key={`grid-${settings.navigation}-${visiblePosts.length}`}
          posts={visiblePosts}
          columns={currentLayoutParams.columns}
          template={settings.template}
          rows={currentLayoutParams.rows}
        />
      ) : (
        <AlternateLayout
          key={`alt-${settings.navigation}-${visiblePosts.length}`}
          posts={visiblePosts}
          columns={currentLayoutParams.columns}
          rows={currentLayoutParams.rows}
          template={settings.template}
        />
      )}

      <Navigation
        type={settings.navigation}
        currentPage={currentPage}
        totalPages={Math.ceil(posts.length / postsPerPage)}
        onPageChange={handlePageChange}
        onLoadMore={handleLoadMore}
        isLoading={postsLoading}
        hasMore={hasMorePosts}
      />
    </div>
  )
}

export default App

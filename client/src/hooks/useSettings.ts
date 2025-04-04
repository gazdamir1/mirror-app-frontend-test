import { useState } from "react"
import { Settings } from "../types/types"

const useSettings = (initialSettings: Settings) => {
  const [settings, setSettings] = useState<Settings>(initialSettings)

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings)
  }

  return {
    settings,
    updateSettings,
  }
}

export default useSettings

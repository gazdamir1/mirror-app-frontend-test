import React, { useState, useEffect } from "react"
import { Settings } from "../../types/types"
import styles from "./SettingsPanel.module.scss"

interface SettingsPanelProps {
  currentSettings: Settings
  onUpdate: (settings: Settings) => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  currentSettings,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localSettings, setLocalSettings] = useState<Settings>(currentSettings)

  useEffect(() => {
    setLocalSettings(currentSettings)
  }, [currentSettings])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setLocalSettings((prev) => {
      if (name === "columns" || name === "rows") {
        return {
          ...prev,
          layout: {
            ...prev.layout,
            params: {
              grid: {
                ...prev.layout.params.grid,
                [name]: parseInt(value) || 1,
              },
              masonry: {
                ...prev.layout.params.masonry,
                [name]: parseInt(value) || 1,
              },
            },
          },
        }
      }
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleLayoutTypeChange = (value: "grid" | "masonry") => {
    setLocalSettings((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        current: value,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(localSettings)
    setIsOpen(false)
    console.log(localSettings.template)
  }

  const currentLayoutParams =
    localSettings.layout.params[localSettings.layout.current]

  return (
    <div
      className={`${styles.settingsPanel} ${
        isOpen ? styles.open : styles.closed
      }`}
    >
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close settings panel" : "Open settings panel"}
      >
        {isOpen ? "Close Panel" : "Settings"}
      </button>

      <div className={styles.panelContent}>
        <form onSubmit={handleSubmit} className={styles.settingsForm}>
          <div className={styles.formGroup}>
            <label htmlFor="navigation-type">Navigation Type:</label>
            <select
              id="navigation-type"
              name="navigation"
              value={localSettings.navigation}
              onChange={handleChange}
            >
              <option value="pagination">Pagination</option>
              <option value="load-more">Load More</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="card-template">Card Template:</label>
            <select
              id="card-template"
              name="template"
              value={localSettings.template}
              onChange={handleChange}
            >
              <option value="classic">Classic</option>
              <option value="hover">Hover</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="layout-type">Layout Type:</label>
            <select
              id="layout-type"
              value={localSettings.layout.current}
              onChange={(e) =>
                handleLayoutTypeChange(e.target.value as "grid" | "masonry")
              }
            >
              <option value="grid">Grid</option>
              <option value="masonry">Masonry</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="columns">Columns:</label>
            <input
              id="columns"
              type="number"
              name="columns"
              min="1"
              max="6"
              value={currentLayoutParams.columns}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rows">Rows:</label>
            <input
              id="rows"
              type="number"
              name="rows"
              min="1"
              max="10"
              value={currentLayoutParams.rows}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Apply Settings
          </button>
        </form>

        <div className={styles.currentSettings}>
          <h3>Current Settings</h3>
          <p>
            <strong>Navigation:</strong> {currentSettings.navigation}
          </p>
          <p>
            <strong>Template:</strong> {currentSettings.template}
          </p>
          <p>
            <strong>Layout:</strong> {currentSettings.layout.current}
          </p>
          <p>
            <strong>Columns:</strong> {currentLayoutParams.columns}
          </p>
          <p>
            <strong>Rows:</strong> {currentLayoutParams.rows}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel

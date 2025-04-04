import { LayoutType } from "../types/types"
import { lazy } from "react"

export const getLayoutComponent = (type: LayoutType) => {
  return lazy(() => import(`../components/Layouts/${type}`))
}

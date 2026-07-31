import { create } from 'zustand'

interface AppState {
  progress: number
  setProgress: (p: number) => void
  loaderDone: boolean
  setLoaderDone: (v: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
  loaderDone: false,
  setLoaderDone: (v) => set({ loaderDone: v }),
}))

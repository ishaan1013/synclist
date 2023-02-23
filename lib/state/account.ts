import { create } from "zustand"

export interface UDataType {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
  userExt: string
  id: string
}

interface T {
  userData: UDataType | undefined
  setUserData: (userData: UDataType | undefined) => void
  accessToken: string
  setAccessToken: (accessToken: string) => void
}

export const useAccountStore = create<T>((set) => ({
  userData: {
    name: "",
    email: "",
    image: "",
    userExt: "",
    id: "",
  },
  setUserData: (userData: UDataType | undefined) => set({ userData }),
  accessToken: "",
  setAccessToken: (accessToken: string) => set({ accessToken }),
}))

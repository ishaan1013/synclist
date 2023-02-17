import { create } from 'zustand'

interface UDataType {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}

interface T {
  userData: UDataType | undefined, 
  setUserData: (userData: UDataType | undefined) => void, 
  accessToken: string, 
  setAccessToken: (accessToken: string) => void}

export const useAccountStore = 
create<T>((set) => ({
  userData: {
    name: '',
    email: '',
    image: '',
  },
  setUserData: (userData: UDataType | undefined) => set({ userData }),
  accessToken: '',
  setAccessToken: (accessToken: string) => set({ accessToken }),
}))
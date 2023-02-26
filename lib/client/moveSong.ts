export const moveSong = async ({
  playlist,
  accessToken,
  start,
  insert,
}: {
  playlist: string
  accessToken: string
  start: number
  insert: number
}) => {
  const res = await fetch(
    `/api/spotify/moveItem?playlist=${playlist}&start=${start}&insert=${
      insert > start ? insert + 1 : insert
    }&accessToken=${accessToken}`
  )
  const data = await res.json()
  return data
}

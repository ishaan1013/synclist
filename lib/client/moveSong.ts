export const moveSong = async (
  playlist: string,
  accessToken: string,
  start: number,
  insert: number
) => {
  const res = await fetch(
    `/api/spotify/updateItems?playlist=${playlist}&start=${start}&insert=${insert}&accessToken=${accessToken}`
  )
  return await res.json()
}

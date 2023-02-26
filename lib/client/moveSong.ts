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
  console.log("start", start)
  console.log("insert", insert)
  const res1 = await fetch(
    `/api/spotify/moveItem?playlist=${playlist}&start=${start}&insert=${
      insert > start ? insert + 1 : insert
    }&accessToken=${accessToken}`
  )
  const data1 = await res1.json()
  console.log("data1", data1)
}

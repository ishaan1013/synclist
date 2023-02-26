export const getPlaylists = async ({
  accessToken,
}: {
  accessToken: string
}) => {
  const res = await fetch(
    "/api/spotify/getPlaylists?accessToken=" + accessToken
  )
  return await res.json()
}

import songType from "../songType"

export const addSong = async ({
  playlist,
  track,
  accessToken,
  songs,
  setSongs,
}: {
  playlist: string
  track: songType
  accessToken: string
  songs: songType[]
  setSongs: (songs: songType[]) => void
}) => {
  setSongs([...songs, track])
  await fetch(
    `/api/spotify/addItem?playlist=${playlist}&track=${
      "spotify:track:" + track.id
    }&accessToken=${accessToken}`,
    {
      method: "POST",
    }
  )
}

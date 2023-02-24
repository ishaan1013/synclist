import songType from "../songType"

export const deleteSong = async ({
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
  const newSongs = songs.filter((song) => song.id !== track.id)
  setSongs(newSongs)
  await fetch(
    `/api/spotify/deleteItem?playlist=${playlist}&track=${track.id}&accessToken=${accessToken}`,
    {
      method: "POST",
    }
  )
}

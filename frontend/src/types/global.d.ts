declare global {
  interface Results {
    tracks: {
      items: Song[]
    }
    artists: {
      items: Artist[]
    }
    albums: {
      items: Album[]
    }
  }

  interface Song {
    name: string
  }

  interface Artist {
    name: string
  }

  interface Album {
    name: string
  }
}

export {}
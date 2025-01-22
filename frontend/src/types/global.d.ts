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

  interface Item {
    name: string
    images: object[{
       url: string
    }]
    external_urls: {
      spotify: string
    }
    album?: {
      images: object[{
        url: string
     }]
    };
  }
}

export {}
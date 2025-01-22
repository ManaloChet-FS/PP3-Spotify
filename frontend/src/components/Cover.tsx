interface CoverProps {
  item: Item
}

const Cover = ({item}: CoverProps) => {
  const { name, external_urls, images } = item;

  return (
    <a target="_blank" href={external_urls["spotify"]} className="relative h-32 flex-1 min-w-32 max-w-48 flex justify-center items-center overflow-hidden p-2 group">
      <h3 className="text-lg relative text-balance text-center z-20">{name}</h3>
      <img className="absolute w-full h-full top-0 left-0 z-10 brightness-50 scale-100 group-hover:scale-110 transition-all" src={images ? images[0].url : item.album!.images[0].url}/>
    </a>
  )
}

export default Cover;
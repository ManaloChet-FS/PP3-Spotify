interface CoverProps {
  name: string
}

const Cover = ({ name }: CoverProps) => {
  return (
    <div className="bg-gray-600 h-32 w-48 flex justify-center items-center">
      <h3 className="text-lg">{name}</h3>
    </div>
  )
}

export default Cover;
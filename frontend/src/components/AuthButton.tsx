interface ButtonProps {
  isLogin: boolean
}

const Button = ({ isLogin }: ButtonProps) => {
  return (
    <button onClick={() => {
      window.location.href = "/auth/login";
    }} className={`${isLogin ?
      'bg-spotifyGreen hover:bg-spotifyGreenDarker text-2xl max-w-xs'
      : 'bg-green-600 hover:bg-green-700 max-w-32'}
      py-2.5 w-full font-semibold rounded-full text-slate-50`}>
      {isLogin ? 'Login' : 'Sign out'}
    </button>
  )
}

export default Button;
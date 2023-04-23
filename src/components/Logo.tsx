import logo from '@/assets/logo.png'
export function Logo(props: { className?: string }) {
  return (
   <img src={logo} alt="Logo" className={props.className} />
  )
}

const Hamburger = ({ 
  active, 
  handleClick
} : {
  active: boolean,
  handleClick: () => void
}) => {
  return (
    <div className='burger' onClick={handleClick}>
      <div className={`burgerLine duration-300 ${active && 'transform rotate-45 translate-y-[4px]'}`} />
      <div className={`burgerLine duration-300 ${active && 'hidden'}`} />
      <div className={`burgerLine duration-300 ${active && 'transform -rotate-45 -translate-y-[5px]'}`} />
    </div>
  )
}

export default Hamburger

type InputProps = {
  children: React.ReactNode
  className?: string
  onClick?: (n: any) => void
}

const Select = ({ children, className, onClick }: InputProps) => {
  return (
    <div
      onClick={onClick}
      className={`${
        className && className
      } bg-transparent flex items-center gap-3 outline-none w-full text-gray-400 `}
    >
      <div className="w-full flex bg-transparent px-6 py-3 focus-within:!border-blue-500  border border-gray-500 rounded-md transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  )
}

export default Select

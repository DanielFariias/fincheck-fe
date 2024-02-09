import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  name: string
}

export function Input({ id, name, placeholder, ...props }: InputProps) {
  const inputId = id ?? name

  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        name={name}
        className="bg-white w-full rounded-lg border placeholder-shown:pt-0 pt-4 border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 outline-none transition-all peer"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute text-xs top-2 left-[13px] pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
    </div>
  )
}

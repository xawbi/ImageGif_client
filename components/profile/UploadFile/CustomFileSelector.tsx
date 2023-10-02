import React, {ComponentPropsWithRef, FC} from "react"

type Props = ComponentPropsWithRef<"input">;

const CustomFileSelector = ({dragVisible, ...props}: Props & { dragVisible?: boolean }) => {
  return (
    <>
      <input
        {...props}
        type='file'
        multiple
        id="fileInput"
        className='hidden'
        name='file'
      />
      {!dragVisible &&
      <label htmlFor="fileInput"
             className="p-2 mb-4 bg-black border-2 border-gray-500 cursor-pointer rounded-md hover:bg-blue-950">
        Add file +
      </label>}
    </>
  )
}

export default CustomFileSelector;
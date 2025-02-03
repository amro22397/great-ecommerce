import React from 'react'

const Trash = () => {
  return (
    <div>
      <Trash size={17} className="text-red-600 cursor-pointer hover:text-red-700"
                    onClick={() => setDeleteMessage(true)}/>
    </div>
  )
}

export default Trash

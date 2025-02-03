import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import DeleteMessage from './DeleteMessage';

const TrashComponent = ({ review, handleDeleteReview }: {review: any, handleDeleteReview: () => void}) => {
    const [deleteMessage, setDeleteMessage] = useState(false);


  return (
    <div>
        {deleteMessage && (
        <DeleteMessage text={"Are you sure you want to delete this review?"}
        setDeleteMessage={setDeleteMessage} handleDeletePost={handleDeleteReview} />
    )}

      <Trash size={17} className="text-red-600 cursor-pointer hover:text-red-700"
                    onClick={() => setDeleteMessage(true)}/>
    </div>
  )
}

export default TrashComponent

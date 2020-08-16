import React from 'react'
import { useSelector } from 'react-redux'

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )
  console.log('author', author)
  return <div>by {author ? author.name : 'unknown author'}</div>
}

export default PostAuthor

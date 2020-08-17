import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

import ReactionButtons from './ReactionButtons'

const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
  console.log('posts', posts)

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date}></TimeAgo>

        <ReactionButtons post={post}></ReactionButtons>
      </div>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))
  // debugger
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList

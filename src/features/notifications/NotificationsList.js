import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllNotifications } from './notificationsSlice'
import { selectAllUsers } from './../users/usersSlice'
import { parseISO, formatDistanceToNow } from 'date-fns'

const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)

  const users = useSelector(selectAllUsers)

  console.log('notifications', notifications)
  console.log('users', users)

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    debugger
    console.log('notification date after parseISO:', date)
    const timeAgo = formatDistanceToNow(date)
    console.log('notification date after formatDistanceToNow:', timeAgo)
    debugger
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    return (
      <div key={user.id}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>

        <div>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList

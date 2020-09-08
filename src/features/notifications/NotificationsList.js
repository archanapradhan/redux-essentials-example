import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllNotifications,
  allNotificationsRead,
} from './notificationsSlice'
import { selectAllUsers } from './../users/usersSlice'
import { parseISO, formatDistanceToNow } from 'date-fns'
import classnames from 'classnames'

const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  console.log('notifications', notifications)
  console.log('users', users)

  useEffect(() => {
    debugger
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    console.log('notification date after parseISO:', date)
    const timeAgo = formatDistanceToNow(date)
    console.log('notification date after formatDistanceToNow:', timeAgo)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    const notificationClassname = classnames('notification', {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassname}>
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
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}

export default NotificationsList

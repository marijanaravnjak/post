import React,{ useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

function UserUsername({ userId }) {
  const [user, setUser] = useState()

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        console.log('resolved', response)
        return response.json()
      }).then(data => {
        console.log(data)
        setUser(data)
      }).catch((err) => {
        console.log('reject', err)
      })
  }, [userId])

  return (

    <Typography variant='h2' gutterBottom key={userId}>{user?.name}</Typography>
  )

}

export default UserUsername

UserUsername.propTypes = {
  userId: PropTypes.string.isRequired
}


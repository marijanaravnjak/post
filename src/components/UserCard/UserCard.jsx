import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { MailTwoTone } from '@mui/icons-material'
import {Link} from 'react-router-dom'



export default function UserCard({ user }) {

    return (

        <Card sx={{ maxWidth: 345, color: 'black' }} >
            <CardHeader
                action={
                    <Typography
                        variant='h6'
                        component={Link}
                        color='black'
                        mr={13}
                        to={`/users/${user.id}`}
                    >{user.name}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant='body2'>
                    <Typography color='black' gutterBottom>Username {user.username}</Typography>
                </Typography>
                <MailTwoTone /> email:<br />
                {user.email}
            </CardContent>
        </Card>

    )
}

UserCard.propTypes = {
    user: PropTypes.any.isRequired
}

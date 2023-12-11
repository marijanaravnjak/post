import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

const Album = (album) => {

    const { userId } = useParams()
    const albumTitle = album.title
    const albumId = album.id

    return (
        <Box sx={{ display: 'grid', mb: 3 }}>
            <Typography>
                <LibraryBooksIcon fontSize='small' /> {albumId}* Album Title
            </Typography>
            <Typography
                component={Link}
                color='inherit'
                textdecorationline='none'
                to={`/users/${userId}/albums/${albumId}`
                }>
                <Typography variant='h5'
                    color='text.primary'>
                    {albumTitle}
                </Typography>
            </Typography>
        </Box>
    )

}

export default Album

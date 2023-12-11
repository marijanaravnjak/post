import React from 'react'
import { Box, Typography } from '@mui/material'
import {Link, useParams } from 'react-router-dom'

const Post = (post) => {
    const { userId } = useParams()
    const postId = post.id
    const postTitle = post.title

    return (
        <> <Box
            sx={{
                display: 'grid',
                gridColumn: 2,
            }}>
            <Typography
                gutterBottom>
                {postId}
            </Typography>
            <Typography
                color='ButtonText'
                variant='h6'
                component={Link}
                text-decoration='none'
                to={`/users/${userId}/posts/${postId}`}
                gutterBottom>
                {postTitle}
            </Typography>
        </Box> </>
    )

}

export default Post


import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import UserUsername from '../../UserUsername'


const PostPage = () => {

    const [post, setPost] = useState({})
    const { postId, userId } = useParams()

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => {
                console.log('resolved', response)
                return response.json()
            }).then(data => {
                console.log(data)
                setPost(data)
            }).catch((err) => {
                console.log('reject', err)
            })
    }, [postId])

    return (
        <><AppBar color='grey' position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup
                    variant='text'
                    color='inherit'
                    aria-label='medium secondary button group'
                    mr='10px'>
                    <Button
                        component={Link}
                        to='/users'
                        size='large'
                        color='inherit'>
                        Users
                    </Button>
                    <Button LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/albums`
                        }}>
                        Albums
                    </Button>
                    <Button LinkComponent={Link}
                        to={{ pathname: `/users/${userId}/todos` }}>
                        Todos
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 2,
                        p: 2
                    },
                }}>
                <Typography
                    variant='h4'
                    sx={{ borderBottom: 1, borderColor: '-moz-initial', textAlign: 'center' }}>
                    <UserUsername userId={userId} />
                </Typography>
                <ButtonGroup variant="text"
                    orientation="horizontal"
                    color='inherit'
                    role='groupedTextHorizontal'>
                    <Button
                        LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/posts`
                        }}>
                        Show All Posts
                    </Button>
                    <Button LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/posts/${postId}/comments`
                        }}>
                        Comments for This Post
                    </Button>
                </ButtonGroup>
                <Grid
                    sx={{
                        display: 'grid',
                        gridTemplateRows: 'repeat(2,auto)',
                        gridTemplateColumns: 'repeat(3, auto)',
                        padding: 4
                    }} >
                    <Grid>
                        <Typography align='center'>
                            {userId &&
                                <><Typography
                                    variant='h4'
                                    align='center'
                                    m={12}
                                    fontStyle='italic'>
                                    {post.title}
                                </Typography>
                                    <Typography
                                        variant='h6'>
                                        {post.body}
                                    </Typography>
                                </>}
                        </Typography>
                    </Grid>
                </Grid>
            </Box></>

    )
}

export default PostPage


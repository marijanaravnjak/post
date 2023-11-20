import React, { useEffect, useState } from 'react'
import { Alert, AppBar, Box, Button, ButtonGroup, Toolbar, Typography, Snackbar } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import DeleteBtn from '../../DeleteBtn/DeleteBtn'
import DisplayMessage from '../../DisplayMessage'
import apiServicePosts from '../../../services/apiServicePosts'
import HistoryIcon from '@mui/icons-material/History'; import Post from '../../PostsPages/Post/Post'
import UserUsername from '../../UserUsername'

export default function Posts() {

    const [posts, setPosts] = useState([])
    const { userId, postId } = useParams()
    const [displayError, setDisplayError] = useState('')
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(null)


    const getApiData = async () => {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        response = await response.json()
        console.log(response)
        setPosts(response)
    }

    useEffect(() => {
        getApiData()
    }, [userId])

    const deletedPost = async (id) => {
        setIsLoading(true)
        try {
            await apiServicePosts.deletePost(id)
            setPosts(posts => {
                return posts.filter(post => post.id !== id)
            })
            setDisplayMessage(`Post title ${id} is deleted successfully.`)
            setOpen(true)
        } catch (displayError) {
            setDisplayError(null)
        }
        setIsLoading(false)
    }

    const handleClose = (event, reason) => {
        setDisplayError(null)
        if (reason === ('clickaway', event)) {
            return
        }
        setOpen(false)
    }

    return (
        <><AppBar color='grey' position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup
                    color='inherit'
                    variant='text'
                    aria-label='text button group'>
                    <Button
                        component={Link} to='/users' size='large'
                        color='inherit'>
                        Users
                    </Button>
                    <Button
                        component={Link}
                        to={`/users/${userId}`}>
                        <HistoryIcon />
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
            <Typography
                variant='h5'
                letterSpacing={15}
                mt={5}
                ml={2}>
                Post Title
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridRow: 2,
                    justifySelf: 'stretch'
                }}>
                <UserUsername userId={userId} />
                {posts.map((post) => (
                    <><Post key={postId} {...post} />
                        <Box
                            sx={{
                                gridColumn: 4
                            }}>
                            <DeleteBtn handleDelete={() => deletedPost(post.id)} />
                            <Snackbar
                                open={open}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }}
                                autoHideDuration={3000}
                                onClose={handleClose}>
                                <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                                    <DisplayMessage displayMessage={displayMessage} />
                                </Alert>
                            </Snackbar>
                        </Box></>
                ))}
            </Box>
        </>
    )
}


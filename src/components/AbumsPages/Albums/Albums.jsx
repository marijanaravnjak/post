import React, { useEffect, useState } from 'react'
import { Alert, AppBar, BottomNavigationAction, Box, Button, ButtonGroup, IconButton, List, ListItemText, Snackbar, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import DeleteBtn from '../../DeleteBtn'
import DisplayMessage from '../../DisplayMessage'
import UserUsername from '../../UserUsername'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Album from '../Album/Album'
import apiServiceAlbums from '../../../services/apiServiceUsers'



export default function Albums() {

    const { userId, albumId } = useParams()
    const [albums, setAlbums] = useState([])
    const [open, setOpen] = useState(false)
    const [displayError, setDisplayError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(null)


    const getApiData = async () => {
        let response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        response = await response.json()
        console.log(response)
        setAlbums(response)
    }

    useEffect(() => {
        getApiData()
    }, [userId])

    const deletedAlbum = async (albumId) => {
        setIsLoading(true)
        try {
            await apiServiceAlbums.deleteAlbum(albumId)
            setAlbums(albums => {
                return albums.filter(album => album.id !== albumId)
            })
            setDisplayMessage(`Album title ${albumId} is deleted successfully`)
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
        <><AppBar color='inherit' position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup
                    variant='text'
                    color='inherit'>
                    <Button
                        component={Link}
                        to='/users' size='large'
                        color='inherit'>
                        Users
                    </Button>
                    <Button
                        LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/posts`
                        }}>
                        Posts
                    </Button>
                    <Button
                        LinkComponent={Link}
                        to={{ pathname: `/users/${userId}/todos` }}>
                        Todos
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
            <List>
                <Typography
                    variant='h6'
                    color='text.secondary'
                    noWrap>
                    Albums
                    <Typography>
                        <UserUsername userId={userId} />
                    </Typography>
                </Typography>
                <ListItemText>
                    <Box
                        sx={{
                            display: 'grid',
                            gridRow: 1,
                            justifySelf: 'stretch'
                        }}>
                        {albums.map((album) => (
                            <><Album key={albumId} {...album} />
                                <Box
                                    sx={{
                                        gridColumn: 2,
                                    }}>
                                    <IconButton aria-label='create'
                                        component={Link}
                                        to={{ pathname: `/users/${userId}/albums/${album.id}/${album.id}` }}>
                                        <BottomNavigationAction
                                            label='create'
                                            icon={<EditNoteIcon />} />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteBtn handleDelete={() => deletedAlbum(album.id)} />
                                    </IconButton>
                                </Box>
                            </>
                        ))}
                    </Box>
                </ListItemText>
            </List>
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
            </Snackbar></>


    )
}

import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import apiServiceAlbums from '../../../../services/apiServiceAlbums'
import { Alert, AppBar, Button, ButtonGroup, Container, Snackbar, Stack, TextField, Toolbar } from '@mui/material'
import DisplayMessage from '../../../DisplayMessage'
import UserUsername from '../../../UserUsername'

function UpdateAlbum() {

    const { userId, albumId } = useParams()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState([])
    const [displayError, setDisplayError] = useState(null)
    const [newTitle, setNewTitle] = useState('')
    const [albums, setAlbums] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(null)

    const createTitle = () => {
        const title = newTitle.trim()
        setIsLoading(true)
        try {
            apiServiceAlbums.createAlbum({ title })
            setAlbums([...albums, { id: lastId + 1, title }])
            setNewTitle(newTitle)
        } catch (displayError) {
            setDisplayError(null)
        } setDisplayMessage('Album title is created successfully.')
        setOpen(true)
    }

    const lastId = albums.reduce((previousValue, currentValue) => {
        if (previousValue < currentValue.id) {
            return currentValue.id
        }
        return previousValue
    }, 0)

    const updatedAlbum = () => {
        setIsLoading(true)
        apiServiceAlbums.updateAlbum(albumId, { title })
        setDisplayMessage(`Album title ${albumId} is updated successfully.`)
        setOpen(true)
        setIsLoading(false)
    }

    const handleClearCreate = () => {
        setNewTitle('')
    }

    const handleClearUpdate = () => {
        setTitle('')
    }

    const onChangeHandler = (id, key, event) => {
        setTitle({ ...title, [key]: event.target.value })
    }

    const handleClose = (event, reason) => {
        setDisplayError(null)
        if (reason === ('clickaway', event)) {
            return
        }
        setOpen(false)
    }

    return (
        <><AppBar
            sx={{
                color: 'inherit',
                backgroundColor: 'white',
                position: 'static'
            }} >
            <Toolbar variant='prominent'>
                <Button
                    color='inherit'
                    LinkComponent={Link}
                    to={{
                        pathname: `/users/${userId}/albums`
                    }}>
                    Back to Albums
                </Button>
            </Toolbar>
        </AppBar>
            <Container sx={{
                flexGrow: 1,
                overflow: 'hidden',
                pt: 20,
            }}>
                <UserUsername userId={userId} />
                <Stack
                    component='form'
                    direction={{ xs: 'column' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    alignItems='center'>
                    <><TextField
                        id='update-title'
                        multiline
                        label={albumId}
                        placeholder='update title'
                        value={title}
                        onChange={event => {
                            onChangeHandler(albumId, 'title', event)
                            setTitle(event.target.value)
                        }} />
                        <ButtonGroup variant='text' color='inherit'>
                            <Button onClick={() => updatedAlbum({ albumId, title })}>Update</Button>
                            <Button onClick={handleClearUpdate}>Clear Text Field</Button>
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
                        </ButtonGroup></>
                    <TextField
                        id='create-title'
                        multiline
                        placeholder='create title'
                        value={newTitle}
                        onChange={event => {
                            setNewTitle(event.target.value)
                        }} />
                    <ButtonGroup
                        variant='text'
                        color='inherit'>
                        <Button onClick={() => createTitle(title)}>Create Title</Button>
                        <Button onClick={handleClearCreate}>Clear Text Field</Button>
                    </ButtonGroup>
                </Stack>
            </Container></>
    )
}

export default UpdateAlbum
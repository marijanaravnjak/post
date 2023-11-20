import React, { useState, useEffect } from 'react'
import { Alert, AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography, Snackbar, Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import UserCard from '../../components/UserCard/UserCard'
import DeleteBtn from '../DeleteBtn/DeleteBtn'
import DisplayMessage from '../DisplayMessage'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { removeUser } from '../../features/users/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../features/users/usersSlice'
import statusCode from '../../utils/statusCode'

export default function Users() {

    const dispatch = useDispatch()
    const { users, status } = useSelector((state) => state.users)

    const [open, setOpen] = useState(false)
    const [displayError, setDisplayError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(null)


    useEffect(() => {
        dispatch(getUsers())
    },
        [])

    if (status === statusCode.LOADING) {
        return <Skeleton variant='text'>Loading...</Skeleton>
    }

    if (status === statusCode.ERROR) {
        return <Alert variant='error'>Something went wrong! Try again...</Alert>
    }

    const deletedUser = (user) => {
        dispatch(removeUser(user.id))
        setDisplayMessage(`User ${user.name} is deleted successfully`)
        setOpen(true)
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
                flexDirection: 'column',
                color: 'inherit',
                backgroundColor: 'white',
                position: 'static'
            }}>
            <Toolbar variant='prominent'>
                <Grid container spacing={2}>
                    <Button
                        component={Link}
                        to='/'
                        color='inherit'
                        size='small'>
                        <Typography variant='body2' noWrap>Back to Home</Typography>
                    </Button>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant='h4' align={'right'}>List of Users</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        component={Link}
                        to='/add-user'
                        color='inherit'>
                        <Typography variant='body2' noWrap>
                            Add User
                            <PersonAddIcon />
                        </Typography>
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
            <Container>
                <Grid container spacing={3}>
                    {users.map((user) =>
                        <Grid item key={user.id} xs={12} md={6} lg={4} mt={2}>
                            <Box position='absolute' ml={33}>
                                <DeleteBtn handleDelete={() => deletedUser(user)} />
                                <Snackbar
                                    open={open}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center'
                                    }}
                                    autoHideDuration={3000}
                                    onClose={handleClose}>
                                    <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose} >
                                        <DisplayMessage displayMessage={displayMessage} isLoading={isLoading} />
                                    </Alert>
                                </Snackbar>
                            </Box>
                            <UserCard user={user} />
                        </Grid>
                    )}
                </Grid>
            </Container></>

    )
}


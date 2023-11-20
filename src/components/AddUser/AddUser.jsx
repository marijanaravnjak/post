import React, { useState } from 'react'
import { AppBar, Box, ButtonGroup, Button, TextField, Toolbar, Stack } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import apiServiceUsers from '../../services/apiServiceUsers'
import validator from 'validator';

const AddUser = () => {

    const { userId } = useParams()
    const [user, setUser] = useState([])
    const [users, setUsers] = useState([])
    const [displayError, setDisplayError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const addNewUser = () => {

        const name = newName.trim()
        const username = newUsername.trim()
        const email = newEmail.trim()
        setIsLoading(true)
        try {
            apiServiceUsers.createUser(userId, { name, username, email })
            setUsers([...users, { id: lastId + 1, name, username, email }])
            setNewName(newName)
            setNewUsername(newUsername)
            setNewEmail(newEmail)
        } catch (displayError) {
            setDisplayError(null)
        }

        if (newName === '') {
            toast.error('Name is required')
        }
        if (newUsername === '') {
            toast.error('Userame is required')
        } else
            if (newUsername.length < 4) {
                toast.error('Userame is too short')
            }
        if (newEmail === '') {
            toast.error('Email is required')
        }
        if (!validator.isEmail(newEmail)) {
            toast.error('Enter valid Email:user@gmail.com')
        }

        if (newName && newUsername.length > 4 && validator.isEmail(newEmail)) {
            toast.success('User added successfully')
        }
        setIsLoading(false)
    }

    const lastId = users.reduce((previousValue, currentValue) => {
        if (previousValue < currentValue.id) {
            return currentValue.id
        }
        return previousValue
    }, 0)

    const handleClear = () => {
        setNewName('')
        setNewUsername('')
        setNewEmail('')
    }

    const onChangeHandler = (id, key, event) => {
        setUser({ ...user, [key]: event.target.value })
    }
    
    return (
        <><AppBar
            color='grey'
            position='static'>
            <Toolbar variant='prominent'>
                <Button
                    component={Link}
                    to='/users'
                    color='inherit'>
                    Back to Users
                </Button>
            </Toolbar>
        </AppBar>
            <Box sx={{ flexGrow: 1, px: 3, p: 5 }}>
                <Stack
                    key={userId}
                    component='form'
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    spacing={5}>
                    <TextField
                        placeholder='Add name here...'
                        value={newName}
                        onChange={e => setNewName(e.target.value)} />
                    <Toaster />
                    <TextField
                        placeholder='Add username here...'
                        value={newUsername}
                        onChange={e => setNewUsername(e.target.value)} />
                    <Toaster />
                    <TextField
                        placeholder='Add email here...'
                        value={newEmail}
                        onChange={e => setNewEmail(e.target.value)} />
                    <Toaster />
                    <ButtonGroup
                        color='inherit'
                        variant='text'
                        size='small'>
                        <Button onClick={addNewUser}
                            onChange={onChangeHandler}>ADD USER</Button>
                        <Button onClick={handleClear}>Clear Text Field</Button>
                    </ButtonGroup>
                </Stack>
            </Box ></>
    )
}
export default AddUser


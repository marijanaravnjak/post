import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, AppBar, Accordion, AccordionSummary, AccordionDetails, Box, Button, ButtonGroup, Grid, Snackbar, TextField, Toolbar, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import UserUsername from '../../UserUsername'
import DeleteBtn from '../../DeleteBtn/DeleteBtn'
import DisplayMessage from '../../DisplayMessage'
import apiServiceTodos from '../../../services/apiServiceTodos'

import Todo from '../Todo/Todo'



export default function Todos() {

    const [todos, setTodos] = useState([])
    const { userId, todoId } = useParams()
    const [open, setOpen] = useState(false)
    const [newTodoTitle, setNewTodoTitle] = useState('')
    const [title, setTitle] = useState()
    const [displayError, setDisplayError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(null)
    

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${userId}`)
            .then((response) => {
                console.log('resolved', response)
                return response.json()
            }).then(data => {
                console.log(data)
                setTodos(data)
            }).catch((err) => {
                console.log('reject', err)
            })
    }, [userId])

    const createTodoTitle = async (id) => {
        const title = newTodoTitle.trim()
        setIsLoading(true)
        try {
            await apiServiceTodos.createTodo({ title })
            setTodos([...todos, { id: lastId + 1, title }])
            setNewTodoTitle(newTodoTitle)
            setDisplayMessage('Todo title is created successfully.')
            setOpen(true)
        } catch (displayError) {
            setDisplayError(null)
        }
        setIsLoading(false)
    }

    const handleClearCreate = () => {
        setNewTodoTitle('')
    }

    const lastId = todos.reduce((previousValue, currentValue) => {
        if (previousValue < currentValue.id) {
            return currentValue.id
        }
        return previousValue
    }, 0)

    const deletedTodo = async (todoId) => {
        setIsLoading(true)
        try {
            await apiServiceTodos.deleteTodo(todoId)
            setTodos(todos => {
                return todos.filter(todo => todo.id !== todoId)
            })
            setDisplayMessage(`Todo title ${todoId} is deleted successfully.`)
            setOpen(true)
        } catch (displayError) {
            setDisplayError(null)
        }
        setIsLoading(false)
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
        <><AppBar color='grey' position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup
                    variant='text'
                    color='inherit'>
                    <Button
                        LinkComponent={Link}
                        to='/users'
                        size='large'
                        color='inherit'>
                        Users
                    </Button>
                    <Button
                        LinkComponent={Link}
                        to={{ pathname: `/users/${userId}/posts` }}>
                        Posts
                    </Button>
                    <Button
                        LinkComponent={Link}
                        to={{ pathname: `/users/${userId}/albums` }}>
                        Albums
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
            <Box sx={{ flexGrow: 1, mt: '1vh' }}>
                <Grid container spacing={2}>
                    {userId &&
                        <><Accordion
                            sx={{
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                borderRadius: 5,
                                p: 2,
                                opacity: 0.7,
                                mt: 3
                            }}>
                            <AccordionSummary
                                aria-controls="panel-content"
                                id="panel-header"
                            >
                                <Typography>
                                    <UserUsername userId={userId} />
                                </Typography>
                                <Typography
                                    variant='h6'
                                    color='#bdbdbd'>
                                    Todos
                                    <ExpandMoreIcon />
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField
                                    multiline
                                    placeholder='Create todo title'
                                    value={newTodoTitle}
                                    onChange={event => {
                                        onChangeHandler(todoId, 'title', event)
                                        setNewTodoTitle(event.target.value)
                                    }} />
                                <ButtonGroup
                                    variant='text'
                                    color='inherit'
                                    size='small'>
                                    <Button onClick={() => createTodoTitle(title)}>Create Title</Button>
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
                                    <Button onClick={handleClearCreate}>Clear Text Field</Button>
                                </ButtonGroup>
                                {todos.map((todo) =>
                                (<><Todo key={todoId} {...todo} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid
                                            container
                                            spacing={{ xs: 2, md: 3 }}
                                            columns={{ xs: 4, sm: 8, md: 12 }}>
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
                                            <DeleteBtn handleDelete={() => deletedTodo(todo.id)} />
                                        </Grid>
                                    </Box></>
                                ))}
                            </AccordionDetails >
                        </Accordion></>}
                </Grid>
            </Box></>
    )
}

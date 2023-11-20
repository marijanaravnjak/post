import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppBar, Accordion, AccordionSummary, AccordionDetails, Box, Button, ButtonGroup, Grid, Toolbar, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import UserUsername from '../../UserUsername'


export default function TodoPage() {

    const { userId, todoId } = useParams()
    const [todo, setTodo] = useState([])

    const getApiData = async () => {
        let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        response = await response.json()
        console.log(response)
        setTodo(response)
    }

    useEffect(() => {
        getApiData()
    }, [todoId])


    return (
        <><AppBar color='grey' position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup
                    variant='text'
                    color='inherit'
                    mr='10px'>
                    <Button
                        component={Link}
                        to='/users'
                        size='large'
                        color='inherit'>
                        Users
                    </Button>
                    <Button LinkComponent={Link}
                        to={{ pathname: `/users/${userId}/posts` }}>
                        Posts
                    </Button>
                    <Button LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/albums`
                        }}>
                        Albums
                    </Button>
                    <Button LinkComponent={Link}
                        variant='text'
                        color='inherit'
                        to={{
                            pathname: `/users/${userId}/todos`
                        }}>
                        Back to Todos
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
                <Grid item xs={6}>
                    {userId &&
                        <><Accordion
                            sx={{
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                borderRadius: 2,
                                p: 2,
                                opacity: 0.7,
                                mt: 3
                            }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel-content'
                                id='panel-header'>
                                <Typography>
                                    <UserUsername userId={userId} />
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography
                                    variant='paragraph'
                                    color='inherit' ml={50}
                                    gutterBottom>
                                    Todo Title
                                </Typography>
                                <Typography variant='h6' align='center'>
                                    {todo.title}
                                </Typography>
                            </AccordionDetails>
                        </Accordion></>}
                </Grid>
            </Grid>
        </>
    )
}


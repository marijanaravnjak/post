import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'



const Todo = (todo) => {

    const todoId = todo.id
    const todoTitle = todo.title
    const { userId } = useParams()

    return (
        <Box sx={{ height: '2.8vh', maxWidth: '100vh' }} >
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Button
                        LinkComponent={Link}
                        color='inherit'
                        to={{
                            pathname: `/users/${userId}/todos/${todoId}`
                        }}>
                        <Typography
                            variant='body2'
                            color='#bdbdbd'
                            noWrap>
                            {todoId}*Todo Title*
                        </Typography>
                        <Typography
                            variant='body1'
                            color='text.primary'
                            fontStyle='oblique'
                            noWrap>
                            {todoTitle}
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

}

export default Todo

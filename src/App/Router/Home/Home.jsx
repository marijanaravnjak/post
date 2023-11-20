import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const Home = () => {

    return (
        <Box>
            <AppBar position='static' color='grey'>
                <Toolbar variant='prominent'>
                    <Button
                        component={Link}
                        to='/users'
                        size='large'
                        color='inherit'>
                        Users
                    </Button>
                </Toolbar>
            </AppBar>
            <Typography
                variant='h1'
                align='center'
                letterSpacing={7}
                color='grey'
                mr={-23}>
                Welcome<br />
                to
            </Typography>
        </Box>
    )

}

export default memo(Home)

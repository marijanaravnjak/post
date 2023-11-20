import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, ButtonGroup, Grid, Skeleton, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import UserUsername from '../../UserUsername'

import Photo from '../Photo/Photo'

export default function Photos() {

    const [photos, setPhotos] = useState([])
    const { userId, albumId } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const getApiData = async () => {
        let response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        response = await response.json()
        console.log(response)
        setPhotos(response)
    }

    useEffect(() => {
        getApiData()
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [albumId])

    return (
        <><AppBar
            color='grey'
            position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup
                    variant='text'
                    size='large'
                    color='inherit'>
                    <Button
                        component={Link}
                        to='/users'>Users</Button>
                    <Button
                        LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/albums`
                        }}>
                        Back to Albums
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
            <Typography
                variant='h5'
                color='grey'
                letterSpacing={15}
                m={5}
                ml={2}
                noWrap
                sx={{ borderBottom: 1, borderColor: 'divider', mt: '15px' }}>
                <Typography textAlign='center' variant='h4'>
                    <UserUsername userId={userId} />
                    photos
                </Typography>
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container
                    columnSpacing={1}
                    rowSpacing={4}
                    columns={{ xs: 4, md: 12, }}>
                    {photos.slice(0, 12).map((photo) => (
                        <Grid item xs={1} sm={2} md={3} key={photo.id}>
                            {isLoading ?
                                (<Skeleton
                                    variant='rectangular'
                                    animation='wave'
                                    sx={{
                                        width: 200,
                                        height: 200
                                    }} />)
                                :
                                (<Photo key={photo.id}  {...photo} />)}
                        </Grid>
                    ))}
                </Grid>
            </Box> </>
    )

}


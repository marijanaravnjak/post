import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserUsername from '../../UserUsername'
import { AppBar, Box, ButtonGroup, Button, ImageList, ImageListItem, ImageListItemBar, Skeleton, Toolbar, Typography } from '@mui/material'

export default function PhotoPage() {

    const [photo, setPhoto] = useState([])
    const { userId, albumId, photoId } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const getApiData = async () => {
        let response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
        response = await response.json()
        console.log(response)
        setPhoto(response)
    }

    useEffect(() => {
        getApiData()
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [photoId])

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
                            pathname: `/users/${userId}/albums/${albumId}/photos`
                        }}>
                        Back to Photos
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
                <Typography textAlign='center' variant='h5'>
                    <UserUsername userId={userId} />
                    photo details
                </Typography>
            </Typography>
            <Box sx={{
                height: '100vh',
                opacity: 0.7,
                '&:hover': {
                    opacity: 1
                },
            }}
                ml={75}>
                {isLoading ?
                    (<Skeleton
                        variant='rectangular'
                        sx={{
                            width: 600,
                            height: 600
                        }}
                        animation='wave' />)
                    :
                    (<ImageList>
                        <ImageListItem key={photoId}>
                            <img
                                src={`${photo.url}`}
                                alt={photo.title}
                                loading='lazy' />
                            <ImageListItemBar
                                title={photo.title} />
                        </ImageListItem>
                    </ImageList>)}
            </Box>
        </>
    )
}

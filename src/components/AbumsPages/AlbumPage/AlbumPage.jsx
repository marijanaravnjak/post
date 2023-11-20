import React, { useEffect, useState } from 'react'
import { AppBar, Button, ButtonGroup, Toolbar, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import UserUsername from '../../UserUsername'

export default function AlbumPage() {

    const { userId, albumId } = useParams()
    const [album, setAlbum] = useState([])

    const getApiData = async () => {
        let response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
        response = await response.json()
        console.log(response)
        setAlbum(response)
    }

    useEffect(() => {
        getApiData()
    }, [albumId])

    return (
        <><AppBar color='grey' position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup
                    variant='text'
                    color='inherit'
                    mr='10px'>
                    <Button
                        component={Link}
                        to='/users' size='large'
                        color='inherit'>
                        Users
                    </Button>
                    <Button LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/posts`
                        }}>
                        Posts
                    </Button>
                    <Button LinkComponent={Link}
                        to={{ pathname: `/users/${userId}/todos` }}>
                        Todos
                    </Button>
                    <Button LinkComponent={Link}
                        to={{ pathname: `/users/${userId}/albums/${albumId}/photos` }}
                        variant='text' color='inherit'>
                        Photos
                    </Button>
                    <Button LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/albums`
                        }}
                        variant='text'
                        color='inherit'>
                        Back to Albums
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
            <Typography align='center' gutterBottom>
                <UserUsername userId={userId} />
            </Typography>
            <Typography
                sx={{ fontSize: 20, }}
                mt={5}
                align='center'
                fontStyle='oblique'
                color='text.secondary'
                gutterBottom>
                Album Title
                <Typography
                    variant='h5'
                    fontStyle='initial'
                    gutterBottom>
                    {album.title}
                </Typography>
            </Typography></>


    )
}

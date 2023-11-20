import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppBar, Button, ButtonGroup, Container, Stack, Tab, Tabs, TextField, Toolbar, Typography } from '@mui/material'
import UserUsername from '../UserUsername'
import { Phone } from '@mui/icons-material'
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp'
import TabPanel from '../../components/TabPanel/TabPanel'
import allyProps from '../../components/TabPanel/allyProps'
import toast, { Toaster } from 'react-hot-toast'
import LocationCityIcon from '@mui/icons-material/LocationCity'


export default function Detail() {

    const { userId } = useParams()
    const [user, setUser] = useState({})
    const [value, setValue] = useState(0)


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => {
                console.log('resolved', response)
                return response.json()
            }).then(data => {
                console.log(data)
                setUser(data)
            }).catch((err) => {
                console.log('reject', err)
            })
    }, [userId])

    const handleChange = (event, newValue) => {
        event.preventDefault()
        setValue(newValue)
    }

    const updateUser = () => {
        let { website, phone, address: { city } } = user
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ website, phone, address: { city } }),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(() => {
            })
        toast.success('User updated successfully.')

    }

    const onChangeHandler = (id, key, event) => {
        setUser({ ...user, [key]: event.target.value })
    }

    const handleAddressChange = (id, address, event) => {
        setUser({
            ...user,
            address: {
                ...user.address,
                city: event.target.value
            }
        })
    }


    return (
        <><AppBar color='grey' position='static'>
            <Toolbar variant='prominent'>
                <ButtonGroup color='inherit' variant='text' aria-label='text button group'>
                    <Button
                        component={Link}
                        to='/users' size='large'
                        color='inherit'>
                        Back to Users
                    </Button>
                    <Button
                        LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/posts`
                        }}>
                        Posts
                    </Button>
                    <Button LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/albums`
                        }}>
                        Albums
                    </Button>
                    <Button LinkComponent={Link}
                        to={{
                            pathname: `/users/${userId}/todos`
                        }}>
                        Todos
                    </Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar><>
                <Container sx={{ maxWidth: 'xl', maxHeight: '100%', typography: 'body2', display: 'flex', alignItems: 'flex-end' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 2, sm: 2, md: 3 }} mt={40}>
                        <Typography variant='h3'>
                            <UserUsername userId={userId} />
                        </Typography>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor='inherit'
                            indicatorColor='primary'
                            centered>
                            <Tab icon={<LocationCityIcon />} label='City' {...allyProps(0)} />
                            <Tab icon={<LanguageSharpIcon />} label='Website' {...allyProps(1)} />
                            <Tab icon={<Phone />} label='phone' {...allyProps(2)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <TextField
                                textAlign={'center'}
                                placeholder='Update city'
                                value={user.address?.city}
                                onChange={event => handleAddressChange(userId, 'address.city', event)} />
                            <Button color='inherit' onClick={() => updateUser(userId)}>Update</Button>
                            <Toaster />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TextField
                                textAlign={'center'}
                                multiline
                                placeholder='Update website'
                                value={user.website}
                                onChange={event => onChangeHandler(userId, 'website', event)} />
                            <Button color='inherit' onClick={() => updateUser(userId)}>Update</Button>
                            <Toaster />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <TextField
                                multiline
                                placeholder='Update phone'
                                value={user.phone}
                                onChange={event => onChangeHandler(userId, 'phone', event)} />
                            <Button color='inherit' onClick={() => updateUser(userId)}>Update</Button>
                            <Toaster />
                        </TabPanel>
                    </Stack>
                </Container>
            </></>

    )
}


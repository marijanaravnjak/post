import React, { useEffect, useState } from 'react'
import Router from './Router'
import { Box } from '@mui/material'


function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([

        ]).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Box sx={{
        //     backgroundImage: `url(${process.env.PUBLIC_URL + '/post.png'})`,
        //     height: '100vh',
        //     backgroundPosition: 'center',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'cover',
        }}>
        
            <Router isLoading={loading} />
        </Box >
    )
}

export default App

import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Users from '../../components/Users'
import PropTypes from 'prop-types'
import Posts from '../../components/PostsPages/Posts'
import PostPage from '../../components/PostsPages/PostPage'
import Albums from '../../components/AbumsPages/Albums'
import AlbumPage from '../../components/AbumsPages/AlbumPage/AlbumPage'
import TodoPage from '../../components/TodosPages/TodoPage/TodoPage'
import Detail from '../../components/Detail/Detail'
import Todos from '../../components/TodosPages/Todos/Todos'

import Comments from '../../components/PostsPages/Comments/Comments'

import Photos from '../../components/AbumsPages/Photos'

import PhotoPage from '../../components/AbumsPages/PhotoPage/PhotoPage'

import AddUser from '../../components/AddUser/AddUser'

import UpdateAlbum from '../../components/AbumsPages/Albums/UpdateAlbum'
import { Typography } from '@mui/material'


const Home = React.lazy(() => import('./Home'))

const Router = ({ isLoading }) => {

    if (isLoading) {
        return (
            <Typography variant='body2'>Loading</Typography>
        )
    }
    
    return (
        <div>
            <Suspense fallback='Loading...'>
                <Routes>
                    <Route key='home' path='/' element={<Home />} />
                    <Route key='users' path='/users' element={<Users />} />
                    <Route key='detail' path={'/users/:userId'} element={<Detail />} />
                    <Route key='posts' path={'/users/:userId/posts'} element={<Posts />} />
                    <Route key='post-page' path={'/users/:userId/posts/:postId'} element={<PostPage />} />
                    <Route key='albums' path={'/users/:userId/albums'} element={<Albums />} />
                    <Route key='album-page' path={'/users/:userId/albums/:albumId'} element={<AlbumPage />} />
                    <Route key='todos' path={'/users/:userId/todos/'} element={<Todos />} />
                    <Route key='todo-page' path={'/users/:userId/todos/:todoId'} element={<TodoPage />} />
                    <Route key='comments' path={'/users/:userId/posts/:postId/comments'} element={<Comments />} />
                    <Route key='photos' path={'/users/:userId/albums/:albumId/photos'} element={<Photos />} />
                    <Route key='photo-page' path={'/users/:userId/albums/:albumId/photos/:photoId'} element={<PhotoPage />} />
                    <Route key='add-user' path='/add-user' element={<AddUser />} />
                    <Route key='update-album' path={'/users/:userId/albums/:albumId/:albumId'} element={<UpdateAlbum />} />
                </Routes>
            </Suspense>

        </div>
    )
}

Router.propTypes = {
    isLoading: PropTypes.bool
}

Router.defaultProps = {
    isLoading: false
}

export default Router

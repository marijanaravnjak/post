import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid, IconButton, ImageList, ImageListItemBar, ImageListItem } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const Photo = (photo) => {

    const { userId, albumId } = useParams()
    const photoId = photo.id

    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={1} sm={2} md={3} ml={15}>
                <ImageList sx={{ width: 400, height: 200 }}>
                    <ImageListItem key={photoId}   >
                        <img
                            src={`${photo.thumbnailUrl}`}
                            alt={photo.title}
                        />
                        <ImageListItemBar
                            title={photo.title}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${photo.title}`}
                                    href={`/users/${userId}/albums/${albumId}/photos/${photoId}`}>
                                    <InfoIcon />
                                </IconButton>
                            } />
                    </ImageListItem>
                </ImageList>
            </Grid>
        </Grid>
    )

}

export default Photo

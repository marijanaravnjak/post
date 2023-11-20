import React from 'react'
import {Skeleton, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const DisplayMessage = ({ displayMessage, isLoading }) => {

  return (
    <>{isLoading &&
      (<Skeleton variant='text'>Loading...</Skeleton>)}
    <Typography>
      {displayMessage}
    </Typography></>

  )
}
DisplayMessage.propTypes = {
  displayMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
}

DisplayMessage.defaultProps = {
  isLoading: false
}

export default DisplayMessage


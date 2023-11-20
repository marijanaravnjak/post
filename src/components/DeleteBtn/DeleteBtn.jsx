import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteBtn = ({ handleDelete })=> {

  return (

    <IconButton onClick={handleDelete}>
      <DeleteIcon/>
    </IconButton>

  )
}

DeleteBtn.propTypes = {
  handleDelete: PropTypes.func.isRequired
}

export default DeleteBtn

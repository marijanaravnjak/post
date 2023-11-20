import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'



export default function TabPanel(props) {
    
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}


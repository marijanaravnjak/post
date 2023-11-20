import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const Comment = (comment) => {

    return (

        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel-content'
                id='panel-header'>
                <Typography
                    variant='body2'
                    color='GrayText'
                    sx={{ width: '33%', flexShrink: 0 }}
                    gutterBottom>email:
                    {comment.email}
                </Typography>
                <Grid>
                    <Typography
                        variant='h6'
                        color='ThreeDDarkShadow'
                        gutterBottom>
                        {comment.name}
                    </Typography>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid mb={5}>
                    <Typography
                        variant='body1'
                        color='MenuText'
                        gutterBottom>
                        {comment.body}
                    </Typography>
                </Grid>
            </AccordionDetails>
        </Accordion>

    )

}

export default Comment

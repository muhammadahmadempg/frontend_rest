import { Box, Button, Typography } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';

function ResturantListCard({data}) {
    return (

        <Box display='flex' flexDirection='row' justifyContent='space-between' m={2} p={2}>
            <img alt={data.name} src={`http://localhost:1337${data.images[0].url}`} width='400' height='200'/>
            <Box width='300' display='flex' flexDirection='column' alignItems='space-between' ml={3}>
                <Typography align='left' variant='h5'>
                    {data.name}
                </Typography>

                <Typography align='left' variant='caption'>
                    {data.description}
                </Typography>
                <Box display='flex' flexDirection='row' alignItems='flex-end' justifyContent='flex-end'>
                <Button component={Link} variant='contained' to={`/detail/${data.id}`} color='primary'> Show</Button>
                    </Box>
            </Box>

        </Box>
 
    )
}

export default ResturantListCard;

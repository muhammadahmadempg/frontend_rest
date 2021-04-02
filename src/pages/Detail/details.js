import { Box, Typography} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';
import CallIcon from '@material-ui/icons/Call';
import React from 'react';



export default function BasicTable({data}) {


  return (
    <Box display='flex' ml={5} flexDirection='column' >
        <Box p={2}>
            <Typography variant='h4'>{data.name}</Typography>
        </Box>
        <Box pl={2}  display='flex' flexDirection='row'>
        <LocationOnSharpIcon color='primary'/> <Typography variant='body1'>{data.city}</Typography>
        </Box>
        <Box display='flex' flexDirection='row' p={2}>
           <CallIcon  color='primary'/> <Typography variant='body1'>{"  "+data.contact}</Typography>
        </Box>
        <Box pl={2}>
            <Typography variant='caption'>{data.description}</Typography>
        </Box>

        <Box pl={2}>
            <Typography variant='caption'>Closed on {data.offDays}</Typography>
        </Box>
        <Box p={2}>
            <Rating readOnly value={data.rating}/>
        </Box>
    </Box>
  );
}

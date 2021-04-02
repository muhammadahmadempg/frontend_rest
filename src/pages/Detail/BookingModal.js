import { TextField, Box, Drawer, Typography, Button } from '@material-ui/core'
import React from 'react'

function BookingModal({close, modal,booked_by, selectedTable,onChange, bookTable}) {
    return (
        <Drawer open={modal} onClose={close} anchor='right' >
            <Box display='flex' alignItems='space-evenly' justifyContent='center' flexDirection='column' m={3}>
            <Typography variant='h5' align='center'>Table No. {selectedTable.tableNo}</Typography>        
            <TextField value={booked_by} style={{marginTop: 10,width:600, marginBottom: 49}} onChange={onChange} type="text" label="Name" variant='outlined' required/>         
            <Button onClick={bookTable} variant='contained' color='primary' size='large' style={{marginTop: 30, width:600}}>Confirm Booking</Button>
        </Box>
        </Drawer>

    )
}

export default BookingModal;
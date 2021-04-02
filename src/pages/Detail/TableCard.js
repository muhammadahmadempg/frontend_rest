import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap:"wrap",
    height: 400,
    padding: '40 0'
  },
  details: {
   
  },
  cover: {
    width: 250,
    height: 250
  },
}));

export default function TableCard({table,openModal}) {
  const classes = useStyles();
    
  return (
    <Card  className={classes.root}>
    <CardMedia
        className={classes.cover}
        image={process.env.PUBLIC_URL+'/round-table.svg'}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Table No. {table.tableNo}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Sitting Capacity: {table.capacity} <img width={20} alt={'chair'}  height={20} src={process.env.PUBLIC_URL +"/dining.svg"}/>
          </Typography>
        </CardContent>

        <Box mt={2} display="flex" justifyContent='center' >

        <Button variant='contained' onClick={()=>openModal(table)} style={{marginTop: 10, display: 'block'}} color='primary'>Book</Button>


      </Box>
      </div>



    </Card>
  );
}
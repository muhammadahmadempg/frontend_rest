import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({data :{ name, id, description, images }}) {
  const classes = useStyles();
  const {push} = useHistory()
  
  const onClick=()=>{
    push(`/detail/${id}`)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick} >
        <CardMedia
          className={classes.media}
          image={`http://localhost:1337${images[0].url}`}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
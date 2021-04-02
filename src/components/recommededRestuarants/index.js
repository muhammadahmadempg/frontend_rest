import React from 'react';
import Box from '@material-ui/core/Box';
import Carousel from 'react-multi-carousel';
import MediaCard from '../restuarantCard';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({

    root: {
        marginBottom: 20
    },
    title:{
        marginTop: 20
    },
    container: {
        marginRight: 20, marginLeft: 20, marginTop: 40
    }
}))

export default function RecommededRestuarants({title,data}){
    const classes = useStyles();
    console.log({localStorage:data})
    if(!data.length>0){
        return null;
    }
    else
    return (<Box className = {classes.root} color="primary">
                <Typography className={classes.title} align='center' variant='h4'>
            {title}
        </Typography>
<div  className={classes.container}  >


        <Carousel   responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  additionalTransfrom={0}
  arrows
  autoPlaySpeed={3000}
  centerMode={false}
 
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  
  keyBoardControl
  minimumTouchDrag={80}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}

  
  >
          {
              data.map(rest=>{

                return <div key ={rest.id}><MediaCard data={rest}/></div>
              })

          }  
            
        </Carousel>
        </div>
    </Box>)
}
import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button} from '@material-ui/core';
import axios from '../../config/axios'
import "react-multi-carousel/lib/styles.css";
import RecommededRestuarants from '../../components/recommededRestuarants';
import { useHistory } from 'react-router';
//import {Typography} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    searchContainer: {
        minHeight: '850px',
        background: 'url(https://images.unsplash.com/photo-1582920980795-2f97b0834c58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchInputContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    carosal: {
        display: 'flex',
        justifyContent: 'center'
    }
}))


function Home(props){
    const classes = useStyles();
    const [popular, setPopular] = useState([]);
    const [list, setList] = useState([]);
    const [value, setValue] = useState({name: ""})
    const {push} = useHistory()
    useEffect(()=>{
      const getData= async ()=>{
        let res = await  axios.get("/popular-restuarants")
          setPopular(res.data)
           console.log(res)
      
          res = await axios.get("/restaurants");
          setList(res.data);
      }

      getData();

    },[])

    const onSearchClick=()=>{
      if(value.id){
        push(`/detail/${value.id}`);
      }
      else {
        push(`/list`);
      }
    }
    return (
    
    <div>
        <div className={classes.searchContainer}> 
          <div className={classes.searchInputContainer}>
              <Autocomplete
                  options={list}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 800 }}
                  onChange={(a,b)=>{setValue(b)}}
                  renderInput={(params) => <TextField placeholder="Search Resturant" style={{ background: 'white'}} {...params} variant="outlined" />}
              />
              
              <Button color='primary' onClick={onSearchClick} size='large' variant='contained'>Search</Button>
          
          </div>
        </div>

        <RecommededRestuarants data={popular} title="Popular Restuarants"/>
        { localStorage.getItem('recent')?
          <RecommededRestuarants data={JSON.parse(localStorage.getItem('recent'))} title="Recently Visited Restuarants"/>
          :null
        } 

    </div>
    )
}



export default Home;

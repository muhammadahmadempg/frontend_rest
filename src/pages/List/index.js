import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import {makeStyles} from '@material-ui/core/styles'
import Search from 'material-ui-search-bar'
import axios from '../../config/axios';
import ResturantListCard from './resturantListCard';
const useStyles = makeStyles((props) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    searchBar:{
        flex: 1,
        marginTop: 30,
        width: '75%',
        boxSizing: 'block',
        margin: 'auto'
    }
}))
function List (props){

    const classes = useStyles();
    const [list, setList] = useState([])
    const [search, setSearch] = useState('')
    const getList = async ()=>{
        const res = await axios.get('/restaurants')
        setList(res.data);

    }
    const onChange = (value)=>{
        setSearch(value);

    }
    useEffect(()=>{


        getList();
    },[])


    const onRequestSearch=()=>{

        const list1 = list.filter(item=>{

            return item.name.toLowerCase().includes(search.toLowerCase());
        })

        setList(list1)

    }

    return <div>
        
        
        <Container >
            <Search value={search} onChange={onChange} onRequestSearch={onRequestSearch}   
                onCancelSearch={()=>{
                    getList()
                }}
            className={classes.searchBar}></Search>
                <div className={classes.container}>

                    {
                       list.length>0? list.map(item=>{

                            return (
                                    <div key={item.id}  style={{marginTop: 20}}>
                                        <ResturantListCard data={item} />
                                    </div>
                                )
                        }):
                        <Typography variant='h4' style={{marginTop: 40}} align='center'>Not Avaiable</Typography>
                    }

                </div>
        </Container>

    </div>
}



export default List;
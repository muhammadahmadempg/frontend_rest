import { Box,Container, TextField, Typography, Select, InputLabel, MenuItem, FormControl} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles'
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import {useParams} from 'react-router-dom'
import DetailsDescription from "./details";
import TableCard from './TableCard'
import BookingModal from "./BookingModal";
const useStyles = makeStyles(()=>({

    root: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        
     
    },
    image: {
        minHeight: 500,
        marginRight: 10,
    
        width: '200'
    }


}))
export default function Detail(props){

    const {id} = useParams();
    const classes = useStyles()
    const [data, setData] = useState()
    const [modal, setModal] = useState(false);
    const [selectedTable, setSelectTable] = useState({});
    const [date, setDate] = useState('')
    const [availableTables,setAvailableTables] = useState([]);
    const [slots, setSlots] = useState([]);
    const [time, setTime] = useState('')
    const [booked_by, setBooked] = useState('');

    const onChangeBooked_By = ({target: {value}})=>{
        setBooked(value)
    }

    const bookTable = async ()=>{
        const data = {
            booked_by,
            start_time: time<10 ? `0${time}:00:00.000` : `${time}:00:00.000`,
            table_booked: selectedTable.id,
            booking_date: date
        }

        const res = await  axios.get(`/check_booked?start_time=${data.start_time}&table_booked=${data.table_booked}&booking_date=${data.booking_date}`)
        
        if(!res.data.booked){

            await axios({method: 'POST', url:'/bookings', data });
            alert("Congratulations Slot is Booked.");

        }

        else {

            alert(res.data.msg)
        }
    }

    const openModal = (table_id)=>{
        setModal(!modal)
        setSelectTable(table_id)
    }
    const  closeModal= ()=>{
        setModal(false);
    }
    useEffect(()=>{
       async function getDetail(){

        const res = await axios.get(`/restaurants/${id}`);
        setData(res.data)

        let recent = localStorage.getItem('recent');

        if(recent){

            recent = JSON.parse(recent);

            let isAvailable = recent.find(rest => rest.id===res.data.id);
            if(!isAvailable){
                recent.push(res.data.restaurant);
            }
            localStorage.setItem('recent',JSON.stringify(recent));
        }
        else {

            recent = [res.data.restaurant];
            localStorage.setItem('recent',JSON.stringify(recent))

        }



       }

       getDetail();
    
    },[id])

    const onChangeDate = async ({target: {value}})=>{
        setDate(value);
        const {data} = await axios.get(`/tables?date=${value}&rest_id=${id}`)
        let set = [];
        
        data.forEach(table=>{

            set = [...table.slots,...set];
        })

        set = new Array(...new Set(set)).sort((a,b)=>a<b);
        setSlots(set)
        setAvailableTables(data)

    }

   const  onChangeTime= async({target: {value}})=>{
        
        const {data} = await axios.get(`/available_tables?date=${date}&rest_id=${id}&time=${value}`)
      
        
        setAvailableTables([...data]);
        setTime(value);
   }

    if(!data){

        return <div>Loading.....</div>
    }



    return (
        <>
        
        <Container>
                <div className={classes.root}>
                    <img width={696} height={378} alt={data.restaurant.name} src={`http://localhost:1337${data.restaurant.images[0].url}`}/>

                    <DetailsDescription data={data.restaurant}/>


                </div>

                <Box mt={10} display='flex' flexDirection='row' justifyContent='space-around'>

                    <TextField value={date} variant='outlined' type='date' onChange={onChangeDate} label='Date' InputLabelProps={{shrink: true}}/>
                    <FormControl                          style={{width: 200}}
                        variant='outlined' className={classes.margin}>
                        <InputLabel id="time">Available Slots</InputLabel>
                        <Select
                        labelId="time"
                        id="select-time"
                        value={time}
                        onChange={onChangeTime}

                        
                        >
                        <MenuItem value="">
                            <em>Select Time</em>
                        </MenuItem>

                        {
                            slots.map(i=>{
                                return <MenuItem key={i} value={i}>
                                <em>{`${i}:00`}</em>
                            </MenuItem>                                
                            })
                        }
                        </Select>
                    </FormControl>

                </Box>

                {
                 date !=='' && availableTables.length > 0 ?
                    time!==''?
                    <div style={{margin: 10}}>
                        <Typography style={{marginTop: 10}} align='center' variant='h4'>
                            Tables
                        </Typography>

                        {availableTables.map(table=>{

                            return <TableCard
                                    time={time}
                                    openModal={openModal} 
                                    table={table} key={table.id}/>
                        })
                        }
                    </div>:
                    <Typography style={{marginTop: 20}} align='center' variant={'h4'}>{`${availableTables.length} Tables are available. Please Select Slot.`}</Typography>
                    : null    
                }
                


            </Container>
            <BookingModal bookTable={bookTable} booked_by={booked_by} onChange={onChangeBooked_By} selectedTable={selectedTable} modal={modal} close={closeModal} />
            </>
            )
}
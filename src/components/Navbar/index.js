import React from 'react'
import { Toolbar, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import {NavLink} from 'react-router-dom'



const useStyles = makeStyles((theme)=>({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    link: {
        fontSize: '20px',
        marginLeft: '20px',
        padding: '20px',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.secondary.light
        },
    },

    activeLink: {
        color: theme.palette.secondary.light
    },

    container: {
        display: 'flex',
        flexDirection: 'row',
    }
}))

function Navbar(props){

    const styles = useStyles();
    return (
        <AppBar position='sticky' color='inherit'>
            <Toolbar className={styles.toolbar} component='div'>
                <Typography variant='h5'>Restaurant Task</Typography>
                    <div className={styles.container}>
                        <NavLink 
                            to='/home' 
                            className={styles.link}
                            activeClassName={styles.activeLink}
                        >Home</NavLink>
                        <NavLink
                            className={styles.link}
                            to='/list'
                            activeClassName={styles.activeLink}>List</NavLink>
                        <NavLink
                            className={styles.link}
                            to='/details'
                            activeClassName={styles.activeLink}>Home</NavLink>
                    </div>
            </Toolbar>
        </AppBar>
    )

}

export default Navbar;
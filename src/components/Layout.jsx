import React from 'react';
import Navbar from "./Navbar";
import Leftbar from "./Leftbar";
import { Container, Grid } from '@mui/material';
import {styled } from '@mui/material/styles';

const MainContainer = styled(Container)(({theme}) => ({
    height: '100vh',
    paddingTop: theme.spacing(10),
}))

const Layout = (props) => {
  return (
    <div>
        <Navbar />
        <Grid container>
            <Grid item sm={2}>
                <Leftbar />
            </Grid>
            <Grid item sm={10} xs={10}>
                <MainContainer>
                    {props.children}
                </MainContainer>
                
            </Grid>
        </Grid>
    </div>
  )
}

export default Layout
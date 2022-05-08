import {Typography } from '@mui/material'
import React from 'react'
import Layout from '../components/Layout'
import {styled } from '@mui/material/styles'

const WelcomeContainer = styled('div')(({theme}) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
}))

const Home = () => {
  return (
    <Layout>
        <WelcomeContainer>
            <Typography color='#1976d2' variant='h1' align="center" sx={{ fontWeight: '600' }} >Hello Admin</Typography>
        </WelcomeContainer>
        
    </Layout>
  )
}

export default Home
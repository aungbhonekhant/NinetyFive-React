import React from 'react'
import Layout from '../components/Layout'
import {styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

const WelcomeContainer = styled('div')(({theme}) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
}))

export const Unauthorized = () => {
  return (
    <Layout>
        <WelcomeContainer>
            <Typography color='#1976d2' variant='h1' align="center" sx={{ fontWeight: '600', marginButton: '20px' }} >You'r Unauthorized</Typography>
            <Typography color='#1976d2' variant='h5' align="center">Please contact Admin</Typography>
        </WelcomeContainer>
    </Layout>
  )
}

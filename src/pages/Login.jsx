import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {styled } from '@mui/material/styles';
import { Avatar, Button, Container, Grid, Paper, TextField } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { users } from '../data';

const MainContainer = styled(Container)(({theme}) => ({
    height: '100vh',
    paddingTop: theme.spacing(10),
}))

const AvatarIcon = styled(Avatar)(({theme}) => ({
    backgroundColor: theme.palette.primary.main
}))

const InputItem = styled('div')(({theme}) => ({
    marginBottom: theme.spacing(3),
}))

const Login = () => {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from  = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = (e) => {
        e.preventDefault();
        const authUser = users.find(u =>{ 
            if(u.email === user && u.password === pwd){
                return true;
            }   
        });
        if(authUser){
            const token = authUser.name + authUser.role;
            const role = authUser.role;
            setAuth({user, pwd, role, token});
            setUser('');
            setPwd('')
            navigate(from, { replace: true });
        }else{
            setErrMsg('Unauthorized');
            errRef.current.focus();
        }
    }

    const properStyle = {
        padding: 5,
        height: '45vh',
        width: '300px',
        margin: "20px auto"
    }
  return (
    <div>
        
        <MainContainer >
            <Grid>
                <Paper elevation={10} sx={properStyle}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <Grid align="center">
                        <AvatarIcon><LockOutlined/></AvatarIcon>
                        <h2>Sign in</h2>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <InputItem>
                            <TextField 
                                required
                                label="Email"
                                type='email'
                                ref={userRef}
                                fullWidth
                                onChange={(e) => setUser(e.target.value)}
                                valie={user}
                            />
                        </InputItem>
                        <InputItem>
                            <TextField 
                                required
                                label="Password"
                                type='password'
                                fullWidth
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </InputItem>

                        <Button type='submit' color="primary" variant='contained' size="large" fullWidth>Login</Button>
                    </form>
                </Paper>
            </Grid>
        </MainContainer>
    </div>
  )
}

export default Login
import { Article, Business, Home, People, PostAdd } from '@mui/icons-material'
import { Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Link } from 'react-router-dom';

const LeftBarContainer = styled(Container)(({theme}) => ({
    height: '100vh',
    color: 'white',
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
       backgroundColor: 'white',
       color: '#555',
       border: '1px solid #dfdfdf'
    }
}))

const Item = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(3),
        cursor: 'pointer'
    }
}))
const ItemIcon = styled('span')(({theme}) => ({
    svg:{
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            fontSize: "18px" 
        }
    }
    
}))

const ItemText = styled(Typography)(({theme}) => ({
    fontWeight: "500",
    [theme.breakpoints.down('sm')]: {
        display: "none"
    }
}))



const Leftbar = () => {
  return (
    <LeftBarContainer>
        <Link to="/">
            <Item>
                <ItemIcon>
                    <Home />
                </ItemIcon>
                <ItemText>Home Page</ItemText>
            </Item>
        </Link>
        <Link to="/users">
            <Item>
                <ItemIcon>
                    <People />
                </ItemIcon>
                <ItemText>Users</ItemText>
            </Item>
        </Link>
        <Link to="/business">
            <Item>
                <ItemIcon>
                    <Business />
                </ItemIcon>
                <ItemText>Business</ItemText>
            </Item>
        </Link>
        <Link to="/template">
            <Item>
                <ItemIcon>
                    <Article />
                </ItemIcon>
                <ItemText>Template</ItemText>
            </Item>
        </Link>
        <Link to="/docx">
            <Item>
                <ItemIcon>
                    <PostAdd />
                </ItemIcon>
                <ItemText>Create Document</ItemText>
            </Item>
        </Link>
    </LeftBarContainer>
  )
}

export default Leftbar
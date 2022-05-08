import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import {styled} from '@mui/material/styles'
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { users } from "../data";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    p: 4,
  };

const InputItem = styled('div')(({theme}) => ({
    marginBottom: theme.spacing(3),
}))

const UserForm = styled('form')(({theme}) => ({
    padding: theme.spacing(2),
}))

const FormAction = styled('div')(({theme}) => ({
    
}))

const initUser = {
    id: '',
    name: '',
    email: '',
    password: '',
}

const User = () => {
const [userList, setUserList] = useState(users)
const [eOpen, setEOpen] = useState(false);
const [role, setRole] = React.useState('');
const [input, setInput] = React.useState(initUser);

  const edit = (e,item = null) => {
    if(item){
        setInput({
            id: item.id,
            name: item.name,
            email: item.email,
            password: item.password,
        })
        setRole(item.role)
    }
    setEOpen(e => !e);
    
  };

  const handleEClose = () => setEOpen(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

 const handleInpt = (e) => {
    e.preventDefault();
    setInput(prev=>{
        return {...prev, [e.target.name]:e.target.value}
    })
 }

 const handleEdit = () => {
    const userObj = {...input, role};
    let newList = [...userList];
    newList[userObj.id - 1] = userObj;
    setUserList(newList);
    setEOpen(e => !e);
    setInput(initUser);
    setRole('');
 }

 const handleSave = () => {
    const userObj = {...input,id: userList.length + 1, role};
    let newList = [...userList, userObj];
    setUserList(newList);
    setEOpen(e => !e);
    setInput(initUser);
    setRole('');
 }

 const deleteUser = (id) => {
    setUserList(userList.filter(user=> user.id !== id));
 }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Typography
              varient="subtitle2"
              component="span"
              color={params.row.role === "admin" ? "green" : "red"}
            >
              {params.row.role}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div sx={{ display: "flex", justifyContent: "center" }}>
            <Edit
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={(e) => edit(e,params.row)}
            >
              Edit
            </Edit>
            <DeleteOutline
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={() => deleteUser(params.row.id)}
            />
          </div>
        );
      },
    },
  ];
  

  return (
    <Layout>
      <Card>
        <CardHeader title="User" subheader="Our Lovely Users" 
            action={
                <IconButton color="success" aria-label="add user" onClick={edit}>
                    <Add />
                </IconButton>
            } 
        />
        <CardContent>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={userList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </CardContent>
      </Card>

      <Modal
        open={eOpen}
        onClose={handleEClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <UserForm autoComplete="off">
                <InputItem>
                    <TextField
                        required
                        id="outlined-required-name"
                        label="Name"
                        size="small"
                        name="name"
                        value={input.name || ''}
                        fullWidth 
                        onChange={handleInpt}
                    />
                </InputItem>

                <InputItem>
                    <TextField
                        required
                        id="outlined-required-email"
                        label="Email"
                        type="email"
                        name="email"
                        value={input.email || ''}
                        size="small"
                        fullWidth 
                        onChange={handleInpt}
                    />
                </InputItem>

                <InputItem>
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        value={input.password}
                        autoComplete="current-password"
                        size="small"
                        fullWidth 
                        onChange={handleInpt}
                    />
                </InputItem>

                <InputItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={role}
                            label="Role"
                            onChange={handleRoleChange}
                            size="small"
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'admin'}>admin</MenuItem>
                            <MenuItem value={'business'}>business</MenuItem>
                        </Select>
                    </FormControl>
                </InputItem>
                <FormAction>
                    {
                        input.id === '' ?
                        <Button variant="outlined" color="primary" sx={{ marginRight: '15px' }} onClick={handleSave}>Add</Button>
                        :
                        <Button variant="outlined" color="primary" sx={{ marginRight: '15px' }} onClick={handleEdit}>Save Change</Button>
                    }
                    <Button variant="outlined" color="secondary" onClick={handleEClose}>Cancel</Button>
                </FormAction>
            </UserForm>
            
        </Box>
      </Modal>

    </Layout>
  );
};

export default User;

import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import {styled} from '@mui/material/styles'
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { business } from "../data";

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

const BusinessForm = styled('form')(({theme}) => ({
    padding: theme.spacing(2),
}))

const FormAction = styled('div')(({theme}) => ({
    
}))

const initBus = {
    id: '',
    name: '',
    type: '',
    desc: '',
}

const Business = () => {
const [businessList, setBusinessList] = useState(business)
const [eOpen, setEOpen] = useState(false);
const [type, setType] = React.useState('');
const [input, setInput] = React.useState(initBus);

  const edit = (e,item = null) => {
    if(item){
        setInput({
            id: item.id,
            name: item.name,
            desc: item.desc,
        })
        setType(item.type)
    }
    setEOpen(e => !e);
    
  };

  const handleEClose = () => setEOpen(false);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

 const handleInpt = (e) => {
    e.preventDefault();
    setInput(prev=>{
        return {...prev, [e.target.name]:e.target.value}
    })
 }

 const handleEdit = () => {
    const businessObj = {...input, type};
    let newList = [...businessList];
    newList[businessObj.id - 1] = businessObj;
    setBusinessList(newList);
    setEOpen(e => !e);
    setInput(initBus);
    setType('');
 }

 const handleSave = () => {
    const businessObj = {...input,id: businessList.length + 1, type};
    let newList = [...businessList, businessObj];
    setBusinessList(newList);
    setEOpen(e => !e);
    setInput(initBus);
    setType('');
 }

 const deleteUser = (id) => {
    setBusinessList(businessList.filter(business=> business.id !== id));
 }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "type", headerName: "Business Type", width: 250 },
    { field: "desc", headerName: "Description", width: 250,
      renderCell: (params) => {
        return params.row.desc.slice(0, 20)+'...'
      }
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
        <CardHeader title="Businesses" subheader="" 
            action={
                <IconButton color="success" aria-label="add user" onClick={edit}>
                    <Add />
                </IconButton>
            } 
        />
        <CardContent>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={businessList}
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
            <BusinessForm autoComplete="off">
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
                            size="small"
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'ecommerce'}>Ecommerce</MenuItem>
                            <MenuItem value={'it'}>IT</MenuItem>
                            <MenuItem value={'finance'}>Finance</MenuItem>
                            <MenuItem value={'banking'}>FinaBankingnce</MenuItem>
                            <MenuItem value={'clothing'}>Clothing</MenuItem>
                        </Select>
                    </FormControl>
                </InputItem>

                <InputItem>
                    <TextField
                        required
                        multiline
                        id="outlined-required-name"
                        label="Description"
                        size="small"
                        name="desc"
                        value={input.desc || ''}
                        fullWidth 
                        onChange={handleInpt}
                    />
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
            </BusinessForm>
            
        </Box>
      </Modal>

    </Layout>
  );
};

export default Business;

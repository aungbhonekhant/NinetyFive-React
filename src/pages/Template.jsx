

///
// actually I don't know what it's test No 3 mean
////



import React, { useState } from 'react'
import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import {styled} from '@mui/material/styles'
import { Button, Card, CardContent, CardHeader, IconButton, Modal, TextField} from "@mui/material";
import Layout from '../components/Layout'
import { templates } from "../data";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Editor } from '@tinymce/tinymce-react';

const style = {
    width: "90%",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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

const initTem = {
    id: '',
    name: '',
    desc: '',
}

const Template = () => {
const [templateList, setTemplateList] = useState(templates);
const [showForm, setShowForm] = useState(false);
const [input, setInput] = React.useState(initTem);
const [template, setTemplate] = React.useState('');


const handleEClose = () =>{
     setShowForm(false);
     setTemplate("");
     setInput(initTem);
};

const createTemplate = (e,item = null) => {
   
    if(item){
        setInput({
            id: item.id,
            name: item.name,
            desc: item.desc,
        })
        setTemplate(item.template)
    }
    setShowForm(show=>!show);
}

const handleInpt = (e) => {
    e.preventDefault();
    setInput(prev=>{
        return {...prev, [e.target.name]:e.target.value}
    })
}

const saveTemplate = async () => {
    const tmpObj = {...input, id: templateList.length + 1, template};
    let newList = [...templateList, tmpObj]; 
    setTemplateList(newList);
    setShowForm(s => !s);
    setTemplate("");
    setInput(initTem);
}

const updateTemplate = () => {
    const tmpObj = {...input, template};
    let newList = [...templateList];
    newList[tmpObj.id - 1] = tmpObj; 
    setTemplateList(newList);
    setShowForm(s => !s);
    setTemplate("");
    setInput(initTem);
}

const deleteTemp = (id) => {
    setTemplateList(templateList.filter(tmp=> tmp.id !== id));
 }

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "desc", headerName: "Description", width: 250,
    
      renderCell: (params) => {
        return params.row.desc.slice(0, 20)+'...'
      }
    },
    { field: "template", headerName: "Template", width: 230 },
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
              onClick={(e) => createTemplate(e,params.row )}
            >
              Edit
            </Edit>
            <DeleteOutline
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={() => deleteTemp(params.row.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
        <Card>
            <CardHeader title="Template" subheader="e-template" 
                action={
                    <IconButton color="success" aria-label="add user" onClick={createTemplate}>
                        <Add />
                    </IconButton>
                } 
            />
            <CardContent>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={templateList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            </CardContent>
        </Card>

        <Modal
            open={showForm}
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

                <InputItem>
                    <Editor 
                        value={template || ''}
                        textareaName='template'
                        onEditorChange={(newText)=>setTemplate(newText)}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                              'bold italic forecolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }}
                    />
                </InputItem>

                <FormAction>
                    {
                        input.id === '' ?
                        <Button variant="outlined" color="primary" sx={{ marginRight: '15px' }} onClick={saveTemplate}>Add</Button>
                        :
                        <Button variant="outlined" color="primary" sx={{ marginRight: '15px' }} onClick={updateTemplate}>Save Change</Button>
                    }
                    <Button variant="outlined" color="secondary" onClick={handleEClose}>Cancel</Button>
                </FormAction>
            </BusinessForm>
            
        </Box>
      </Modal>
    </Layout>
  )
}

export default Template
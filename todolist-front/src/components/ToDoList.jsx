import * as React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

function ToDoList() {
  const [list, setList] = useState([])
  const [listFiltred, setListFiltred] = useState([])
  const [open, setOpen] = useState(false)

  const [description, setDescription] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/nota/')
      .then(response => {
        let data = response.data;
        let dataAux = []

        Object.keys(data).map(key => {
          dataAux.push(data[key])
        })

        setList(dataAux)
        setListFiltred(dataAux)
      })
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  function reloadPage(){
    setTimeout(() => {
      window.location.reload(false)
    }, 1000)
  }

  function saveNotes(event) {
    event.preventDefault()
    axios.post('http://localhost:5000/nota/', {description: description})
       .then(response => response)

    handleClose()
    reloadPage()
  }

  function deleteNotes(id) {
    console.log(id)
    axios.delete(`http://localhost:5000/nota/${id}`)
      .then(response => response)
  }

  function searchList(value) {
    let search = value.target.value;
    setListFiltred(list.filter(item => item.description.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <div className="ToDoList" sx={{}}>
      <Card sx={{}}>
        <CardHeader action={
          <IconButton aria-label="Adicionar" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        }
          title="TODO LIST" style={{ backgroundColor: '#5B9CD4', textAlign: "center" }}
        />
        <Dialog open={open}>
          <DialogTitle>Savar atividade</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Digite a descrição da atividade a ser desenvolvida!
            </DialogContentText>
          </DialogContent>
          <TextField label="Descrição" onChange={handleDescription} style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}} />
          <DialogActions style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={saveNotes} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
        <CardContent>
          <TextField label="Buscar" variant="filled" style={{ width: '100%' }} onKeyUp={searchList} />
          <Box sx={{ maxHeight: 940, bgcolor: 'background.paper' }}>
            <nav>
              <List>
                {

                  listFiltred.map(item => {
                    return (
                      <ListItem disablePadding>
                        <ListItemText primary={item.description} />
                        {/* {
                          item.status ? <Chip label="Finalizada" style={{backgroundColor: '#D7EBD1'}}/> 
                          : <Chip label="Em andamento" style={{backgroundColor: '#BDE8FF'}}/>
                        } */}
                        {/* <IconButton aria-label="Editar" onClick={handleClickOpen}>
                          <CreateIcon />
                        </IconButton> */}
                        {/* <IconButton aria-label="Deletar" onClick={deleteNotes(item.id)}>
                          <DeleteIcon />
                        </IconButton> */}
                      </ListItem>
                    )
                  })
                }
              </List>
            </nav>
          </Box>
        </CardContent>
      </Card>
    </div >
  );
}

export default ToDoList;

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

import Chip from '@material-ui/core/Chip'
import {useState} from 'react'
import axios  from 'axios';

function ToDoList() {

  const [list, setList] = useState([
    {
      description: 'Arrumar casa',
      status: false,
    },
    {
      description: 'Arrumar casa',
      status: true,
    },
    {
      description: 'Arrumar casa',
      status: true,
    },
    {
      description: 'Arrumar casa',
      status: false,
    },
    {
      description: 'Arrumar casa',
      status: false,
    },
  ])

  const [listFiltred, setListFiltred] = useState(list)

  function getNotes(){
    axios.get('localhost:5000/notes/')
      .then(response => this.setList(response.data))
  }

  function saveNotes(value){
    axios.post('localhost:5000/notes/', value.target.value)
      .then(response => response)
  }

  function deleteNotes(id){
    axios.delete('localhost:5000/notes/', id)
      .then(response => response)
  }

  function searchList(value){
    let search = value.target.value;
    setListFiltred(list.filter(item => item.description.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <div className="ToDoList" sx={{ }}>
      <Card sx={{}}>
        <CardHeader action={
            <IconButton aria-label="Adicionar">
              <AddIcon />
            </IconButton>
          }
          title="TODO LIST" style={{backgroundColor: '#5B9CD4', textAlign: "center"}}
        />
        <CardContent>
          <TextField label="Buscar" variant="filled" style={{width: '100%'}} onKeyUp={searchList} />
          <Box sx={{maxHeight: 940, bgcolor: 'background.paper' }}>
            <nav>
              <List>
                {
                  listFiltred.map((item) => {
                    return (
                      <ListItem disablePadding>
                        <ListItemText primary={item.description}/>
                        {
                          item.status ? <Chip label="Finalizada" style={{backgroundColor: '#D7EBD1'}}/> 
                          : <Chip label="Em andamento" style={{backgroundColor: '#BDE8FF'}}/>
                        }
                        <IconButton aria-label="Editar">
                          <CreateIcon/>
                        </IconButton>
                        <IconButton aria-label="Deletar">
                          <DeleteIcon/>
                        </IconButton>
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

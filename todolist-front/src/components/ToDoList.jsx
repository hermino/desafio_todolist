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
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

function ToDoList() {

  let list = [1, 3, 4]

  return (
    <div className="ToDoList" sx={{ }}>
      <Card sx={{}}>
        <CardHeader action={
            <IconButton aria-label="Adicionar" onClick={{this.}}>
              <AddIcon />
            </IconButton>
          }
          title="Todo List App"
        />
        <CardContent>
          <Box sx={{maxHeight: 940, bgcolor: 'background.paper' }}>
            <nav>
              <List>
                {
                  list.map(() => {
                    return (
                      <ListItem disablePadding>
                        <ListItemText primary="Trash" />
                        <IconButton aria-label="Editar">
                          <CreateIcon />
                        </IconButton>
                        <IconButton aria-label="Deletar">
                          <DeleteIcon />
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

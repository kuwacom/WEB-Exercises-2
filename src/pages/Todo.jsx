import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import { AppBar, Box, Button, Checkbox, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            ToDo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <Paper sx={{ p: 2, boxShadow: '0px 0 15px 0 rgba(0, 0, 0, 0.2)',}}>
          <Box display="flex" alignItems="center">
            <TextField
              label="Add Todo"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleAddTodo}
              sx={{
                ml: 1,
                width: 56, 
                height: 56, 
              }}
            >
              <AddOutlined />
            </Button>
          </Box>
          <List>
            {todos.map((todo, index) => (
              <ListItem key={index} dense onClick={() => handleToggleComplete(index)}>
                <Checkbox
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={todo.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(index)}>
                    <DeleteOutline color="error"/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  )
}

export default Todo;
import React from 'react';
import { Button,IconButton } from "@material-ui/core";
import { Delete, Send } from '@material-ui/icons';
const MaterialUI = () => {
    return (<div>
        <h1>Exploring Buttons</h1>
        <Button variant="contained" size="small">Hello</Button>
        <Button variant="outlined" size="large">Hello</Button>
        <Button variant="text">Hello</Button>
        <Button style={{background:"red"}}>Hello</Button>
        <h1>Exploring Icons with Buttons</h1>
        <Button variant="contained" color="primary" startIcon={<Send></Send>}>Send</Button>
        <Button variant="contained" color="secondary" endIcon={<Delete></Delete>}>Delete</Button>
        <h1>Exploring IconButtons</h1>
        <IconButton>
            <Send style={{background:"blue"}}></Send>
        </IconButton>
    </div>
    );
}

export default MaterialUI;
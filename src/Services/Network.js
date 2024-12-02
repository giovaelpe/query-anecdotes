import axios from "axios";

const endpoint = 'http://localhost:3001/anecdotes';

export function getAnecdotes(){
    return axios.get(endpoint).then(response => response.data)
}

export function addAnecdote(newAnecdote) {
    return axios.post(endpoint, {content: newAnecdote, votes: 0}).then(response => response.data)
}
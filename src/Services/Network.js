import axios from "axios";

const endpoint = 'http://localhost:3001/anecdotes';

export function getAnecdotes(){
    return axios.get(endpoint).then(response => response.data)
}

export function addAnecdote(newAnecdote) {
    if(newAnecdote.length < 3){
        throw new Error("Anecdote muss be ate least 3 characters long")
    }
    return axios.post(endpoint, {content: newAnecdote, votes: 0}).then(response => response.data).catch(error => {
        console.log(error.message);
        return error.message;
    })
}

export function updateAnecdote(anecdote) {
    return axios.put(`${endpoint}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1})
}
import axios from "axios";

const endpoint = 'http://localhost:3001/anecdotes';

export function getAnecdotes(){
    return axios.get(endpoint).then(response => response.data)
}
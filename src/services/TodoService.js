import axios from 'axios';

const uri_prefix = 'http://localhost:8000';

export function getAllTodos() {
    return axios
            .get(`${uri_prefix}/todos`)
            .then(response => response.data);
}

import axios from 'axios';
import FilterTypes from '../constants/FilterTypes';

const IS_PROD = true;

let uri_prefix = 'http://localhost:8000';

if (IS_PROD) {
    uri_prefix = 'https://todoappbackend.herokuapp.com';
}

export function getAllTodos() {
    return axios
            .get(`${uri_prefix}/todos`)
            .then(response => response.data);
}

export function updateTodo(updated_todo) {
    const todo = {
        title: updated_todo.title,
        is_complete: updated_todo.is_complete
    }
    return axios
            .patch(`${uri_prefix}/todos/${updated_todo._id}`, todo)
            .then(response => response.data);
}

export function deleteTodo(todo_id) {
    return axios
            .delete(`${uri_prefix}/todos/${todo_id}`)
            .then(response => response.data);
}

export function saveTodo(todo_title) {
    const new_todo = {
        title: todo_title
    };
    return axios
            .post(`${uri_prefix}/todos/`, new_todo)
            .then(response => response.data);
}

export function filterTodos(todos, filter_type) {
    switch (filter_type) {
        case FilterTypes.COMPLETED:
            return todos.filter(todo => todo.is_complete);

        case FilterTypes.PENDING:
            return todos.filter(todo => !todo.is_complete);

        case FilterTypes.ALL:
        default:
            return todos;
    }
}

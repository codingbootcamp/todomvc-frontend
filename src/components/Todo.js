import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

const Todo = ({todo, handleTodoCheckboxChange, toggleTodoEdit, handleTodoChange, saveUpdatedTodo}) => {
    const handleChange = () =>
        handleTodoCheckboxChange({
            ...todo,
            is_complete: !todo.is_complete
        });

    const toggleEdit = () => toggleTodoEdit(todo);

    const handleTodoOnChange = e => {
        const title = e.target.value;
        handleTodoChange(todo._id, title);
    };

    const handleTodoSave = e => {
        e.preventDefault();
        saveUpdatedTodo(todo);
    }

    const renderTodoCheckbox = is_complete => {
        return (
            <input
                type="checkbox"
                checked={is_complete}
                onChange={handleChange}/>
        );
    };

    const li_classes = Classnames({
        'complete': todo.is_complete,
        'loading': todo.is_loading
    });

    if (todo.is_editing) {
        return (
            <li>
                <form onSubmit={handleTodoSave}>
                    <input type="text"
                        className="form-control"
                        value={todo.title}
                        onChange={handleTodoOnChange}/>
                </form>
            </li>
        );
    }

    return (
        <li className={li_classes}>
            {renderTodoCheckbox(todo.is_complete)}
            <span className="todo-title">
                {todo.title}
            </span>
            <span className="pull-right">
                <button className="btn btn-link edit-icon-button"
                    onClick={toggleEdit}>
                    <i className="glyphicon glyphicon-pencil"/>
                </button>
            </span>
        </li>
    );
};

export default Todo;

Todo.propTypes = {
    todo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        is_complete: PropTypes.bool.isRequired
    }),
    handleTodoCheckboxChange: PropTypes.func.isRequired,
    toggleTodoEdit: PropTypes.func.isRequired,
    handleTodoChange: PropTypes.func.isRequired,
    saveUpdatedTodo: PropTypes.func.isRequired
};

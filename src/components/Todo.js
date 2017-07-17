import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

const Todo = ({todo}) => {
    const renderTodoCheckbox = is_complete => {
        return (
            <input
                type="checkbox"
                checked={is_complete}/>
        );
    };

    const li_classes = Classnames({
        'complete': todo.is_complete
    });

    return (
        <li className={li_classes}>
            {renderTodoCheckbox(todo.is_complete)}
            <span className="todo-title">
                {todo.title}
            </span>
        </li>
    );
};

export default Todo;

Todo.propTypes = {
    todo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        is_complete: PropTypes.bool.isRequired
    })
};

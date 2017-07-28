import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

const AddTodoButton = ({toggleNewTodoEdit}) => {
    return (
        <button className="btn btn-primary" onClick={toggleNewTodoEdit}>
            <i className="glyphicon glyphicon-plus-sign"/>
        </button>
    );
};

export default AddTodoButton;

AddTodoButton.propTypes = {
    toggleNewTodoEdit: PropTypes.func.isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import FilterTypes from '../constants/FilterTypes';


const Filter = (props) => {
    const {handleFilterTodos, selected_filter_type} = props;

    const completed_classes = Classnames("btn btn-default pull-left", {
        active: selected_filter_type === FilterTypes.COMPLETED
    });

    const pending_classes = Classnames("btn btn-default", {
        active: selected_filter_type === FilterTypes.PENDING
    });

    const all_classes = Classnames("btn btn-default pull-right", {
        active: selected_filter_type === FilterTypes.ALL
    });

    return (
        <div className="text-center">
            <button onClick={() => {handleFilterTodos(FilterTypes.COMPLETED)}}
                className={completed_classes}>
                Show Completed
            </button>
            <button onClick={() => {handleFilterTodos(FilterTypes.PENDING)}}
                className={pending_classes}>
                Show Pending
            </button>
            <button onClick={() => {handleFilterTodos(FilterTypes.ALL)}}
                className={all_classes}>
                All
            </button>
        </div>
    );
};

Filter.propTypes = {
    handleFilterTodos: PropTypes.func.isRequired,
    selected_filter_type: PropTypes.string
};

export default Filter;

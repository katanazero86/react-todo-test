import React from "react";
import './TodoHeader.css'
import PropTypes from 'prop-types';

// prop-types
TodoHeader.propTypes = {
    title : PropTypes.string
};

function TodoHeader({title}) {
    return (
        <header className="todo-header-wrap">
            <div className="todo-header-body">
                <p>
                    {title}
                </p>
            </div>
        </header>
    )
}

export default React.memo(TodoHeader)

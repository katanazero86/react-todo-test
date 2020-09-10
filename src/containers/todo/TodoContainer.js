import React from "react";
import './TodoContainer.css';
import PropTypes from 'prop-types';

TodoContainer.propTypes = {

};

export default function TodoContainer() {
    return (
        <div className="todo-wrap">
            <div className="todo-body">
                <header className="todo-header-wrap">
                    <div className="todo-header-body">
                        <p>
                            todos
                        </p>
                    </div>
                </header>
            </div>
        </div>
    )
}

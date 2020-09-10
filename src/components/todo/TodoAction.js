import React from "react";
import './TodoAction.css'
import PropTypes from 'prop-types';
import Button from "../button/Button";

// prop-types
TodoAction.propTypes = {
    todoItemsCounter : PropTypes.number,
    actionFilter : PropTypes.object,
    dispatchChangeFilterAll : PropTypes.func,
    dispatchChangeFilterActive : PropTypes.func,
    dispatchChangeFilterComplete : PropTypes.func,
    dispatchClearComplete : PropTypes.func,
};

function TodoAction({todoItemsCounter, actionFilter, dispatchChangeFilterAll, dispatchChangeFilterActive, dispatchChangeFilterComplete, dispatchClearComplete}) {
    return (
        <section className="todo-items-action-wrap">
            <div className="todo-items-action-body dflex">
                <div className="col-2 dflex align-item-center">
                    <p>
                        {todoItemsCounter} items left
                    </p>
                </div>
                <div className="col-8 dflex justify-content-center">
                    <Button text="All" isActive={actionFilter.all} isInline={true}
                            onClick={dispatchChangeFilterAll}/>
                    <Button text="Active" isActive={actionFilter.active} isInline={true}
                            onClick={dispatchChangeFilterActive}/>
                    <Button text="Complete" isActive={actionFilter.complete} isInline={true}
                            onClick={dispatchChangeFilterComplete}/>
                </div>
                <div className="col-2">
                    <Button text="Clear complete" onClick={dispatchClearComplete}/>
                </div>
            </div>
        </section>
    )
}

export default React.memo(TodoAction)

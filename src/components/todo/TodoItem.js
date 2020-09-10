import React, {useCallback} from "react";
import './TodoItemCommon.css';
import PropTypes from 'prop-types';

// components
import RoundCheckbox from "../checkbox/RoundCheckbox";
import Button from "../button/Button";

// prop-types
TodoItem.propTypes = {
    item: PropTypes.object,
    onChange: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func,
};


function TodoItem({item, onChange, onDoubleClick, onClick}) {

    const deleteOnClick = useCallback(() => {
        onClick(item.id)
    }, [item]);

    const modifiedOnDoubleClick = useCallback(() => {
        onDoubleClick(item.id)
    }, [item]);

    return (
        <div className="todo-item dflex align-item-center">
            <RoundCheckbox checked={item.isComplete} onChange={onChange}
                           value={item.id} name={`complete-${item.id}`}/>
            <p onDoubleClick={modifiedOnDoubleClick}
               className={item.isComplete ? `complete-item` : ``}>{item.description}</p>
            <Button isInline={true} icon="delete" onClick={deleteOnClick}/>
        </div>
    )
}

export default React.memo(TodoItem)

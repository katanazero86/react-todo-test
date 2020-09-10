import React, {useState, useEffect, useRef, useCallback} from "react";
import './TodoContainer.css';
import {useSelector, useDispatch} from "react-redux";
import {
    memoizationTodoItemsSelector,
    memoizationTodoItemsCounter,
    memoizationActionFilterSelector, memoizationTodoAllCheckedSelector, memoizationEditItemSelector
} from '../../selector/TodoSelect';
import {
    additionAction,
    allCompleteAction, changeFilterAction, clearCompleteAction,
    completeAction, deleteAction, editingAction,
    incompleteAction, modifiedAction,
    toggleAllCheckedAction
} from "../../store/modules/todo";
import moment from "moment-timezone";

// components
import RoundCheckbox from "../../components/checkbox/RoundCheckbox";
import InputText from "../../components/input/InputText";
import Button from "../../components/button/Button";


export default function TodoContainer() {

    const dispatch = useDispatch();
    const todoItems = useSelector(memoizationTodoItemsSelector);
    const actionFilter = useSelector(memoizationActionFilterSelector);
    const todoItemsCounter = useSelector(memoizationTodoItemsCounter);
    const todoAllChecked = useSelector(memoizationTodoAllCheckedSelector);
    const editItem = useSelector(memoizationEditItemSelector);

    const [todoText, setTodoText] = useState('');
    const [editItemText, setEditItemText] = useState('');
    const inputTextRef = useRef();

    const dispatchTodoAddition = () => {
        const todoItem = {
            description: todoText,
            isComplete: false,
            isEditing: false,
            registrationTime: moment().tz('Asia/Seoul').format(`YYYY-MM-DD hh:mm:ss`)
        };
        dispatch(additionAction(todoItem));
    };

    const dispatchTodoCompleteToggle = (checked, indexValue) => {
        if (checked) {
            dispatch(completeAction(indexValue));
        } else {
            dispatch(incompleteAction(indexValue));
        }
    };

    const dispatchTodoAllComplete = () => {
        if (!todoAllChecked) {
            if (todoItems.find(item => !item.isComplete)) {
                dispatch(allCompleteAction());
            } else {
                dispatch(toggleAllCheckedAction());
            }
        } else {
            dispatch(toggleAllCheckedAction());
        }
    };

    const dispatchChangeFilterAll = useCallback(() => {
        dispatchChangeFilter('all')
    }, []);
    const dispatchChangeFilterActive = useCallback(() => {
        dispatchChangeFilter('active')
    }, []);
    const dispatchChangeFilterComplete = useCallback(() => {
        dispatchChangeFilter('complete')
    }, []);

    const dispatchChangeFilter = (type) => {

        const targetFilter = {
            all: false,
            active: false,
            complete: false,
        };

        targetFilter[type] = true;
        dispatch(changeFilterAction(targetFilter));

    };

    const dispatchClearComplete = () => {
        dispatch(clearCompleteAction());
    };

    const dispatchTodoDelete = (indexValue) => {
        dispatch(deleteAction(indexValue));
    };

    const dispatchEnableEditing = (indexValue) => {
        dispatch(editingAction(indexValue))
    };

    const dispatchTodoModified = () => {
        dispatch(modifiedAction(editItemText));
    };

    const todoItemsRender = () => {
        if (actionFilter.all) {
            return todoItems
        }

        if (actionFilter.active) {
            return todoItems.filter(item => !item.isComplete)
        }

        if (actionFilter.complete) {
            return todoItems.filter(item => item.isComplete)
        }
    };

    useEffect(() => {
        setTodoText(prevState => '');
    }, [todoItems]);

    useEffect(() => {
        setEditItemText(editItem ? editItem.description : '');
        if (editItem.hasOwnProperty('description')) {
            inputTextRef.current.focus();
        }
    }, [editItem]);

    return (
        <article className="todo-wrap">
            <div className="todo-body">
                <header className="todo-header-wrap">
                    <div className="todo-header-body">
                        <p>
                            todos
                        </p>
                    </div>
                </header>
                <section className="todo-items-wrap">
                    <div className="todo-items-body">
                        <InputText placeholder="What needs to be done?" isIcon={true}
                                   onClick={dispatchTodoAllComplete} checked={todoAllChecked} value={todoText}
                                   onChange={value => setTodoText(value)} onKeyUp={dispatchTodoAddition}/>

                        {todoItemsRender().map((item, index) => !item.isEditing ?
                            <div className="todo-item dflex align-item-center" key={index}>
                                <RoundCheckbox checked={item.isComplete} onChange={dispatchTodoCompleteToggle}
                                               value={index} name={`complete-${index}`}/>
                                <p onDoubleClick={() => dispatchEnableEditing(index)}
                                   className={item.isComplete ? `complete-item` : ``}>{item.description}</p>
                                <Button isInline={true} icon="delete" onClick={() => dispatchTodoDelete(index)}/>
                            </div> :
                            <div className="todo-item edit-item dflex align-item-center" key={index}>
                                <InputText value={editItemText || ''} isInset={true}
                                           onChange={value => setEditItemText(value)}
                                           onKeyUp={dispatchTodoModified}
                                           inputTextRef={inputTextRef}/>
                            </div>)}

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
                    </div>
                </section>
            </div>
        </article>
    )
}

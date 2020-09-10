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
import InputText from "../../components/input/InputText";
import TodoHeader from "../../components/todo/TodoHeader";
import TodoAction from "../../components/todo/TodoAction";
import TodoItem from "../../components/todo/TodoItem";


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
            id : Math.random().toString(36).substr(2, 16),
            description: todoText,
            isComplete: false,
            isEditing: false,
            registrationTime: moment().tz('Asia/Seoul').format(`YYYY-MM-DD hh:mm:ss`)
        };
        dispatch(additionAction(todoItem));
    };

    const dispatchTodoCompleteToggle = (checked, targetId) => {
        if (checked) {
            dispatch(completeAction(targetId));
        } else {
            dispatch(incompleteAction(targetId));
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

    const dispatchClearComplete = useCallback(() => {
        dispatch(clearCompleteAction());
    }, []);

    const dispatchTodoDelete = (targetId) => {
        dispatch(deleteAction(targetId));
    };

    const dispatchEnableEditing = (targetId) => {
        dispatch(editingAction(targetId))
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
                <TodoHeader title="todos"/>

                <section className="todo-items-wrap">
                    <div className="todo-items-body">
                        <InputText placeholder="What needs to be done?"
                                   isIcon={true}
                                   onClick={dispatchTodoAllComplete}
                                   checked={todoAllChecked}
                                   value={todoText}
                                   onChange={value => setTodoText(value)}
                                   onKeyUp={dispatchTodoAddition}
                        />

                        {todoItemsRender().map((item, index) => !item.isEditing ?
                            <TodoItem key={index}
                                      item={item}
                                      onChange={dispatchTodoCompleteToggle}
                                      onDoubleClick={dispatchEnableEditing}
                                      onClick={dispatchTodoDelete}
                            />
                            :
                            <div className="edit-item dflex align-item-center" key={index}>
                                <InputText value={editItemText || ''}
                                           isInset={true}
                                           onChange={value => setEditItemText(value)}
                                           onKeyUp={dispatchTodoModified}
                                           inputTextRef={inputTextRef}
                                />
                            </div>)}

                        <TodoAction
                            todoItemsCounter={todoItemsCounter}
                            actionFilter={actionFilter}
                            dispatchChangeFilterAll={dispatchChangeFilterAll}
                            dispatchChangeFilterActive={dispatchChangeFilterActive}
                            dispatchChangeFilterComplete={dispatchChangeFilterComplete}
                            dispatchClearComplete={dispatchClearComplete}
                        />

                    </div>
                </section>
            </div>
        </article>
    )
}

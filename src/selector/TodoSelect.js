import {createSelector} from 'reselect';

const todoItemsSelector = state => state.todoReducer.todoItems;
const actionFilterSelector = state => state.todoReducer.actionFilter;
const todoAllCheckedSelector = state => state.todoReducer.todoAllChecked;
const editItemSelector = state => state.todoReducer.editItem

export const memoizationTodoItemsSelector = createSelector([todoItemsSelector], todoItems => todoItems);
export const memoizationActionFilterSelector = createSelector([actionFilterSelector], actionFilter => actionFilter);
export const memoizationTodoItemsCounter = createSelector([todoItemsSelector], todoItems => {
    const incompleteTodoCounter = todoItems.filter(item => !item.isComplete).length
    return incompleteTodoCounter;
});
export const memoizationTodoAllCheckedSelector = createSelector([todoAllCheckedSelector], todoAllChecked => todoAllChecked);
export const memoizationEditItemSelector = createSelector([editItemSelector], editItem => editItem);

// action types
export const TODO_ADDITION = `TODO/ADDITION`;
export const TODO_ALL_COMPLETE = `TODO/ALL_COMPLETE`;
export const TODO_COMPLETE = `TODO/COMPLETE`;
export const TODO_INCOMPLETE = `TODO/INCOMPLETE`;
export const TODO_DELETE = `TODO/DELETE`;
export const TODO_CHANGE_FILTER = `TODO/CHANGE_FILTER`;
export const TODO_All_CHECKED_TOGGLE = `TODO/TODO_All_CHECKED_TOGGLE`;
export const TODO_CLEAR_COMPLETE = `TODO/TODO_CLEAR_COMPLETE`;
export const TODO_EDITING = `TODO/EDITING`;
export const TODO_MODIFIED = `TODO/MODIFIED`;

// action creator function
export const additionAction = todoItem => ({type: TODO_ADDITION, payload: {todoItem}});
export const allCompleteAction = () => ({type: TODO_ALL_COMPLETE, payload: null});
export const completeAction = todoItemId => ({type: TODO_COMPLETE, payload: {todoItemId}});
export const incompleteAction = todoItemId => ({type: TODO_INCOMPLETE, payload: {todoItemId}});
export const deleteAction = todoItemId => ({type: TODO_DELETE, payload: {todoItemId}});
export const editingAction = todoItemId => ({type: TODO_EDITING, payload: {todoItemId}});
export const modifiedAction = modifiedDescription => ({type: TODO_MODIFIED, payload: {modifiedDescription}});
export const changeFilterAction = (targetFilter) => ({type: TODO_CHANGE_FILTER, payload: {targetFilter}});
export const toggleAllCheckedAction = () => ({type: TODO_All_CHECKED_TOGGLE, payload: null});
export const clearCompleteAction = () => ({type: TODO_CLEAR_COMPLETE, payload: null});


// state
const initialState = {
    todoItems: [],
    editItem: {},
    actionFilter: {
        all: true,
        active: false,
        complete: false,
    },
    todoAllChecked: false,
};

// reducer
const reducer = (state = initialState, action) => {

    const todoItemsArray = [...state.todoItems];

    switch (action.type) {

        case TODO_ADDITION :
            todoItemsArray.unshift({...action.payload.todoItem});
            return {
                ...state,
                todoItems: todoItemsArray
            }

        case TODO_ALL_COMPLETE :
            const resultTodoItemsArray = todoItemsArray.map(item => {
                item.isComplete = true;
                return item;
            });
            return {
                ...state,
                todoItems: resultTodoItemsArray,
                todoAllChecked: true,
            }

        case TODO_COMPLETE :
            todoItemsArray.find(item => item.id === action.payload.todoItemId).isComplete = true;
            return {
                ...state,
                todoItems: todoItemsArray
            }

        case TODO_INCOMPLETE :
            todoItemsArray.find(item => item.id === action.payload.todoItemId).isComplete = false;
            return {
                ...state,
                todoItems: todoItemsArray
            }

        case TODO_DELETE :
            const deleteTargetIndex = todoItemsArray.findIndex(item => item.id === action.payload.todoItemId);
            return {
                ...state,
                todoItems: todoItemsArray.filter((item, index) => index !== deleteTargetIndex)
            }

        case TODO_EDITING :
            todoItemsArray.find(item => item.id === action.payload.todoItemId).isEditing = true;
            return {
                ...state,
                todoItems: todoItemsArray,
                editItem: {...todoItemsArray.find(item => item.id === action.payload.todoItemId)}
            }

        case TODO_MODIFIED :
            const targetTodoItemIndex = todoItemsArray.findIndex(item => item.isEditing);
            const targetTodoItemObj = {...todoItemsArray[targetTodoItemIndex]};
            targetTodoItemObj.description = action.payload.modifiedDescription;
            targetTodoItemObj.isEditing = false;
            todoItemsArray[targetTodoItemIndex] = targetTodoItemObj;
            return {
                ...state,
                todoItems: todoItemsArray,
                editItem: {}
            }

        case TODO_CHANGE_FILTER :
            return {
                ...state,
                actionFilter: action.payload.targetFilter
            }

        case TODO_All_CHECKED_TOGGLE :
            return {
                ...state,
                todoAllChecked: !state.todoAllChecked
            }

        case TODO_CLEAR_COMPLETE :

            return {
                ...state,
                todoItems: todoItemsArray.filter(item => !item.isComplete)
            }

        default :
            return state

    }

};

export default reducer

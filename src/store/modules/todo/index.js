// action types
export const TODO_ADDITION = `TODO/ADDITION`;
export const TODO_ALL_COMPLETE = `TODO/ALL_COMPLETE`;
export const TODO_COMPLETE = `TODO/COMPLETE`;
export const TODO_DELETE = `TODO/DELETE`;
export const TODO_MODIFIED = `TODO/MODIFIED`;

// action creator function
export const additionAction = todoItem => ({type: TODO_ADDITION, payload: {todoItem}});
export const allCompleteAction = () => ({type: TODO_ALL_COMPLETE, payload: null});
export const completeAction = todoItem => ({type: TODO_COMPLETE, payload: {todoItem}});
export const deleteAction = todoItem => ({type: TODO_DELETE, payload: {todoItem}});
export const modifiedAction = todoItem => ({type: TODO_MODIFIED, payload: {todoItem}});


// state
const initialState = {
    todoItems: [
        // {description : `반갑습니다.`, isComplete : false, registrationTime : ``}
    ]
};

// reducer
const reducer = (state = initialState, action) => {

    switch (action.type) {

        case TODO_ADDITION :
            return {
                ...state,
            }

        case TODO_ALL_COMPLETE :
            return {
                ...state,
            }

        case TODO_COMPLETE :
            return {
                ...state,
            }

        case TODO_DELETE :
            return {
                ...state,
            }

        case TODO_MODIFIED :
            return {
                ...state,
            }

        default :
            return state

    }

};

export default reducer

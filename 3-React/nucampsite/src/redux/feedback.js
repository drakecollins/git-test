import * as ActionTypes from './ActionTypes';

export const feedback = (state = {feedback: null}, action) => {
    switch(action.type) {
        case ActionTypes.POST_FEEDBACK:
            return {...state, feedback: action.payload}
        default:
            return state;
    }
};
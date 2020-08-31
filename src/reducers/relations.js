import {CHANGE_FILTER, SAVE_RELATION_SUCCESS} from "../actions";

const initialState = {
    data: JSON.parse(localStorage.getItem('data')) || []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_RELATION_SUCCESS:
            return {
                ...state, data: JSON.parse(localStorage.getItem('data')) || []
            };
        case CHANGE_FILTER:
            const data = JSON.parse(localStorage.getItem('data')) || [];
            return {
                ...state, data: action.data.type === 'all' ? data : data.filter(elem => elem.relation === action.data.type)
            };
        default:
            return state;
    }
};
export default reducer;
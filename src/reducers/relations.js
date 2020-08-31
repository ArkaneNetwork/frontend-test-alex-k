import {CHANGE_FILTER, ENABLE_REVERSE, SAVE_RELATION_SUCCESS} from "../actions";

const initialState = {
    data: JSON.parse(localStorage.getItem('data')) || [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_RELATION_SUCCESS:
            return {
                ...state, data: JSON.parse(localStorage.getItem('data')) || []
            };
        case CHANGE_FILTER:

            return {
                ...state, data: action.data.type === 'all' ? state.data : state.data.filter(elem => elem.relation === action.data.type)
            };
            break
        case ENABLE_REVERSE:
            return {
                ...state, data: state.data.map((elem) => {
                    const elemNew = {firstWord: elem.secondWord, secondWord: elem.firstWord, relation: elem.relation};
                    const filterdElems = state.data.filter(element => element.firstWord === elemNew.firstWord && element.secondWord === elemNew.secondWord);
                    return filterdElems.length ? {...elem, status: true} : {...elem, status: false}
                })
            };
        default:
            return state;
    }
};
export default reducer;
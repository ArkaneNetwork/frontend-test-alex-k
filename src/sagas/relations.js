import { put, takeLatest } from 'redux-saga/effects';
import {SAVE_RELATION_REQUEST, SAVE_RELATION_SUCCESS} from "../actions";

function* saveRelation(payload) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.push(payload.data);
    localStorage.setItem('data', JSON.stringify(data));
    yield put({ type: SAVE_RELATION_SUCCESS });
}

const actionWatcher = function* () {
    yield takeLatest(SAVE_RELATION_REQUEST, saveRelation);
};

export default actionWatcher;
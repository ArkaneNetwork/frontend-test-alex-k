import { all } from 'redux-saga/effects';
import relationsWatcher from './relations';

export default function* rootSaga() {
    yield all([
        relationsWatcher()
    ]);
}
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signInFailure } from './action';

export function* signIn({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `deliveryman?id=${id}`);

    if (!response.data.count) {
      // eslint-disable-next-line
      Alert.alert('ID não existente!');
      yield put(signInFailure());
      return;
    }

    const user = response.data.rows[0];

    yield put(signInSuccess(user));
  } catch (e) {
    Alert.alert(
      'Um erro ocorreu ao consultar seu ID. Tente novamente mais tarde.'
    );

    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

import { produce } from 'immer';

const INITIAL_STATE = {
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        draft.signed = false;
        break;
      }
      case 'persist/PURGE': {
        draft.loading = false;
        draft.signed = false;
        break;
      }
      default:
        return state;
    }
  });
}

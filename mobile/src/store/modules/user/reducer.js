import { produce } from 'immer';
import { format, parseISO } from 'date-fns';
import { generateSlug } from '~/utils/helper';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS':
        draft.profile = action.payload.user;
        draft.profile.slug = generateSlug(draft.profile.name);
        draft.profile.formatted_created_at = format(
          parseISO(draft.profile.createdAt),
          'dd/MM/yyyy'
        );
        break;
      default:
    }
  });
}

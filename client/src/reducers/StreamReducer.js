import { mapKeys, omit } from 'lodash-es';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from '../actions/types';

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return omit(state, action.payload);
    case FETCH_STREAMS:
      return { ...state, ...mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};

export default streamReducer;

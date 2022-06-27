import streamsApi from '../api/streams';
import browserHistory from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from './types';

export const signInAction = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOutAction = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStreamAction =
  (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streamsApi.post('/streams', {
      ...formValues,
      userId,
    });
    dispatch({
      type: CREATE_STREAM,
      payload: response.data,
    });
    // programatic navigation to send user
    // to localhost:3000 (root route)
    browserHistory.push('/');
  };

export const fetchStreamsAction = () => async (dispatch) => {
  const response = await streamsApi.get('/streams');
  dispatch({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStreamAction = (streamId) => async (dispatch) => {
  const response = await streamsApi.get(`/streams/${streamId}`);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

// put request replaces the whoe object with
// only passed values where as patch
// updates the given values
export const editStreamAction = (streamId, formValues) => async (dispatch) => {
  const response = await streamsApi.patch(`/streams/${streamId}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });
  // programatic navigation to send user
  // to localhost:3000 (root route)
  browserHistory.push('/');
};

export const deleteStreamAction = (streamId) => async (dispatch) => {
  await streamsApi.delete(`/streams/${streamId}`);
  dispatch({
    type: DELETE_STREAM,
    payload: streamId,
  });
  // programatic navigation to send user
  // to localhost:3000 (root route)
  browserHistory.push('/');
};

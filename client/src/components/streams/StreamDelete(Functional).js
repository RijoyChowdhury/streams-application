import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../Modal';
import browserHistory from '../../history';
import { deleteStreamAction, fetchStreamAction } from '../../actions';

// written in functional component style
// the class component version is present
// in StreamDelete Component
const StreamDelete = (props) => {
  const streamId = useParams().id;

  const deleteStream = () => {
    props.deleteStream(streamId);
  };

  const actions = (
    <>
      <button className="ui negative button" onClick={deleteStream}>
        Delete
      </button>
      <button className="ui button" onClick={() => browserHistory.push('/')}>
        Cancel
      </button>
    </>
  );

  useEffect(() => {
    props.fetchStream(streamId);
  }, [streamId]);

  if (!props.streams[streamId]) {
    return <div>Retrieving Info..</div>;
  }

  return (
    <div>
      StreamDelete
      <Modal
        title="Delete Stream"
        content="Are you sure you want to delete this stream?"
        actions={actions}
        onDismiss={() => browserHistory.push('/')}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { streams: state.streams };
};

export default connect(mapStateToProps, {
  fetchStream: fetchStreamAction,
  deleteStream: deleteStreamAction,
})(StreamDelete);

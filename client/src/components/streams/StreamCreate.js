import React from 'react';
import { connect } from 'react-redux';
import { createStreamAction } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.props.createStreamAction} />
      </div>
    );
  }
}

export default connect(null, {
  createStreamAction,
})(StreamCreate);

import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Modal from '../Modal';
import browserHistory from '../../history';
import { deleteStreamAction, fetchStreamAction } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  deleteStream = () => {
    this.props.deleteStream(this.props.match.params.id);
  };
  returnToMainPage = () => browserHistory.push('/');
  actions = () => (
    <>
      <button
        className={`ui negative button ${this.props.stream ? '' : 'disabled'}`}
        onClick={this.deleteStream}
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );
  renderContent() {
    if (!this.props.stream) {
      return <h4>Fetching Deatils...</h4>;
    }
    return (
      <>
        <h4>Are you sure you want to delete this stream?</h4>
        <h4>Stream: {this.props.stream.title}</h4>
        <h4>Description: {this.props.stream.description}</h4>
      </>
    );
  }
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.actions()}
        onDismiss={this.returnToMainPage}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return { stream: state.streams[props.match.params.id] };
};

const mapActionsToProps = {
  deleteStream: deleteStreamAction,
  fetchStream: fetchStreamAction,
};

const StoreConnectedComponent = connect(
  mapStateToProps,
  mapActionsToProps
)(StreamDelete);

const WrapperComponent = (props) => {
  const { id } = useParams();
  return (
    <StoreConnectedComponent {...{ ...props, match: { params: { id } } }} />
  );
};

export default WrapperComponent;

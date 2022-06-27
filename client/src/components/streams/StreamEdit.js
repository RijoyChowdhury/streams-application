import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreamAction, editStreamAction } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = (values) => {
    // console.log(values);
    this.props.editStream(this.props.match.params.id, values);
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading Details...</div>;
    }
    // initialValues hold special meaning
    // for redux-forms
    // takes up an object of key-value pairs
    // where the keys are the Field component names
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description,
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { stream: state.streams[props.match.params.id] };
};

const StoreConnectedComponent = connect(mapStateToProps, {
  fetchStream: fetchStreamAction,
  editStream: editStreamAction,
})(StreamEdit);

// useParams() can only be used for functional components
// to retrieve the params wrap the class component
// with functional componenet call and pass all props
const WrapperComponent = (props) => {
  const { id } = useParams();
  return (
    <StoreConnectedComponent {...{ ...props, match: { params: { id } } }} />
  );
};

export default WrapperComponent;

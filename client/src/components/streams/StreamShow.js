import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStreamAction } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    stream: state.streams[props.match.params.id],
  };
};

const ConnectedComponent = connect(mapStateToProps, {
  fetchStream: fetchStreamAction,
})(StreamShow);

const WrapperComponent = (props) => {
  const { id } = useParams();
  return <ConnectedComponent {...{ ...props, match: { params: { id } } }} />;
};

export default WrapperComponent;

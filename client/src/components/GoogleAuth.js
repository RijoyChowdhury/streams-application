import React from 'react';
import { connect } from 'react-redux';
import { signInAction, signOutAction } from '../actions';

class GoogleAuth extends React.Component {
  // GAPI medium blog post
  // https://medium.com/google-cloud/gapi-the-google-apis-client-library-for-browser-javascript-5896b12dbbd5
  // https://developers.google.com/identity/sign-in/web/reference
  // this will be deprecated in 2023
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '35224810901-jumq4sd57ik5i44h93534hu7pkhjv3l2.apps.googleusercontent.com',
          scope: 'email',
          plugin_name: 'streams',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signInAction(this.auth.currentUser.get().getId());
    } else {
      this.props.signOutAction();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  signInAction,
  signOutAction,
})(GoogleAuth);

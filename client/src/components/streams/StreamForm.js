import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const fieldClassName = `field ${
      meta.error && meta.touched ? 'error' : null
    }`;
    return (
      <div className={fieldClassName}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          type="text"
          label="Stream Title"
        />
        <Field
          name="description"
          component={this.renderInput}
          type="text"
          label="Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validateFields = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Please enter a title';
  }
  if (!formValues.description) {
    errors.description = 'Please enter a description';
  }
  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validateFields,
})(StreamForm);

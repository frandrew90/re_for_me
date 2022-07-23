import React from 'react';
import PropTypes from 'prop-types';

const AddForm = ({ onSubmit, formName, placeholder }) => {
  return <div>AddForm</div>;
};

AddForm.propTypes = {
  onSubmit: PropTypes.func,
  formName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AddForm;

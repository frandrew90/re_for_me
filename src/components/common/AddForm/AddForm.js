import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../../common/BigButton/BigButton';
import Paper from '../../common/Paper/Paper';
import s from './AddForm.module.css';

const AddForm = ({ onSubmit, formName, placeholder }) => {
  const [input, setInput] = useState('');

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
    reset();
  };

  const reset = () => setInput('');

  return (
    <div className={s.container}>
      <Paper>
        <div className={s.inner}>
          <h4 className="formName"> {formName}</h4>
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              type="text"
              placeholder={placeholder}
              required
              onChange={handleChange}
            />

            <BigButton type="submit" text="Add" disabled={!input} />
          </form>
        </div>
      </Paper>
    </div>
  );
};

// class AddForm extends Component {
//   state = { city: '' };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.props.onSubmit(this.state.city);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ city: '' });
//   };

//   render() {
//     const { city } = this.state;
//     const { formName, placeholder } = this.props;

//     const isAddBtnDisabled = Object.values(this.state).some(
//       value => typeof value !== 'boolean' && !value,
//     );

//     return (
//       <div className={s.container}>
//         <Paper>
//           <div className={s.inner}>
//             <h4 className="formName"> {formName}</h4>
//             <form onSubmit={this.handleSubmit}>
//               <input
//                 name="city"
//                 value={city}
//                 type="text"
//                 placeholder={placeholder}
//                 required
//                 onChange={this.handleChange}
//               />

//               <BigButton type="submit" text="Add" disabled={isAddBtnDisabled} />
//             </form>
//           </div>
//         </Paper>
//       </div>
//     );
//   }
// }

AddForm.propTypes = {
  onSubmit: PropTypes.func,
  formName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AddForm;

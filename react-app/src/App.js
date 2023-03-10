import { useState } from 'react'
const App = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  //Show input error messages
  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

  //show success colour
  function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  //check email is valid
  function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSucces(input)
    } else {
      showError(input, 'Email is not invalid');
    }
  }


  //checkRequired fields
  function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`)
      } else {
        showSucces(input);
      }
    });
  }


  //check input Length
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
      showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    } else {
      showSucces(input);
    }
  }

  //get FieldName
  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  // check passwords match
  function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match');
    }
  }


  // submit handler
  const formSubmitHandler = function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
  }

  return (
    <div className="container">
      <form id="form" className="form">
        <h2>Register With Us</h2>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <small>Error Message</small>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <small>Error Message</small>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <small>Error Message</small>
        </div>
        <div className="form-control">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" id="password2" placeholder="Enter password again"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
          <small>Error Message</small>
        </div>
        <button onClick={formSubmitHandler}>Submit</button>
      </form>
    </div>
  );
}

export default App
import '../index.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, {useCallback} from 'react';
import toast from 'react-hot-toast';

const SignIn = () => {
  const navigate = useNavigate();

  const facebook = useCallback(async () => {
    axios.get('http://localhost:9000/authenticate/facebook', {headers: {
      'mode': 'cors',
      'accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      'Access-Control-Allow-Credentials': true
    }}, { withCredentials: true }).then(response => console.log(response));
  }, [])

  const google = useCallback(async () => {
    axios.get('http://localhost:9000/authenticate/google', {headers: {
      'mode': 'cors',
      'accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    }}, { withCredentials: true }).then(response => console.log(response)).catch(error => console.log(error));
  }, [])

  const handleSubmit = (event) => {

    let config = { withCredentials: true };
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    const requestOptions = {
      headers: {
        'mode': 'cors',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      },
      body: { 'email': uname.value, 'password': pass.value }
    };
    axios.post('http://localhost:9000/signIn', requestOptions, config)
      .then(response => {
        localStorage.setItem("userId", response.data.id);
        console.log(response);
        if (response.status === 200) {
          window.location.href = `/`;
        }
      }).catch(error => {
        console.log(error);
        navigate('/sign-in');
        toast.error("Wrong login or password. Please, try again!");
      } );
};

  return (
    <div>
      <div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/uk_UA/sdk.js#xfbml=1&version=v14.0&appId=819756232808182&autoLogAppEvents=1" nonce="v2ivRkqN"></script>
          <div style={login_style}>
        <div style={{'font-size': '30px', 'margin-bottom': '20px'}}>Sign In</div>
      <div style={mystyle}>
        <form onSubmit={handleSubmit} >
          <div style={input_style}>
            <label style={{  'font-size': '22px'}}>Username </label>
            <input style={input_s }type="text" name="uname" required />
              {/* {renderErrorMessage('uname')} */}
          </div>
          <div style={input_style}>
            <label style={{'font-size': '22px'}}>Password </label>
            <input style={input_s } type='password' name='pass' required />
                  {/* {renderErrorMessage('pass')} */}
          </div>
          <div style={{"text-align": "center"}}>
            <input style={button_sub} type="submit" />
          </div>
          </form>
          <div style={{"display":"block"}}>
            <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false">
              <button style={button_sub} onClick={() => facebook()}>Facebook</button>
            </div>
            <div>
              <button style={button_sub} onClick={() => google()}>Google</button>
            </div>
          </div>
      </div>
      <div style={{ 'font-size': 27, "text-align": "center" }}>
        <a href='/sign-up'>
          <p>You dont have account? Sign up here</p> 
        </a>
      </div>
  </div> </div>
  );
    

}

const mystyle = {
  color: 'white',
  backgroundColor: '#de6f83',
  'border-radius': "30px",
  padding: '10px',
  fontFamily: 'Arial',
  display: 'flex',
  'justify-content': 'center',
  gap: '20px',
  height: '60vh',
  'align-items': 'center',
  'font-family': 'sans-serif'
};

const login_style = {
  'border-radius': "35px",
  'background-color': 'white',
  'padding': '2rem',
  'box-shadow':
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  'align-items': 'center',
};

  const input_style = {
      display: 'flex',
      'flex-direction': 'column',
      gap: '8px',
      margin: '10px'
  }
  const input_s = {
      height: '40px',
      width: '350px',
      border: '1px solid rgba(0, 0, 0, 0.2)'
  }

  const button_sub = {
      'margin-top': '10px',
      'margin-bottom': '10px',
      cursor: 'pointer',
      'font-size': '15px',
      background: '#322b3c',
      border: '1px solid #322b3c',
      color: '#fff',
      padding: '10px 20px',
    'align-items': 'center',
      "width":"150px"
    }
  


export default SignIn;
import '../index.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, {useState} from 'react';

const SignIn = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const mystyle = {
    color: 'white',
    backgroundColor: '#baaad0',
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
        cursor: 'pointer',
        'font-size': '15px',
        background: '#322b3c',
        border: '1px solid #322b3c',
        color: '#fff',
        padding: '10px 20px',
        'align-items': 'center'
      }
    
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className='error'>{errorMessages.message}</div>
    );

    var getCookies = function(){
      var pairs = document.cookie.split(";");
      var cookies = {};
      for (var i=0; i<pairs.length; i++){
        var pair = pairs[i].split("=");
        // sessionStorage.setItem((pair[0] + '').trim(), pair.slice(1).join('='));
        cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
      }
      return cookies;
    }
  const handleSubmit = (event, res, req) => {

    let config = { withCredentials: true };
        // Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    const requestOptions = {
      headers: {
        'mode': 'cors',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      },
      body: { 'email': uname.value, 'password': pass.value }
    };
    axios.post('http://localhost:9000/signIn', requestOptions, config )
      .then(response => {
        localStorage.setItem("userId", response.data.id);
        console.log(response.data.id);
        response.status === 200 ? window.location.href = `/` : window.location.href = `/sign-in`;
      }
      );
    setIsSubmitted(true);
};

  const renderForm = (
    <div>
      <div style={mystyle}>
        <form onSubmit={handleSubmit} >
          <div style={input_style}>
            <label style={{  'font-size': '22px'}}>Username </label>
            <input style={input_s }type="text" name="uname" required />
              {renderErrorMessage('uname')}
          </div>
          <div style={input_style}>
            <label style={{'font-size': '22px'}}>Password </label>
            <input style={input_s } type='password' name='pass' required />
                  {renderErrorMessage('pass')}
          </div>
          <div style={{"text-align": "center"}}>
            <input style={button_sub} type="submit" />
          </div>
        </form>
      </div>
      <div style={{ 'font-size': 27, "text-align": "center" }}>
        <a href='/sign-up'>
          <p>Nie masz konta? Załóż</p> 
        </a>
      </div>
  </div>
  );
    
      return (
        <div className="app">
          <div style={login_style}>
            <div style={{'font-size': '30px',
  'margin-bottom': '20px'}}>Sign In</div>
            {
isSubmitted ? <div>User is successfully logged in
    </div> : renderForm}
          </div></div>
      );
}

export default SignIn;
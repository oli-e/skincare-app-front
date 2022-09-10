import '../index.css';
import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const [errorMessages, setErrorMessages] = useState({});
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
    };
    const input_s = {
        height: '40px',
        width: '350px',
        border: '1px solid rgba(0, 0, 0, 0.2)'
    };

    const button_sub = {
        'margin-top': '10px',
        cursor: 'pointer',
        'font-size': '15px',
        background: '#322b3c',
        border: '1px solid #322b3c',
        color: '#fff',
        padding: '10px 20px',
        'align-items': 'center'
    };

  const handleSubmit = (event) => { 
    event.preventDefault();

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE";
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Authorization'
    axios.defaults.headers.common['accept'] = "application/json";
    axios.defaults.headers.common['mode'] = "cors";

    let config = { withCredentials: true };

    
    var { uname, pass } = document.forms[0];

    const requestOptions = 
      { 'email': `${uname.value}`, 'password': `${pass.value}` }
      ;
    
    
    axios.post('http://localhost:9000/signUp', requestOptions, config )
      .then(response => {
        localStorage.setItem('userId', response.data.id);
        if (response.status === 201) {
          navigate('/sign-in');
          toast.success("Now please login");
        } 
      }
    ).catch(error => {
      console.log(error);
      navigate('/sign-up');
      toast.error("Something went wrong. Please, try again!");
    } );

    };

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className='error'>{errorMessages.message}</div>
    );

    return (
<div>
    <div style={login_style}>
        <div style={{'font-size': '30px', 'margin-bottom': '20px'}}>Sign Up</div>
        <div style={mystyle}>
          <form onSubmit={handleSubmit} >
            <div style={input_style}>
              <label style={{'font-size': '22px'}}>Username </label>
              <input style={input_s }type='text' name='uname' required />
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
          <a href='/sign-in'>
            <p>Masz już konto? To zaloguj sie tu</p> 
          </a>
        </div>
    </div>
</div>
    )
    }

export default SignUp;
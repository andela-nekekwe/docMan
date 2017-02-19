import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    };
    
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  onEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
        password: event.target.value
    });
  }

  onClickSave() {
    console.log(this.state);
  }

  render() {
    return (
      <main>
        <center>
          <div className="section"></div>

          <h5 className="indigo-text">Please, login into your account</h5>
          <div className="section"></div>

          <div className="container">
            <div className="z-depth-1 grey lighten-4 row">

              <div className="col s12">
                <div className='row'>
                  <div className='col s12'>
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='' type='text'
                      name='email' id='email'
                      onChange={this.onEmailChange}
                       />
                  </div>
                </div>

                <div className='row'>
                  <div className='input-field col s12'>
                    <input className='validate' type='password'
                      name='password' id='password'
                      onChange={this.onPasswordChange}
                    />
                  </div>
                  <label>
                    <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                  </label>
                </div>

                <br />
                <center>
                  <div className='row'>
                    <button type='submit' name='btn_login' 
                    className='col s12 btn btn-large waves-effect indigo'
                    value ="save"
                    onClick= {this.onClickSave}
                    >Login</button>
                  </div>
                </center>
              </div>
            </div>
          </div>
          <a href="#!">Create account</a>
        </center>

        <div className="section"></div>
        <div className="section"></div>
      </main>
    );
  }
}

export default Login;
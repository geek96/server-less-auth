import React, { Component } from 'react';
import './App.css';


import sjcl from 'sjcl';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {},
      ciphertext: ''
    }       
    this.handleInputChange = this.handleInputChange.bind(this);
    this.doRegister = this.doRegister.bind(this);
  }

 

  doRegister() {
    const salt = sjcl.random.randomWords(4,0);   
    const params = {
                    mode:"ccm",
                    iter:1000,
                    ks:256,
                    ts:128,
                    v:1,
                    cipher:"aes",
                    adata:"",
                    salt: salt
    }   

    const password = this.state.form.password;
    const email = this.state.form.email;
    if (typeof password !== 'undefined' && typeof email !== 'undefined'){
      const ciphertext = JSON.parse(sjcl.encrypt(password, email, params));
      this.setState({ciphertext: JSON.stringify(ciphertext, null, 2)})
    }

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const form = this.state.form;
    form[name] = value
    this.setState({form: form});
  }  

  render() {
    
    return (
      <div className="app">       
        <p>Email:<br /><input type="text" name="email" onChange={this.handleInputChange} /></p>
        <p>Password:<br /> <input type="password" name="password" onChange={this.handleInputChange} /> </p>
        <p><button onClick={this.doRegister}>Register</button></p>
        {this.state.ciphertext ?<p><label>Encrypted Key</label><textarea rows="20" value={this.state.ciphertext}></textarea></p> : null }
      </div>
    );
  }
}

export default App;

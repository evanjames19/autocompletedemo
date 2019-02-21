import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';

class App extends Component {

  constructor() {
    super();

    this.state = {
      userword: '',
      autocompleteword: '',
      sentence: '',
    };
  }

  handleChange = async (value) => {
    const response = await fetch('http://127.0.0.1:5000/reddit', { method: "POST", mode: "cors", headers: {"Content-Type": "application/json", } ,body: JSON.stringify({ "word1": value }) });
    
    if(response.ok) {
    const json = await response.json();
    console.log(json)

    this.setState({ userword: value, autocompleteword: json.word })
    }
    else {
      this.setState({ userword: value, autocompleteword: value})
    }
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
        this.setState({ userword: '', sentence: this.state.sentence + ' ' + this.state.autocompleteword })
    }
}



  render() {
    return (

      <div>
        <div>
        <TextField
          value={this.state.userword}
          onChange={(event) => this.handleChange(event.target.value)}
          style={{ margin: 8 }}
          fullWidth
          onKeyPress={this.onKeyPress}
        />

        </div>
  
        <input type="text" value={this.state.autocompleteword} />

        <TextField
          value={this.state.sentence}
          style={{ margin: 8 }}
          fullWidth
        />

        </div>
    );
  }
}

export default App;

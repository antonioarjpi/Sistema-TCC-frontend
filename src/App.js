import React from 'react';

import 'bootswatch/dist/superhero/bootstrap.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import './App.css';
import Router from './routes/router';

class App extends React.Component{
  render(){
    return(
      <>
        <Router />
      </>
    )
  }
}

export default App;

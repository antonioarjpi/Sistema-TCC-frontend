import React from 'react';

import 'bootswatch/dist/litera/bootstrap.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import './App.css';

import Router from './routes/router';
import { AuthProvider } from './context/AuthContext';

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Router />
      </AuthProvider>
    )
  }
}

export default App;

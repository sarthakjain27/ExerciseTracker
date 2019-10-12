import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*
Right now our front-end and backend our separate. 
We will connect them both by send HTTP requests from front end to backend. For this, we will be using
axios library to send http requests to backend

so need to install that in frontend - npm install axios
*/

ReactDOM.render(<App />, document.getElementById('root'));

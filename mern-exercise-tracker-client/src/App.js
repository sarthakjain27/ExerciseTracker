import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/navbar.component'
import ExerciseList from './components/exercise-list.component'
import EditExercise from './components/edit-exercise.component'
import CreateExercise from './components/create-exercise.component'
import CreateUser from './components/create-user.component'

//We have to put everything we want to be used with the router inside the <Router></Router>

//ReactRouter
//React-router helps us to map urls to specific components which will get loaded on the page for that url

function App() {
  /*
  We are going to put a router element for each route in the application
  */
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path='/' exact component={ExerciseList}/>
        <Route path='/edit/:id' exact component={EditExercise}/>
        <Route path='/create' exact component={CreateExercise}/>
        <Route path='/user' exact component={CreateUser}/>
      </div>
    </Router>
  );
  /*
    We add a <Route /> element for each route that we want. 
    Eg: if the user lands on /root_url/ he will be getting the component ExerciseList
    if the user lands on /edit/:id he will be getting EditExercise component. :id , id here is the object id
    given by MongoDB
  */
}

export default App;

/*

*/

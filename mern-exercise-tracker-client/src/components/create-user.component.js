import React from 'react';

//to send http requests from frontend to backend api via axios
import axios from 'axios'

class CreateUser extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            username:'',
            
        }
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    
    onChangeUsername(e)
    {
        this.setState({
            username:e.target.value
        })
    }

    onSubmit(e)
    {
        //preventing default action that happens on submit of form in html
        e.preventDefault();

        const newUser={
            username:this.state.username
        }

        console.log(newUser)

        //endpoint is expecting a json object in the request body, so passing a new object as second parameter
        //of axios.post
        axios.post('http://localhost:5000/users/add',newUser).then((res)=>{
            console.log(res.data)
        })

        //We can send the user to homepage by uncommenting below line. Here we are giving option to add multiple
        //users at the same time so we are not doing window.location instead resetting this.state to ''
        //window.location="/";

        this.setState({
            username:''
        })

    }

    render(){
        return(
            <div>
                <h3>Create a New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}></input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser
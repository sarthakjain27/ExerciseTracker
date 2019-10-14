import React from 'react';
import ReactDOM from 'react-dom';
import server_base_url from './config'
import axios from 'axios'

class DeleteUser extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            usernameid:'',
            base:server_base_url,
            users:[]
        }
        this.onChangeUserName=this.onChangeUserName.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(this.state.base+'users/').then((response)=>{
            if(response.data.length > 0)
            {
                this.setState({
                    users:response.data,
                    username:response.data[0].username,
                    usernameid:response.data[0]._id
                })
            }
        }).catch((err)=>{
            console.log("Unable to get list of users: "+err);
        })
    }

    onChangeUserName(e)
    {
        /*
            setting a single field, just updates that field and doesn't make all other fields vanish :p
        */

        console.log("Inside onChangeUserName");
        console.log(e.target.value)

        this.setState({
            username:e.target.value
        },()=>{
            usernameid:this.state.users.find((user)=>{
                if(user.username===this.state.username)
                    return user._id;
            })
        });
    }

    onSubmit(e)
    {
        e.preventDefault();

        axios.delete(this.state.base+'users/'+this.state.usernameid).then((response)=>{
            console.log(response.data);
            alert(+" user deleted");
        }).catch(err=>console.log("Error: "+err));

        this.setState({
            users:this.state.users.filter((each)=>{
                return each._id!==this.state.usernameid;
            })
        },()=>{
            this.setState({
                username:this.state.users[0].username,
                usernameid:this.state.users[0]._id
            })
        })
    }

    render(){
        return(
            <div>
                <h3>Delete an existing User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                            {   //opening of curly braces so as to enter js code and distinguish from JSX html code
                                this.state.users.map((user)=>{
                                    //<option>value_to_be_displayed</option>
                                    return <option key={user.username} value={user.username}>{user.username}</option>
                                })
                                //closing of curly braces meaning our js code has finished
                            }   
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default DeleteUser
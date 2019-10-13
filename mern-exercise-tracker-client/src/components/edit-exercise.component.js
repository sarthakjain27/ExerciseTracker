/*
This Component will allow us to create a new exercise and put that into the database
*/
import React from 'react';

//to send http requests from frontend to backend api via axios
import axios from 'axios'

/*
The below two datepicker class will help us in providing a calendar input for the date form field
*/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import server_base_url from './config'


class EditExercise extends React.Component{
    
    constructor(props)
    {
        super(props);
        /*
        We are going to create properties of this.state object which would correspond to the fields of the
        MongoDB document
        */
        this.state={
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            base:server_base_url,
            users:[] //we are using an array of users corresponding to users in our MongoDB
            //this will help us in assigning an exercise to a user, which we are going to provide as a dropdown
            //of all present users in our db
        }
        /*
        We put variables in state and don't do let myvar; Since when we update state, react will automatically
        update the page with new updated state values
        */

        this.onChangeUserName=this.onChangeUserName.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeDuration=this.onChangeDuration.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    /*
    Right now hardcoding list of users. Otherwise it will come from DB and will populate users array
    */
    componentDidMount(){

        axios.get(this.state.base+'exercises/'+this.props.match.params.id).then((response)=>{
            this.setState({
                username:response.data.username,
                description:response.data.description,
                duration:response.data.duration,
                date:new Date(response.data.date)
            })
        }).catch(err=>console.log("Error in getting data for the record: "+err));

        axios.get(this.state.base+'users/').then((response)=>{
            //response.data returns an array of objects containing our documents in the database
            if(response.data.length > 0)
            {
                this.setState({
                    users:response.data.map((user)=>{
                        return user.username;
                    })
                })
            }
        }).catch((err)=>{
            console.log("Unable to get list of users: "+err);
        })
    }

    /*
    We are going to have a web form. with fields to be entered by user. When user adds a value in the input box
    we are sending the input box. e.target gives us the input box and .value on that gives the value entered
    by user for the input box
    */
    onChangeUserName(e)
    {
        /*
            setting a single field, just updates that field and doesn't make all other fields vanish :p
        */
        this.setState({
            username:e.target.value
        });
    }

    onChangeDescription(e)
    {
        this.setState({
            description:e.target.value
        });
    }

    onChangeDuration(e)
    {
        this.setState({
            duration:e.target.value
        });
    }

    /*
    Will use a library to make a calendar that appears and we can click the date on the calendar
    */
    onChangeDate(date)
    {
        this.setState({
            date:date
        });
    }

    onSubmit(e){
        //this is done to prevent html default action on submit of a form
        //and that we can execute our operation
        e.preventDefault();

        const newExercise={
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }

        //right now just console logging the exercise details user has entered.
        console.log(newExercise);
        
        axios.post(this.state.base+'exercises/update/'+this.props.match.params.id,newExercise).then((res)=>{
            console.log(res.data);
            //redirecting user to homepage after submit of the form
            window.location="/";
        }).catch(error => {console.log("Error aa gayi")})
    }

    /*
        <div></div> inside form creates each new form entry
        <label></label> gives what is to be displayed in the form
        <select></select> provides with a list to select a value
    */
    render(){
        return(
            <div>
                <h3>Edit Exercise</h3>
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
                                return <option key={user} value={user}>{user}</option>
                            })
                            //closing of curly braces meaning our js code has finished
                        }   
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}></input>
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}></input>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}/>
                    </div>

                    {
                        /* adding a button which is of type submit which will create event onsubmit which we
                        are handling in the form starting. The value is what will be displayed on the button
                        */
                    }
                    <div className="form-group">
                        <input type="submit" value="Update Exercise" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercise
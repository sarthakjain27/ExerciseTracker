import React from 'react';
import axios from 'axios';
import Exercise from './Exercise'
import server_base_url from './config'


class ExerciseList extends React.Component{
    constructor(props){
        super(props);
        console.log('const')
        this.state={
            base:server_base_url,
            exercises:[]
        }
        this.deleteExercise=this.deleteExercise.bind(this);
    }

    componentDidMount(){
        axios.get(this.state.base+'exercises/').then((response)=>{
            this.setState({
                exercises:response.data
            })
        }).catch(err=>console.log("Error: "+err));
    }

    deleteExercise(id)
    {
        axios.delete(this.state.base+'exercises/'+id).then((response)=>{
            console.log(response.data);
        }).catch(err=>console.log("Error: "+err));

        this.setState({
            exercises:this.state.exercises.filter((each)=>{
                return each._id!==id;
            })
        })
    }

    exerciseList(){
        return this.state.exercises.map((eachExercise)=>{
            //for each object in exercise we are returning an Exercise component and passing three props
            return <Exercise exercise={eachExercise} deleteExercise={this.deleteExercise} key={eachExercise._id}/>
        })
    }

    render(){
        console.log('in render')
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExerciseList
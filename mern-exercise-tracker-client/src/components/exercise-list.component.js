import React from 'react';
import axios from 'axios';
import Exercise from './Exercise'


class ExerciseList extends React.Component{
    constructor(props){
        super(props);
        console.log('const')
        this.state={
            exercises:[]
        }
        this.deleteExercise=this.deleteExercise.bind(this);
    }

    componentDidMount(){
        console.log('com did m')
        axios.get('http://localhost:5000/exercises/').then((response)=>{
            this.setState({
                exercises:response.data
            })
        }).catch(err=>console.log("Error: "+err));
    }

    deleteExercise(id)
    {
        axios.delete('http://localhost:5000/exercises/'+id).then((response)=>{
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
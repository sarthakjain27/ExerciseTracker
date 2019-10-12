import React from 'react';
import {Link} from 'react-router-dom';

class Exercise extends React.Component{
    
    render(){
        return(
            <tr>
                <td>{this.props.exercise.username}</td>
                <td>{this.props.exercise.description}</td>
                <td>{this.props.exercise.duration}</td>
                <td>{this.props.exercise.date.substring(0,10)}</td>
                <td>
                    <Link to={"/edit/"+this.props.exercise._id}> Edit </Link> | <a href="#" onClick={()=>{this.props.deleteExercise(this.props.exercise._id)}}> Delete</a>
                </td>
            </tr>
        )
    }
}

export default Exercise
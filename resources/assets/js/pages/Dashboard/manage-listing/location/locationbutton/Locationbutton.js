import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Locationbutton extends React.Component {
    render(){
        return(
            <div className="calendar_savebuttons col-sm-12"> 
                <a href="/description" className="right_save">Back</a>
                <a href="/amenities" className="right_save_continue" >Next</a>
            </div>
            
        )
    }
}

export default Locationbutton;
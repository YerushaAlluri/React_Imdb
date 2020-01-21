import React from 'react'
import Axios from 'axios'

const Titles = (props) =>{

   const options = props.results.map(r =>(
       <row>
       <ul>
        
       <li>
           {r.Title}
       </li>
       {/* <li><img src={r.Poster} onClick={this.getMovieDetails}></img></li>*/}
       </ul> 
       </row>
      
   ))
   return <ul>{options}</ul>
}

export default Titles
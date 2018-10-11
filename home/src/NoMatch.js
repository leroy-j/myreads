import React from 'react';
import { Link } from 'react-router-dom'

//Handler for urls entered by user that does not match a component
class NoMatch extends React.Component {

  render(){
    const paths=['/search','/'];
    
    return (
     (paths.indexOf(this.props.match.url, 0) === -1) && 
     (<div className="page404">
       <center>
        <h1 style={{position: 'relative'}}>404</h1>
        <Link className="btn-link" to="/">Return to My Reads</Link>
      </center>
      <hr />

      <nav>
        <Link className="link-options" to="/">My Reads</Link> |	<Link className="link-options" to="/search">Search</Link>

      </nav>
     </div>))
   }


}


export default NoMatch

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Titles extends Component{
  bookList(read){
    return read.map((book)=>(
      <li key={book.title}>
				<div className="book">
	  			<div className="book-top">
	    			<div className="book-cover" style={{backgroundImage: 'url('+book.imageLinks.smallThumbnail+')'}}></div>
	      		<div className="book-shelf-changer">
							<select value={shelf} key={book.id} name={book.id}  onChange={this.props.changeHandler}>
		  					<option value="move" disabled>Move to...</option>
		  					<option value="currentlyReading">Currently Reading</option>
		  					<option value="wantToRead">Want to Read</option>
		  					<option value="read">Read</option>
		  					<option value="none">None</option>
							</select>
	     			</div>
	   			</div>
	   			<div className="book-title">{book.title}</div>
	   			<div className="book-authors">
	    		{ book.authors.map((auth,i)=><p style={{margin:0,padding:0  }} key={i}>{auth}</p>) }
	  		</div>
			</div>
     </li>
    )) 
  }
	
  render(){
    const read = this.props.read;
    return (
	 this.bookList(read);
    )
  }

}	
Titles.PropType={
	
	read:object
}
export default Titles

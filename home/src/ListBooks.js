import React, { Component } from 'react';
import mapObject from './utils.js';
import PropTypes from 'prop-types';
import Titles from'./Titles';

class ListBooks extends Component{
  
  render(){
    const titles = this.props.books
    const shelf = this.props.shelf
    const arr = mapObject(titles)
    const read = arr.filter((c)=>(
          (c.shelf && c.shelf.toLowerCase() === shelf.toLowerCase())
     ))
    
    return(
      <ol key="listbook" className="books-grid">
        <Titles read={read} />
      </ol>
    )
  }
}

ListBooks.propTypes = {
  shelf: PropTypes.string,
  titles: PropTypes.object
}  

export default ListBooks
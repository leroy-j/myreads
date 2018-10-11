import  React, { Component } from 'react'
import mapObject from './utils.js'
import PropTypes from 'prop-types'

class ListBooks extends Component{
  
   constructor(props) {
    super(props);
    this.props = props
    this.onShelfChange = this.onShelfChange.bind(this)
  }
  
  
  onShelfChange(e){ 
     const bookid = e.target.name,
           shelf = e.target.value
    if(bookid){
       const book = this.props.books.filter((b)=>( b.id === bookid    )         ) 
  		this.props.changeHandler(book[0],shelf,false)
    }  
  }
  
  static getDerivedStateFromProps(props, state){
  
    console.log('getDerivedStateFromProps called....',props)
  }
  
  
  
  
  render(){ 
    const titles = this.props.books
    const shelf = this.props.shelf
    const arr = mapObject(titles)
    const read = arr.filter((c)=>(
          (c.shelf && c.shelf.toLowerCase() === shelf.toLowerCase())
     ))
    
   
    return(
       <ol key="listbook" className="books-grid">
       { read.map((book)=>(
          <li key={book.title}>
            <div className="book">
               <div className="book-top">
     		     <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:  'url('+book.imageLinks.smallThumbnail+')'}}></div>
                 <div className="book-shelf-changer">
                   <select value={shelf} key={book.id} name={book.id}  onChange={this.onShelfChange}>
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
					{      
          			//  book.authors.map((auth,i)=><p style={{margin:0,padding:0  }} key={i}>{auth}</p>
                      //)
					}
				   </div>
                  </div>
             </li>
             )) 
           }
           </ol>
     )
   }
}

ListBooks.propTypes = {
  shelf: PropTypes.string,
  titles: PropTypes.object
}  

export default ListBooks
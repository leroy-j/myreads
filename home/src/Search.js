import React, {Component} from 'react'
import mapObject from './utils.js'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Modal from './Modal'

class Search extends Component{
 
  constructor(props) {
    super(props);
    this.props = props
    this.state = {showModal: false,selectedSearch:{}}
    this.onPreview  = this.onPreview.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
    this.onShelfChange = this.onShelfChange.bind(this)
} 
  
  
    
onPreview(e) { 
    let _book = {}
    e.preventDefault()
    const bid = e.target.name            
     _book = this.props.searchResults.filter( (c)=>c.id === bid    ) 
      this.setState({
      	showModal: true,
      	selectedSearch:_book
      });
  }
    
 onHideModal(e){
   e.preventDefault()
    this.setState({showModal: false});
 }
  
  /*
  * TODO: change button color if selected seach was added to my reads
  */
  getBtn(haystack,needle){
    const res = haystack.filter((c)=> c.title === needle.title );
    if(res.length)
   	  return ( <Link className="btn active" to='/'>View In My Reads</Link>)
   	else
      return (<button 
             	className="btn default" 
                name={needle.id}
             	onClick={this.props.onAddBook}
             	>Add to my reads</button>)
 }
  
  rating({ averageRating = '', ratingsCount = 0 } = {}){
    const parts = averageRating.toString().split('.');
    let stars  = [];
    if(!arguments || arguments.length===0 || averageRating===''){
       stars = ['x','x','x','x','x']; 
    }
	else{
	  for(var j=0;j<parts[0];j++)
        stars.push(j);

        if(parts[1] && parts[1].length)
          stars.push(parts[1])
		if(stars.length < 5){ 
          stars.push('x');
			if(stars.length < 5){
               stars.push('x')
           }
        }
	}
    return(
    	<fieldset>
         { 
           stars.map((star,i)=>{ 
               if(star === '5')
                 return (<span key={i} className="rating"><label className="half" htmlFor="star{star}"></label>
  						</span>)
                else if(star ==='x'){ 
                  return (<span key={i} className="empty"><label className="half" htmlFor="star{i}" ></label>
  						</span>)
                }
                 else
                   return(<span key={i} className="rating"> 
 						   <label className="full" htmlFor="star{star}"></label>
  						   </span>)
            })
         }
		</fieldset>
    )
  }
  
  checkResults(){  
    if(Array.isArray(this.props.searchResults)){
       if(!this.props.searchResults.length || this.props.searchResults[0] === 'empty query'){
          return false;	
       }  
    }
    return this.props.searchResults
  }

  onShelfChange(e){ 
     const bookid = e.target.name,
           shelf = e.target.value
    if(bookid){
      const book = this.props.searchResults.filter((b)=>( b.id === bookid    )         )
      this.props.onChange(book[0],shelf,true)
    } 
  }
render(){   
	const selectedSearch = this.state.selectedSearch[0]
    return(
     <div id="books-main" className="search-books">
     	<div className="search-books-bar">
        	<Link className="close-search" to={{ pathname:'/'}}>Close</Link>
            	<div className="search-books-input-wrapper">
                	<input type="text" 
						onChange={this.props.doSearch} 
						placeholder="Search by title or author"/>
			  	</div>
            </div>
	<br /><br />    
	<div className="bookshelf">
	{ 
       (this.checkResults()) && ( <h2> Search Results</h2>     )
    }
	  <div className="bookshelf-books">
		<ol className="books-grid">
		{ 
          //(this.checkResults()) ? (this.props.searchResults.map((book,i)=>
          (this.checkResults()) ? (_.merge(this.props.searchResults,this.props.books).map((book,i)=>
            (<li key={i}>
	       <div className="book">
	         <div className="book-top">
                   <a href="" title="Click to preview"  onClick={this.onPreview} name={book.id} className="book-cover" 
				style={{width: '128px', 
                                height: '192px', 
                                backgroundImage: 'url('+book.imageLinks.thumbnail+')'}} >  </a>
		 <div className="book-shelf-changer">
	           <select onChange={this.onShelfChange} defaultValue={book.shelf?book.shelf:'none'} name={book.id}>
		     <option value="move" disabled="">Move to...</option>
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
	     mapObject(book.authors).map((auth,i)=><p key={i} style={{margin:0,padding:0,color:'#999',fontSize:'0.8em'}}>{auth}</p>)
            }
           </div>
	  {
            this.rating({averageRating:book.averageRating})
          }
	  {
   	    (parseInt(book.ratingsCount,0) > 0 )&& (<span style={{ fontSize:'0.7em',color:'blue'}}>{book.ratingsCount} - Reviews</span>)
	  }
	 </div>
        </li>))) : ( <li style={{ opacity:0.2}}>No results..</li>  )
       </ol>
      </div>
	     {
         (this.state.showModal ) && 
         (<Modal selectedSearch={selectedSearch} onHideModal={this.onHideModal}/>)
        }
       </div>
      </div>
     )
  }
}

Search.propTypes={
  doSearch: PropTypes.func,
  onAddBook: PropTypes.func,
  onChange: PropTypes.func,
  searchResults: PropTypes.array
}

export default Search

import React from 'react';
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import './Rating.css'
import ListBooks from './ListBooks'
import Search from './Search'
import mapObject from './utils'
import NoMatch from './NoMatch'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.props = props
    this.getChange = this.getChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.onAddBook = this.onAddBook.bind(this);
    this.state = {
      searchResults:{},  //list of results if present
      selectedSearch:props.selectedSearch,  //book selected from search result
  	}
  }
  
  componentDidMount() {
    BooksAPI.getAll()
      .then((books)=>{
        this.setState(()=>({
          books
      }))
    })
  }
  
  /*
  * TODO: use isnew flag items or something
  */
  getChange(book,shelf,isnew){
    BooksAPI.update(book,shelf)
    .then((b)=>{
      BooksAPI.getAll()
        .then((books)=>{
          this.setState(()=>({
            books
           }))//end setState
        }) }//end Arrow func
    )//end then
  }

  doSearch(e){
    const term = e.target.value
    if(term && term.length){
       BooksAPI.search(e.target.value)
      	.then((res) => {  
        	const results = mapObject(res);
        	if(results.length) 
              this.setState((state)=>({results}))
          else{
            //alert('no results')
          }
      })
    }
	else{ 
      this.setState((state)=>({
  		results:[]
      })
    )
    }
  }

  onAddBook(e){
    e.preventDefault()
    const bid = e.target.name || 0
    BooksAPI.update({id:bid},'wantToRead')
      .then((res)=>{
	    BooksAPI.getAll()
		  .then((books)=>{
			this.setState((state)=>({
		      books,
			  results:[]
			})
		  )
		})
    })	
  } 

  render(){
    return(
      <div className="app">
       <Route exact path='/search' render={() => (
          <Search 
    		searchResults={this.state.results}
            selectedSearch={this.state.selectedSearch} 
			doSearch={this.doSearch}
            onAddBook={this.onAddBook}
            books={this.state.books}
            onChange={this.getChange}
           />
          )}
        />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
         	        <ListBooks 
    			      books={this.state.books} 
					  shelf="currentlyReading" 
					  changeHandler={ this.getChange }/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks 
					  books={this.state.books} 
                      shelf="wantToRead" 
                      changeHandler={ this.getChange }/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks 
					  books={this.state.books} 
                      shelf="read" 
                      changeHandler={this.getChange }/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link 
				to='/search'
				className="open-search-btn"
				>Add a book</Link>
            </div>
          </div>
        )}/>

       <Route path="*" component={NoMatch} status={404}/>
 
      </div>
    )
  }
}

BooksApp.propTypes = {
  searchResults: PropTypes.array,
  //selectedSearch: PropTypes.object,
  getChange: PropTypes.func,
  doSearch: PropTypes.func,
  getBook: PropTypes.func,
  onAddBook: PropTypes.func,
  changeHandler: PropTypes.func
};
export default BooksApp

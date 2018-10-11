import React, {Component} from 'react'

class Modal extends Component{
  render(){ console.log('Modal:',this.props)
    return (
        <div className="DialogHolder">
          <div className="mini-modal" style={{display:'block'}}>
		    <div className="mini-modal-body">
			  <div className="mini-modal-main">
			    <div className="mini-modal-header">
				  <h5 className="mini-modal-title">Preview</h5>
                  <button onClick={this.props.onHideModal} className="close-preview">
                    <span>×</span>
                	</button>
                </div>
                <div className="mini-modal-content">
				  <p className="preview-book-title">
                    {this.props.selectedSearch.title }
                  </p>	
				  <div className="left">
				    <div 
					  className="book-cover" 
					  href="/preview?id=zjTc4R2AGyIC" 
					  style={{
							    width: '128px', 
								height: '192px', 
								backgroundImage: 'url("'+this.props.selectedSearch.imageLinks.thumbnail+'")'
							}}></div>
					<p>
					  {
						((this.props.selectedSearch.industryIdentifiers).length && (
						  this.props.selectedSearch.industryIdentifiers.map( (mod,i)=>
					      <span className="isbn"  key={i}>
							{(mod.type).toString().toUpperCase()}: {mod.identifier}<br />
						  </span>   
						  )
						 ))	
						}
					</p>
				 </div>
				 <div className="right">
					<p className="publish">
					  {this.props.selectedSearch.publisher }<br />
					  {this.props.selectedSearch.publishedDate}
                    </p>
				   <p>Description:</p>	
					<span className="preview-book-description"> 
						{this.props.selectedSearch.description}
					</span>
				 </div>
                </div>
              </div>
		    </div>
      	  </div>
        </div>
    )
  }
}
export default Modal

import React, {Component} from 'react'

class Modal extends Component{
  render(){ console.log('Modal:',this.props)
    return (
        <div className="DialogHolder">
          <div className="modal" style={{display:'block'}}>
		    <div className="modal-body">
			  <div className="modal-main">
			    <div className="modal-header">
				  <h5 className="modal-title">Preview</h5>
                  <button onClick={this.props.onHideModal} className="close">
                    <span>×</span>
                	</button>
                </div>
                <div className="modal-content">
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
							{(mod.type).toString().toUpperCase()}:																		    {mod.identifier}<br />
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

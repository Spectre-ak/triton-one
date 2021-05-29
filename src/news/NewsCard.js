import React from 'react';

function NewsCard(props){
    return(
        <div className="card container-fluid" id="news_card" style={{borderColor:"white"},{borderStyle:"block"}}>
            <h4 >{props.title}</h4>
            <a target="_blank" id="news_link" href=""> <img className="card-img-top img-fluid" id="news_image"
             src={props.src} alt="Card image cap"/> </a>
            

             <div>
             <div className="card-body" >
                <p              
                id="news_description" >
                    
                    {props.desc}
                    
                </p>
            </div>
			</div> 

        </div>
    )
}

export default NewsCard;
import React from 'react';

function NewsCard(props){
    return(
        <div className="card container-fluid" id="news_card" style={{borderColor:"white"},{borderStyle:"block"}}>
            <br/>
            <h4 ><a href={props.articleUrl} className="articleUrl-a">{props.title}</a></h4>
            
            

             <div>
             <div className="card-body" >
             <a target="_blank" id="news_link" href={props.articleUrl}> 
            <img className="card-img-top img-fluid" id="news_image"  style={{width:"50px"}}
             src={props.src} alt="Card image cap"/> </a>   
             <a id="news_description" >
                    
                    {props.desc}
                    
                </a>
            </div>
			</div> 



        </div>
    )
}

export default NewsCard;
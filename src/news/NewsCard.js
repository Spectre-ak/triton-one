import React from 'react';

function NewsCard(props){
    return(
        <div className="card container-fluid" id="news_card" style={{borderColor:"white"},{borderStyle:"block"}}>
            <h4 >{props.desc}</h4>
            <a target="_blank" id="news_link" href=""> <img className="card-img-top img-fluid" id="news_image"
             src={props.src} alt="Card image cap"/> </a>
            

             <div>
             <div className="card-body" >
                <p              
                id="news_description" >
                    
                    {props.title}
                    
                </p>
            </div>
			</div> 

        </div>
    )
}
//  style={{width: "100%",whiteSpace: "nowrap",overflow: "hidden",textOverflow:"ellipsis",backgroundColor:"#131316"}}


var apiKey="26d43b327b1249dba705d6e195af471b";
var url = "https://newsapi.org/v2/everything?q=nasa&from=2021-05-24&to=2021-05-24&sortBy=popularity&apiKey=" + apiKey; 
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();
    req.addEventListener("load", function(){
      if(req.status == 200 && req.readyState == 4){
        var response = JSON.parse(req.responseText);
        var a=6;
        var description=response.articles[a].description;
        var title=response.articles[a].title;
        var image=response.articles[a].urlToImage;
        var url=response.articles[a].url;
        
        

      }
    });



export default NewsCard;
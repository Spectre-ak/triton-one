import React from 'react';
import NewsCard from "./NewsCard";
import ReactDOM from "react-dom"
function Row(props){
    return(
        <div className="row">
                <div className="col-md">{props.res1}</div>
                <div className="col-md">{props.res2}</div>
                <div className="col-md">{props.res3}</div>
            </div>
    )
}

class News extends React.Component{
    constructor(props){
        super(props);
        
    }
    fetchResults(){
        fetch("https://newsapi.org/v2/everything?q=nasa&sortBy=popularity&apiKey=26d43b327b1249dba705d6e195af471b")
        .then(response=>response.json())
        .then(res=>{
            console.log(res.articles);
            const results=[];
            
            for(var i=0;i<res.articles.length;){
                try{
                    const res1=<NewsCard desc={res.articles[i].title} title={res.articles[i].description} src={res.articles[i].urlToImage}/>;
                    const res2=<NewsCard desc={res.articles[i+1].title} title={res.articles[i+1].description} src={res.articles[i+1].urlToImage}/>;
                    const res3=<NewsCard desc={res.articles[i+2].title} title={res.articles[i+2].description} src={res.articles[i+2].urlToImage}/>;
                    i=i+3;
                 results.push(<Row res1={res1} res2={res2} res3={res3} />);
                }
                catch(err0){
                    break;
                    console.log(err0)
                }
                
            }
            ReactDOM.render(results,document.getElementById("divREs"));
        }).catch(function(error){
            console.log(error);
        });
    }
    componentDidMount(){
        this.fetchResults();
    }
    render(){
        return(
            <div id="divREs" className="container">

            </div>
        )
    }
}



export default News;
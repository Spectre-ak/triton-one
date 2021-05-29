import React from 'react';
import NewsCard from "./NewsCard";
import ReactDOM from "react-dom"
import Loader from "../Loader";
function Row(props) {
    return (
        <div className="row">
            <div className="col-md">{props.res1}</div>
            <div className="col-md">{props.res2}</div>
            <div className="col-md">{props.res3}</div>
        </div>
    )
}

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            result:<Loader/>,data:[]
        }
    }
    fetchResults() {
        var we = { url: 'https://api.bing.microsoft.com/v7.0/news/search?category=ScienceAndTechnology&q=moon+mars+nasa+space&count=100&freshness=Week' };
        fetch('http://localhost:8080/newsPost', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(we),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                data=(this.sortArrayByDate(data.value));
                const filteredData=[];
                data.forEach(element => {
                    if(element.category!=="ScienceAndTechnology"){
                        console.log(element);
                    }
                    else
                        filteredData.push(element);
                });
                const dataToBeRendered=[];
                
               console.log(filteredData);
               for(var i=0;i<filteredData.length;){
                   const row=(filteredData.slice(i,i+3));
                   console.log(i,row);console.log(this.createNewsCard(row[0]));
                    const rowData1=row[0]!==undefined?this.createNewsCard(row[0]):"";
                    const rowData2=row[1]!==undefined?this.createNewsCard(row[1]):"";
                    const rowData3=row[2]!==undefined?this.createNewsCard(row[2]):"";
                    
                    dataToBeRendered.push(<Row res1={rowData1} res2={rowData2} res3={rowData3}/>);
                    i=i+3;
                    //console.log(i,row);
               }
                console.log("Asd")
                //console.log(filteredData);
                //data=filteredData;
                //this.setState({result:dataToBeRendered,data:filteredData});
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    componentDidMount() {
        this.fetchResults();
    }
    render() {
        return (
            <div id="divREs" className="container">
                <br/>
                <h5>Latest Articles</h5>
                <br/>
                {this.state.result}


                <div class="container">
                <div class="row">
                    <div class="col-sm">
                    One of three columns
                    </div>
                    <div class="col-sm">
                    One of three columns
                    </div>
                    <div class="col-sm">
                    One of three columns
                    </div>
                    
                </div>
                </div>


            </div>
        )
    }
    createNewsCard(element){
        let imgSrc;
        if(element.image===undefined){
            if(element.provider!==undefined){
                imgSrc=element.provider[0].image.thumbnail.contentUrl;
            }else
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzZ1ZlaUsgfXMJMm7XMlqnoRn14OVTD6aXA&usqp=CAU"
        }
        else imgSrc=element.image.thumbnail.contentUrl;
        imgSrc=imgSrc===undefined?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzZ1ZlaUsgfXMJMm7XMlqnoRn14OVTD6aXA&usqp=CAU":imgSrc;

        let description=element.description;
        let title=element.name;
        let articleUrl=element.url;
        console.log(title,articleUrl,description,imgSrc);
        return <NewsCard title={title} articleUrl={articleUrl} desc={description} src={imgSrc}/>
    }
    sortArrayByDate(objs){
        function compare( a, b ) {
            if ( a.datePublished < b.datePublished ){
              return 1;
            }
            if ( a.datePublished > b.datePublished ){
              return -1;
            }
            return 0;
          }
          
         objs= objs.sort( compare );
         return objs;
    }
}



export default News;
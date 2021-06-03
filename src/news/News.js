import React, { useState } from 'react';
import NewsCard from "./NewsCard";
import ReactDOM from "react-dom"
import Loader from "../Loader";

function getNewsCard(element) {//console.log(element); 
    if (element === undefined) return;
    let imgSrc;
    try {
        if (element.image === undefined) {
            console.log("cjjkjk")
            if (element.provider !== undefined) {
                imgSrc = element.provider[0].image.thumbnail.contentUrl;
            } else
                imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzZ1ZlaUsgfXMJMm7XMlqnoRn14OVTD6aXA&usqp=CAU"
        }
        else imgSrc = element.image.thumbnail.contentUrl;
    }
    catch (err) {

    }


    imgSrc = imgSrc === undefined ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzZ1ZlaUsgfXMJMm7XMlqnoRn14OVTD6aXA&usqp=CAU" : imgSrc;

    let description = element.description;
    let title = element.name;
    let articleUrl = element.url;
    //console.log(title, articleUrl, description, imgSrc);
    return <NewsCard title={title} articleUrl={articleUrl} desc={description} src={imgSrc} />
}


function Row(props) {

    return (
        <div className="row">
            <div className="col-md">{getNewsCard(props.res1)}</div>
            <div className="col-md">{getNewsCard(props.res2)}</div>
            <div className="col-md">{getNewsCard(props.res3)}</div>
        </div>
    )
}

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: <Loader />, data: [],
            randomSearchParams: ["moon mars nasa space", "mars red planet", "isro jaxa esa", "Astronomy", "cosmos galaxy hubble", "mars spaceX iss", "nightsky space research", "spacex", "astronauts capsule"
                , "comet binary star", "planet deep space"],
            randomSearchParamsIndex: 0, isSeeMore: false, isSearched:false,
        }
        this.seeMore = this.seeMore.bind(this);
        this.search=this.search.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    fetchResults(keywords) {   
        console.log(keywords);
        var postData = { url: 'https://api.bing.microsoft.com/v7.0/news/search?category=ScienceAndTechnology&q="=' + keywords + '&count=100&freshness=Week' };
        fetch('https://triton-one-backend.azurewebsites.net/newsPost', {
        //fetch('http://localhost:8080/newsPost', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Success:', data);
                data = (this.sortArrayByDate(data.value));
                const filteredData = [];
                const uniqueArticles = [];

                data.forEach(element => {

                    if (element.category !== "ScienceAndTechnology") {
                        //console.log(element);
                    }
                    else if (uniqueArticles.includes(element.name) || uniqueArticles.includes(element.description)) {
                        console.log("not unique");
                    }
                    else {
                        filteredData.push(element); uniqueArticles.push(element.description); uniqueArticles.push(element.name);
                    }

                });
                const dataToBeRendered = [];

                //console.log(filteredData, uniqueArticles);
                for (var i = 0; i < filteredData.length;) {
                    var row = filteredData.slice(i, i + 3);
                    i = i + 3;
                    //console.log(i, row);

                    //var rowData1 = row[0] !== undefined ? this.createNewsCard(row[0]) : "";
                    //var rowData1 = this.createNewsCard(row[0]);

                    //const rowData2 = row[1] !== undefined ? this.createNewsCard(row[1]) : "";
                    //const rowData3 = row[2] !== undefined ? this.createNewsCard(row[2]) : "";

                    dataToBeRendered.push(<Row res1={row[0]} res2={row[1]} res3={row[2]} />);


                    //console.log(i,row);
                }
                //console.log("Asd")
                console.log(filteredData);
                data = filteredData;

                if(this.state.isSearched){
                    if(dataToBeRendered.length==0)
                        this.setState({ result: <i>No results found...</i> });
                    else
                        this.setState({ result: dataToBeRendered, data: filteredData });
                }
                else if(this.state.isSeeMore){
                    this.setState({isSeeMore:false});
                    if(dataToBeRendered.length==0){
                        //ReactDOM.render(dataToBeRendered,document.getElementById(keywords));
                        //this.seeMore();
                        
                        //return;
                    }
                    ReactDOM.render(dataToBeRendered,document.getElementById(keywords));
                }
                else
                    this.setState({ result: dataToBeRendered, data: filteredData });

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    componentDidMount() {
        try{
            if(document.getElementById("collapsingNavbar3").className==="navbar-collapse w-100 collapse show")
			    document.getElementById("buttonForNavbarCollapse").click();
		}
		catch(err){

		}

        const currentKeywords = this.state.randomSearchParams[this.state.randomSearchParamsIndex];
        this.fetchResults(encodeURI(currentKeywords));
    }
    seeMore() {
        if(this.state.randomSearchParamsIndex>=this.state.randomSearchParams.length-1){
            ReactDOM.render(<i>No more results. Try searching</i>,document.getElementById("buttonForSeeMore"));
            return;
        }
        const currentIndex=this.state.randomSearchParamsIndex;
        this.setState({ randomSearchParamsIndex: currentIndex + 1, isSeeMore: true });
        console.log(this.state.randomSearchParamsIndex)
        
        const keywords = this.state.randomSearchParams[this.state.randomSearchParamsIndex+1];

        var seeMoreDiv = document.createElement("div");
        seeMoreDiv.id = encodeURI(keywords);
        document.getElementById("seeMoreResults").appendChild(seeMoreDiv);
        ReactDOM.render(<Loader/>,document.getElementById(encodeURI(keywords)));
        console.log(keywords);
        this.fetchResults(encodeURI(keywords));

    }
    search(){
        var keywords=document.getElementById("searchBox").value;
        keywords=keywords.trim();
        if(keywords.length===0){
            if(this.state.isSearched){
                window.location.reload();
            }
            return;
        }
           
        this.setState({isSearched:true,result:<Loader/>});
        this.fetchResults(encodeURI(keywords));
        ReactDOM.render(<a></a>,document.getElementById("seeMoreResults"));
        ReactDOM.render(<a></a>,document.getElementById("buttonForSeeMore"));
        
    }
    onChange(){
    
    }
    render() {
        return (
            <div id="divREs" className="container">
                <br />
                <h4>Latest News</h4>
                <br />


                <div class="input-group mb-3">
                    <input type="search" class="form-control" id="searchBox" placeholder="ISS.." style={{borderRadius:"40px",borderColor: "#007bff",
                backgroundColor: "transparent",color: "white"}} aria-label="searchBox" aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" style={{borderRadius:"40px"}} onClick={this.search}>Search</button>
                    </div>
                </div>

                <br/>

                {this.state.result}
                <br />
                <div id="seeMoreResults">

                </div>
                <br />
                <p style={{ textAlign: "center" }} id="buttonForSeeMore">
                    <button type="button" class="btn btn-outline-primary" onClick={this.seeMore} style={{borderRadius:"40px"}}>See More</button>
                </p>

             


            </div>
        )
    }
    createNewsCard(element) {
        let imgSrc;
        if (element.image === undefined) {
            if (element.provider !== undefined) {
                imgSrc = element.provider[0].image.thumbnail.contentUrl;
            } else
                imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzZ1ZlaUsgfXMJMm7XMlqnoRn14OVTD6aXA&usqp=CAU"
        }
        else imgSrc = element.image.thumbnail.contentUrl;
        imgSrc = imgSrc === undefined ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzZ1ZlaUsgfXMJMm7XMlqnoRn14OVTD6aXA&usqp=CAU" : imgSrc;

        let description = element.description;
        let title = element.name;
        let articleUrl = element.url;
        console.log(title, articleUrl, description, imgSrc);
        return <NewsCard title={title} articleUrl={articleUrl} desc={description} src={imgSrc} />
    }
    sortArrayByDate(objs) {
        function compare(a, b) {
            if (a.datePublished < b.datePublished) {
                return 1;
            }
            if (a.datePublished > b.datePublished) {
                return -1;
            }
            return 0;
        }

        objs = objs.sort(compare);
        return objs;
    }
}


export {getNewsCard};
export default News;
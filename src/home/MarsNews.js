import React from "react";

import Loader from '../Loader';
import ReactDOM from "react-dom";
import LoaderButtom from "../LoaderButton";
import NewsCard from "../news/NewsCard";
import { getNewsCard } from "../news/News";
import { data } from "jquery";
import { similarity } from "./DistinctTopics";



function Row(props) {

    return (
        <div>
            <div className="row">
                <div className="col-md">{getNewsCard(props.res1)}</div>
            </div>
            <div className="row">
                <div className="col-md">{getNewsCard(props.res2)}</div>
            </div>
            <div className="row">
                <div className="col-md">{getNewsCard(props.res3)}</div>
            </div>
        </div>

    )
}

function NewsDisplay(props) {
    return (
        <div>

        </div>
    )
}

export default class MarsNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: <Loader />,
        }
    }
    
    fetchLatestNews() {
        var postData = { url: 'https://api.bing.microsoft.com/v7.0/news/search?category=ScienceAndTechnology&q=mars+nasa+space&count=100&freshness=Week' };
        fetch('https://triton-one-backend.azurewebsites.net/newsPost', {
            //fetch('http://localhost:8080/newsPost', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data33 => {
                var data = data33;
                console.log('Success:', data);
                data = (this.sortArrayByDate(data.value));
               // console.log(data)
                var filteredData = [];
                var uniqueArticles = [];

                data.forEach(element => {
                    //console.log(uniqueArticles.includes(element.name));
                    if (element.category !== "ScienceAndTechnology") {
                        //console.log(element);
                    }
                    else if (uniqueArticles.includes(element.name) || uniqueArticles.includes(element.description)) {
                        //console.log("not unique");
                    }
                    else {
                        filteredData.push(element);
                        uniqueArticles.push(element.description);
                        uniqueArticles.push(element.name);
                    }

                });

                const dataToBeRendered = [];

                //console.log(filteredData);
                var row = filteredData.slice(0, 3);
                
                console.log(row);
                dataToBeRendered.push(<Row res1={row[0]} res2={row[1]} res3={row[2]} />);

                //console.log("Asd")
                //console.log(filteredData);
                data = filteredData;
                this.setState({ result: dataToBeRendered, data: filteredData });

            })
            .catch((error) => {
                console.error('Error:', error);
            });
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

    componentDidMount() {
        this.fetchLatestNews();
    }
    render() {
        return (
            <React.Fragment>
                {this.state.result}
                <br />
                <p style={{ textAlign: "center" }} id="buttonForSeeMore">
                    <a href="/articles">
                    <button type="button" class="btn btn-outline-primary" style={{borderRadius:"40px"}}>View All</button>
                    </a>
                </p>
            </React.Fragment>
        )
    }
}
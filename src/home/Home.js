import React from "react";
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';
import ReactDOM from "react-dom";
import LoaderButtom from "../LoaderButton";
import MarsNews from "./MarsNews";

import SpaceX from "./SpaceXAPI";

function ImageWithLabel(props) {
    return (
        <div style={{ textAlign: "center" }}>
            <br />
            <h4>{props.title}</h4>
            <div id={props.unid + "imgLoader"}><Loader /></div>
            <img className="img-fluid" src={props.url} onLoad={() => {
                try { document.getElementById(props.unid + "imgLoader").remove() } catch (err) { }
            }} />
            <br /><br />
            <h6><a data-toggle="collapse" href={"#" + props.unid} role="button" aria-expanded="false" aria-controls={props.unid}>{props.title + "...read more"}</a></h6>
            <div class="collapse multi-collapse" id={props.unid}>
                <div class="card card-body">
                    {props.desc}
                </div>
            </div>

        </div>
    )
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            urlToFetch: this.props.urlToFetch,
            isFetched: false,
            postData: <Loader />, loadmoreStatus: <LoaderButtom />, marginPagesDisplayed: 0, pageRangeDisplayed: 0, loadmoreStatusMessage: "Loading.."
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    componentDidMount() {
        //this.fetchAPODRandom();
        try {
            if (document.getElementById("collapsingNavbar3").className === "navbar-collapse w-100 collapse show")
                document.getElementById("buttonForNavbarCollapse").click();
        } catch (er) { }

        this.receivedData();
        //console.log(window.innerWidth, window.innerHeight);
        const innerWidth = window.innerWidth;
        let factor = 1;
        if (innerWidth <= 350) {
            factor = 1;
        }
        else if (innerWidth <= 600) {
            factor = 2;
        }
        else if (innerWidth <= 850) {
            factor = 3;
        }
        else {
            factor = 4;
        }
        this.setState({ marginPagesDisplayed: factor, pageRangeDisplayed: factor });
    }
    UpdatePostData() {
        const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        //console.log(slice);
        const postData = slice.map(pd =>
            <ImageWithLabel url={pd.url} title={pd.title} desc={pd.explanation} unid={pd.url.replace(/\W/g, '')} key={pd.title.replace(/[^a-z]/gi, '')} />
        )
        //console.log(this.state.data.length);
        this.setState({
            pageCount: Math.ceil(this.state.data.length / this.state.perPage),
            postData
        });
    }
    fetchAPODRandomMore() {
        fetch("https://api.nasa.gov/planetary/apod?api_key=gtiZgqXuP8f3OPyjqu21ysauFO8mCOyDPjRKwhJq&count=100").then(response => response.json())
            .then(res => {
                //console.log(res);
                const currentData = this.state.data;
                res.forEach(element => {
                    if (element.media_type === "image") {
                        currentData.push(element);
                    }
                });
                this.setState({ data: currentData, postData: <Loader />, loadmoreStatus: "", loadmoreStatusMessage: "Pages" });
                this.UpdatePostData();
            });
    }
    receivedData() {
        if (!this.state.isFetched) {
            fetch("https://api.nasa.gov/planetary/apod?api_key=gtiZgqXuP8f3OPyjqu21ysauFO8mCOyDPjRKwhJq&count=100").then(respone => respone.json())
                .then(res => {
                    //console.log(res);
                    const data = res; const filteredData = [];
                    res.forEach(element => {
                        if (element.media_type === "image") {
                            filteredData.push(element);
                        }
                    });
                    //console.log(filteredData)
                    this.setState({ data: filteredData, isFetched: true, loadmoreStatusMessage: "Pages", loadmoreStatus: "" });
                    this.UpdatePostData();

                });
        }
        else {
            this.UpdatePostData();
        }

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        if (selectedPage === this.state.pageCount - 2 || selectedPage === this.state.pageCount - 1) {
            //console.log("load more"); 
            this.fetchAPODRandomMore();
            this.setState({ loadmoreStatus: <LoaderButtom />, loadmoreStatusMessage: "Loading.." });
        }
        this.setState({
            currentPage: selectedPage, postData: <Loader />,
            offset: offset,
        }, () => {
            this.receivedData()
        });

    };
    render() {
        return (

            <div className="container-fluid">
                <br/>
                <div class="row text-center">
                    <div class="col-12 col-lg-3">
                        <h4 style={{textAlign:"left"}}>Upcoming SpaceX launches</h4>
                        <SpaceX/>
                    </div>

                    <div class="col-12 col-lg-6">
                    <div className="container">
                            <p style={{textAlign:"left"}}>Astronomy Picture of the Day <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank"><i class="fa fa-arrow-right" aria-hidden="true"></i></a></p>
                            <hr />
                            <h4 style={{textAlign:"left"}}>NASA's APOD Images</h4>
                            {this.state.postData}
                            <br />
                            <div className="container" style={{ overflowX: "auto", overflowY: "hidden" }} >
                                {this.state.loadmoreStatusMessage}{" "}{this.state.loadmoreStatus}
                                <React.Fragment>{ }</React.Fragment>
                                <ReactPaginate
                                    previousLabel={<i class="fa fa-arrow-left" aria-hidden="true"></i>}
                                    nextLabel={<i class="fa fa-arrow-right" aria-hidden="true"></i>}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={this.state.marginPagesDisplayed}
                                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>

                            <br />


                        </div>

                    </div>


                    <div class="col-12 col-lg-3">
                        <h4>Trending News</h4>
                        <MarsNews/>
                    </div>
                </div>

            </div>





        )
    }
}

export { ImageWithLabel };

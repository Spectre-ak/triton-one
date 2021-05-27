import React from "react";
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';
import ReactDOM from "react-dom";
function ImageWithLabel(props){
    return(
        <div style={{textAlign:"center"}}>
            <br/>
            <h4>{props.title}</h4>
            <div id={props.unid+"imgLoader"}><Loader/></div>
            <img className="img-fluid" src={props.url} onLoad={()=>{document.getElementById(props.unid+"imgLoader").remove()}}/>
            <br/><br/>
            <h6><a  data-toggle="collapse" href={"#"+props.unid} role="button" aria-expanded="false" aria-controls={props.unid}>{props.title+"...read more"}</a></h6>
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
            postData: <Loader/>
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    componentDidMount() {
        //this.fetchAPODRandom();
        this.receivedData();
    }
    UpdatePostData(){
        const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        console.log(slice);
        const postData = slice.map(pd =>
            <ImageWithLabel url={pd.url} title={pd.title} desc={pd.explanation} unid={pd.title.replace(/[^a-z]/gi,'')} key={pd.title.replace(/[^a-z]/gi,'')}/>
        )
        console.log(this.state.data.length);
        this.setState({
            pageCount: Math.ceil(this.state.data.length / this.state.perPage),
            postData
        });
    }
    fetchAPODRandomMore() {
        fetch("https://api.nasa.gov/planetary/apod?api_key=gtiZgqXuP8f3OPyjqu21ysauFO8mCOyDPjRKwhJq&count=100").then(response => response.json())
            .then(res => {
                console.log(res);
                const currentData=this.state.data;
                res.forEach(element => {
                    if(element.media_type==="image"){
                        currentData.push(element);
                    }
                });
                this.setState({ data: currentData,postData:<Loader/>,loadmoreStatus:"" });
                this.UpdatePostData();
            });
    }
    receivedData() {
        if (!this.state.isFetched) {
            fetch("https://api.nasa.gov/planetary/apod?api_key=gtiZgqXuP8f3OPyjqu21ysauFO8mCOyDPjRKwhJq&count=100").then(respone => respone.json())
                .then(res => {
                    console.log(res);
                    const data = res; const filteredData=[];
                    res.forEach(element => {
                        if(element.media_type==="image"){
                            filteredData.push(element);
                        }
                    });
                    console.log(filteredData)
                    this.setState({ data: filteredData, isFetched: true });
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
        if(selectedPage===this.state.pageCount-2 || selectedPage===this.state.pageCount-1){
            console.log("load more");this.fetchAPODRandomMore();
            this.setState({loadmoreStatus:"Loading More..."});
        }
        this.setState({
            currentPage: selectedPage,postData:<Loader/>,
            offset: offset,
        }, () => {
            this.receivedData()
        });

    };
    render() {
        return (
            <div className="container">
                <p>Astronomy Picture of the Day <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank"><i class="fa fa-arrow-right" aria-hidden="true"></i></a></p>
                <hr/>
                <h4>Random NASA's APOD API Images</h4>
                {this.state.postData}
                <br/>
                <div style={{margin:"auto",width:"50%"}}>
                    <ReactPaginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} /> <a id="loadMorePaginationUpdate">{this.state.loadmoreStatus}</a>
                </div>
               


            </div>
        )
    }
}
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ImageHubble from './ImageHubble';
import VideoHubble from './VideoHubble';
import ReactDOM from 'react-dom';
import Loader from '../Loader';
import LoaderButtom from '../LoaderButton';
class PaginationHubble extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: "false", ops: 2 };
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            urlToFetch: this.props.urlToFetch,
            isFetched: false,
            postData: <Loader/>,loadmoreStatus:<LoaderButtom/>,marginPagesDisplayed:0,pageRangeDisplayed:0,loadmoreStatusMessage:"Loading.."
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    receivedData() {
        if (!this.state.isFetched) {
            fetch(this.state.urlToFetch).then(respone => respone.json())
                .then(res => {
                    console.log(res);
                    const data = res;
                    const filteredData = [];
                    data.forEach(element => {
                        var name = element.name; name = name.toLowerCase();
                        var search = this.props.search; search = search.toLowerCase();
                        if (name.includes(search) || search.includes(name)) {
                            filteredData.push(element);
                        }
                    });
                    console.log(filteredData);
                    this.setState({ data: filteredData, isFetched: true,loadmoreStatus:"",loadmoreStatusMessage:"Pages" });
                    const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)

                    if (this.props.media_type === "image") {
                        const postData = slice.map(pd => 
                            <ImageHubble id={pd.id} key={pd.id}/>
                        
                        )

                        this.setState({
                            pageCount: Math.ceil(this.state.data.length / this.state.perPage),
                            postData
                        });
                    }
                    else {
                        const postData = slice.map(pd => <React.Fragment><VideoHubble id={pd.id} /></React.Fragment>)

                        this.setState({
                            pageCount: Math.ceil(this.state.data.length / this.state.perPage),
                            postData
                        });
                    }

                });
        }
        else {

            const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
            console.log(slice);
            if (this.props.media_type === "image") {
                console.log("tr");
                const postData = slice.map(pd =>
                    <ImageHubble id={pd.id} key={pd.id}/>

                )
                console.log(this.state.data.length);
                this.setState({
                    pageCount: Math.ceil(this.state.data.length / this.state.perPage),
                     postData
                });
                
            }
            else {
                const postData = slice.map(pd => <React.Fragment><VideoHubble id={pd.id} key={pd.id}/></React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(this.state.data.length / this.state.perPage),

                    postData
                });

            }
        }

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        console.log(selectedPage);
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };
    componentDidMount() {
        // this.fetchResults();
        console.log(this.props)
        this.receivedData();
        console.log(window.innerWidth, window.innerHeight);
        const innerWidth=window.innerWidth;
        let factor=1;
        if(innerWidth<=350){
            factor=1;
        }
        else if(innerWidth<=600){
            factor=2;
        }
        else if(innerWidth<=850){
            factor=3;
        }
        else{
            factor=4;
        }
        this.setState({marginPagesDisplayed:factor,pageRangeDisplayed:factor});
        
    }
    render() {
        return (
            <div className="container">
                {this.state.postData}
                <br/>
                <div className="container" style={{overflowX:"auto",overflowY:"hidden"}} >
                    {this.state.loadmoreStatusMessage}{" "}{this.state.loadmoreStatus}
                    <React.Fragment>{}</React.Fragment>
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
            </div>
        )
    }

}

export default PaginationHubble;
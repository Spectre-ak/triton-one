import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import ImageHubble from './ImageHubble';
import VideoHubble from './VideoHubble';
import ReactDOM from 'react-dom';
import Loader from '../Loader';
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
            postData: <Loader/>
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
                    this.setState({ data: filteredData, isFetched: true });
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
    }
    render() {
        return (
            <div className="container">
                {this.state.postData}
                <br/>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        )
    }

}

export default PaginationHubble;
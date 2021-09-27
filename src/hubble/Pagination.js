import { render } from "@testing-library/react";
import React from "react";
import ReactPaginate from "react-paginate";

class PaginationHubble extends React.Component{
    constructor(props){
        super(props);
        this.state={
            marginPagesDisplayed:0,
            pageRangeDisplayed:0,
            offset: 0,
            data: this.props.data,
            perPage: 10,
            currentPage: 0,
        };
        this.handlePageClick=this.handlePageClick.bind(this);
    }
    componentDidMount(){
        const innerWidth=window.innerWidth;
        let factor=1;
        if(innerWidth<=350)
            factor=1;
        else if(innerWidth<=600)
            factor=2;
        else if(innerWidth<=850)
            factor=3;
        else
            factor=4;
        this.setState({
            marginPagesDisplayed:factor,
            pageRangeDisplayed:factor
        },()=>{});
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        console.log(selectedPage);
        this.setState({
            currentPage: selectedPage,
            offset: offset
        });

    };
    return(){
        render(
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}

export default PaginationHubble;
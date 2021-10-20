import React from "react";
import ReactPaginate from "react-paginate";
import Loader from "../Loader";
import ImageComponent from "./Image";
import VideoComponent from "./Video";

class PaginationHubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginPagesDisplayed: 0,
            pageRangeDisplayed: 0,
            offset: 0,
            data: this.props.data,
            perPage: 10,
            currentPage: 0,
            displayData: [],
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.updatePageData = this.updatePageData.bind(this);
    }
    componentDidMount() {
        const innerWidth = window.innerWidth;
        let factor = 1;
        if (innerWidth <= 350)
            factor = 1;
        else if (innerWidth <= 600)
            factor = 2;
        else if (innerWidth <= 850)
            factor = 3;
        else
            factor = 4;
        this.setState({
            marginPagesDisplayed: factor,
            pageRangeDisplayed: factor
        }, () => {
            this.updatePageData();
        });

    }
    handlePageClick(e) {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        //console.log(selectedPage);
        this.setState({
            currentPage: selectedPage,
            offset: offset,
            postData: <Loader />,
        }, () => {
            this.updatePageData();
        });

    }
    updatePageData() {
        const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        // console.log(slice);
        // console.log(this.props.type);

        const postData = this.props.type === "all/images" ? slice.map(data => {
            try {
                return <ImageComponent data={JSON.parse(data)} />;
            } catch (e) {
                return <ImageComponent data={data} />;
            }
        }
        ) :
            slice.map(data => {
                try {
                    return <VideoComponent data={JSON.parse(data)} />;
                } catch (e) {
                    return <VideoComponent data={data} />;
                }

            }
            );
            
        //console.log(this.state.data.length);
        this.setState({
            pageCount: Math.ceil(this.state.data.length / this.state.perPage),
            postData: postData
        });
    }
    render() {
        return (
            <React.Fragment>
                {this.state.postData}
                <ReactPaginate
                    previousLabel={<i class="fa fa-arrow-left" aria-hidden="true"></i>}
                    nextLabel={<i class="fa fa-arrow-right" aria-hidden="true"></i>}
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={this.state.marginPagesDisplayed}
                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                    onPageChange={this.handlePageClick}
                    containerClassName="pagination"
                    subContainerClassName="pages pagination"
                    activeClassName="active" />
            </React.Fragment>
        )
    }
}

export default PaginationHubble;

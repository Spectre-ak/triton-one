import React, {Component} from 'react'

import ReactPaginate from 'react-paginate';

import "../index.css";
import Loader from '../Loader';
import ShowVideo from './ShowVideo';
var totalArr=[];

function Image(props){
	const url=props.url;
	const title=props.title;
	const desc=props.desc;
	return(
		<div className="container" style={{paddingBottom:"40px"}} align="center">
			<h5>{title}</h5>
            <Loader/>
			<img src={url} className="img-fluid" alt={"loading"}/>
			<details id="a" style={{padding:"6px"}} >
				<summary style={{outline: "none"}} id="detailsId">Read more</summary> 
				{desc}
			</details>
		</div>
	)
}


function getAll(url){
    fetch(url)
        .then(response=>response.json())
        .then(res => {
            if(res["collection"]["items"].length>0){
                totalArr=totalArr.concat(res["collection"]["items"]);
            }
            console.log(res);
            if(res["collection"]["links"].length==1)
                getAll(res["collection"]["links"][0]["href"]);
            else if(res["collection"]["links"].length==2)
                getAll(res["collection"]["links"][1]["href"]);
        });
}//because it violates the following Content Security Policy directive: "connect-src 'self
//getAll("https://images-api.nasa.gov/search?q=mars&media_type=image&page=3");
export default class AppPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            currentFetchedRes:[],
            //url:"https://images-api.nasa.gov/search?q="+this.props.topic+"&media_type=image&page=1&description="+this.props.desc,
            url:"https://images-api.nasa.gov/search?keywords="+this.props.keywords+"&media_type="+this.props.media_type+"&page=1",
            isNextPage:true,
            postData:<Loader/>
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    UpdatePostDataImage(fl){
        const data = this.state.currentFetchedRes;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        //console.log(slice);
        var postData;
        postData = slice.map(pd => 
            <React.Fragment>
                <Image url={pd.links[0].href} key={pd.links[0].href} title={pd.data[0].title} desc={pd.data[0].description} />
            </React.Fragment>
        );
        if(fl)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            isNextPage:false,
            postData
        });
        else
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            
            postData
        });
    }
    UpdatePostDataVideo(fl){
        const data = this.state.currentFetchedRes;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        //console.log(slice);
        var postData;
        postData = slice.map(pd => 
            <React.Fragment>
                <ShowVideo vidMetadata={pd.href} key={pd.href} title={pd.data[0].title} desc={pd.data[0].description} id={pd.data[0].nasa_id}/>
            </React.Fragment>
            
        );
        if(fl)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            isNextPage:false,
            postData
        });
        else
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            
            postData
        });
    }
    receivedData() {
        if(!this.state.isNextPage){
            // const data = this.state.currentFetchedRes;
            // const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
            // //console.log(slice);
            // var postData;

            if(this.props.media_type==="image"){
                this.UpdatePostDataImage(false); 
            }
            else{
                this.UpdatePostDataVideo(false);
            }

            // this.setState({
            //     pageCount: Math.ceil(data.length / this.state.perPage),
                
            //     postData
            // })
        }
        else{
            fetch(this.state.url)
            .then(response=>response.json())
            .then(res => {
                console.log(res);
                //case when no more pages are there
                if(res["reason"]){
                    this.setState({isNextPage:false});
                    return;
                }
                this.setState({currentFetchedRes:this.state.currentFetchedRes.concat(res["collection"]["items"])});
                this.setState({links:res["collection"].links});
                console.log(this.state);
                if(this.props.media_type==="image"){
                    this.UpdatePostDataImage(true); 
                }
                else{
                    this.UpdatePostDataVideo(true);
                }
                

                // this.setState({
                //     pageCount: Math.ceil(data.length / this.state.perPage),
                //     isNextPage:false,
                //     postData
                // });
            });
        }
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        console.log(this.state.pageCount
            );
        if(selectedPage+1===this.state.pageCount){
            console.log("reached max size for current call");
            var urlNext="";
            try{
                if(this.state.links.length===1)
                    urlNext=(this.state.links[0]["href"]);
                else if(this.state.links.length===2)
                    urlNext=(this.state.links[1]["href"]);
                this.setState({
                    url:urlNext,
                    isNextPage:true,
                });
                console.log(urlNext)
                console.log(this.state);
            }
            catch(err){
                console.log(err);
                return;
            }
        }
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        console.log(this.props)
        this.receivedData()
    }
    render() {
        return (
            <div>
                {this.state.postData}
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
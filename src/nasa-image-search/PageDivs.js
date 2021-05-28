import React, {Component} from 'react'

import ReactPaginate from 'react-paginate';
import { ImageWithLabel } from '../home/Home';

import "../index.css";
import Loader from '../Loader';
import LoaderButtom from '../LoaderButton';
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
            postData:<Loader/>,loadmoreStatus:<LoaderButtom/>,marginPagesDisplayed:0,pageRangeDisplayed:0,loadmoreStatusMessage:"Loading.."
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    UpdateState(fl,postData,data){
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
    UpdatePostDataImage(fl){
        const data = this.state.currentFetchedRes;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        //console.log(slice);
        var postData;
        postData = slice.map(pd => 
            <React.Fragment>
                <ImageWithLabel url={pd.links[0].href} key={pd.links[0].href} title={pd.data[0].title} unid={pd.links[0].href.replace(/\W/g,'')} desc={pd.data[0].description} />
            </React.Fragment>
        );
        this.UpdateState(fl,postData,data);
    }
    UpdatePostDataVideo(fl){
        const data = this.state.currentFetchedRes;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        //console.log(slice);
        var postData;
        postData = slice.map(pd => 
            <React.Fragment>
                <ShowVideo vidMetadata={pd.href} key={pd.href} title={pd.data[0].title} unid={pd.links[0].href.replace(/\W/g,'')} desc={pd.data[0].description} id={pd.data[0].nasa_id}/>
            </React.Fragment>
            
        );
        this.UpdateState(fl,postData,data);
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
                this.setState({links:res["collection"].links, loadmoreStatusMessage:"Pages",loadmoreStatus:"" });
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
        console.log(this.state.pageCount);
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
                    isNextPage:true,loadmoreStatus:<LoaderButtom/>,loadmoreStatusMessage:"Loading.."
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
            <div>
                {this.state.postData}
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
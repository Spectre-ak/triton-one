import ReactDOM from "react-dom";
import React from 'react';
import PaginationHubble from "./Pagination";
import Loader from "../Loader";
import ImageComponent from "./Image";

function ImageVidOps(props) {
    const changeOption = (e) =>{
        props.getOption(e);
    };
    return (
        <form>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultChecked onClick={() => changeOption(1)}/>
                <label class="form-check-label" for="inlineRadio1" >Images</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={() => changeOption(2)}/>
                <label class="form-check-label" for="inlineRadio2" >Videos</label>
            </div>
        </form>
    )
}


class HubbleTelescope extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: "false", ops: 2 };
        this.state = {
            urlToFetch: "https://hubblesite.azurewebsites.net/",
            selectedOption: "all/images",
            results:<Loader/>
        };
        this.loadResults = this.loadResults.bind(this);
    }
    
    componentDidMount() {
        this.fetchAllImgVid();
    }
    fetchAllImgVid(){
        fetch(this.state.urlToFetch+this.state.selectedOption).then(res=>res.json()).then(res=>{
            const data_def=[];
            for(var index=0;index<res.length;index++){
                const data=JSON.parse(res[index]);
                console.log(data);
                data_def.push(<ImageComponent data={data}/>);
                if(index>5)break;
            }
            // res.forEach(element=>{
            //     const data=JSON.parse(element);
            //     console.log(data);
            //     data_def.push(<ImageComponent data={data}/>);
            // });
            this.setState({
                results:data_def
            })
        });
    }
    render() {
        return (
            <div className="container">
                <h4>Hubble Space Telescope Captured Images and Videos</h4>
                <p>Credits: NASA's HUBBLESITE API<a href="https://hubblesite.org/"> <i className="fa fa-arrow-right" aria-hidden="true"></i></a></p>
                <br />
                <ImageVidOps getOption={this.getOption} /><br />
                <div class="input-group mb-3">
                    <input className="form-control" id="searchIDDescription" type="search" placeholder="M87.." style={{
                        borderRadius: "40px", borderColor: "#007bff",
                        backgroundColor: "transparent", color: "white"
                    }} aria-label="searchBox" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-primary" type="button" style={{ borderRadius: "40px" }}
                            id="instantTrigger" onClick={this.loadResults}>Search</button>
                    </div>
                </div>
                <br />
                <div id="divForResults">
                    {this.state.results}
                </div>
            </div>
        )
    }
    loadResults() {
        ReactDOM.unmountComponentAtNode(document.getElementById("divForResults"));
        const searchParam = document.getElementById("searchIDDescription").value;
        const media_type = this.state.selectedOption === "all/images" ? "image" : "video";
        ReactDOM.render(<PaginationHubble urlToFetch={this.state.urlToFetch} media_type={media_type}
            search={searchParam} />, document.getElementById("divForResults"));
        window.history.pushState('', "", "/hubble-gallery/" + media_type + "~search~" + searchParam);


    }
    getOption = (e) => {
        console.log(e);
        const selectedOption = e === 1 ? "all/images" : "all/videos";
        this.setState({
            selectedOption: selectedOption
        }, () => {
            //console.log(this.state);
        });

    };

}
export { ImageVidOps };
export default HubbleTelescope;

import React from 'react';
import PaginationHubble from "./Pagination";
import Loader from "../Loader";

function ImageVidOps(props) {
    const changeOption = (e) => {
        props.getOption(e);
    };
    return (
        <form>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultChecked onClick={() => changeOption(1)} />
                <label class="form-check-label" for="inlineRadio1" >Images</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onClick={() => changeOption(2)} />
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
            searchEndpoint: "images/tags/",
            results: <Loader />
        };
        this.loadResults = this.loadResults.bind(this);

    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData(tags = undefined) {
        fetch(tags ? this.state.urlToFetch + this.state.searchEndpoint + tags : this.state.urlToFetch + this.state.selectedOption)
            .then(res => res.json())
            .then(res => {
                //console.log(res);
                if(res && res.length>1)
                    this.setState({
                        results: <PaginationHubble data={res} type={this.state.selectedOption} />
                    });
                    
                else throw new Error("no-results"); 
            })
            .catch((err)=>{
                //console.log(err.message);
                this.setState({
                    results: <h3><i>{err.message==="no-results"?"No results found":"Some error occurred. Try again later."}</i></h3>
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
                    <input className="form-control" id="searchIDDescription" type="search" placeholder="Mars.." style={{
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
        let searchParam = document.querySelector('#searchIDDescription').value;
        searchParam = searchParam.trim();
        searchParam = searchParam.replaceAll(' ', '+');

        this.setState({
            results: <Loader />
        });
        if (searchParam && searchParam.length > 0)
            this.fetchData(searchParam);
        else
            this.fetchData();
    }
    getOption = (e) => {
        //console.log(e);
        const selectedOption = e === 1 ? "all/images" : "all/videos";
        const searchEndpoint = e === 1 ? "images/tags/" : "videos/tags/";
        this.setState({
            selectedOption: selectedOption,
            searchEndpoint: searchEndpoint,
        }, () => {
            //console.log(this.state);
        });

    };

}
export { ImageVidOps };
export default HubbleTelescope;

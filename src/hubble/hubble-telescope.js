import ReactDOM from "react-dom";
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import PaginationHubble from "./PageDivsHubble";

function ImageVidOps(props) {
    const [ops, setCount] = useState(1);
    useEffect(() => {
        //console.log(ops);
        props.getOption(ops);
    });
    return (
        <div>
            <div class="form-check form-check-inline" onClick={() => setCount(1)} > 
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultChecked/>
                <label class="form-check-label" for="inlineRadio1" >Images</label>
            </div>
            <div class="form-check form-check-inline" onClick={() => setCount(2)}>
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">Videos</label>
            </div>
        </div>
    )
}



class HubbleTelescope extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: "false",ops:2 };
        this.state = {
            //urlToFetch:"http://localhost:8080/hubble/images" https://triton-one-backend.azurewebsites.net/
            urlToFetch:"https://triton-one-backend.azurewebsites.net/hubble/images" 
            
        };
        this.loadResults=this.loadResults.bind(this);
    }
    
    componentDidMount(){
        //document.getElementById("instantTrigger").click
    }
    render() {
        return (
            <div className="container">
                {/* <h1>loaded {this.state.show}</h1>
                <button onClick={this.handleClick}>clisk</button> */}
                <h5>Hubble Space Telescope Images and Videos</h5>
                <br/>
                <ImageVidOps getOption={this.getOption}/><br/>
                <input className="form-control border-secondary py-2" id="searchIDDescription" type="search" placeholder="M87.." style={{color:"white", borderRadius:"40px",backgroundColor:"#131316"}}></input>	
				<br/>
                <p align="center">
					<button className="btn btn-primary" id="instantTrigger" onClick={this.loadResults}>Search...</button>
				</p>
                <br/>
                <div id="divForResults">
                    
                </div>
            </div>
        )
    }
    loadResults(){
        ReactDOM.unmountComponentAtNode(document.getElementById("divForResults"));
        ReactDOM.render(<PaginationHubble urlToFetch={this.state.urlToFetch} media_type={this.state.ops===1?"image":"video"}
            search={document.getElementById("searchIDDescription").value}/>,document.getElementById("divForResults"));
		
    }
    getOption=(e)=>{
        this.state.ops=e;
        if(e===1)
            this.state.urlToFetch="https://triton-one-backend.azurewebsites.net/hubble/images";
        else
            this.state.urlToFetch="https://triton-one-backend.azurewebsites.net/hubble/videos";
        
    };

}
export {ImageVidOps};
export default HubbleTelescope;

/*
        this.handleClick = this.handleClick.bind(this);
        this.updateOps=this.updateOps.bind(this);

updateOps(e){
        const newOps=e;
        this.setState({ops:newOps});
    }
    handleClick() {
        this.setState({ show: "true" })
    };

function HubbleTelescope() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>as</p>
    </div>
  );
}
*/
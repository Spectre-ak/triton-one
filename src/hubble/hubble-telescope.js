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
        <form>
            <div class="form-check form-check-inline" onClick={() => setCount(1)} > 
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultChecked/>
                <label class="form-check-label" for="inlineRadio1" >Images</label>
            </div>
            <div class="form-check form-check-inline" onClick={() => setCount(2)}>
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">Videos</label>
            </div>
        </form>
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
        try{
            if(document.getElementById("collapsingNavbar3").className==="navbar-collapse w-100 collapse show")
			    document.getElementById("buttonForNavbarCollapse").click();
        }catch(er){}

        try{
            var url=(window.location.href);
            url=url.split("/hubble-gallery/")[1];
            console.log(url);
            const param=url.split("~search~");
            console.log(param);
            if(param[0]==="image"){
                document.getElementById("inlineRadio1").click();
            }
            else{//alert("as");
                document.getElementById("inlineRadio2").click();
            }
            if(param[1]!=="")
                document.getElementById("searchIDDescription").value=param[1];
            console.log(param[1]==="")
            console.log(this.state);
        }
        catch(err){
            document.getElementById("inlineRadio1").click();
        }
        const interval=setInterval(() => {
           try{
                 this.loadResults();
             }
             catch(err){
                 console.log(err);
             }
             clearInterval(interval);
         }, 500);
    }
    render() {
        return (
            <div className="container">
                {/* <h1>loaded {this.state.show}</h1>
                <button onClick={this.handleClick}>clisk</button> */}
                <h4>Hubble Space Telescope Captured Images and Videos</h4>
                <p>Credits: NASA's HUBBLESITE API<a href="https://hubblesite.org/"> <i className="fa fa-arrow-right"  aria-hidden="true"></i></a></p>
				
                <br/>
                <ImageVidOps getOption={this.getOption}/><br/>
                {/* <input className="form-control border-secondary py-2" id="searchIDDescription" type="search" placeholder="M87.." style={{color:"white", borderRadius:"40px",backgroundColor:"#131316"}}></input>	
				<br/>
                <p align="center">
					<button className="btn btn-outline-primary" id="instantTrigger" onClick={this.loadResults}>Search...</button>
				</p>
                <br/> */}
                
                


                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="searchIDDescription" type="search" placeholder="M87.." style={{borderRadius:"40px",borderColor: "#007bff",
                backgroundColor: "transparent",color: "white"}} aria-label="searchBox" aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" style={{borderRadius:"40px"}} 
                            id="instantTrigger" onClick={this.loadResults}>Search</button>

                    </div>
                </div>

                <br/>


                <div id="divForResults">
                    
                </div>
                
                
            </div>
        )
    }
    loadResults(){
        ReactDOM.unmountComponentAtNode(document.getElementById("divForResults"));
        const searchParam=document.getElementById("searchIDDescription").value;
        const media_type=this.state.ops===1?"image":"video";
        ReactDOM.render(<PaginationHubble urlToFetch={this.state.urlToFetch} media_type={media_type}
            search={searchParam}/>,document.getElementById("divForResults"));
        
        
		window.history.pushState('',"","/hubble-gallery/"+media_type+"~search~"+searchParam);
            

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
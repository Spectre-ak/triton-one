import React from "react";

class CamOptions extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
        const cams_arr=[];
        for(var key in this.props.ops){
            console.log(key);
            if(key==="All")
                cams_arr.push(
                    <li className="nav-item" style={{ paddingLeft: "5px" }}>
                        <a className="nav-link active" id="1" data-toggle="tab" href="#">key</a>
                    </li>
                )
            else
                cams_arr.push(
                    <li className="nav-item" style={{ paddingLeft: "5px" }}>
                        <a className="nav-link" id="1" data-toggle="tab" href="#">key</a>
                    </li>
                )

        }
    }

    render(){
        return(
            <ul className="nav nav-pills justify-content-center" >
					<li className="nav-item" style={{ paddingLeft: "5px" }}>
						<a className="nav-link active" id="1" data-toggle="tab" href="#" onClick={this.curo}>Curiosity (18 Aug 2012 - present)</a>
					</li>
					<li className="nav-item" style={{ paddingRight: "5px" }}>
						<a className="nav-link" id="3" data-toggle="tab" href="#" onClick={this.oppr}>Opportunity (26 Jan 2004 - 11 Jun 2018)</a>
					</li>

					<li className="nav-item" style={{ paddingLeft: "5px", paddingRight: "5px" }}>
						<a className="nav-link" id="2" data-toggle="tab" href="#" onClick={this.spirit}>Spirit (29 Jan 2004 - 22 Mar 2010)</a>
					</li>
			</ul>
        )
    }
}   

export default CamOptions;
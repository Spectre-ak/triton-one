import React from "react";
import Loader from "../Loader";

function CameraDropdownOps(props){
    return(
        <a class="dropdown-item" href="#" onClick={props.selectCam(props.camName)}>{props.camName}</a>
    )
}

class CamOptions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cam_ops_render:<Loader/>,
            selected_cam:"All",
        }
        this.selectCam=this.selectCam.bind(this);
    }

    componentDidMount(){
        console.log(this.props);
        const cams_arr=[];
        for(var key in this.props.ops){
            
            console.log(key);

            //cams_arr.push(<a class="dropdown-item" href="#">{key}</a>);
            cams_arr.push(<CameraDropdownOps selectCam={this.selectCam} camName={key}/>);
            

        }
        console.log(cams_arr);
        this.setState({cam_ops_render:cams_arr});
    }

    render(){
        return(
            <div class="dropdown">
                Camera Options:  &nbsp;
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selected_cam}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.state.cam_ops_render}
                </div>
            </div>
        )
    }

    selectCam(selectedCam){
        console.log(selectedCam);
    }
}   

export default CamOptions;
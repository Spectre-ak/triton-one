import React from "react";
import Loader from "../Loader";
import { LoadCamBasedRes } from "./ShowResponse";

function CameraDropdownOps(props){
    return(
        <a class="dropdown-item" onClick={()=>props.selectCam(props.camName)} style={{cursor:"pointer"}}>{props.camName}&nbsp;({props.camCount})</a>
    )
}

class CamOptions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cam_ops_render:<Loader/>,
            selected_cam:"All",
            selected_cam_count:0,
        }
        
    }

    componentDidMount(){
        //console.log(this.props.ops);
        const cams_arr=[];
        for(var key in this.props.ops){
            
            cams_arr.push(<CameraDropdownOps selectCam={this.selectCam} camName={key} key={key} camCount={this.props.ops[key].length}/>);
        
        }
        //console.log(cams_arr);
        this.setState({
            cam_ops_render:cams_arr,
            selected_cam_count:this.props.ops["All"].length
        });
    }

    render(){
        return(
            <div class="dropdown">
                Camera Options:  &nbsp;
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.selected_cam}&nbsp;({this.state.selected_cam_count})
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.state.cam_ops_render}
                </div>
            </div>
        )
    }

    selectCam=(selectedCam)=>{
        //console.log(selectedCam);
        this.setState({
            selected_cam:selectedCam, 
            selected_cam_count:this.props.ops[selectedCam].length});
        LoadCamBasedRes(this.props.ops[selectedCam]);
    }
}   

export default CamOptions;
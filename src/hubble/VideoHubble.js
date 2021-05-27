import React, { useState, useEffect } from 'react';
import LoaderButtom from '../LoaderButton';

function RadioOption(props){
    return(
        <div class="form-check form-check-inline" onClick={() => props.setCount(props.id)} > 
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id={props.id} defaultChecked={props.defaultChecked}/>
            <label class="form-check-label" for={props.id} >{props.height}x{props.width}</label>
        </div> 
    )
}
function QualityHubble(props) {
    const [ops, setCount] = useState(props.Files[0].file_url);
    useEffect(() => {
        //console.log(ops);
        props.getOption(ops);
    });
    let availableQuality=[];let index=0;
    let isPresent=[];
    props.Files.forEach(element => {
        if(isPresent.includes(element.height+"x"+element.width)){}
        else if(index==0){
            index++;
            availableQuality.push(<RadioOption id={element.file_url}  defaultChecked={true} height={element.height} width={element.width} setCount={setCount}/>);
            isPresent.push(element.height+"x"+element.width);
        }
        else{
            availableQuality.push(<RadioOption id={element.file_url}  height={element.height} width={element.width} setCount={setCount}/>);
            isPresent.push(element.height+"x"+element.width);
        }
    });
 
    return (
        <React.Fragment>
            <form>
                {availableQuality}
            </form>
            
        </React.Fragment>
    )
}

class VideoHubble extends React.Component{
    constructor(props){
        super(props);
        this.state={
            videoUrl:<LoaderButtom/>,videoTitle:<LoaderButtom/>,videoDesc:<LoaderButtom/>,videoFiles:["a"],optionsToBeRendered:<LoaderButtom/>
        }
    }
    fetchMediaContent(id){
        //fetch("http://localhost:8080/hubble/video/"+id).then(response=>response.json())
        fetch("https://triton-one-backend.azurewebsites.net/hubble/video/"+id).then(response=>response.json())
        .then(res=>{
                console.log(res);
                //direct html_5 option is available
                const optionsToBeRendered=<QualityHubble getOption={this.getOption} Files={res.video_files}/>;
                this.setState({videoTitle:res.name,videoDesc:res.short_description,
                    videoFiles:res.video_files, optionsToBeRendered:optionsToBeRendered});
            });
    }
    componentDidMount(){
        this.fetchMediaContent(this.props.id);
    }
    render(){
        return(
            <React.Fragment>
                <h5>{this.state.videoTitle}</h5>
                <video style={{width:"100%",height:"auto"}} src={this.state.videoUrl} controls/>
                {this.state.optionsToBeRendered}
                <details style={{padding:"6px"}} >
                    <summary style={{outline: "none"}} >Read more</summary> 
                    {this.state.videoDesc}
                </details>
            </React.Fragment>
        )
    }
    getOption=(e)=>{
        this.state.ops=e;
        //console.log(e);
        this.state.videoFiles.forEach(element => {
            if(e===element.file_url)
                this.setState({videoUrl:element.file_url})
        });
    };
}
export {QualityHubble,RadioOption};
export default VideoHubble;
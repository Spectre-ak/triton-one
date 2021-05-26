import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
function getUrlExtension(url){
    return url.split(/[#?]/)[0].split('.').pop().trim();
}
function RadioOption(props){
    return(
        <div class="form-check form-check-inline" onClick={() => props.setCount(props.id)} > 
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id={props.id+props.nasa_id} defaultChecked={props.defaultChecked}/>
            <label class="form-check-label" for={props.id+props.nasa_id} >{props.name}</label>
        </div> 
    )
}
function VideoQuality(props) {
    const [ops, setCount] = useState("orig");
    useEffect(() => {
        //console.log(ops);
        props.getOption(ops);
    });
    let availableQuality=[];
    if(props.vids.orig!==undefined){
        availableQuality.push(
            <RadioOption name="Orignal" id="orig" nasa_id={props.id} setCount={setCount} defaultChecked={true}/>
        );
    }
    if(props.vids.large!==undefined){
        availableQuality.push(
            <RadioOption name="Large" id="large" nasa_id={props.id} setCount={setCount}/>
        );
    }
    if(props.vids.medium!==undefined){
        availableQuality.push(
            <RadioOption name="Medium" id="medium" nasa_id={props.id} setCount={setCount}/>
        );
    }
    if(props.vids.small!==undefined){
        availableQuality.push(
            <RadioOption name="Small" id="small" nasa_id={props.id} setCount={setCount}/>
        );
    }
    if(props.vids.mobile!==undefined){
        availableQuality.push(
            <RadioOption name="Mobile" id="mobile" nasa_id={props.id} setCount={setCount}/>
        );
    }

    return (
        <React.Fragment>
            <form>
                {availableQuality}
            </form>
            
        </React.Fragment>
    )
}//asddddddddddd

class ShowVideo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ops:"n",
            toBeRendered:<h1>wait</h1>,
            vids:{"small":"lasd"},
            videoUrl:"#",
        };
    }
    fetchVidJson(url){
        fetch(url)
            .then(response=>response.json())
            .then(res=>{
                const vids={};
                res.forEach(element => {
                    if(getUrlExtension(element)==="mp4"){
                        //console.log(element);
                        if(element.includes("~orig.mp4"))
                            vids["orig"]=element;
                        else if(element.includes("~large.mp4"))
                            vids["large"]=element;
                        else if(element.includes("~medium.mp4"))
                            vids["medium"]=element;
                        else if(element.includes("~small.mp4"))
                            vids["small"]=element;
                        else if(element.includes("~mobile.mp4"))
                            vids["mobile"]=element;
                        
                    }
                });
                console.log(vids);
                this.setState({vids:vids});
                const ops=<VideoQuality vids={vids} getOption={this.getOption} id={this.props.id}/>
               // ReactDOM.render(ops,document.getElementById("showOp"));
               this.setState({toBeRendered:ops});
            });
    }
    componentDidMount(){
        //console.log(this.props.vidMetadata);
        this.fetchVidJson(this.props.vidMetadata);
    }
    render(){
        return(
            <React.Fragment>
                <h4>{this.props.title}</h4>
                <video style={{width:"100%",height:"auto"}} src={this.state.videoUrl} controls/>
                {this.state.toBeRendered}
                <details style={{padding:"6px"}} >
                    <summary style={{outline: "none"}} >Read more</summary> 
                    {this.props.desc}
                </details>
                <hr/>
            </React.Fragment>
        )
    }
    getOption=(e)=>{
        this.state.ops=e;
        console.log(e);
        console.log(this.state.vids[e]);
        this.setState({videoUrl:this.state.vids[e]});
    };
}

export default ShowVideo;
import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import LoaderButtom from '../LoaderButton';
import { QualityHubble } from './VideoHubble';

function getUrlExtension(url){
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

class ImageHubble extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Url:"...",Title:<LoaderButtom/>,Desc:"-",Files:["a"],optionsToBeRendered:<LoaderButtom/>,ImageTitle:"."
        }
    }
    fetchMediaContent(id){
        fetch("https://triton-one-backend.azurewebsites.net/hubble/image/"+id).then(response=>response.json())
        //fetch("http://localhost:8080/hubble/image/"+id).then(response=>response.json())
            .then(res=>{
                //console.log(res);
                //direct html_5 option is available
                const image_files=[];
                res.image_files.forEach(element => {
                    const ext=getUrlExtension(element.file_url);
                    if(ext==="jpg" || ext==="png" || ext==="gif"){
                        image_files.push(element);
                    }
                });
                //console.log(image_files)
                if(image_files.length===0){
                    this.setState({Title:res.name,Desc:res.description,
                        Files:image_files, optionsToBeRendered:<a>Image not found</a>});
                    return;
                }
                const optionsToBeRendered=<QualityHubble getOption={this.getOption} Files={image_files}/>;
                this.setState({Title:res.name,Desc:res.description,ImageTitle:res.name,
                    Files:image_files, optionsToBeRendered:optionsToBeRendered});
            });
    }
    componentDidMount(){
        this.fetchMediaContent(this.props.id);
    }
    render(){
        return(
            <React.Fragment>
                <a style={{display:"none"}}>
                {
                    this.state.unid=this.state.Url.replace(/[^a-z]/gi,'')+this.state.ImageTitle.replace(/[^a-z]/gi,'')
                }
                </a>

                <h5>{this.state.Title}</h5><br/>
                
                <img className="img-fluid" src={this.state.Url} controls onLoad={()=>{}}/><br/>
                {this.state.optionsToBeRendered}

                {/* <details style={{padding:"6px"}} >
                    <summary style={{outline: "none"}} >Read more</summary> 
                    {this.state.Desc}
                </details> */}

                <br/>
                
                
                <h6><a  data-toggle="collapse" href={"#"+this.state.unid} role="button" aria-expanded="false" aria-controls={this.state.unid}>{this.state.ImageTitle+"...read more"}</a></h6>
                <div class="collapse multi-collapse" id={this.state.unid}>
                    <div class="card card-body">
                        {this.state.Desc}
                    </div>
                </div>
                <br/>
            </React.Fragment>
        )
    }
    getOption=(e)=>{
        this.state.ops=e;
        //console.log(e);
        this.state.Files.forEach(element => {
            if(e===element.file_url)
                this.setState({Url:element.file_url})
        });
    };
}

export default ImageHubble;
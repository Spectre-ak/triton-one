import React, { useState, useEffect } from 'react';
import LoaderButtom from '../LoaderButton';
import { QualityHubble } from './VideoHubble';

function getUrlExtension(url){
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

class ImageHubble extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Url:<LoaderButtom/>,Title:<LoaderButtom/>,Desc:"-",Files:["a"],optionsToBeRendered:<LoaderButtom/>
        }
    }
    fetchMediaContent(id){
        fetch("http://localhost:8080/hubble/image/"+id).then(response=>response.json())
            .then(res=>{
                console.log(res);
                //direct html_5 option is available
                const image_files=[];
                res.image_files.forEach(element => {
                    const ext=getUrlExtension(element.file_url);
                    if(ext==="jpg" || ext==="png" || ext==="gif"){
                        image_files.push(element);
                    }
                });
                console.log(image_files)
                const optionsToBeRendered=<QualityHubble getOption={this.getOption} Files={image_files}/>;
                this.setState({Title:res.name,Desc:res.description,
                    Files:image_files, optionsToBeRendered:optionsToBeRendered});
            });
    }
    componentDidMount(){
        this.fetchMediaContent(this.props.id);
    }
    render(){
        return(
            <React.Fragment>
                <h5>{this.state.Title}</h5>
                <img className="img-fluid" src={this.state.Url} controls/>
                {this.state.optionsToBeRendered}
                <details style={{padding:"6px"}} >
                    <summary style={{outline: "none"}} >Read more</summary> 
                    {this.state.Desc}
                </details>
            </React.Fragment>
        )
    }
    getOption=(e)=>{
        this.state.ops=e;
        console.log(e);
        this.state.Files.forEach(element => {
            if(e===element.file_size)
                this.setState({Url:element.file_url})
        });
    };
}

export default ImageHubble;
import React, { useState, useEffect } from 'react';


function ImageComponent(props){
    const [image_url,update_image_url]=useState(0);
    useEffect(()=>{
        <
    });
    return(
        <>
            <img className="img-fluid" src={image_url} controls onLoad={()=>{}} alt={props.data.title}/><br/>
        </>
    )
}


export default ImageComponent;
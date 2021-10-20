import React, { useState, useEffect } from 'react';
import { BootstrapSmallLoader } from './Image';
import { MediaOptions } from './Image';

const styleCollapse = {
    width: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
};

function VideoComponent(props) {
    const [vidUrl, setVidUrl] = useState(0);
    const [vidResolutions, setVidResolutions] = useState(0);
    const [title, setTitle] = useState(<BootstrapSmallLoader />);
    const [tags, setTags] = useState(<BootstrapSmallLoader />);
    const collapseID = props.data.videoLinks[0][0].split("/").pop().split(".")[0] + "collapseID";

    useEffect(() => {
        const resolutions = {};
        props.data.videoLinks.forEach(element => {
            //console.log(element);
            resolutions[element[1]] = element[0];
        });
        //console.log(resolutions);
        setTitle(props.data.title);
        setVidResolutions(
            <MediaOptions
                res={resolutions}
                updateMediaContent={setVidUrl}
                setImgOnLoadWait={undefined}
                dropdownId={props.data.videoLinks[0][0]}
            />
        );
        const Tags = [];
        if (props.data.tags && props.data.tags.length > 0) {
            props.data.tags.map(tag =>
                Tags.push(<span style={{ paddingLeft: "5px", paddingRight: "5px" }}><span class="badge badge-secondary" >{tag}</span></span>)
            );
            setTags(Tags);
        }
    }, [props]);
    return (
        <div>
            <h5 className="hubble-tab-img-head">
                {title}
            </h5>
            <video style={{ width: "100%", height: "auto" }} src={vidUrl} controls preload="metadata"/>
            <div>
                {vidResolutions}
            </div>
            <br />
            <div>
                <p>
                    <a class="btn btn-outline-primary collapsed" data-toggle="collapse" href={"#" + collapseID} role="button" aria-expanded="false" style={styleCollapse}>
                        {props.data.info}
                    </a>
                </p>
                <div class="collapse" id={collapseID} >
                    <div class="card card-body">
                        <p>
                            {props.data.date}
                        </p>
                        <p>
                            {props.data.info}
                        </p>
                        <p>
                            <span class="badge badge-primary">Tags: </span> {tags}
                        </p>
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}


export default VideoComponent;

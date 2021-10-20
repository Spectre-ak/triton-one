import React, { useState, useEffect } from 'react';
import { LoaderWithoutTimer } from '../Loader';
import { BootstrapSmallLoader } from './Image';
import { MediaOptions } from './Image';

/**
 {"date":"Release Date: June 09, 2021 4:30PM (EDT)","title":"Animation of Fast-Rotating Brown Dwarf",
 "videoLinks":[["https://stsci-opo.org/STScI-01F741X81X3ZYPMDK0P9Z3WBXF.mp4","1920 X 1080, 30 FPS, MP4 (30.70 MB)"],
 ["https://stsci-opo.org/STScI-01F741YAVC92KAJEB3SN3J4FYF.mp4","1280 X 720, 30 FPS, MP4 (16.06 MB)"]],
 "tags":["Brown Dwarfs"],
 "info":"This animation shows the fast rotation of a nearby, free-floating brown dwarf. The nomadic object, 
 called 2MASS J22081363+2921215, resembles a carved Halloween pumpkin, with light escaping from its hot interior. 
 Brown dwarfs are more massive than planets but too small to sustain nuclear fusion, which powers stars. 
 The animation is an artist's rendering and is based on 2.5 hours' worth of observations that measured the variations of light emitted 
 by the giant object. Previous research found the brown dwarf completes a rotation every 3.5 hours. Though only roughly 115 light-years away,
  the monster object is too distant for any features to be photographed. The brown dwarf has a mottled atmosphere with scattered clouds and mysterious 
  dark spots reminiscent of Jupiter's Great Red Spot. Because the object is rotating very fast, clouds are whipping around it, creating a dynamic, turbulent 
  atmosphere. Bright spots that appear on the rotating object indicate
  regions where researchers can see deeper into the atmosphere, where it is hotter. Credits: ANIMATION: NASA, ESA, STScI, Leah Hustak (STScI)"} 
 
 */
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
            console.log(element);
            resolutions[element[1]] = element[0];
        });
        console.log(resolutions);
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

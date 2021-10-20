import React, { useState, useEffect } from 'react';
import { LoaderWithoutTimer } from '../Loader';

const BootstrapSmallLoader = () => {
    return (
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    );
};

const styleCollapse = {
    width: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
};

function ImageComponent(props) {
    const [imgUrl, setImgUrl] = useState(0);
    const [imgResolutions, setImgResolutions] = useState(0);
    const [imgOnLoadWait, setImgOnLoadWait] = useState(<LoaderWithoutTimer />);
    const [title, setTitle] = useState(<BootstrapSmallLoader />);
    const [tags, setTags] = useState(<BootstrapSmallLoader />);
    const collapseID = props.data.imgWithRes[0][0].split("/").pop().split(".")[0] + "collapseID";

    useEffect(() => {
        const resolutions = {};
        props.data.imgWithRes.forEach(element => {
            console.log(element);
            resolutions[element[1]] = element[0];
        });
        console.log(resolutions);
        setTitle(props.data.title);
        setImgResolutions(
            <MediaOptions
                res={resolutions}
                updateMediaContent={setImgUrl}
                setImgOnLoadWait={setImgOnLoadWait}
                dropdownId={props.data.imgWithRes[0][0]}
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
            {imgOnLoadWait}
            <img className="img-fluid" src={imgUrl} controls onLoad={() => { setImgOnLoadWait(undefined) }} alt={props.data.title} />
            <div>
                {imgResolutions}
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

const MediaOptions = (props) => {
    const [options, setOptions] = useState([]);
    const [dropdownCurrentState, setDropdownCurrentState] = useState(<BootstrapSmallLoader />);
    const Id = props.dropdownId;
    useEffect(() => {
        console.log(props.res);
        let spanId = 0;
        const dropdownItems = [];
        const resolutionsImg = Object.keys(props.res);
        resolutionsImg.forEach(element => {
            spanId++;
            dropdownItems.push(
                <span
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        props.updateMediaContent(props.res[element]);
                        setDropdownCurrentState(element);
                        if(props.setImgOnLoadWait)
                            props.setImgOnLoadWait(<LoaderWithoutTimer />);
                    }}
                    key={spanId + "spanID"}
                >
                    {element}
                </span>
            );
        });

        setOptions(dropdownItems);

        console.log("default setting hte valksss");
        console.log(props.res[resolutionsImg[0]]);
        console.log(resolutionsImg)
        setDropdownCurrentState(resolutionsImg[0]);
        props.updateMediaContent(props.res[resolutionsImg[0]])

    }, [props]);
    return (
        <div class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle" type="button" id={Id} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {dropdownCurrentState}
            </button>
            <div class="dropdown-menu" aria-labelledby={Id}>
                {options}
            </div>
        </div>
    )
};

export { MediaOptions, BootstrapSmallLoader };
export default ImageComponent;

import React, { useState, useEffect } from 'react';

/*

{"date":"Release Date: July 26, 2021 11:00AM (EDT)","title":"Hubble's View of Ganymede in 1996",
"imgWithRes":[["https://stsci-opo.org/STScI-01FAK39TV2FP144THY7C1822Y0.png"," 1200 X 1200"]],"tags":["Moons"],
"info":"This image presents Jupiter's moon Ganymede as seen by NASA's Hubble Space Telescope in 1996. Located 1/2- billion miles (over 600 million kilometers)
 away, Hubble can follow changes on the moon and reveal other characteristics at ultraviolet and near-infrared wavelengths. Astronomers have now used new and 
 archival datasets from Hubble to reveal evidence of water vapor in the atmosphere of Jupiter's 
moon Ganymede for the first time, which is present due to the thermal escape of water vapor from the moon's icy surface. Credits: SCIENCE: NASA, ESA, John Spencer (SwRI Boulder)"}

*/

const BootstrapSmallLoader = () => {
    return(
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    );
};

function ImageComponent(props) {
    const [imgUrl, setImgUrl] = useState(0);
    const [imgResolutions, setImgResolutions] = useState(0);
    const imgLoader
    useEffect(() => {
        const resolutions = props.data.imgWithRes;
        props.data.imgWithRes.forEach(element => {
            resolutions[element[1]] = element[0];
        });
        setImgResolutions(<MediaOptions res={resolutions} updateMediaContent={setImgUrl} />);
    }, [props]);
    return (
        <div>
            <img className="img-fluid" src={imgUrl} controls onLoad={() => { }} alt={props.data.title} />
            <div>
                {imgResolutions}
            </div>
        </div>
    )
}

const MediaOptions = (props) => {
    const [options, setOptions] = useState([]);
    const [dropdownCurrentState, setDropdownCurrentState] = useState(<BootstrapSmallLoader/>);
    
    useEffect(() => {
        const dropdownItems = [];
        const resolutionsImg = Object.keys(props.res);
        resolutionsImg.forEach(element => {
            dropdownItems.push(
                <span
                    className="dropdown-item"
                    onClick={() => { 
                        props.updateMediaContent(props.res[element]);
                    }}
                >
                    {element}
                </span>
            );
        });

        setOptions(dropdownItems);
        setDropdownCurrentState(props.res[resolutionsImg[0]]);
        props.updateMediaContent(props.res[resolutionsImg[0]])

    }, [props]);
    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {dropdownCurrentState}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {options}
            </div>
        </div>
    )
};

export default ImageComponent;

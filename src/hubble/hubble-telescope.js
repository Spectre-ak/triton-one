import ReactDOM from "react-dom";
import React, { useState, useEffect } from 'react';

function ImageVidOps(props) {
    const [ops, setCount] = useState(2);
    useEffect(() => {
        //console.log(ops);
        props.getOption(ops);
    });
    return (
        <div>
            <div class="form-check form-check-inline" onClick={() => setCount(1)} > 
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                <label class="form-check-label" for="inlineRadio1" >Images</label>
            </div>
            <div class="form-check form-check-inline" onClick={() => setCount(2)}>
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">Videos</label>
            </div>
        </div>
    )
}

class HubbleTelescope extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: "false",ops:2 };
        this.handleClick = this.handleClick.bind(this);
        this.updateOps=this.updateOps.bind(this);
    }
    updateOps(e){
        const newOps=e;
        this.setState({ops:newOps});
    }
    handleClick() {
        this.setState({ show: "true" })
    };
    getOption=(e)=>{
        this.state.ops=e;
        console.log(this.state)
    };
    render() {
        return (
            <div className="container">
                {/* <h1>loaded {this.state.show}</h1>
                <button onClick={this.handleClick}>clisk</button> */}
                <h5>Hubble Space Telescope Images and Videos</h5>
                <ImageVidOps getOption={this.getOption}/>
            </div>
        )
    }
}

export default HubbleTelescope;

/*
function HubbleTelescope() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>as</p>
    </div>
  );
}
*/
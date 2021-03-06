import React from 'react';
import ReactDOM from 'react-dom';
import { ImageVidOps } from '../hubble/hubble-telescope';
import Loader from '../Loader';
import AppPage from './PageDivs';
function Image(props) {
	const url = props.url;
	const title = props.title;
	const desc = props.desc;
	return (
		<div className="container" style={{ paddingBottom: "40px" }} align="center">
			<h5>{title}</h5>
			<img src={url} className="img-fluid" />
			<details id="a" style={{ padding: "6px" }} >
				<summary style={{ outline: "none" }} id="detailsId">Read more</summary>
				{desc}
			</details>

		</div>
	)
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var apiArray = ["gtiZgqXuP8f3OPyjqu21ysauFO8mCOyDPjRKwhJq",
	"HQv9ho1mQR9um5vu34dEhP5lsedm95MEYOz3rfBh",
	"W9OdIjEe1fWDQYstoh8lHgf1GtHKBAdbkS1VzcQ5", "5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk"];

function LoadNasaAPIs(topic, description) {
	topic = topic.toLowerCase();
	var apiKey = apiArray[getRandomInt(0, 3)];
	var req = new XMLHttpRequest();
	var url = "https://images-api.nasa.gov/search?q=" + topic + "&media_type=image&description=" + description;

	const arr = [];
	req.open("GET", url);
	req.send();
	req.addEventListener("load", function () {
		if (req.status == 200 && req.readyState == 4) {
			var response = JSON.parse(req.responseText);
			if (response["collection"]["items"].length == 0) {
				ReactDOM.render(<i>No results found</i>, document.getElementById("divForResults"));
			}
			else {
				for (var a = 0; a < response["collection"]["items"].length; a++) {
					const data = response["collection"]["items"][a]["data"][0]["description"];
					const title = response["collection"]["items"][a]["data"][0]["title"];

					const imgUrl = response["collection"]["items"][a]["links"][0]["href"];
					arr.push(<Image url={imgUrl} title={title} desc={data} key={a} />);
				}
				ReactDOM.render(arr, document.getElementById("divForResults"));
			}
		}
	});
}
class NasaApi extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.state = { ops: 1 }
	}
	render() {
		return (
			<div className="container" id="idd" style={{ color: "white" }}>

				<h4>Enter the image query topic or description in keywords <small><small>(Ex: mars,andromeda)</small></small></h4>
				<p>Credits: NASA's Image Library<a href="https://api.nasa.gov/"> <i className="fa fa-arrow-right" aria-hidden="true"></i></a></p>
				<br />
				<ImageVidOps getOption={this.getOption} />
				<br />
				<div class="input-group mb-3">
					<input type="text" class="form-control" id="searchIDDescription" type="search" placeholder="Mars.." style={{
						borderRadius: "40px", borderColor: "#007bff",
						backgroundColor: "transparent", color: "white"
					}} aria-label="searchBox" aria-describedby="basic-addon2" />
					<div class="input-group-append">
						<button class="btn btn-outline-primary" type="button" style={{ borderRadius: "40px" }}
							onClick={this.onChangeInput}>Search</button>
					</div>
				</div>
				<br />
				<div id="divForResults">
				</div>
			</div>
		)
	}
	componentDidMount() {
		try {
			var url = (window.location.href);
			url = url.split("/library/")[1];
			//console.log(url);
			const param = url.split("~search~");
			//console.log(param);
			if (param[0] === "image") {
				document.getElementById("inlineRadio1").click();
			}
			else {//alert("as");
				document.getElementById("inlineRadio2").click();
			}
			if (param[1] !== "")
				document.getElementById("searchIDDescription").value = param[1];
			//console.log(param[1]==="")
			//console.log(this.state);
		}
		catch (err) {
			document.getElementById("inlineRadio1").click();
		}
		const interval = setInterval(() => {
			try {
				this.onChangeInput();
			}
			catch (err) {
				console.log(err);
			}
			clearInterval(interval);
		}, 500);
	}
	onChangeInput(ele) {
		const desc = encodeURI(document.getElementById("searchIDDescription").value + "".replace(" ", ","));
		var ded = document.getElementById("searchIDDescription").value + "";
		ded = ded.replace(/\s+/g, ',');
		const media_type = this.state.ops === 1 ? "image" : "video";
		ReactDOM.unmountComponentAtNode(document.getElementById("divForResults"));
		ReactDOM.render(<AppPage topic={""} desc={desc} keywords={ded} media_type={media_type} />, document.getElementById("divForResults"));
		window.history.pushState('', "", "/library/" + media_type + "~search~" + ded);
	}
	getOption = (e) => {
		this.setState({
			ops: e
		});
	};
}

export default NasaApi;
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Loader from '../Loader';
import { showResponse } from './ShowResponse';

function LoadMore(id, arrayImgs) {
	//console.log(id);
	//console.log(arrayImgs);
	ReactDOM.render(arrayImgs, document.getElementById(id));
}


function LoadRemaining(props) {
	var res = props.imgList;
	var divId = "id" + props.info;
	var buttonId = "idbut" + props.info;

	function greetUser() {
		LoadMore(divId, res);
	}

	return (
		<div id={divId} >
			<p align="center" >
				<button className="btn btn-primary" onClick={greetUser} id={buttonId} >Show {props.info}</button>

			</p>
		</div>

	)
}
function Image(props) {
	const url = props.url;
	const name = props.date;

	const displayNone = { display: "none" };
	const displayBlock = { display: "block" };

	const [load_container, handler] = useState(<Loader />);

	const [load_container2, handler2] = useState(<Loader />);


	const [modalStyle, handler_modal_style] = useState(displayNone);

	return (
		<div className="container-fluid" style={{ paddingBottom: "40px" }} align="center">
			<p>{name}</p>
			{load_container}

			{/* onClick={()=>handler_modal_style(displayBlock)}
			 */}

			<img src={url} className="img-fluid" onLoad={() => handler(null)} />

			<div class="modal fade show" tabindex="-1" style={modalStyle} aria-hidden="true">

				<div class="modal-dialog modal-xl" >
					<div class="modal-content" style={{ backgroundColor: "#121111" }}>

						<div style={{ textAlign: "right" }}>
							<button type="button" class="close" style={{ color: "white" }} data-dismiss="modal" aria-hidden="true" onClick={() => handler_modal_style(displayNone)}>×</button>

						</div>

						<div class="modal-body" style={{ overflow: "auto" }}>

							{load_container2}
							<img src={url} className="img-fluid" onLoad={() => handler2(null)} style={{ height: "max" }} />


						</div>

						<button type="button" class="btn btn-outline-primary" data-dismiss="modal" onClick={() => handler_modal_style(displayNone)}>Close</button>

					</div>
				</div>
			</div>

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


function LoadNasaAPIs(rover) {

	ReactDOM.render(<Loader />, document.getElementById("divForResults"));
	ReactDOM.unmountComponentAtNode(document.getElementById("camOptions"));

	//console.log(rover);

	var date = document.getElementById("date").value;

	var apiKey = apiArray[getRandomInt(0, 3)];
	var req = new XMLHttpRequest();
	var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date=" + date + "&api_key=" + apiKey;

	if (date == "") {
		ReactDOM.render(<i>Invalid date</i>, document.getElementById("divForResults")); return;
	}
	//const arr=[];
	req.open("GET", url);
	req.send();


	req.addEventListener("load", function () {
		if (req.status == 200 && req.readyState == 4) {
			var response = JSON.parse(req.responseText);
			//console.log(response);

			showResponse(response.photos, date, rover);

		}
		else {
			if (date == "") {
				ReactDOM.render(<i>Invalid date</i>, document.getElementById("divForResults"));
			}
			else
				ReactDOM.render(<i>No images found for {rover} on {date}</i>, document.getElementById("divForResults"));
		}
	});

}

//Opportunity -- 2004-01-26 --> 2018-06-11
//spirit ---    2004-01-29  --> march 22 2010 || 2010-03-21
//Curiosity    2012-08-18 ----> present
class NasaMarsApi extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.curo = this.curo.bind(this);
		this.spirit = this.spirit.bind(this);
		this.oppr = this.oppr.bind(this);
		this.pers = this.pers.bind(this);

	}
	componentDidMount() {

	}
	render() {
		return (
			<div className="container" id="idd" style={{ color: "white" }} onScroll={this.onScroll}>
				<h4>Select a rover and date</h4>
				<p>Credits: NASA's Mars Rover Photos<a href="https://api.nasa.gov/"> <i className="fa fa-arrow-right" aria-hidden="true"></i></a></p>
				<div id="carouselExampleIndicators" class="carousel slide" data-interval="200000" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="5"></li>

					</ol>
					<div class="carousel-inner text-center">
						<div class="carousel-item active text-center">
							<iframe src="https://www.youtube.com/embed/vneh09ro4bg" frameborder="0" allow="fullscreen;"  ></iframe>
						</div>
						<div class="carousel-item">
							<iframe src="https://www.youtube.com/embed/5ufFkuY3U9g" frameborder="0" allow="fullscreen;" ></iframe>
						</div>
						<div class="carousel-item">
							<iframe src="https://www.youtube.com/embed/GEOv7Yg1cK0" frameborder="0" allow="fullscreen;" ></iframe>
						</div>
						<div class="carousel-item">
							<iframe src="https://www.youtube.com/embed/vXyEJJqu3X4" frameborder="0" allow="fullscreen;" ></iframe>
						</div>
						<div class="carousel-item">
							<iframe src="https://www.youtube.com/embed/C1wDXd2BIvI" frameborder="0" allow="fullscreen;" ></iframe>
						</div>
						<div class="carousel-item">
							<iframe src="https://www.youtube.com/embed/as2YvTXEnwA" frameborder="0" allow="fullscreen;" ></iframe>
						</div>
					</div>
					<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
				<br />
				<div class="form-group row text-center">
					<label for="date" class="col-2 col-md-1 col-form-label">Date:</label>
					<div class="col-10 col-md-4 col-lg-3 ">
						<input class="form-control " type="date" id="date" style={{ color: "white", backgroundColor: "rgb(60 60 65)", borderRadius: "6px" }} />
					</div>
				</div>

				<ul className="nav nav-pills justify-content-center" >

					<li className="nav-item" style={{ paddingLeft: "5px" }}>
						<a className="nav-link active" id="0" data-toggle="tab" href="#" onClick={this.pers}>Perseverance (18 Feb 2021 - present)</a>
					</li>

					<li className="nav-item" style={{ paddingLeft: "5px" }}>
						<a className="nav-link" id="1" data-toggle="tab" href="#" onClick={this.curo}>Curiosity (18 Aug 2012 - present)</a>
					</li>
					<li className="nav-item" style={{ paddingRight: "5px" }}>
						<a className="nav-link" id="3" data-toggle="tab" href="#" onClick={this.oppr}>Opportunity (26 Jan 2004 - 11 Jun 2018)</a>
					</li>

					<li className="nav-item" style={{ paddingLeft: "5px", paddingRight: "5px" }}>
						<a className="nav-link" id="2" data-toggle="tab" href="#" onClick={this.spirit}>Spirit (29 Jan 2004 - 22 Mar 2010)</a>
					</li>


				</ul>

				<br />
				<p align="center">
					<button className="btn btn-outline-primary" id="btnClick" onClick={this.onChangeInput} >Load...</button>
				</p>
				<br />

				<div id="camOptions">


				</div>

				<br />

				<div id="divForResults" onScroll={this.scroll}></div>

			</div>
		)
	}

	onChangeInput(ele) {
		if (document.getElementById("0").className == "nav-link active") {

			this.pers();
		}
		if (document.getElementById("1").className == "nav-link active") {

			this.curo();
		}
		if (document.getElementById("2").className == "nav-link active") {
			//document.getElementById("divForResults").innerHTML="";
			this.spirit();
		}
		if (document.getElementById("3").className == "nav-link active") {
			//document.getElementById("divForResults").innerHTML="";
			this.oppr();
		}
	}
	curo() {
		LoadNasaAPIs("Curiosity");
	}
	spirit() {
		LoadNasaAPIs("Spirit");
	}
	oppr() {
		LoadNasaAPIs("Opportunity");
	}
	pers() {
		LoadNasaAPIs("Perseverance");
	}


}

export { LoadRemaining, Image };

export default NasaMarsApi;
import ReactDOM from "react-dom";
import CamOptions from "./CamOptions";
import { LoadRemaining, Image } from "./MarsImages"

function LoadCamBasedRes(response){
	var arr = [];
		var maxNoOfImgs = 0;
		var Mainres = [];
		var idList = [];
		var las = 0;
		var las2 = 0;
		for (var a = 0; a < response.length; a++) {
			maxNoOfImgs++; las = a;
			if (maxNoOfImgs == 50) {
				idList.push(info1);
				var info1 = a + 1 - maxNoOfImgs + "-" + a;
				Mainres.push(<LoadRemaining imgList={arr} info={info1} key={info1} />)
				maxNoOfImgs = 0;
				arr = [];
				las2 = a;
			}

			const date = response[a]["camera"]["full_name"];

			const imgUrl = response[a]["img_src"];
			arr.push(<Image url={imgUrl} date={date} key={a} />);
		}
		if (las < 50) {
			Mainres.push(<LoadRemaining imgList={arr} info={0 + "-" + las} key={las} />);
		}
		else if (arr.length != 0) {
			Mainres.push(<LoadRemaining imgList={arr} info={las2 + "-" + las} key={las} />);
		}
		ReactDOM.unmountComponentAtNode(document.getElementById("divForResults"))
		ReactDOM.render(Mainres, document.getElementById("divForResults"));
		
}

function showResponse(response, date, rover) {
	//console.log(response);

	if (response.length == 0) {
		if (date === "") {
			ReactDOM.render(<i>Invalid date</i>, document.getElementById("divForResults"));
		}
		else
			ReactDOM.render(<i>No images taken by {rover} on {date}</i>, document.getElementById("divForResults"));
	}
	else {
		var arr = [];
		var maxNoOfImgs = 0;
		var Mainres = [];
		var idList = [];
		var las = 0;
		var las2 = 0;

		var availableCameras = {};

		for (var a = 0; a < response.length; a++) {

			if(availableCameras[response[a].camera.full_name]===undefined){
				availableCameras[response[a].camera.full_name]=[];
				availableCameras[response[a].camera.full_name].push(response[a]);
			}
			else
			availableCameras[response[a].camera.full_name].push(response[a]);

			maxNoOfImgs++; las = a;
			if (maxNoOfImgs == 50) {
				idList.push(info1);
				var info1 = a + 1 - maxNoOfImgs + "-" + a;
				Mainres.push(<LoadRemaining imgList={arr} info={info1} key={info1} />)
				maxNoOfImgs = 0;
				arr = [];
				las2 = a;
			}

			const date = response[a]["camera"]["full_name"];

			const imgUrl = response[a]["img_src"];
			arr.push(<Image url={imgUrl} date={date} key={a} />);
		}
		
		if (las < 50) {
			Mainres.push(<LoadRemaining imgList={arr} info={0 + "-" + las} key={las} />);
		}
		else if (arr.length != 0) {
			Mainres.push(<LoadRemaining imgList={arr} info={las2 + "-" + las} key={las} />);
		}

		
		availableCameras["All"]=response;
		//console.log(availableCameras);
		
		ReactDOM.render(<CamOptions ops={availableCameras}/>,document.getElementById("camOptions"))
		ReactDOM.render(Mainres, document.getElementById("divForResults"));
		

		
	}
}


export { showResponse, LoadCamBasedRes };
import ReactDOM from "react-dom";
import {LoadRemaining,Image} from "./MarsImages"

function showResponse(response,date,rover){
	if(response["photos"].length==0){
		if(date==""){
		 ReactDOM.render(<i>Invalid date</i>,document.getElementById("divForResults"));
		}
		else
		   ReactDOM.render(<i>No images taken by {rover} on {date}</i>,document.getElementById("divForResults")); 	
   } 
	else{
		var arr=[];
		var maxNoOfImgs=0;
		var Mainres=[];
		var idList=[];
		var las=0;
		var las2=0;
		for(var a=0;a<response["photos"].length;a++){
		 maxNoOfImgs++;las=a;
		 if(maxNoOfImgs==50){
			 idList.push(info1);
			 var info1=a+1-maxNoOfImgs+"-"+a;
			 Mainres.push(<LoadRemaining imgList={arr} info={info1} key={info1}/>)
			 maxNoOfImgs=0;
			 arr=[];
			 las2=a;
		 }

		 const date=response["photos"][a]["camera"]["full_name"];
					 
		 const imgUrl=response["photos"][a]["img_src"];
		 //document.getElementById("divForResults").appendChild(<Image/>);
		 //console.log(data+" "+title+" "+imgUrl); 
		 arr.push(<Image url={imgUrl} date={date} key={a}/>);
	 }
	 //document.getElementById("divForResults").innerHTML="<a style='display:none'>asda</a>";
	 
	 if(las<50){
		 Mainres.push(<LoadRemaining imgList={arr} info={0+"-"+las} key={las}/>);
	 }
	 else if(arr.length!=0){
		 Mainres.push(<LoadRemaining imgList={arr} info={las2+"-"+las} key={las}/>);
	 }
	 
	 ReactDOM.render(Mainres,document.getElementById("divForResults"));
	 //document.getElementById("divForResults").onload=function(){alert('ad');}   	
	}
}

export {showResponse};

import React from "react";


function callApiRocketLocation(id,containerID) {

    var url = "https://api.spacexdata.com/v4/launchpads/"+id;
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();
    req.addEventListener("load", function () {
        if (req.status == 200 && req.readyState == 4) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            var rocket_name = response.locality;

            document.getElementById(containerID).innerHTML=rocket_name;

            


        }
    });
}
    


function callApiRocket(id,containerID) {

    var url = "https://api.spacexdata.com/v4/rockets/"+id;
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();
    req.addEventListener("load", function () {
        if (req.status == 200 && req.readyState == 4) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            var rocket_name = response.name;

            document.getElementById(containerID).innerHTML=rocket_name;

            


        }
    });
}
function callApi() {

    var url = "https://api.spacexdata.com/v4/launches/upcoming";
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();
    req.addEventListener("load", function () {
        if (req.status == 200 && req.readyState == 4) {
            var response = JSON.parse(req.responseText);

            var rocket_name1 = response[0].rocket;
            var rocket_name2 = response[1].rocket;
            var rocket_name3 = response[2].rocket;
            var lp1 = response[0].launchpad;
            var lp2 = response[1].launchpad;
            var lp3 = response[2].launchpad;

            document.getElementById("payload_name1").innerHTML = response[0].name;
            document.getElementById("date_utc1").innerHTML = response[0].date_utc;
            document.getElementById("date_local1").innerHTML = response[0].date_local;
            document.getElementById("spacex_details1").innerHTML = response[0].details;
            document.getElementById("crew1").innerHTML = response[0].crew;
            document.getElementById("flight_no1").innerHTML = response[0].flight_number;
            callApiRocket(rocket_name1,"rocket_name1");
            callApiRocketLocation(lp1,"location1");


            document.getElementById("payload_name2").innerHTML = response[1].name;
            document.getElementById("date_utc2").innerHTML = response[1].date_utc;
            document.getElementById("date_local2").innerHTML = response[1].date_local;
            document.getElementById("spacex_details2").innerHTML = response[1].details;
            document.getElementById("crew2").innerHTML = response[1].crew;
            document.getElementById("flight_no2").innerHTML = response[1].flight_number;
            //document.getElementById("").innerHTML=response.[0].;
            callApiRocket(rocket_name2,"rocket_name2");
            callApiRocketLocation(lp2,"location2");


            document.getElementById("payload_name3").innerHTML = response[2].name;
            document.getElementById("date_utc3").innerHTML = response[2].date_utc;
            document.getElementById("date_local3").innerHTML = response[2].date_local;
            document.getElementById("spacex_details3").innerHTML = response[2].details;
            document.getElementById("crew3").innerHTML = response[2].crew;
            document.getElementById("flight_no3").innerHTML = response[2].flight_number;
            callApiRocket(rocket_name3,"rocket_name3");
            callApiRocketLocation(lp3,"location3");

        }
    });

}


export default class SpaceX extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        callApi();
    }
    render() {
        return (
            <div id="spaceXContainer" >
                <div > 
                    <h6><a data-toggle="collapse" href={"#rocket1"} role="button" aria-expanded="false" aria-controls="rocket1"><div><span id="payload_name1"></span></div> </a></h6>
                    <div class="collapse multi-collapse" id="rocket1">
                        <div class="card card-body">
                            <div>Time(UTC): <b><span id="date_utc1"></span></b> </div>
                            <div>Time(local): <span id="date_local1"></span> </div>
                            <div>Rocket Name:<b><span id="rocket_name1"> </span> </b> </div>
                            <div>Crew: <b><span id="crew1">  </span></b> </div>
                            <div>Launch Pad: <b> <span id="launch1"></span> </b>  </div>
                            <div>Location:<b> <span id="location1"> </span></b> </div>
                            <details>
                                <summary>Details</summary>
                                <div id="spacex_details1"></div>
                            </details>
                            <div>Flight No: <span id="flight_no1"> </span> </div>
                        </div>
                    </div>
                </div>


                <div>
                    <h6><a data-toggle="collapse" href={"#rocket2"} role="button" aria-expanded="false" aria-controls="rocket2"><div><span id="payload_name2"></span></div> </a></h6>
                    <div class="collapse multi-collapse" id="rocket2">
                        <div class="card card-body">
                            <div>Time(UTC): <b><span id="date_utc2"></span> </b></div>
                            <div>Time(local): <span id="date_local2"></span> </div>
                            <div>Rocket Name: <b><span id="rocket_name2"> </span> </b> </div>
                            <div>Crew: <span id="crew2">  </span> </div>
                            <div>Launch Pad: <span id="launch2"> </span> </div>
                            <div>Location: <b><span id="location2"> </span> </b> </div>
                            <details>
                                <summary>Details:</summary>
                                <div id="spacex_details2"></div>
                            </details>
                            <div>Flight No: <span id="flight_no2"> </span> </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h6><a data-toggle="collapse" href={"#rocket3"} role="button" aria-expanded="false" aria-controls="rocket3"><div><span id="payload_name3"></span></div> </a></h6>
                    <div class="collapse multi-collapse" id="rocket3">
                        <div class="card card-body">
                            <div>Time(UTC): <b><span id="date_utc3"></span></b> </div>
                            <div>Time(local): <span id="date_local3"></span> </div>
                            <div>Rocket Name:<b><span id="rocket_name3"> </span> </b> </div>
                            <div>Crew: <span id="crew3">  </span> </div>
                            <div>Location: <b><span id="location3"> </span> </b>  </div>
                            <details>
                                <summary>Details</summary>
                                <div id="spacex_details3"></div>
                            </details>
                            <div>Flight No: <span id="flight_no3"> </span> </div>
                        </div>
                    </div>
                </div>

            <br/>

            </div>
        )
    }
}
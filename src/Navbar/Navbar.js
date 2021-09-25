import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HubbleTelescope from "../hubble/hubble-telescope";
import NasaApi from "../nasa-image-search/NasaImageSearch";
import NasaMarsApi from "../nasa-mars-images/MarsImages";
import News from "../news/News";
import Home from "../home/Home";
import img from "./logoRo.png";
import triton_black from "./triton_black.png";

export default function Navbar() {
  const hideNavbar = () => {
    try {
      if (document.getElementById("collapsingNavbar3").className === "navbar-collapse w-100 collapse show")
        document.getElementById("buttonForNavbarCollapse").click();
    }
    catch (err) {

    }
  };
  return (
    <Router>
      <div>
        <div className="container-fluid">
          <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
            <a href="/" className="navbar-brand d-flex mr-auto"><h2>Triton</h2>
              <span></span>
            </a> <img src={triton_black} width="34x" id="logoBrand" style={{ marginLeft: "5px", marginRight: "5px" }} alt="" />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3" id="buttonForNavbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse w-100 collapse" id="collapsingNavbar3" onClick={hideNavbar}>
              <ul className="navbar-nav w-100 justify-content-center">
                <li className="nav-item">
                  <Link className="nav-link" data-toggle="collapse" to="/library">
                    <h5>
                      Media Library
                    </h5>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mars-images">
                    <h5>
                      Mars Images
                      <sup><sup><span className="badge badge-primary">NEW</span></sup></sup>
                    </h5>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/hubble-gallery">
                    <h5>
                      Hubble Telescope
                      <sup><sup><span className="badge badge-primary">NEW</span></sup></sup>
                    </h5>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link" href="https://triton-one.azurewebsites.net/iss-location">
                    <h5>
                      ISS Location
                    </h5>
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/articles">
                    <h5>
                      News
                    </h5>
                  </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav ml-auto justify-content-end">
                <li className="nav-item">
                  <big><big>
                    <big><big>
                      <span classNameName="githubLogo">
                        <i className="fab fa-github" aria-hidden="true" id="githubLogo" onClick={() => { window.location.href = "https://github.com/Spectre-ak/triton-one" }}></i>
                      </span>
                    </big></big>
                  </big></big>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Switch>
          <Route path="/library">
            <NasaApi />
          </Route>
          <Route path="/mars-images">
            <NasaMarsApi />
          </Route>
          <Route path="/hubble-gallery">
            <HubbleTelescope />
          </Route>
          <Route path="/articles">
            <News />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

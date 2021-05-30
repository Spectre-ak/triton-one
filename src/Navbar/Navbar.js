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

export default function Navbar(){
    return (
        <Router>
      <div>
        
      <div className="container-fluid">
          <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
            <a href="/" class="navbar-brand d-flex mr-auto"><h2>Triton</h2>
            <span></span>
            </a> <img src={triton_black} width="34x" id="logoBrand" style={{marginLeft:"5px",marginRight:"5px"}}/>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3" id="buttonForNavbarCollapse">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse w-100 collapse" id="collapsingNavbar3">
              <ul class="navbar-nav w-100 justify-content-center">
                <li class="nav-item">
                  {/* <a class="nav-link" href="#"></a>
                   */}
                  <Link class="nav-link" data-toggle="collapse" to="/library">Media Library</Link>
                </li>
                <li class="nav-item">
                  {/* <a class="nav-link" href="#">Mars Images</a>
                   */}
                  <Link class="nav-link" to="/mars-images">Mars Images</Link>
                </li>
                
                <li class="nav-item">
                  {/* <a class="nav-link" href="#">Hubble</a>
                   */}
                  <Link class="nav-link" to="/hubble-gallery">Hubble Telescope</Link>
                </li>
                
                <li class="nav-item">
                  <a class="nav-link" href="https://triton-one.azurewebsites.net/iss-location">ISS Location</a>
                
                  {/* <Link class="nav-link" to="/users">users</Link>
                 */}
                </li>
                
                <li class="nav-item">
                  {/* <a class="nav-link" href="#">Articles</a>
                   */}
                  <Link class="nav-link" to="/articles">News</Link>
                </li>
              </ul>
              <ul class="nav navbar-nav ml-auto justify-content-end">
                <li class="nav-item">
                   <big><big><big><a href="#" className="githubLogo"> <i class="fab fa-github" aria-hidden="true" id="githubLogo" onClick={()=>{window.location.href="https://github.com/Spectre-ak/triton-one"}}></i></a> </big></big></big>
                </li>
    
              </ul>
            </div>
          </nav>
        </div>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/library">
            <NasaApi />
          </Route>
          <Route path="/mars-images">
            <NasaMarsApi />
          </Route>
          <Route path="/hubble-gallery">
            <HubbleTelescope/>
          </Route>
          <Route path="/articles">
            <News/>
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
        
      );
}

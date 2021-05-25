import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
        <a href="/" class="navbar-brand d-flex mr-auto">Navbar 3 
        <span></span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse w-100 collapse" id="collapsingNavbar3">
          <ul class="navbar-nav w-100 justify-content-center">
            <li class="nav-item">
              <a class="nav-link" href="#">Image Library</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Mars Images</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">ISS Location</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Hubble</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Articles</a>
            </li>
          </ul>
          <ul class="nav navbar-nav ml-auto justify-content-end">
            <li class="nav-item">
              <a class="nav-link" href="#">Github</a>
            </li>

          </ul>
        </div>
      </nav>

      


    </div>
  );
}

export default App;

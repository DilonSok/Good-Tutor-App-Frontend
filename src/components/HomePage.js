import React from "react";
import { NavLink } from 'react-router-dom';
import '../css/HomePage.css'; 
import logo from '../images/logo.jpg';

function HomePage(){
  const user = localStorage.getItem('user');
  let displayName = "undefined"
  if(user){
    const userObj = JSON.parse(user);
    displayName = userObj.username
  }

  return (
    <div className="home-page-container">
      <header className="title">
        <h3>Welcome back, {displayName}!</h3>
      </header>
      <section className="main-content">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="slogan">
          <h4>Simple tutoring on your own schedule</h4>
          <NavLink to='/search'>
            <button className="cta-button">Find tutors</button>
          </NavLink>
        </div>
      </section>
      <footer className="footer">
        <div className="social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ecf0f1" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20.843 2H3.157C2.557 2 2 2.557 2 3.157v17.685C2 21.443 2.557 22 3.157 22h9.5v-7.745h-2.578v-3.018h2.578v-2.34c0-2.556 1.563-3.956 3.845-3.956 1.094 0 2.04.082 2.313.119v2.678H15.47c-1.244 0-1.494.594-1.494 1.47v1.927h2.989l-.39 3.018h-2.6V22h5.105c.6 0 1.157-.557 1.157-1.157V3.157C22 2.557 21.443 2 20.843 2z" />
            </svg>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ecf0f1" width="24" height="24" viewBox="0 0 24 24">
              <path d="M23.954 4.571c-.837.37-1.738.619-2.681.733 0 0 .049-.36.099-.991-.059.026-.128.043-.198.054a4.732 4.732 0 0 0-3.43-1.463c-2.746 0-4.959 2.233-4.959 4.986 0 .389.044.767.127 1.128-4.123-.209-7.778-2.187-10.232-5.189-.428.725-.671 1.571-.671 2.476 0 1.718.874 3.231 2.198 4.116-.812-.026-1.574-.248-2.241-.619v.062c0 2.395 1.701 4.381 3.948 4.836-.413.112-.847.173-1.292.173-.316 0-.622-.03-.928-.086.622 1.953 2.419 3.378 4.554 3.414-1.667 1.306-3.749 2.083-6.005 2.083-.39 0-.775-.022-1.16-.067 2.143 1.377 4.689 2.18 7.415 2.18 8.895 0 13.753-7.547 13.753-14.104 0-.214 0-.429-.015-.643.946-.684 1.771-1.54 2.423-2.513z" />
            </svg>
          </a>

          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 64 64">
    <path fill="#ecf0f1" d="M48,8H16c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8h32c4.418,0,8-3.582,8-8V16C56,11.582,52.418,8,48,8z M24,47h-5V27h5V47z M24.029,23.009C23.382,23.669,22.538,24,21.5,24c-1.026,0-1.865-0.341-2.519-1.023S18,21.458,18,20.468 c0-1.02,0.327-1.852,0.981-2.498C19.635,17.323,20.474,17,21.5,17c1.038,0,1.882,0.323,2.529,0.969 C24.676,18.615,25,19.448,25,20.468C25,21.502,24.676,22.349,24.029,23.009z M47,47h-5V35.887C42,32.788,40.214,31,38,31 c-1.067,0-2.274,0.648-2.965,1.469S34,34.331,34,35.594V47h-5V27h5v3.164h0.078c1.472-2.435,3.613-3.644,6.426-3.652 C44.5,26.5,47,29.5,47,34.754V47z"></path>
  </svg>
</a>



        </div>
        <p>&copy; 2023 Good Tutors. All rights reserved.</p>
        <p> Developed by Dilon, Ali, Aayush, Erika, Rushi, Eric</p>
      </footer>
    </div>
  );
}

export default HomePage;


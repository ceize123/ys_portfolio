import React from "react";
import "./css/all.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Wrapper from "./components/Wrapper.js";
import LandingPage from "./components/pages/LandingPage.js";
import Uiux from "./components/pages/Uiux.js";
import IconGuide from "./components/pages/IconGuide.js";
import Magazine from "./components/pages/Magazine.js";
import ScrollToTop from "./components/general.js";

function App() {
    return (
        <>
        <Router basename={process.env.PUBLIC_URL}>
            <Wrapper> 
            <ScrollToTop>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/works/uiux/:title' component={Uiux} />
                    <Route exact path='/works/graphic/Icon_Guide' component={IconGuide} />
                    {/* <Redirect to="/" component={LandingPage}/> */}
                </Switch>
            </ScrollToTop>
            </Wrapper>
                
            {/* There's horizontal scroll page, can't use wrapper here */}
            <Switch>
                <Route exact path='/works/graphic/Magazine_Design' component={Magazine} />
            </Switch>
        </Router>
        </>
    );
}

export default App;

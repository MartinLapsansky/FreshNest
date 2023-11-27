import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Profile from "./components/login/Profile";
import ShopItem from "./components/login/ShopItem";

function App() {
    return (
        <Router>
            <div className="App">
                    <Route path="/profile" component={Profile} />
                    <Route path="/shop-item" component={ShopItem} />
            </div>
        </Router>
    );
}

export default App;

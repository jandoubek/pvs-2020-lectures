import React from "react";
import ResultsPage from "./ResultsPage";
import SearchPage from "./SearchPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/search">
                    <ResultsPage />
                </Route>
                <Route path="/">
                    <SearchPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

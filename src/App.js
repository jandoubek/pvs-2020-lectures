import React from "react";
import ResultsPage from "./ResultsPage";
import SearchPage from "./SearchPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import TopBar from "./TopBar";
import ChosenSubjects from "./ChosenSubjects";

function App() {
    return (
        <Router>
            <TopBar>Hello!</TopBar>
            <Switch>
                <Route path="/search">
                    <ResultsPage />
                </Route>
                <Route path="/chosen">
                    <ChosenSubjects />
                </Route>
                <Route path="/">
                    <SearchPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

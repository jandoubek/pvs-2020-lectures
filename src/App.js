import React from "react";
import ResultsPage from "./ResultsPage";
import SearchPage from "./SearchPage";
import {
    Switch,
    Route, HashRouter,
} from "react-router-dom";
import TopBar from "./TopBar";
import ChosenSubjects from "./ChosenSubjects";

function App() {
    return (
        <HashRouter basename='/'>
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
        </HashRouter>
    );
}

export default App;

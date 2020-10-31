import React from 'react';
import CenterBox from "./CenterBox";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const SearchPage = () => {
    return (
        <CenterBox>
            <Logo />
            <SearchBar />
        </CenterBox>
    );
};

export default SearchPage;
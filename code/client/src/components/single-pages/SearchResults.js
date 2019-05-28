import React, {Component} from 'react';
import MainHeader from '../HomePage/MainHeader';
import SearchBox from '../HomePage/SearchBox';
// import SearchResults
class SearchResults extends Component{
    render(){
        return(
          <div>
            <MainHeader />
            <SearchBox />
          </div>
        );
    }
}

export default SearchResults;

import React, {Component} from 'react';
import MainHeader from '../HomePage/MainHeader';
import SearchBox from '../HomePage/SearchBox';
import {connect} from 'react-redux';
// import SearchResults
class SearchResults extends Component{
    render(){
        return(
          <div>
            <MainHeader/>
            <SearchBox/>
            {JSON.stringify(this.props.homeposts.resHomepostsSearch)}
          </div>
        );
    }
}

const mapStateToProps = state => ({
  homeposts: state.homeposts,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

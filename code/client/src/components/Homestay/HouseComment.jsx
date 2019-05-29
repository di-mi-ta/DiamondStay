import React from 'react';
import '../../css/HouseComment.css';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';

class HouseComment extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.props.comments = [
      {
        id: "1234",
        username: "ten",
        avatar: "image link",
        time: Date(),
        content: "day la comment",
        numStar: 1 (tu 0 -> 5)
      }
    ]
    */
    this.comments = this.props.comments;
    this.readMoreComment = this.readMoreComment.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchHomepostById(this.props.homepostId);
  }

  handleCommentSubmit(e) {
    let content = e.target.parentNode.querySelector('textarea').value;
    
    e.target.parentNode.querySelector('textarea').value = "";
    this.props.postRating(this.props.homepostId, "3", content);
  }

  readMoreComment(e) {
    if (e.target.parentElement.querySelector('p').classList.contains('collapse')) {
        e.target.innerText = "Thu nhỏ";
    }
    else {
        e.target.innerText = "Xem thêm";
    }
    e.target.parentElement.querySelector('p').classList.toggle('collapse');
  }

  render() {
    let commentList = this.comments.map(comment => {
      const starRating = [0, 1, 2, 3, 4].map((val, idx) => 
          val < comment.numStar?
          <i className="fa fa-star fill" aria-hidden="true" key={idx}></i>:
          <i className="fa fa-star" aria-hidden="true" key={idx}></i>
      );

      const d = comment.time;
      let timeString = "";
      let timestamp = new Date() - d;
      if (timestamp > 1000*60*60*24) {
        let numDays = Math.floor(timestamp/(1000*60*60*24));
        timeString = numDays > 30?
          d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()
          : `${numDays} ngày trước`
      }
      else if (timestamp > 1000*60*60) {
        timeString = `${Math.floor(timestamp/(1000*60*60))} giờ ${Math.floor((timestamp % (1000*60*60))/(1000*60))} phút trước`;
      }
      else if (timestamp > 1000*60) {
        timeString = `${Math.floor(timestamp/(1000*60))} phút trước`;
      }
      else {
        timeString = `${Math.floor(timestamp/1000)} giây trước`;
      }

      return (
        <div className="commentItem" key={comment.id}>
          <div className="commentTitle">
            <div className="user">
              <img src={comment.avatar}></img>
              <div className="userInfo">
                <h5>{comment.username}</h5>
                <span>{timeString}</span>
              </div>
            </div>
            <div className="rating">
              {starRating}
            </div>
          </div>
          <div className="content">
            <p className={comment.content.length > 100? 'collapse': ''}>{comment.content}</p>
            {comment.content.length > 100 && <span className="readMore" onClick={this.readMoreComment}>Xem thêm</span> }
          </div>
        </div>
      )
    })
    return (
      <div className="houseCommentList container-fluid">
        <h2>Đánh giá</h2>
        <div className="commentList">
          {commentList}
        </div>
        <form className="commentForm">
          <label htmlFor="comment-textarea">Bình luận của bạn</label>
          <textarea className="form-control" id="comment-textarea" rows="3"></textarea>
          <button type="button" className="btn" onClick={this.handleCommentSubmit}>Đăng</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentHomepost: state.homeposts.currentHomepost
});

const mapDispatchToProps = (dispatch) => ({
  fetchHomepostById: homeId => {dispatch(actions.fetchHomepostById(homeId))},
  postRating: (homepostId, rating, comment) => { dispatch(actions.postRating(homepostId, rating, comment)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseComment);

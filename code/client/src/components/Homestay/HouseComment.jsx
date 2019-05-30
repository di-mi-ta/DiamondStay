import React from 'react';
import '../../css/HouseComment.css';
import {connect} from 'react-redux';
import * as actions from '../../redux/ActionCreators';
import StarRating from './StarRating';

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
    this.starRatingRef = React.createRef();
    this.comments = this.props.comments;
    this.readMoreComment = this.readMoreComment.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchHomepostById(this.props.currentHomepost._id);
  }

  handleCommentSubmit(e) {
    let content = e.target.parentNode.querySelector('textarea').value;
    let rating = this.starRatingRef.current.getValue();
    e.target.parentNode.querySelector('textarea').value = "";
    this.props.postRating(this.props.currentHomepost, rating, content);
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
    const lstRatings = this.props.currentHomepost ? this.props.currentHomepost.rating.map(rating => ({
        id: rating._id,
        username: rating.author? rating.author.lastName + " " + rating.author.firstName: "vô danh",
        avatar: "http://fme.iuh.edu.vn/wp-content/uploads/2017/04/ABET080417-02.jpg",
        time: new Date(rating.updatedAt),
        content: rating.comment,
        numStar: rating.rating
    })): [];
    let commentList = lstRatings.map(comment => {
      const d = comment.time;
      let timeString = "";
      let timestamp = new Date() - d;
      timestamp = timestamp >= 0 ? timestamp : 0;
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
            <StarRating options={{numStar: comment.numStar, fixed: true}}/>
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
          <textarea className="form-control" id="comment-textarea" rows="3" placeholder="Nhập bình luận"></textarea>
          <div className="rating">
            <span>Đánh giá:</span>
            <StarRating options={{numStar: 0}} ref={this.starRatingRef}/>
          </div>
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
  postRating: (homepost, rating, comment) => { dispatch(actions.postRating(homepost, rating, comment))}
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseComment);

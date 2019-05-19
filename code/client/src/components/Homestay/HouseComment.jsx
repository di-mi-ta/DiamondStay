import React from 'react';
import '../../css/HouseComment.css';

class HouseComment extends React.Component {
  constructor() {
    super();
    this.state = {
        numStar: 3,
        comments: [
            {
                id: "1",
                username: "Thầy phùng",
                avatar: "http://fme.iuh.edu.vn/wp-content/uploads/2017/04/ABET080417-02.jpg",
                time: 4,
                content: "Chỗ này rất có không gian để nghiên cứu PPL :)",
                numStar: 3
            },
            {
              id: "214321",
              username: "Thầy sách",
              avatar: "http://www.hcmut.edu.vn/upload_hcmut/images/CacPhongBanChucNang/TTHTSV_VL/Kh%C3%A1c/6/IMG_4776.JPG",
              time: 4,
              content: "Rút môn?? Tốt Tốt!",
              numStar: 5
            },
            {
                id: "2",
                username: "Đồng chí X",
                avatar: "https://graph.facebook.com/v3.0/1606982409446605/picture?type=normal",
                time: 3,
                content: "Quá tuyệt vời, từ vị trí, địa điểm, phong cách kinh doanh cho đến thái độ thân thiện của anh chủ. Khi về còn được anh tặng thêm gà đồi rất ngon. Rất đáng đến và trải nghiệm",
                numStar: 1
            },
            {
              id: "3",
              username: "Nguyễn Khánh Phúc",
              avatar: "https://graph.facebook.com/v3.0/2301831780085050/picture?type=normal",
              time: 29,
              content: "All in one!!! Mọi thứ tuyệt vời, đã bao gồm trong giá (kể cả bữa ăn, dịch vụ vui chơi)... Rất quý a Hùng chủ nhà và đã tặng chủ nhà những bản nhạc cực chất để chuyến đi của các bạn tiếp theo sẽ hoàn hảo hơn. Hãy đến thưởng thức nhá!!!",
              numStar: 5
            },
            {
              id: "4",
              username: "Pham Vu Phuong",
              avatar: "https://graph.facebook.com/117785469118856/picture?type=large",
              time: 3,
              content: "Quá tuyệt vời, từ vị trí, địa điểm, phong cách kinh doanh cho đến thái độ thân thiện của anh chủ. Khi về còn được anh tặng thêm gà đồi rất ngon. Rất đáng đến và trải nghiệm",
              numStar: 5
            }
        ]
    }
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
    let commentList = this.state.comments.map(comment => {
        const starRating = [0, 1, 2, 3, 4].map((val, idx) => 
            val < comment.numStar?
            <i className="fa fa-star fill" aria-hidden="true" key={idx}></i>:
            <i className="fa fa-star" aria-hidden="true" key={idx}></i>
        );
        return (
            <div className="commentItem" key={comment.id}>
              <div className="commentTitle">
                <div className="user">
                  <img src={comment.avatar}></img>
                  <div className="userInfo">
                    <h5>{comment.username}</h5>
                    <span>{comment.time} days ago</span>
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
        </div>
    );
  }

  componentDidMount() {
  }
}

export default HouseComment;

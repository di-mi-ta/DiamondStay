import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col,
    Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption  } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import HOMEPOSTS from '../shared/homeposts';
import '../css/homepostdetail/homepostdetail.css';

function RenderHomePost({homepost, favorite, postFavorite}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImgOverlay>
                        <Button outline color="primary" onClick={() => {alert('Liked')}}>
                            {favorite ?
                                <span className="fa fa-heart"></span>
                                : 
                                <span className="fa fa-heart-o"></span>
                            }
                        </Button>
                    </CardImgOverlay>
                    <CardBody>
                        <CardTitle>{homepost.name}</CardTitle>
                        <CardText>{homepost.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );

}

function RenderRatings({ratings, postRating, homepostId}) {
    if (ratings != null)
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Ratings</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {ratings.map((rating) => {
                            return (
                                <Fade in key={rating._id}>
                                    <li>
                                    <p>{rating.comment}</p>
                                    <p>{rating.rating} stars</p>
                                    <p>-- {rating.author.firstname} {rating.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(rating.updatedAt)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <RatingForm homepostId={homepostId} postRating={postRating}/>
            </div>
        );
    else
        return(
            <div></div>
        );
}

class RatingForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
        };
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        // this.props.postComment(this.props.dishId, values.rating, values.comment);
        alert('OK')
    }

    render() {
        return(
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Post Rating</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Post Rating </ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment"
                                    rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">
                        Submit
                    </Button>
                </LocalForm>
            </ModalBody>
           </Modal>
        </div>
        );
    }
}

const items = [
    {
      src: 'https://i.ytimg.com/vi/mb4irevK_Is/maxresdefault.jpg',
    },
    {
      src: 'https://i.ytimg.com/vi/mb4irevK_Is/maxresdefault.jpg',
    },
    {
      src: 'https://i.ytimg.com/vi/mb4irevK_Is/maxresdefault.jpg',
    }
];


class HomepostDetailed  extends Component {
    constructor(props){
        super(props);
        this.state = {
            homepost: HOMEPOSTS[0],
            items: items,
            activeIndex: 0,
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting(){
        this.animating = true;
    }
    
    onExited(){
        this.animating = false;
    }
    
    next(){
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    previous(){
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }
    
    goToIndex(newIndex){
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render(){
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.state.homepost != null){   
            const slides = items.map((item) => {
                return (
                  <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                  >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                  </CarouselItem>
                );
            });
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.homepost.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.state.homepost.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className='custom-tag'>
                        <Carousel
                            activeIndex={this.state.activeIndex}
                            next={this.next}
                            previous={this.previous}
                            style = {{width: 100, height:500}}
                        >
                            <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>
                    </div>
                    <div className="row">
                        <RenderHomePost homepost={this.state.homepost} favorite={this.state.favorite} postFavorite={this.state.postFavorite} />
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
}
export default HomepostDetailed;


//css 


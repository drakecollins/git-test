import { render } from "@testing-library/react";
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

function RenderCampsite({campsite}) {
        return(
            <div key = {campsite.id} className="col-md-5 m-1">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0,5) translate(-20%)'
                    }}>
                    <card className="selected">
                        <CardImg top src={baseURL + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </card>
                </FadeTransform>
            </div>
        );
    }

function RenderComments({comments, postComment, campsiteId}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments:</h4>
                    <Stagger in>
                        {comments.map(comment => {
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                        <p>
                                            {comment.text}
                                            <br />
                                            -- {comment.author},
                                            {new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            }).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                </Fade>
                            );
                        })}
                    </Stagger>
                        <CommentForm campsiteId={campsiteId} addComment={postComment} />
                </div>
            );
        } 
        return <div />;
    }

function CampsiteInfoComponent(props) {

        if (props.isLoading) {
            return (
                <div className="container">
                    <div classNAme="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMEss) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        
        if (props.campsite){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                                <Breadcrumb>
                                    <BreadcrumbItem><link to="/directory">Directory</link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>    
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                        comments={props.comments} 
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                        />
                    </div>
                </div>
            );
        }
            return <div />;
}

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            author: "",
            text: "",
            touched: {
                author: false,
                text: false,
            },
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={value => this.handleSubmit(value)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    classNAme="form-control"
                                    name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text
                                    model=".author"
                                    className="form-control"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15),
                                    }}></Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: "required",
                                            minLength: "Must be at least 2 characters",
                                            maxLength: "Must be 15 characters or less",
                                        }}
                                        />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea
                                    model=".text"
                                    className="form-control"
                                    id="text"
                                    name="text"
                                    rows="6"></Control.textarea>
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}




export default withRouter (connect(mapStateToProps)(CampsiteInfoComponent));
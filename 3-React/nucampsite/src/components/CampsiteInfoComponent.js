import React, { Component } from "react";
import { CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class CampsiteInfoComponent extends Component {

    renderCampsite(campsite) {
        return(
            <div key = {campsite.id} className="col-md-5 m-1">
                <card className="selected">
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </card>
            </div>
        );
    }

    renderComments(comments) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments:</h4>
                    {
                        comments.map((commentObj) => {
                            return (
                                <div>
                                    <p>
                                        {commentObj.text}
                                        <br />
                                        -- {commentObj.author},
                                        {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                        }).format(new Date(Date.parse(commentObj.date)))}
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            );
        } if (this.props.campsite){
            return (
                
                <div className="container">
                    <div classNAme="row">
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default CampsiteInfoComponent;
import { render } from "@testing-library/react";
import React from 'react';
import { CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite({campsite}) {
        return(
            <div key = {campsite.id} className="col-md-5 m-1">
                <card className="selected">
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </card>
            </div>
        );
    }

function RenderComments({comments}) {
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
                        })}
                </div>
            );
        } 
        return <div />;
    }

function CampsiteInfo(props) {
        
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
                    <div classNAme="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.campsite.comments} />
                    </div>
                </div>
            );
        }
            return <div />;
}


export default CampsiteInfo;
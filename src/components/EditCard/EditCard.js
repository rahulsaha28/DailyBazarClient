import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel } from 'rsuite';

const EditCard = (props) => {
    const  { _id, imageURL, name, price } = props.product;
    return (
        <div className="col-md-4 col-sm-12">
            <Panel shaded bodyFill bordered className="mb-3">
                <img style={{width:"100%", height:"200px" }} src={imageURL} alt=""/>
                <Panel header={ <h5>{name}</h5> }>
                    <div className="d-flex justify-content-between">
                        <h6>${price}</h6>
                        <Link to={`/product/${_id}`}>
                          <Button color="green">Buy Now</Button>  
                        </Link>
                        
                    </div>
                </Panel>
            </Panel>
        </div>
    );
};

export default EditCard;
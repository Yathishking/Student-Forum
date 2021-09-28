import React from 'react';
import './custom.css';
import "aos/dist/aos.css";

const FeatureCard = ({props}) => {

    const cardStyle = {
        boxShadow: '3px 2px 4px 3px black',
        borderRadius: '3px',
        display: 'flex',
        width: '30%',
        padding: '2px',
        height: '210px',
        color: 'white',
        margin: '10px 10px 10px 10px',
    };
    return(
        <div data-aos='zoom-in' className="feature-card-container" style={cardStyle}>
            <h3 className="card-title">{props.title}</h3>
            <hr />
            <div className="card-body">
                <p className="card-description">{props.description}
                </p>
            </div>
        </div>
    );
}

export default FeatureCard;
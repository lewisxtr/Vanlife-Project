import React from 'react';

export default function Van({name, price, desc, image, type}) {
    return (
        <div className="van-card">
            <img src={image} className="van-image"/>

            <div className="van-info">
                <h2 className="van-title">{name}</h2>
                <div className="van-price">£{price}<br /><span>/day</span></div>
            </div>

            <div className={`${type}-type type`}>{type}</div>
        </div>
    )

}
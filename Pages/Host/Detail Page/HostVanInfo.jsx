import React from 'react';
import { useOutletContext } from "react-router-dom"

export default function HostVanInfo() {
    const [van, setVan] = useOutletContext()

    return (
        <div className="van__info-container">
            <p className="van__info-para"><span>Name:</span> {van.name}</p>
            <p className="van__info-para-type"><span>Category:</span> {van.type}</p>
            <p className="van__info-para"><span>Description:</span> {van.description}</p>
            <p className="van__info-para"><span>Visibility:</span> Public</p>
        </div>

    )
}
import React from 'react';
import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
    const [van, setVan] = useOutletContext()

    return (
        <img className="van__info-img" src={van.imageUrl} />
    )
}
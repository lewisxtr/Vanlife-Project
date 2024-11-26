import React from 'react';
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
    const [van, setVan] = useOutletContext()

    return (
        <h4 className="van__info-pricing">£{van.price}<span>/day</span></h4>
    )
}
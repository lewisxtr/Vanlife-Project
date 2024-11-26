import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getVans } from "../../api"

export default function VanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [id]);

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van__detail-page">
            <Link className="van__detail-back" 
            to={`../${search}`}
            relative="path" >
                &larr; Back to {type} vans
            </Link>
            {error ? (
                <div className="error__container">
                <h2 className="error__title">Error fetching vans: {error.status}</h2>
                <p className="error__message">{error.message}</p>
            </div>
            ) : !loading && van ? (
                <>
                    <img className="van__details-img" src={van.imageUrl} />
                    <div className={`${van.type}-type type`}>{van.type}</div>
                    <h2 className="van__details-title">{van.name}</h2>
                    <p className="van__details-price">${van.price}<span>/day</span></p>
                    <p className="van__details-desc">{van.description}</p>
                    <button className="fullwidth__button">Book Now</button>
                </>
            ) : (
                <h2 className="loading__text">Loading...</h2>
            )}
        </div>
    )

}
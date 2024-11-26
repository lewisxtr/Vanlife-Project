import React from "react";
import VanCard from "./VanCard"
import { useSearchParams, Link } from "react-router-dom";
import { getVans } from "../../api"

export default function Vans() {

    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type")

    const [vans, setVans] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    const selectedVans = typeFilter 
    ? vans.filter(van => van.type === typeFilter)
    : vans;

    const vansElements = selectedVans.map(van => {
        return (
            <Link className="van__tile-link" to={van.id} key={van.id} state={{ search: `?${searchParams.toString()}`, type: typeFilter}}>
                <VanCard
                name={van.name}
                price={van.price}
                desc={van.description}
                image={van.imageUrl}
                type={van.type} />
            </Link>
        )
    })

    return (
        <div className="vans-page-container">
            <h1 className="vans-page-title">Explore our van options</h1>
            <div className="vans-filter-container">
                <button onClick={() => setSearchParams({type: "simple"})} 
                className={`filter-btn ${typeFilter === "simple" ? "selected--simple" : null}`}>
                    Simple</button>
                <button onClick={() => setSearchParams({type: "luxury"})} 
                className={`filter-btn ${typeFilter === "luxury" ? "selected--luxury" : null}`}>
                    Luxury</button>
                <button onClick={() => setSearchParams({type: "rugged"})} 
                className={`filter-btn ${typeFilter === "rugged" ? "selected--rugged" : null}`}>
                    Rugged</button>
                {typeFilter ? (
                    <button onClick={() => setSearchParams({})} className="clear-btn">Clear filters</button>
                ) : null}
            </div>

            {error ? (
                <div className="error__container">
                    <h2 className="error__title">Error fetching vans: {error.status}</h2>
                    <p className="error__message">{error.message}</p>
                </div>
            ) : !loading && !error ? (
                <div className="vans-cards-grid">
                    {vansElements}
                </div>
            ) : (
                <h1 className="loading__text">Fetching vans...</h1>
            )}
        </div>
    )
}

import React from 'react';
import { Outlet, useParams, Link, NavLink } from 'react-router-dom';
import { getHostVans } from "../../../api"

export default function HostVansDetail () {
    const { id } = useParams();

    const [van, setVan] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        async function loadHostVan() {
            setLoading(true)
            try {
                const data = await getHostVans(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadHostVan()
    }, [id]);

    const activeLink = {
        fontWeight: "bold",
        textDecoration:"underline"
    }

    return (
        <div className="host__detail-container">
            <Link className="host__detail-back" 
            to=".." 
            relative="path">
                &larr; Back to all vans
            </Link>

            {error ? (
                <div className="error__container">
                    <h2 className="error__title">Error fetching vans: {error.status}</h2>
                    <p className="error__message">{error.message}</p>
                </div>
            ) : !loading && !error && van ? (
                <div className="host__detail-card">
                <div className="host__detail-header">
                    <img src={van.imageUrl} alt={van.name} />
                    <div className="host__detail-description">
                        <div className={`type-host ${van.type}-type`}>{van.type}</div>
                        <h2>{van.name}</h2>
                        <p>£{van.price}<span>/day</span></p>
                    </div>
                </div>
                <nav className="host__detail-nav">
                    <NavLink to="." end style={({isActive}) => isActive ? activeLink : null}>
                        Details
                    </NavLink>
                    <NavLink to="pricing" style={({isActive}) => isActive ? activeLink : null}>
                        Pricing
                    </NavLink>
                    <NavLink to="photos" style={({isActive}) => isActive ? activeLink : null}>
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={[van, setVan]}/>
            </div>
            ) : (
                <h1 className="loading__text">Fetching vans...</h1>
            )}
        </div>

    );

}
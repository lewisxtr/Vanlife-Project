import React from 'react';

import { Link } from "react-router-dom";
import { getHostVans } from "../../api"

export default function HostVans() {

    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadHostVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadHostVans()
    }, [])

    const mappedVans = vans.map(van => {
        return (<div className="host__van-card" key={van.id}>
            <Link to={van.id}>
                <img src={van.imageUrl} alt={`${van.name}`} />
                <div className="host__van-card-info">
                    <h3>{van.name}</h3>
                    <p>£{van.price}/day</p>
                </div>
            </Link>
        </div>) })


    return (
        <div className="host__vans-container">
            <h2 className="host__vans-title">Your listed vans</h2>
            {error ? (
                <div className="error__container">
                    <h2 className="error__title">Error fetching vans: {error.status}</h2>
                    <p className="error__message">{error.message}</p>
                </div>
            ) : !loading && !error && vans ? (
                <div className="host__vans-flex">
                    {mappedVans}
                </div>
            ) : (
                <h1 className="loading__text">Fetching vans...</h1>
            )}
        </div>
    )
}
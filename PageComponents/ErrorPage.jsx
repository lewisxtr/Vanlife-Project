import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <div className="error__container">
            <h2 className="error__title">Sorry, the page you were looking for was
                not found.</h2>
            <Link to=".." className="error__button">Return to home</Link>
        </div>
    )
}
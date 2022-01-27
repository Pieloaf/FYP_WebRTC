import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <Link to={`/conference/asd`}>
                <button>Join Conference</button>
            </Link>
        </div>
    );

}
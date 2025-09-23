import React from 'react';
import './extraStyle/error.css';
import {useNavigate} from "react-router-dom";
import {House, RefreshCcw} from 'lucide-react'

/**
 * Error message to display on errorElement in Router
 * @param {string} message - Message to display at user. By default, "Something went wrong"
 */
const Error = ({ message = "Something went wrong" }) => {
    const navigate=useNavigate();

    return (
        <div className={`error-container`}>
            <div className="error-content">
                <div className="error-message">
                    <span>400</span>
                    <span>{message}</span>
                </div>
            </div>
            <div className={'error-buttons'}>
                <button onClick={() => navigate('/')}><House size={20}/> Go Home</button>
                <button onClick={() => window.location.reload()}><RefreshCcw size={20}/> Retry</button>
            </div>
        </div>
    );
};

export default Error;
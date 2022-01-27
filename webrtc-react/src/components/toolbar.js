import React from "react";
import { FaShare, FaCamera, FaMicrophone, FaPhone } from "react-icons/fa";
import './toolbar.css';

export const Toolbar = () => {
    return (
        <div id="call-toolbar">
            <ul>
                <li>
                    <FaShare />
                </li>
                <li>
                    <FaCamera />
                </li>
                <li>
                    <FaMicrophone />
                </li>
                <li>
                    <FaPhone />
                </li>
            </ul>
        </div>
    )
}
import React from "react";


const Footer = ({img, name, phone, email}) => {
       
        /*  img
name
phone
email */
    return (
        <div className="footer-card">
                <img src={ img} alt="" />
                <h3>{name}</h3>
                <div className="info-group">
                <p><i className="fa-solid fa-phone"></i></p>
                    <p>{phone}</p>
                </div>
                <div className="info-group">
                <p><i className="fa-solid fa-envelope"></i></p>
                    <p>{email}</p>
                </div>
            </div>

    )
}

export default Footer
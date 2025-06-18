import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export const VolunteerLogin = () => {
    const [msg, setMsg] = useState('');
    const [msgType, setMsgType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('https://food-donation-project-zk5l.onrender.com/auth/volunteer-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            setMsg(data.msg);
            setMsgType(data.msg_type);

            if (response.ok) {
                alert("Login successful!");
                navigate('/Volunteer', { state: { email } });
            }
        } catch (error) {
            console.error('Error:', error);
            setMsg('Internal server error');
            setMsgType('error');
        }
    };

    return (
        <center>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <form id="loginForm" className={styles.formInput} onSubmit={handleSubmit}>
                        <h2>Welcome Volunteer</h2>
                        <h5>Login to your account</h5>
                        <input type="email" placeholder="Email" name="email" required />
                        <input type="password" placeholder="Password" name="password" required />
                        <button type="submit" className={styles.btn}>Login</button>
                        {msg && <p className={styles[msgType]}>{msg}</p>}
                        <p>Don't have an account? <a href="/volunteer-signup">Sign Up</a></p>
                    </form>
                </div>
            </div>
            <div style={{ height: '300px', width: '100%', position: 'absolute', bottom: '90px', zIndex: '-1' }}>
                <img src="/loginVector.svg" alt="Login Page Vector" style={{ width: "100%", height: "100%" }} />
            </div>
        </center>
    );
};

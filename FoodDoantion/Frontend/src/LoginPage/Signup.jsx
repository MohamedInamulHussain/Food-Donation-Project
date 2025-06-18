import React, { useState } from 'react';
import styles from './Login.module.css';

export const Signup = () => {
    const [msg, setMsg] = useState('');
    const [msgType, setMsgType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userName = formData.get('newName');
        const email = formData.get('newEmail');
        const mobile = formData.get('newMobile');
        const password = formData.get('newPassword');

        try {
            const response = await fetch('https://food-donation-project-zk5l.onrender.com/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, email, mobile, password })
            });

            const data = await response.json();
            setMsg(data.msg);
            setMsgType(data.msg_type);

            if (response.ok) {
                alert("Signup successful!");
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
                    <form id="signupForm" className={styles.formInput} onSubmit={handleSubmit}>
                        <h2>Signup</h2>
                        <h5>Enter your details</h5>
                        <input type="text" placeholder="Name" name="newName" required />
                        <input type="email" placeholder="Email" name="newEmail" required />
                        <input type="number" placeholder="Mobile Number" name="newMobile" required />
                        <input type="password" placeholder="Password" name="newPassword" required />
                        <button type="submit" className={styles.btn}>Sign Up</button>
                        {msg && <p className={styles[msgType]}>{msg}</p>}
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </form>
                </div>
            </div>
            <div style={{ height: '300px', width: '100%', position: 'absolute', bottom: '90px', zIndex: '-1' }}>
                <img src="/loginVector.svg" alt="Signup Page Vector" style={{ width: "100%", height: "100%" }} />
            </div>
        </center>
    );
};

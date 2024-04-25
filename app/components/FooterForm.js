'use client';
import { useState } from 'react';
import axios from 'axios';
import styles from './Footer.module.css';

const FooterForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);

    // Send a POST request to your serverless function
    try {
      const response = await axios.post('/api/sendFormFooter', Object.fromEntries(formData));

      // If the request was successful, display a success message
      setMessage('Form submitted successfully!');
    } catch (error) {
      // If the request failed, display an error message
      setMessage('An error occurred. Please try again.');
    }
  };
  return (
    <>
      <form className={styles.emailSignUp} name="signup" onSubmit={handleSubmit}
        method="POST"
      >
        <p>
          <label><span className="screen-reader-text">Email Address</span> <input placeholder="Email Address" type="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required /></label>
        </p>
        <p>
          <button type="submit">Sign Up</button>
        </p>
        <input type="hidden" name="form-name" value="signup"></input>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default FooterForm;
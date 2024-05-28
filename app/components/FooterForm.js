'use client';
import { useState } from 'react';
import axios from 'axios';
import styles from './Footer.module.css';

const FooterForm = () => {

  return (
    <>
      <form className={styles.emailSignUp} name="signup"
      >
        <p>
          <label><span className="screen-reader-text">Email Address</span> <input placeholder="Email Address" type="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required /></label>
        </p>
        <p>
          <button type="submit">Sign Up</button>
        </p>
        <input type="hidden" name="form-name" value="signup"></input>
      </form>
    </>
  );
};

export default FooterForm;
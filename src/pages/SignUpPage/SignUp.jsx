import React from "react";
import styles from "./SignUp.module.css"; // Import CSS module file for styling
import { imageExporter } from "../../assets/images";

const SignUpPage = () => {
  return (
    <div className={styles.signUpPageContainer}>
      <div
        className={styles.leftSide}
      ><img
						style={{
							width: '100%',
							maxHeight: '100%',
							objectPosition: 'center',
							objectFit: 'cover',
						}}
						src={imageExporter.background}
						alt="background"
					></img></div>
      <div className={styles.rightSide}>
        <div className={styles.signUpHeader}>
          <h1>Sign Up</h1>
        </div>
        <div className={styles.signUpForm}>
          <div className={styles.inputGroup}>
            <div className={styles.inputColumn}>
              <div className={styles.signUpInput}>
                <label>First Name</label>
                <input
                  type="text"
                  
                  className={styles.inputField}
                />
              </div>
              <div className={styles.signUpInput}>
                <label>Email</label>
                <input
                  type="email"
                  
                  className={styles.inputField}
                />
              </div>
              <div className={styles.signUpInput}>
                <label>Password</label>
                <input
                  type="password"
                  
                  className={styles.inputField}
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.signUpInput}>
                <label>Last Name</label>
                <input
                  type="text"
                 
                  className={styles.inputField}
                />
              </div>
              <div className={styles.signUpInput}>
                <label>Phone No</label>
                <input
                  type="tel"
                  
                  className={styles.inputField}
                />
              </div>
              <div className={styles.signUpInput}>
                <label>Confirm Password</label>
                <input
                  type="password"
                 
                  className={styles.inputField}
                />
              </div>
            </div>
          </div>
          <div className={styles.checkboxTerms}>
            <input type="checkbox" id="agree" />
            <label htmlFor="agree">I agree with the terms of use</label>
          </div>
          <button className={styles.signUpButton}>Sign Up</button>
          <p className={styles.signInLink}>
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

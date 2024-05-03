import React from "react";
import styles from "./Login.module.css"; // Import CSS module file for styling
import { imageExporter } from "../../assets/images";

const LoginPage = () => {
  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.leftSide}>
        <div className={styles.loginHeader}>
          <h1>Sign In</h1>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.loginInput}>
            <label>Email</label>
            <input
              type="text"
              
              className={styles.inputField}
            />
          </div>
          <div className={styles.loginInput}>
            <label>Password</label>
            <input
              type="password"
              
              className={styles.inputField}
            />
          </div>

          <div className={styles.checkboxForgot}>
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember password?</label>
            </div>

            <a href="/signup" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          <button className={styles.loginButton}>Sign In</button>
        </div>
      </div>
      <div
        className={styles.rightSide}
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
    </div>
  );
};

export default LoginPage;

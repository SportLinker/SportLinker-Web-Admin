// PermissionDeniedPage.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./PermissionDeniedPage.module.css";

const PermissionDeniedPage = () => {
  return (
    <div className={styles.permissionDeniedContainer}>
      <h1 className={styles.heading}>Permission Denied</h1>
      <p className={styles.paragraph}>
        You don't have permission to access this page.
      </p>
      <p className={styles.paragraph}>
        Please contact the administrator for assistance.
      </p>
      <Link to="/" className={styles.homeLink}>
        <button className={styles.homeButton}>Go to Home</button>
      </Link>
    </div>
  );
};

export default PermissionDeniedPage;

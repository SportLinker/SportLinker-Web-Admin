import { Divider } from "antd";
import React from "react";
import styles from "./NotFoundPage.module.css";
import Title from "antd/es/typography/Title";

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundMessage}>
      <div className={styles.title}>
        <Title level={2} style={{ color: "#A6425E", fontWeight: "bold" }}>
          "YOU DO NOT HAVE ACCESS TO THIS PAGE OR THE PAGE DOES NOT EXIST."
        </Title>
        <Divider></Divider>
      </div>
    </div>
  );
};

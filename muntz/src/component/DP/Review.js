import React, { useState } from "react";
import style from "@/styles/DP/Review.module.css";
import StyleReview from "./ReivewItem/StyleReview";
import BasicReview from "./ReivewItem/BasicReivew";

export default function Review({ productId }) {  // props로 받는 방식으로 수정
  console.log("productId : " + productId);
  const [activeTab, setActiveTab] = useState("style");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.Review}>
      <div className={style.ReviewNav}>
        <ul>
          <li
            className={activeTab === "style" ? style.active : ""}
            onClick={() => handleTabClick("style")}
          >
            Style Review
          </li>
          <li
            className={activeTab === "basic" ? style.active : ""}
            onClick={() => handleTabClick("basic")}
          >
            Basic Review
          </li>
        </ul>
      </div>
      <div className={style.ReviewBox}>
        {activeTab === "style" && <StyleReview productId={productId} />}  {/* props로 넘기기 */}
        {activeTab === "basic" && <BasicReview productId={productId} />}  {/* props로 넘기기 */}
      </div>
    </div>
  );
}

import { useState } from "react";
import style from "@/styles/MY/Review/Reviewtab.module.css";
import StyleReview from "./StyleReview";
import BasicReview from "./BasicReview";

export default function ReviewTab({ onClose  , productId }) {
  const [activeTab, setActiveTab] = useState("style");

  return (
    <div className={style.ReviewTab}>
      <div className={style.ReviewBox}>
        <div className={style.LeftBtn}>
          <button
            className={style.StyleBtn}
            onClick={() => setActiveTab("style")}
          >
            Style Review
          </button>
          <button onClick={() => setActiveTab("basic")}>Basic Review</button>
        </div>
        <div className={style.RightBtn}>
          <button onClick={onClose} className={style.CloseBtn}>
            Close
          </button>
        </div>
      </div>

      <div>
        {activeTab === "style" ? <StyleReview productId = {productId} /> : null}
        {activeTab === "basic" ? <BasicReview productId = {productId}/> : null}
      </div>
    </div>
  );
}

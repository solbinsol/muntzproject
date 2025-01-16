import { useState } from "react";
import axios from "axios";
import style from "@/styles/MY/Review/StyleReview.module.css";

export default function StyleReview({ productId, onReviewSubmit }) {
  const [imgPath, setImgPath] = useState("");
  const [content, setContent] = useState("");

  console.log("부모 컴포넌트에서 전달된 productId:", productId); // 전달된 productId 확인

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.name) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!imgPath || !content) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    
    try {
      await axios.post("http://localhost:5000/api/style_review", {
        product_id: productId,
        username: storedUser.name,
        content: content,
        img_path: imgPath,
      });

      alert("리뷰가 성공적으로 등록되었습니다.");
      setImgPath("");
      setContent("");
      
      if (onReviewSubmit) onReviewSubmit(); // 리뷰 제출 후 동작

      window.location.reload();
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={style.StyleReview}>
      <div className={style.ReivewData}>
        <p>사진</p>
        <input
          type="text"
          value={imgPath}
          onChange={(e) => setImgPath(e.target.value)}
          placeholder="이미지 경로 입력"
        />
        <p>내용 </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="리뷰 내용을 작성하세요."
        />
        <button className={style.UploadBtn} onClick={handleSubmit}>리뷰 등록</button>
      </div>
    </div>
  );
}

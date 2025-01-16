import React, { useState } from 'react';
import axios from 'axios';
import style from '@/styles/MY/Review/BasicReview.module.css';

export default function StyleReview({ productId }) {
  const [content, setContent] = useState('');

  // 로컬스토리지에서 사용자 이름 가져오기
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (!storedUser.name) {
        alert('로그인 후 리뷰를 작성해주세요!');
        return;
    }
    if (!content) {
        alert('내용을 입력해주세요!');
        return;
    }

    const requestData = {
        productId: productId,
        username: storedUser.name,
        content: content,
    };

    console.log(requestData); // 데이터가 제대로 전달되는지 콘솔로 확인

    try {
        const response = await axios.post('http://localhost:5000/api/basic_review/add', requestData);
        if (response.data.success) {
            alert('리뷰가 성공적으로 등록되었습니다!');
            setContent('');  // 내용 초기화
        } else {
            alert('리뷰 등록에 실패했습니다.');
        }
    } catch (error) {
        console.error('리뷰 등록 오류:', error);
        alert('서버 오류가 발생했습니다.');
    }
};

  return (
    <div className={style.StyleReview}>
      <div className={style.ReviewData}>
        <p>내용</p>
        <textarea
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <button className={style.UploadBtn} onClick={handleSubmit}>리뷰 등록</button>
    </div>
  );
}

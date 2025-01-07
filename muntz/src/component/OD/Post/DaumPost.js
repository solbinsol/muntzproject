// components/PostcodeModal.js
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import style from '@/styles/OD/Post/DaumPost.module.css';

const PostcodeModal = ({ onComplete, onClose }) => {
  return (
    <div className={style.PostPopUp} onClick={onClose}>
      <div className={style.ModalContent} onClick={(e) => e.stopPropagation()}>
        <DaumPostcode onComplete={onComplete} />
        <button className={style.CloseButton} onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default PostcodeModal;

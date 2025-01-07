import { useEffect, useState } from 'react';
import Link from 'next/link';

import style from '@/styles/MY/UserInfo.module.css'
export default function Home() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 세션스토리지에서 user 정보를 가져오기
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // JSON 문자열을 객체로 파싱
      const parsedUser = JSON.parse(storedUser);
      
      // 상태 업데이트
      setUserInfo(parsedUser);
    }
  }, []);


  console.log(userInfo);
  return (
    <div className={style.MyPage}>

<div className={style.MyContent}>
        <h2>USER INFO</h2>
        {userInfo && (
          <>
            <div className={style.UserInfo}>
              <p className={style.KP}>아이디</p>
              <p className={style.EP}>{userInfo.user_id}</p>
            </div>
            <div className={style.UserInfo}>
              <p className={style.KP}>패스워드</p>
              <p className={style.EP}>{userInfo.mobile}</p>
            </div>
            <div className={style.UserInfo}>
              <p className={style.KP}>이름</p>
              <p id={style.N} className={style.EP}>{userInfo.name}</p>
            </div>
            <div className={style.UserInfo}>
              <p className={style.KP}>이메일</p>
              <p className={style.EP}>{userInfo.email}</p>
            </div>
            <div className={style.UserInfo}>
              <p className={style.KP}>이름</p>
              <p className={style.EP}>{userInfo.name}</p>
            </div>

            


          </>
        )}
      </div>

    </div>
  )
}

import Link from 'next/link';
import { useEffect, useState } from 'react';
import style from '@/styles/Header.module.css';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    // 로컬 스토리지에서 user 정보를 가져와서 로그인 상태 확인
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setLoggedIn(true);
      setUserName(user.name);
      setUserID(user.user_id);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 로직을 수행하고 로그인 상태를 변경
    // 예: localStorage.clear() 또는 로그아웃 API 호출
    localStorage.clear();
    setLoggedIn(false);
    setUserName('');
  };

  return (
    <div className={style.header}>
      <div className={style.LogoBox}>
        <div className={style.MG}>
        <Link href="/">
          <img className={style.LogoImg} src="image/Logo.jpg" alt="Logo" />
          <span className={style.Logo}>muntz</span>
        </Link>
        </div>
      </div>
      <div className={style.MenuBox}>
        <ul className={style.Menu}>
          <Link href="/categorypage?categoryNo=1"><li>Outer</li></Link>
          <Link href="/categorypage?categoryNo=2"><li>Top</li></Link>
          <Link href="/categorypage?categoryNo=3"><li>Bottom</li></Link>
          <Link href="/categorypage?categoryNo=4"><li>Acc</li></Link>
        </ul>
        <ul className={style.RMenu}>
          {loggedIn ? (
            <>
              <Link href='/'><li className={style.SU} onClick={handleLogout}> Logout</li></Link>
              <Link href="/mypage"><li className={style.UN}>{userName} </li></Link>
            </>
          ) : (
            <>
              <Link href="/signup"><li className={style.SU}>/SignUp</li></Link>
              <Link href="/login"><li>Login</li></Link>
            </>
          )}
          <li className={style.Serch}>○</li>
        </ul>
      </div>
    </div>
  );
}

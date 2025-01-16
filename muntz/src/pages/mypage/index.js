import Footer from '@/component/Footer'
import Header from '@/component/Header'
import UserInfo from '@/component/MY/UserInfo'
import BuyHistory from '@/component/MY/BuyHistory'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import style from "@/styles/MY/MyPage.module.css"

export default function Home() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    // 로컬 스토리지에서 user 정보를 가져와서 로그인 상태 확인
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
      setUserID(user.user_id);
    }
  }, []);

  return (
    <div className={style.MyPage}>
      <Header></Header>

      <div className={style.MyContent}>
        <UserInfo></UserInfo>

        {/* <BuyHistory></BuyHistory> */}

        <dlv className={style.MyNav}>
          <ul>
            <h2>SHOPPING</h2>
            <Link href="/orderdetails"><li id={style.TLi}><h3>주문/배송 내역</h3></li></Link>
            <Link href=""><li><h3>환불/교환 내역</h3></li></Link>
            <Link href=""><li><h3>후기 관리</h3></li></Link>
            {/* Admin Page 링크는 조건부 렌더링 */}
            {userID === 29 && userName === 'admin' && (
              <Link href='/admin'><li><h3>Admin Page</h3></li></Link>
            )}
          </ul>
        </dlv>

      </div>

      <Footer></Footer>

    </div>
  )
}

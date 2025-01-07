import Footer from '@/component/Footer'
import Header from '@/component/Header'
import UserInfo from '@/component/MY/UserInfo'
import BuyHistory from '@/component/MY/BuyHistory'
import Link from 'next/link'
import style from "@/styles/MY/MyPage.module.css"
export default function Home() {
  return (
    <div className={style.MyPage}>
      <Header></Header>

      <div className={style.MyContent}>
        <UserInfo></UserInfo>
        
        {/* <BuyHistory></BuyHistory> */}

        <dlv className={style.MyNav}>
            <ul>
                <h2>SHOPING</h2>
                <Link href="/mypage/orderdetails"><li id={style.TLi}><h3>주문/배송 내역</h3></li></Link>
                <Link href=""><li><h3>환불/교환 내역</h3></li></Link>
                <Link href=""><li><h3>후기 관리</h3></li></Link>
            </ul>
        </dlv>

      </div>

      <Footer></Footer>

    </div>
  )
}

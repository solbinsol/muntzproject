import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import style from '@/styles/MainPage.module.css'
import Link from 'next/link'
import ClosetBox from '@/component/ClosetBox'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import NewProduct from '@/component/MP/NewProduct'
import BestItem from '@/component/MP/BestItem'
import AllProduct from '@/component/MP/AllProduct'
import MainSnap from '@/component/MP/MainSnap'
import MainFooter from '@/component/MP/MainFooter'

export default function Home() {
  return (
    <div className={style.MainPage}>
      <Header></Header>
        <div className={style.MainImg}>
          <img src='image/testMain2.jpg'/>
        </div>
      <div className={style.MainContent}>
        <div className={style.MainSnap}>
          <MainSnap></MainSnap>          
        </div>
        <div className={style.BestItem}>
          <BestItem></BestItem>          
        </div>
        {/* <div className={style.NewProduct}>
          <NewProduct></NewProduct>          
        </div> */}
        <div className={style.Product}>
          <AllProduct></AllProduct>
        </div>
        {/* <div className={style.FooterBox}>
          <MainFooter></MainFooter>
        </div> */}
      </div>
      <Footer></Footer>

    </div>
  )
}

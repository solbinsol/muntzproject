import Image from 'next/image'
import { Inter } from 'next/font/google'
import style from '@/styles/Login.module.css'
import Link from 'next/link'
import ClosetBox from '@/component/ClosetBox'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import NewProduct from '@/component/MP/NewProduct'
import BestItem from '@/component/MP/BestItem'
import AllProduct from '@/component/MP/AllProduct'
import React, { useState } from 'react';
import axios from 'axios';
export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleLogin = async () => {
        try {
          const response = await axios.post('http://115.23.171.88:5000/api/auth/login', formData);
          console.log(response.data);
    
          // 로그인이 성공하면 추가적인 로직을 수행하면 됩니다.
          const { user } = response.data;
          const { name, email, mobile ,user_id } = user;
          
          // 로컬 스토리지에 쿠키 생성
          localStorage.setItem('user', JSON.stringify({ name, email, mobile,user_id }));
          window.location.href = '/';

          
        } catch (error) {
          console.error('API 호출 오류:', error);
        }
      };


      
    return(
        <div className={style.Login}>
            <Header></Header>
            <div className={style.LoginPage}>
            <div className={style.LoginBox}>
          <h3>muntz</h3>
          <input
            className={style.ID}
            type="text"
            name="username"
            placeholder="ID"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className={style.PW}
            type="password"
            name="password"
            placeholder="PW"
            value={formData.password}
            onChange={handleChange}
          />
          <button className={style.btnLogin} onClick={handleLogin}>
            LOGIN
          </button>                    <div className={style.BottomBtn}>
                        <button className={style.btnKL}><img src="./image/kakao2.png"></img></button>
                        <button className={style.btnSignUp}>SignUp</button>
                    </div>
                    <div className={style.TT}>
                        <p>아이디 찾기</p><p className={style.R}>비밀번호 찾기</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
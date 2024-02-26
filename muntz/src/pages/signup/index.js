import Head from 'next/head';
import style from '@/styles/SignUp.module.css';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [PersonalVisible, setPersonalVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

  const toggleTerms = () => {
    setTermsVisible(!termsVisible);
  };

  const togglePersonnal = () => {
    setPersonalVisible(!PersonalVisible);
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('회원가입 로직');
    if (formData.password !== formData.passwordConfirm) {
      console.error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      // 회원가입 정보를 서버로 전송
      const response = await axios.post('http://115.23.171.88:5000/api/auth/signup', formData);

      // 회원가입 성공 시 로직 (예: 리다이렉트 등)
      console.log(response.data);
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };

  return (
    <div className={style.Login}>
      <Header />
      <div className={style.LoginPage}>
        <div className={style.LoginBox}>
          <h3>MEMBER INFO</h3>
          <form onSubmit={handleSubmit}>
            {/* 각 입력 요소에 name 속성 추가 */}
            <div className={style.IDBox}>
              <p>ID</p>
              <input
                className={style.Sm}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div id={style.PW} className={style.IDBox}>
              <p>PASSWORD</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className={style.IDBox}>
              <p>PW CHECKING</p>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>
            <div className={style.IDBox}>
              <p>NAME</p>
              <input
                className={style.Sm}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={style.IDBox}>
              <p>E-MAIL</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={style.IDBox}>
              <p>MOBILE</p>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className={style.TermsBox}>
              <h3>이용약관</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                      <span>
                        [필수] 이용약관 동의{' '}
                        <span onClick={toggleTerms} className={style.drop}>
                          <img src="image/icon/drop.png" alt="drop" />
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    {termsVisible && (
                      <td>
                        <div className={`${style.Terms} ${termsVisible ? style.visible : style.hidden}`}>
                          <p>이용약관 내용 이용약관 내용</p>
                          <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                          <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                          <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                        </div>
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                      <span>
                        [필수] 개인정보 수집 및 이용 동의{' '}
                        <span onClick={togglePersonnal} className={style.drop}>
                          <img src="image/icon/drop.png" alt="drop" />
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    {PersonalVisible && (
                      <td>
                        <div className={`${style.Personal} ${PersonalVisible ? style.visible : style.hidden}`}>
                          <p>개인정보 수집 및 이용 동의 내용</p>
                          <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                          <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                          <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                        </div>
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>
                      <span>[선택]</span>
                      <input type="checkbox" />
                      <span> SMS</span>
                      <input type="checkbox" />
                      <span> E-MAIL</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className={style.LoginBtn} type="submit">
                CREATE AN ACCOUNT
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

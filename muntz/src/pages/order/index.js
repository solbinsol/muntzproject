import style from '@/styles/OD/order.module.css'
import Link from 'next/link'
import Footer from '@/component/Footer'
import { useState } from 'react';

import Header from '@/component/Header'
import BestItem from '@/component/MP/BestItem'
import AllProduct from '@/component/MP/AllProduct'
import CardPayment from '@/component/OD/CardPayment';
import NoBank from '@/component/OD/NoBank';
import KakaoPay from '@/component/OD/KakaoPay';
import NaverPay from '@/component/OD/NaverPay';

export default function OrderPage() {


    const [showTextarea, setShowTextarea] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    
    const [PersonalVisible , setPersonalVisible] = useState(false);
    const [termsVisible, setTermsVisible] = useState(false);
    PersonalVisible
    const toggleTerms = () => {
      setTermsVisible(!termsVisible);
    };
    const togglePersonnal = () => {
      setPersonalVisible(!PersonalVisible);
    };

    
    const handleSelectChange = (event) => {
      const value = event.target.value;
      if (value === 'input') {
        setShowTextarea(true);
      } else {
        setShowTextarea(false);
      }
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
    };
  return (
    <div className={style.OrderPage}>
      <Header />
      <div className={style.OrderContent}>
        <h2>ORDER / PAYMENT</h2>
        <h3>배송 정보</h3>
        <div className={style.OrderInfo}>
          <table>
            <tbody>
              <tr>
                <td className={style.OrderTitle}>이름</td>
                <td className={style.OrderInput}>회원 이름</td>
              </tr>
              <tr>
                <td className={style.OrderTitle}>연락처</td>
                <td className={style.OrderInput}>회원 전화번호</td>
              </tr>
              <tr>
                <td className={style.OrderTitle}>배송지</td>
                <td className={style.OrderInput}><input type="text"/></td>
              </tr>
              <tr>
                <td className={style.OrderTitle}>배송 요청사항</td>
                <td className={style.OrderInput}>
                  <select onChange={handleSelectChange}>
                    <option value="guard">부재시 경비실에 맡겨주세요</option>
                    <option value="door">부재시 문앞에 놔주세요</option>
                    <option value="parcel">부재시 택배함에 넣어주세요</option>
                    <option value="contact">배송 전 연락주세요</option>
                    <option value="input">직접 입력하기</option>

                  </select>
                  {showTextarea && <textarea></textarea>}

                </td>
              </tr>
            </tbody>
          </table>
          <h3 className={style.MT}>상품 정보</h3>
          <div className={style.ProductInfo}>
            <img scr="1.jpg"/>
            <div className={style.ProductInfoText}>
                <p>상품 이름</p>
                <p>사이즈 : S</p>
                <p>색상 : black</p>
                <p>총금액 : 19,000</p>
            </div>
          </div>
          <h3 className={style.MT}>결제 방식</h3>
          <div className={style.PaymentType}>
            <table>
                <tbody>
                    <tr>
                    <td onClick={() => handlePaymentSelect('card')} className={selectedPayment === 'card' ? style.SelectedPayment : null}>신용카드</td>
                    </tr>
                    <tr>
                    <td onClick={() => handlePaymentSelect('noBank')} className={selectedPayment === 'noBank' ? style.SelectedPayment : null}>무통장입금</td>
                    </tr>
                    <tr>
                    <td onClick={() => handlePaymentSelect('kakaoPay')} className={selectedPayment === 'kakaoPay' ? style.SelectedPayment : null}>카카오페이</td>
                    </tr>
                    <tr>
                    <td onClick={() => handlePaymentSelect('naverPay')} className={selectedPayment === 'naverPay' ? style.SelectedPayment : null}>네이버페이</td>
                    </tr>
                </tbody>
            </table>
            <div className={style.CB}>
                {selectedPayment === 'card' && <CardPayment />}
                {selectedPayment === 'noBank' && <NoBank />}
                {selectedPayment === 'kakaoPay' && <KakaoPay />}
                {selectedPayment === 'naverPay' && <NaverPay />}
            </div>
            <div className={style.Agree}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type='checkbox'/><span> [필수] 이용약관 동의 <span onClick={toggleTerms} className={style.drop}><img src="image/icon/drop.png" /></span></span>
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
                                <input type='checkbox'/><span> [필수] 개인정보 수집 및 이용 동의 <span  onClick={togglePersonnal} className={style.drop}><img src="image/icon/drop.png" /></span></span>
                            </td>
                        </tr>
                    {PersonalVisible && (
                        <tr>
                            <td>
                                <div className={`${style.Personal} ${PersonalVisible ? style.visible : style.hidden}`}>
                                    <p>개인정보 수집 및 이용 동의 내용</p>
                                    <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                                    <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                                    <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <button className={style.Buy}>결제하기</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

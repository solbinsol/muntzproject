import style from '@/styles/OD/order.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import PostcodeModal from '@/component/OD/Post/DaumPost';

import CardPayment from '@/component/OD/CardPayment';
import NoBank from '@/component/OD/NoBank';
import KakaoPay from '@/component/OD/KakaoPay';
import NaverPay from '@/component/OD/NaverPay';

export default function OrderPage() {
  const [isTermsChecked, setIsTermsChecked] = useState(false); // 약관 동의 체크 상태
  const [isPersonalChecked, setIsPersonalChecked] = useState(false); // 개인정보 동의 체크
  const [showTextarea, setShowTextarea] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [PersonalVisible, setPersonalVisible] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [address, setAddress] = useState(''); // 배송지 상태
  const [showPostcode, setShowPostcode] = useState(false);
  const [product, setProduct] = useState(null); // 상품 데이터를 저장할 상태
  const router = useRouter();
  const { product_id } = router.query; // 쿼리에서 product_id 추출
  const { color, size } = router.query; // URL 쿼리에서 color와 size 가져오기

  useEffect(() => {
    if (!product_id) return; // product_id가 없으면 실행하지 않음

    // API에서 상품 데이터 가져오기
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${product_id}`);
        if (!response.ok) throw new Error('상품 정보를 가져오지 못했습니다.');
        const data = await response.json();
        setProduct(data); // 상태에 저장
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProductData();
  }, [product_id]);

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

  const handleCompletePostcode = (data) => {
    setAddress(data.roadAddress);
    setShowPostcode(false);
  };

  const handlePaymentSelect = (payment) => {
    if (!isTermsChecked || !isPersonalChecked) {
      alert('모든 필수 약관에 동의해주세요.');
      return;
    }

    if (!address) {
      alert('배송지를 입력해주세요.');
      return;
    }

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
                <td className={style.OrderInput}>
                  <input
                    type="text"
                    value={address}
                    onClick={() => setShowPostcode(true)}
                    readOnly
                  />
                </td>
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
          {product ? (
            <div className={style.ProductInfo}>
              <img src={product.thumbnail_image} alt="상품 이미지" />
              <div className={style.ProductInfoText}>
                <p>{product.product_name}</p>
                <p>
                  선택한 옵션: {size ? `사이즈: ${size}` : "사이즈 미선택"}</p> <p>  {color ? `컬러: ${color}` : "컬러 미선택"}</p>
                <p>가격: {product.price}</p>
              </div>
            </div>
          ) : (
            <p>상품 정보를 불러오는 중입니다...</p>
          )}

          <h3 className={style.MT} id={style.MT2}>결제 방식</h3>
          <div className={style.PaymentType}>
            <table>
              <tbody>
                <tr>
                  <td
                    onClick={() => handlePaymentSelect('card')}
                    className={selectedPayment === 'card' ? style.SelectedPayment : null}
                  >
                    신용카드
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() => handlePaymentSelect('noBank')}
                    className={selectedPayment === 'noBank' ? style.SelectedPayment : null}
                  >
                    무통장입금
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() => handlePaymentSelect('kakaoPay')}
                    className={selectedPayment === 'kakaoPay' ? style.SelectedPayment : null}
                  >
                    카카오페이
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() => handlePaymentSelect('naverPay')}
                    className={selectedPayment === 'naverPay' ? style.SelectedPayment : null}
                  >
                    네이버페이
                  </td>
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
                      <input
                        type="checkbox"
                        checked={isTermsChecked}
                        onChange={() => setIsTermsChecked(!isTermsChecked)}
                      />
                      <span>
                        [필수] 이용약관 동의
                        <span onClick={toggleTerms} className={style.drop}>
                          <img src="image/icon/drop.png" />
                        </span>
                      </span>
                    </td>
                  </tr>
                  {termsVisible && (
                    <tr>
                      <td>
                        <div className={`${style.Terms} ${termsVisible ? style.visible : style.hidden}`}>
                          <p>이용약관 내용</p>
                          <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라</p>
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={isPersonalChecked}
                        onChange={() => setIsPersonalChecked(!isPersonalChecked)}
                      />
                      <span>
                        [필수] 개인정보 수집 및 이용 동의
                        <span onClick={togglePersonnal} className={style.drop}>
                          <img src="image/icon/drop.png" />
                        </span>
                      </span>
                    </td>
                  </tr>
                  {PersonalVisible && (
                    <tr>
                      <td>
                        <div className={`${style.Personal} ${PersonalVisible ? style.visible : style.hidden}`}>
                          <p>개인정보 수집 및 이용 동의 내용</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <Footer />

      {showPostcode && <PostcodeModal onComplete={handleCompletePostcode} onClose={() => setShowPostcode(false)} />}
    </div>
  );
}

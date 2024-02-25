import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import style from "../../styles/DP/ProductInfo.module.css";

import axios from "axios";

// ... (이전 import 문)

export default function DetailPage() {
    const [selectedTab, setSelectedTab] = useState('description');
    const [currentUserID, setCurrentUserID] = useState(null);
    const [userBasResponse, setUserBasket] = useState(null);
    const [userLikeResponse, setUserLikeResponse] = useState(null);
    const [btnBasketClass, setBtnBasketClass] = useState('');
    const [isInBasket, setIsInBasket] = useState(false);
    const router = useRouter();
    const currentProductID = router.query.product_id;
    const [product, setProduct] = useState(null);
  
    const [stockData, setStockData] = useState([]); // 재고 정보 상태 추가

    const [colors, setColors] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);

    
    useEffect(() => {
      // 좋아요와 바구니 상태 초기화
      if (product) {
        setIsInBasket(product.isInBasket === 1);
      }
    }, [product]);
  
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        
        setCurrentUserID(storedUser.user_id);
      }
  
      const fetchProduct = async () => {
        const { product_id } = router.query;
        try {
          if (!product_id) {
            console.error('Product ID is not provided.');
            return;
          }
  
          // 기존의 상품 정보를 가져오는 API
          const productResponse = await axios.get(`http://localhost:5000/api/product/${product_id}`);
  
          // 새로 추가한 ProductDetails 정보를 가져오는 API
          const productDetailsResponse = await axios.get(`http://localhost:5000/api/detail/${product_id}`);
  
          const category_id = productResponse.data.category_id;

          // 제품의 사이즈 정보를 가져오는 API
          const sizeResponse = await axios.get(`http://localhost:5000/api/size/${category_id}/${product_id}`);
          console.log('Size API Response:', sizeResponse.data);

          // 제품의 재고 정보를 가져오는 API
          const stockResponse = await axios.get(`http://localhost:5000/api/stock/${product_id}`);
          console.log('Stock API Response:', stockResponse.data);
  
          setStockData(stockResponse.data); // 재고 정보 상태 업데이트
  
          const colorResponse = await axios.get(`http://localhost:5000/api/color/${product_id}`);
          setColors(colorResponse.data);

          
          // 로그인한 경우에만 좋아요 및 바구니 상태를 가져옴
          let userLikeResponse = null;
          let userBasResponse = null;
  
          if (storedUser) {
            userLikeResponse = await axios.post('http://localhost:5000/api/user_likes/get-like', {
              user_id: storedUser.user_id,
              product_id,
            });
            console.log('User Like Response:', userLikeResponse.data);
            setUserLikeResponse(userLikeResponse.data);
                
            if (!userLikeResponse.data) {
                // 레코드가 없으면 새로운 레코드 추가
                await axios.post('http://localhost:5000/api/user_likes/insert-like', {
                  user_id: storedUser.user_id,
                  product_id,
                  liked: 0, // 초기값
                  basket: 0, // 초기값
                });
                console.log("asdasdasdasdasdas");
              }
            userBasResponse = await axios.post('http://localhost:5000/api/user_likes/get-basket', {
              user_id: storedUser.user_id,
              product_id,
            });
            setUserBasket(userBasResponse.data);
          }
  
          // 받아온 상품 정보, ProductDetails 정보, 사이즈 정보, 재고 정보를 합쳐서 상태에 저장
          const productWithDetailsAndSize = {
            ...productResponse.data,
            ...productDetailsResponse.data,
            sizes: sizeResponse.data,
            stock: stockResponse.data,
            liked: userLikeResponse?.data.liked === 1,
            isInBasket: userLikeResponse?.data.basket === 1,
          };
          setProduct(productWithDetailsAndSize);
  
          await axios.post('http://localhost:5000/api/increase-view-count', { product_id });
        } catch (error) {
          console.error('API 호출 오류dd:', error);
        }
      };
  
      fetchProduct();
    }, [router.query.product_id]);
  
    const toggleLike = async () => {
      try {
        // 로그인하지 않은 경우 토글하지 않고 로그인 페이지로 이동하도록 처리
        if (!currentUserID) {
          router.push('/login');
          return;
        }
  
        // 서버에 토글된 정보를 전송
        const response = await axios.post('http://localhost:5000/api/user_likes/toggle-like', {
          user_id: currentUserID,
          product_id: currentProductID,
        });
  
  
        // 서버에서 받아온 좋아요 여부를 확인
        const updatedLikes = response.data.likes;
  
        setProduct((prevProduct) => ({
          ...prevProduct,
          likes: updatedLikes,
          liked: response.data.liked === 1, // 여기에서 'liked'가 정의되어 있는지 확인
        }));
        const newBtnLikeClass = response.data.liked === 1 ? style.BtnLike2 : '';
        const likeButton = document.querySelector(`.${style.BtnLike}`);
        likeButton.className = `${style.BtnLike} ${newBtnLikeClass}`;
      } catch (error) {
        console.error('좋아요 토글 오류:', error);
      }
    };
  
    const toggleBasket = async () => {
      try {
        // 로그인하지 않은 경우 토글하지 않고 로그인 페이지로 이동하도록 처리
        if (!currentUserID) {
          router.push('/login');
          return;
        }
  
        const response = await axios.post('http://localhost:5000/http://172.30.1.71:5000/api/user_likes/toggle-basket', {
          user_id: currentUserID,
          product_id: currentProductID,
        });
  
        // 성공 시에 클라이언트에서 바구니 상태 및 버튼 스타일 업데이트
        setIsInBasket((prevIsInBasket) => !prevIsInBasket); // 바구니 상태를 토글합니다.
  
        if (response.data.success) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            likes: response.data.likes,
            liked: response.data.liked === 1,
          }));
  
          // 바구니 버튼 스타일 업데이트
          const newBtnBasketClass = response.data.basket === 1 ? style.BtnBag2 : '';
          setBtnBasketClass(newBtnBasketClass);
        }
        const newBtnBagClass = response.data.basket === 1 ? style.BtnBag2 : '';
        const BagButton = document.querySelector(`.${style.BtnBag}`);
        BagButton.className = `${style.BtnBag} ${newBtnBagClass}`;
      } catch (error) {
        console.error('바구니 토글 오류:', error);
      }
    };
  
    return (
      <div>
        <div className={style.DetailPage}>
          <div className={style.DetailBox}>
            {product ? (
              <div>
                <div className={style.ImgBox}>
                  <img src={product.thumbnail_image} alt={product.product_name} />
                  {/* 다른 상품 정보를 표시하는 컴포넌트를 추가하면 됩니다. */}
                  {/* ... 기타 필요한 정보 표시 */}
                </div>
                <div className={style.DetailText}>
                  <h3 className={style.DetailTitle}>
                    Product Info <span className={style.Gray}>제품정보</span>
                  </h3>
                  <h3 className={style.ClosetName}>{product.product_name}</h3>
                  <p className={style.PP}>좋아요: {product.likes}</p>
                  <p className={style.PP}>조회: {product.view_count}</p>
                  <p className={style.Price}>{product.price}원</p>
                  <div className={style.Nav}>
                    <p
                      className={selectedTab === 'description' ? style.selectedTab : ''}
                      onClick={() => setSelectedTab('description')}
                    >
                      description
                    </p>
                    <p
                      className={selectedTab === 'delivery' ? style.selectedTab : ''}
                      onClick={() => setSelectedTab('delivery')}
                    >
                      delivery
                    </p>
  
                    <div className={style.description} style={{ display: selectedTab === 'description' ? 'block' : 'none' }}>
                      {product.description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          <p>{line}</p>
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
  
                    <div className={style.delivery} style={{ display: selectedTab === 'delivery' ? 'block' : 'none' }}>
                      <li>배송은 평균 3~5일 정도 소요되고 있습니다.</li>
                      <li>교환 및 환불에 관한 문의는 공지사항을 참고해 주시기 바랍니다.</li>
                      <li>택배사 : </li>
                      <li>배송비 : </li>
                    </div>
                    <div className={style.Selecter}>

                        <select>
                        {colors.map((color, index) => (
                          <option key={index}>{color}</option>
                        ))}
                        </select>
                                                <select>
                          <option>사이즈종류</option>
                        </select>
                    </div>
                    <div className={style.SizeTable}>
                      <p className={style.TableT}>* 측정 방식에 따라 약간의 차이가 있을 수 있습니다. </p>
                      <table>
                        <thead>
                          <tr>
                            {/* product.sizes 배열의 첫 번째 객체를 기준으로 th를 생성합니다. */}
                            {product.sizes && Object.keys(product.sizes[0]).map((key) => {
                              // "size", "length", "chest", "shoulder" 중 하나인 경우에만 th를 렌더링합니다.
                              if (["size", "length", "chest", "shoulder"].includes(key)) {
                                return <th key={key}>{key}</th>;
                              }
                              return null;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                        {product.sizes &&
                            Array.from(new Set(product.sizes.map((size) => size.size))).map((sizeType, sizeIndex) => (
                              <tr key={sizeIndex}>
                                <td>{sizeType}</td>
                                {product.sizes
                                  .filter((size) => size.size === sizeType)
                                  .map((sizeData, sizeIndex) => (
                                    <React.Fragment key={sizeIndex}>
                                      <td>{sizeData.length}</td>
                                      <td>{sizeData.chest}</td>
                                      <td>{sizeData.shoulder}</td>
                                    </React.Fragment>
                                  ))}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div className={style.BtnBox}>
                      <button className={style.BtnBuy}>BUY NOW</button>
  
                      <button
                        className={`${style.BtnLike} ${
                          userLikeResponse && userLikeResponse.liked === 1 ? style.BtnLike2 : ''
                        }`}
                        onClick={toggleLike}
                      >
                        ♥
                      </button>
  
                      <button
                        className={`${style.BtnBag} ${
                          userBasResponse && userBasResponse.basket === 1 ? style.BtnBag2 : ''
                        }`}
                        onClick={toggleBasket}
                      >
                        바구니
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import style from "../../styles/DP/ProductInfo.module.css";
import axios from "axios";
import Link from "next/link";
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
    const [stockData, setStockData] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
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

                const productResponse = await axios.get(`http://localhost:5000/api/product/${product_id}`);
                const productDetailsResponse = await axios.get(`http://localhost:5000/api/detail/${product_id}`);
                const category_id = productResponse.data.category_id;
                const sizeResponse = await axios.get(`http://localhost:5000/api/size/${category_id}/${product_id}`);
                const colorResponse = await axios.get(`http://localhost:5000/api/color/${product_id}`);
                setColors(colorResponse.data);
                const selectedColorToFetch = selectedColor || (colorResponse.data.length > 0 ? colorResponse.data[0].color : "");
                setSelectedColor(selectedColorToFetch);

                const stockResponse = await axios.get(`http://localhost:5000/api/stock/${product_id}/${selectedColorToFetch}`);
                const stockDataWithoutIdAndColor = stockResponse.data.map(({ product_id, color, ...rest }) => rest);
                setStockData(stockDataWithoutIdAndColor);

                let userLikeResponse = null;
                let userBasResponse = null;

                if (storedUser) {
                    userLikeResponse = await axios.post('http://localhost:5000/api/user_likes/get-like', {
                        user_id: storedUser.user_id,
                        product_id,
                    });
                    setUserLikeResponse(userLikeResponse.data);
                    
                    if (!userLikeResponse.data) {
                        await axios.post('http://localhost:5000/api/user_likes/insert-like', {
                            user_id: storedUser.user_id,
                            product_id,
                            liked: 0,
                            basket: 0,
                        });
                    }
                    userBasResponse = await axios.post('http://localhost:5000/api/user_likes/get-basket', {
                        user_id: storedUser.user_id,
                        product_id,
                    });
                    setUserBasket(userBasResponse.data);
                }

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
                console.error('API 호출 오류:', error);
            }
        };

        fetchProduct();
    }, [router.query.product_id, selectedColor]);

    const toggleLike = async () => {
        try {
            if (!currentUserID) {
                router.push('/login');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/user_likes/toggle-like', {
                user_id: currentUserID,
                product_id: currentProductID,
            });

            const updatedLikes = response.data.likes;

            setProduct((prevProduct) => ({
                ...prevProduct,
                likes: updatedLikes,
                liked: response.data.liked === 1,
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
            if (!currentUserID) {
                router.push('/login');
                return;
            }

            const response = await axios.post('http://localhost:5000/http://172.30.1.71:5000/api/user_likes/toggle-basket', {
                user_id: currentUserID,
                product_id: currentProductID,
            });

            setIsInBasket((prevIsInBasket) => !prevIsInBasket);

            if (response.data.success) {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    likes: response.data.likes,
                    liked: response.data.liked === 1,
                }));

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

    // 숫자를 3자리마다 콤마를 찍는 함수
    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    };

    return (
        <div>
            <div className={style.DetailPage}>
                <div className={style.DetailBox}>
                    {product ? (
                        <div>
                            <div className={style.ImgBox}>
                                <img src={product.thumbnail_image} alt={product.product_name} />
                            </div>
                            <div className={style.DetailText}>
                                <h3 className={style.DetailTitle}>
                                    Product Info <span className={style.Gray}>제품정보</span>
                                </h3>
                                <h3 className={style.ClosetName}>{product.product_name}</h3>
                                <p className={style.PP}>좋아요: {product.likes}</p>
                                <p className={style.PP}>조회: {product.view_count}</p>
                                <p className={style.Price}>{formatPrice(product.price)}원</p>
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
                                </div>
                                <div className={style.description} style={{ display: selectedTab === 'description' ? 'block' : 'none' }}>
                                    {product.description.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            <p className={style.DescriptionP}>{line}</p>

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
                                    <select onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor}>
                                        {colors.map((color, index) => (
                                            <option key={index} value={color.color}>
                                                {color.color}
                                            </option>
                                        ))}
                                    </select>
                                    <select>
                                        <option>사이즈종류</option>
                                        {stockData.length > 0 &&
                                            Object.keys(stockData[0])
                                                .filter((size) => stockData[0][size] !== null)
                                                .map((size) => (
                                                    <option key={size} value={size}>
                                                        {stockData[0][size] === 0 ? `${size} (품절)` : size}
                                                    </option>
                                                ))}
                                    </select>
                                </div>
                                <div className={`${style.SizeTable} ${product.sizes.length === 1 && product.sizes[0].size === 'FREE' ? style.singleRowTable : ''}`}>
                                    <p className={style.TableT}>* 측정 방식에 따라 약간의 차이가 있을 수 있습니다. </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                {product.sizes && Object.keys(product.sizes[0]).map((key) => {
                                                    if (["size", "length", "chest", "shoulder"].includes(key)) {
                                                        const anyNotNull = product.sizes.some((sizeData) => sizeData[key] !== null);
                                                        if (anyNotNull) {
                                                            return <th key={key}>{key}</th>;
                                                        }
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
                                                                    {sizeData.length !== null && <td>{sizeData.length}</td>}
                                                                    {sizeData.chest !== null && <td>{sizeData.chest}</td>}
                                                                    {sizeData.shoulder !== null && <td>{sizeData.shoulder}</td>}
                                                                </React.Fragment>
                                                            ))}
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={style.BtnBox}>
                                    <Link href={{ pathname: '/order', query: { product_id: currentProductID } }}>
                                        <button className={style.BtnBuy}>BUY NOW</button>
                                    </Link>

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
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

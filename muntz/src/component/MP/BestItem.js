import react,{useEffect,useState} from "react";
import style from "../../styles/Mp/BestItem.module.css"
import ClosetBox from "../ClosetBox";
import axios from 'axios';


export default function NewProduct(){
  const [bestItems, setBestItems] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // 좋아요(likes)가 높은 순으로 상품 조회
        const response = await axios.get('http://115.23.171.88:5000/api/bestitem');

        const slicedBestItems = response.data.slice(0, 4); // 최대 8개까지만 렌더링
        setBestItems(slicedBestItems);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, []);

    return(
        <div className={style.NewProduct}>
          <h2 className={style.MCTitle}>Best</h2>
          <ClosetBox products={bestItems}></ClosetBox>
        </div>
    )
}
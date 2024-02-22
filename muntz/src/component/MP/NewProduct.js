import react from "react";
import style from "../../styles/Mp/NewProduct.module.css"
import ClosetBox from "../ClosetBox";

export default function NewProduct(){

    return(
        <div className={style.NewProduct}>
          <h2 className={style.MCTitle}>NEW PRODUCT</h2>
          <ClosetBox></ClosetBox>
        </div>
    )
}
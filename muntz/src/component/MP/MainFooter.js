import style from "@/styles/Mp/MainFooter.module.css";

export default function MainFooter(){

    return(
        <div className={style.MainFooter}>
            <div className={style.MFbox}>
                <div className={style.SosialList}>
                    <ul>
                        <li id={style.INSli}>
                            <img id={style.INS} src="/image/icon/instagram2.png"/>
                            <p>xoochan</p>
                        </li>
                        <li>
                            <img src="/image/icon/phone.png"/>
                            <p>010 - 4924 - 5006</p>
                        </li>
                        <li>
                            <img id={style.EM} src="/image/icon/emai.jpg"/>
                            <p id={style.EMP}>xxxxxxx@naver.com</p>
                        </li>
                        <li>
                            <img src="/image/icon/adrees.jpg"/>
                            <p id={style.ADP}>경기도 수원시 뭐시기</p>
                            <p id={style.ADP2}>무슨구 뭐뭐뭐 다시 11</p>

                        </li>
                    </ul>
                </div>
                <div className={style.IMGBox}>
                    <img src="/image/Footer/MI.png"/>
                </div>
            </div>
        </div>
    )
}
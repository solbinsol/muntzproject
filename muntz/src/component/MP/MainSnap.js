import style from "@/styles/Mp/MainSnap.module.css";

export default function MainSnp(){

    return(
        <div className={style.MainSnap}>
            <div className={style.MSBox}>
                <h3>Daliy Snap</h3>
                <div className={style.MainImg}>
                    <img src="/image/testM.PNG"/>
                </div>
                <div className={style.MainItems}>
                    {/*340x360*/}
                    <div className={style.MainItem}>
                        <img src="/image/test2.png"/>
                        
                    </div>
                    <div className={style.MainItem}>
                        <img src="/image/test1.png"/>

                    </div>
                    <div className={style.MainItem}>
                        <img src="/image/test3.png"/>

                    </div>
                    <div className={style.MainItem}>
                        <img src="/image/test5.png"/>

                    </div>
                </div>
            </div>
        </div>
    )
}
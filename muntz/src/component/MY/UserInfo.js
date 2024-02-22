import style from '@/styles/MY/UserInfo.module.css'
export default function Home() {
  return (
    <div className={style.MyPage}>

      <div className={style.MyContent}>
        <h2>USER INFO</h2>
        <div className={style.UserInfo}>
            <p className={style.KP}>아이디</p>
            <p className={style.EP}>testId</p>
        </div>
        <div className={style.UserInfo}>
            <p className={style.KP}>패스워드</p>
            <p className={style.EP}>testId</p>
        </div>
        <div className={style.UserInfo}>
            <p  className={style.KP}>이름</p>
            <p id={style.N} className={style.EP}>안뇽이름</p>
        </div>
        <div className={style.UserInfo}>
            <p className={style.KP}>이메일</p>
            <p className={style.EP}>qkaejwnj@TEST.TEST</p>
        </div>
        <div className={style.UserInfo}>
            <p className={style.KP}>이름</p>
            <p className={style.EP}>testId</p>
        </div>
      </div>

    </div>
  )
}

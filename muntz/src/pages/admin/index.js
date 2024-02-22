import React, { useState } from 'react';
import style from './Admin.module.css';
import ProductAdd from '@/component/AD/ProductAdd';
import Stock from '@/component/AD/Stock';
import ProductDelete from '@/component/AD/ProductDelete';

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState('add'); // 기본값으로 '옷추가' 메뉴를 선택합니다.

  // 메뉴 클릭 핸들러 함수
  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // 클릭된 메뉴를 활성화합니다.
  };

  return (
    <div className={style.Admin}>
      <div className={style.AdminPage}>
        <div className={style.AdminBox}>
          <div className={style.AdminMenu}>
            <ul>
              <li onClick={() => handleMenuClick('add')} className={activeMenu === 'add' ? style.active : ''}>옷추가</li>
              <li onClick={() => handleMenuClick('delete')} className={activeMenu === 'delete' ? style.active : ''}>옷삭제</li>
              <li onClick={() => handleMenuClick('stock')} className={activeMenu === 'stock' ? style.active : ''}>재고등록</li>
              {/* <li onClick={() => handleMenuClick('noticeAdd')} className={activeMenu === 'addnotice' ? style.active : ''}>공지등록</li>
              <li onClick={() => handleMenuClick('noticeDelete')} className={activeMenu === 'deletenotice' ? style.active : ''}>공지삭제</li> */}

            </ul>
          </div>
          <div className={style.WorkScreen}>
            {activeMenu === 'add' && <ProductAdd />}
            {activeMenu === 'delete' && <ProductDelete />}
            {activeMenu === 'stock' && <Stock />}
            {activeMenu === 'noticeAdd' && <AddNotice />}
            {activeMenu === 'noticeDelete' && <DeleteNotice />}

          </div>
        </div>
      </div>
    </div>
  );
}

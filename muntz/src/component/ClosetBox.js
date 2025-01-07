import React from "react";
import Link from "next/link";
import style from '@/styles/ClosetBox.module.css';

export default function ClosetBox({ products }) {
  return (
    <div className={style.ClosetBox}>
      <ul>
        {products ? (
          products.map((product) => (
            <li key={product.product_id}>
              <Link href={`/detail?product_id=${product.product_id}`}>
                <div className={style.ClosetImgBox}>
                  <img className={style.ClosetImg} src={product.thumbnail_image} alt={product.product_name} />
                </div>
                <p className={style.ClosetName}>{product.product_name}</p>
                <p className={style.ClosetPrice}>{parseInt(product.price).toLocaleString()}원</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
}

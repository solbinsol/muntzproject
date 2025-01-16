import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DetailView({ productId }) {
  const [imageURL, setImageURL] = useState("");
  console.log(productId)
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const productIdString = String(productId)
        const response = await axios.get(`http://localhost:5000/api/view_detail/${productIdString}`);
        const imagePath = response.data.detail_page_image;

        // If the API returns a relative path, create the full URL
        /*const fullURL = `http://localhost:5000/images/${imagePath}`;*/
        setImageURL(imagePath);
      } catch (error) {
        console.error("Error fetching detail_page_image:", error);
      }
    };

    if (productId) {
      fetchImage();
    }
  }, [productId]);

  return (
    <div>
      {imageURL ? (
        <img src={imageURL} alt="Product Detail" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

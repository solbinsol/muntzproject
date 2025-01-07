// public/api/kakaoPay.js
if (window.Kakao) {
  // 카카오 SDK 초기화
  window.Kakao.init('65a2efe1d24b9d717589c4537db57f99');  // 카카오 개발자 사이트에서 발급받은 키로 변경

  // 카카오 SDK가 정상적으로 로드되었는지 확인
  if (window.Kakao.isInitialized()) {
    console.log("Kakao SDK Initialized");
  } else {
    console.error("Kakao SDK initialization failed.");
  }
} else {
  console.error("Kakao SDK is not loaded properly.");
}

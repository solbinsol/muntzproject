import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 카카오 SDK 로드를 defer 속성으로 */}
        <script
          type="text/javascript"
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

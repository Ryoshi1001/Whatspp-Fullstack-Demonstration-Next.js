import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head/>
      <body className='bg-red-100'>
        <Main/>
        <NextScript/>
        <div id='photo-picker-element'></div>
      </body>
    </Html>
  )
}
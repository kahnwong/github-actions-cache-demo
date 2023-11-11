/* eslint-disable react/no-danger */
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import {
  GOOGLE_ANALYTICS_ID,
  HOTJAR_ID,
  COOKIE_WOW_DATA_CWCID
} from 'config/environment'
// @ts-ignore
import companyDetail from '@company/companyDetail.json'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='th'>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href={companyDetail.favicon} />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GOOGLE_ANALYTICS_ID}');`
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function (h, o, t, j, a, r) {
              h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
              h._hjSettings = { hjid: ${HOTJAR_ID}, hjsv: 6 };
              a = o.getElementsByTagName('head')[0];
              r = o.createElement('script'); r.async = 1;
              r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
              a.appendChild(r);
              })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');`
            }}
          />
          {/* Cookie Consent by https://www.cookiewow.com */}
          <script type='text/javascript' src='https://cookiecdn.com/cwc.js' />
          {process.env.COOKIE_WOW === 'true' && (
            <script
              id='cookieWow'
              type='text/javascript'
              src={`https://cookiecdn.com/configs/${COOKIE_WOW_DATA_CWCID}`}
              data-cwcid={COOKIE_WOW_DATA_CWCID}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GOOGLE_ANALYTICS_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
      </Html>
    )
  }

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}

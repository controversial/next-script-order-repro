import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          strategy="beforeInteractive"
          id="inject-polyfill"
        >
          {`
            if (!(
              // es2020 greatest hits
              Promise.allSettled
              && String.prototype.matchAll

              // es2021 greatest hits
              && String.prototype.replaceAll
              && Promise.any

              // es2022 greatest hits
              && Array.prototype.at
              && String.prototype.at

              // es2023 greatest hits
              && Array.prototype.findLast
              && Array.prototype.toReversed
              && Array.prototype.toSorted
              && Array.prototype.toSpliced
              && Array.prototype.with

              // misc
              && window.structuredClone
            ) || true /* for testing */) {
              console.log('injecting polyfill script');
              const newScript = document.createElement('script');
              newScript.src = 'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?version=4.8.0&features=es2020%2Ces2021%2Ces2022%2Ces2023%2CstructuredClone';
              newScript.onload = () => { console.log('polyfill script loaded, *after* component mounted\\nEven though it was injected as a blocking script at the beginning of <head>, it didn’t get a chance to block loading Next.js chunks, because it wasn’t injected until *after* Next.js chunk scripts had already started loading'); };
              document.head.prepend(newScript);
            }
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}

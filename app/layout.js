export const metadata = {
  title: 'RisePanel - Grow Your Socials',
  description: 'Real followers, views and likes.',
  manifest: '/manifest.json',
  themeColor: '#6366f1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RisePanel" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body style={{margin:0,padding:0,background:'#080a12'}}>
        {children}
      </body>
    </html>
  )
}

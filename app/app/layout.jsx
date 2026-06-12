export const metadata = {
  title: 'RisePanel - Grow Your Socials',
  description: 'Real followers, views and likes. The most affordable SMM panel worldwide.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0,padding:0,background:'#080a12'}}>
        {children}
      </body>
    </html>
  )
}

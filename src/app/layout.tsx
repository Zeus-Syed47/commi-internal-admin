import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css'
import CommonLayout from '../layout/CommonLayout';
import '@fontsource/inter';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Commi',
  description: 'Whatsapp business growth engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ backgroundColor: 'white' }}>
      <body className={inter.className}>

        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#version=v20.0&appId=1209927870022883&xfbml=true&autoLogAppEvents=true"></script>
          <CommonLayout>
            {children}
          </CommonLayout>
      </body>
    </html >
  )
}

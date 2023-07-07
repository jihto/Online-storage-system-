import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'inspector'
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
  session: any,
} 

const queryClient = new QueryClient();

export default function App({ Component, pageProps, session }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} /> 
      </SessionProvider>
    </QueryClientProvider>
  )
}

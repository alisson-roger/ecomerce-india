import '../styles/globals.css'
import AuthContextProvider from '../state/AuthContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Toaster />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp

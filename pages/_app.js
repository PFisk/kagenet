import '../styles/globals.css'
import Parse from 'parse'

const PARSE_APPLICATION_ID = process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID
const PARSE_HOST_URL = process.env.NEXT_PUBLIC_PARSE_HOST_URL
const PARSE_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY


Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

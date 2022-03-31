import '../styles/globals.css'
import Parse from 'parse'

const PARSE_APPLICATION_ID = "gUPBqgnbUo0OwlGsGUWEtg7UoztT24u3kA7kOGLc"
const PARSE_HOST_URL = "https://parseapi.back4app.com/"
const PARSE_JAVASCRIPT_KEY = "hNDbHwGSyxgi20nBNsRc7pHs96pWVki0QWP3EvGM"

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

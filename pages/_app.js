import "../styles/globals.scss";
import "swiper/css/bundle";
import { Layout } from "../components";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

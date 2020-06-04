import '../style/water.css';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-60704805-4");
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
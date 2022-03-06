import Head from "next/head";
import Navbar from "./Navbar";
function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Billion Stars</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />
      {children}
    </>
  );
}

export default Layout;

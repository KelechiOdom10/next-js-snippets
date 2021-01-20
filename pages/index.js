import Head from "next/head";
import Navbar from "../components/NavBar";
import SnippetList from "../components/SnippetList";
import Welcome from "../components/Welcome";
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;

export default function Home({ snippets }) {
  return (
    <div>
      <Head>
        <title>Snippets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Welcome />
      <SnippetList snippets={snippets} />
    </div>
  );
}

export const getServerSideProps = async () => {
  let snippets = [];
  await axios
    .get("/api/snippets")
    .then((response) => {
      snippets = response.data.data;
    })
    .catch((error) => console.error(error));
  return {
    props: { snippets: snippets }, // will be passed to the page component as props
  };
};

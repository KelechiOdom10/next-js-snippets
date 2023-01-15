import Navbar from "../components/NavBar";
import SnippetList from "../components/SnippetList";
import Hero from "../components/Hero";
import { fetchAllSnippets } from "../services/api";
import { useQuery } from "react-query";
import { Alert, AlertDescription, Box } from "@chakra-ui/react";
import cookie from "cookie";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59"
  );

  const parseCookies = req => {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  };

  const isLoggedIn = parseCookies(req);

  if (isLoggedIn["auth"]) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  let snippets = [];

  try {
    snippets = await fetchAllSnippets();
  } catch (e) {
    console.log({ e });
  }
  return {
    props: { snippets },
  };
};

export default function Home({ snippets }) {
  const { error, data } = useQuery("snippets", fetchAllSnippets, {
    initialData: () => {
      return snippets;
    },
  });

  return (
    <Layout
      title="Snippets | Code Snippets for Developers"
      description="Copy Code Snippets to enhance your workflow"
      minHeight="100vh"
    >
      <Box pb="100px">
        <Navbar />
        <Hero />
        {error && (
          <Alert status="error">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
        {data && (
          <SnippetList
            snippets={data}
            disabled={true}
            w={{ base: "90%", md: "65%", lg: "60%" }}
            mx="auto"
            mb={10}
          />
        )}
      </Box>
      <Footer showList />
    </Layout>
  );
}

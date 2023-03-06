import Layout from "src/components/layout";
import FirebaseAuth from "src/components/firebaseAuth";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";

export default function Auth() {
  return <Layout main={<FirebaseAuth/>} />;
}

// the result of getServerSideProps is an object which returns props and is normally passed to the page that is being rendered.
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  
  // this if statement below, checks to see if a uid is present, if it is (which means the user is logged in) it redirects the user from the auth page to the home page

  if (uid) {
    res.setHeader("location", "/")
    res.statusCode = 302
    res.end()
  }
  
  return {props:{}}
}
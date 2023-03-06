import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import Layout from "src/components/layout";
import HouseForm from "src/components/houseForm";

export default function Add() {
  return <Layout main={<HouseForm/> } />
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest)
  

//this function will redirect the user to the Auth page if they are not already logged in

  if (!uid) {
    res.setHeader("location", "/auth")
    res.statusCode = 302
    res.end()


    
  }
  return { props: {} } 
}
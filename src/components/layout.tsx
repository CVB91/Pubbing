import {
   Fragment,
  FunctionComponent,
   ReactNode,
} from "react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";


interface Iprops {
  main: ReactNode;
}

const Layout: FunctionComponent<Iprops> = ({ main }) => {

  const {logout, authenticated} = useAuth()

 

  return (
    <div className="bg-gray-900 max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800" style={{ height: "64px" }}>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
            <img
              src="/home-color.svg"
              alt="home house"
              className="inline w-6"
            ></img>
          </Link>
          {authenticated ? (
            <Fragment>
              <Link href="/houses/add">Add House</Link>
              <button onClick={logout}>Logout</button>
            </Fragment>
          ) : (
            <Link href="/auth">Login / Signup</Link>
          )}
        </div>
      </nav>
      <main style={{minHeight: "calc(100vh - 64px)"}}>{main}</main>
    </div>
  );
};
export default Layout;

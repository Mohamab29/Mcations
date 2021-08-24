import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className={loggedIn ? "user-layout" : "guest-layout"}>
      {loggedIn && (
        <>
          <header>
            <Header />
          </header>
          <main>
            <Routing />
          </main>
          <footer>
            <Footer />
          </footer>
        </>
      )}
      {<Routing />}
    </div>
  );
}

export default Layout;

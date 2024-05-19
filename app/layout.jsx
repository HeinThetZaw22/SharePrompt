import Nav from "@components/Nav";
import "../public/styles/global.css";
import Provider from "@components/Provider";
import { Toaster } from "sonner";
export const metadata = {
  title: "Promptopia",
  description: "Share and discover ai prompt",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className=" gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
            <Toaster position="top-center" />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;

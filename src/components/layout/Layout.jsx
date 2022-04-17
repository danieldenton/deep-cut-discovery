import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <div className="layout">
      <Navbar {...props} />

      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
}

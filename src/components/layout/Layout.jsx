import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <div className="layout">
      <Navbar />
      <header>
        <h1 className="dd">Deep Cut Discovery Fix</h1>
      </header>
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
}

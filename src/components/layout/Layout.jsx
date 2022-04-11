import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <div className="layout">
      <Navbar />
      <header>
        <h1 className="dd">Daniel Denton</h1>
        <h3 className="sub-header">Full Stack Software Engineer</h3>
      </header>
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
}

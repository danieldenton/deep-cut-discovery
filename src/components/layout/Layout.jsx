import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <div className="layout">
      <Navbar />
      <h1 className="dd">Daniel Denton</h1>
      <h3>Full Stack Software Engineer</h3>
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
}

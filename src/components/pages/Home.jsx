import reactImg from "../../assets/react.png";
import javascriptImg from "../../assets/javascript.png";
import nodeImg from "../../assets/node.png";

export default function Home() {
  return (
    <div className="home">
      <div className="skills-div">
        <h2 className="page-header">Skills</h2>
        <img src={reactImg} alt="React.js" className="logos" />
        <img src={javascriptImg} alt="Javascript" className="logos" />
        <img src={nodeImg} alt="Node.js" className="logos" />
      </div>
      <div className="projects-div">
        <h2 className="page-header">Recent Projects</h2>
      </div>
    </div>
  );
}

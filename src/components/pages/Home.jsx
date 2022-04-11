import reactImg from "../../assets/react.png";
import javascriptImg from "../../assets/javascript.png";

export default function Home() {
  return (
    <div className="home">
      <div className="skills-div">
        <h2>Skills</h2>
        <img src={reactImg} alt="React" className="logos" />
        <img src={javascriptImg} alt="Javascript" className="logos" />
      </div>
      <div className="projects-div">
        <h2>Recent Projects</h2>
      </div>
    </div>
  );
}

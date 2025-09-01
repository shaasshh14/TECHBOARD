import Header from "../components/Header.jsx";
import Spline from "@splinetool/react-spline";
function Team() {
  return (
    <div>
      <Header />
      <Spline
        className="absolute x1:right-[-28%] right-0 top-[-20%] lg:top-0"
        scene="https://prod.spline.design/AykasHNRalnfTDfs/scene.splinecode"
      />

      <div style={{ padding: "2rem" }}>
        <h1>Team Page</h1>
        <p>This is the Team page content.</p>
      </div>
    </div>
  );
}

export default Team;

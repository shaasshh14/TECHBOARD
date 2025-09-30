import Sketch from "react-p5";

const AnimatedBackground = () => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.noFill();
    // This stops the animation from running in a constant loop.
    p5.noLoop();
  };

  const draw = (p5) => {
    p5.background("#121212");
    const gridSize = 60;
    const highlightRange = 2;

    const mouseGridX = Math.floor(p5.mouseX / gridSize);
    const mouseGridY = Math.floor(p5.mouseY / gridSize);

    for (let i = -highlightRange; i <= highlightRange; i++) {
      for (let j = -highlightRange; j <= highlightRange; j++) {
        const gx = (mouseGridX + i) * gridSize;
        const gy = (mouseGridY + j) * gridSize;

        const distToMouse = p5.dist(
          p5.mouseX,
          p5.mouseY,
          gx + gridSize / 2,
          gy + gridSize / 2
        );
        const maxDist = gridSize * (highlightRange + 1);

        let alpha = p5.map(distToMouse, 0, maxDist, 255, 0);
        alpha = p5.constrain(alpha, 0, 255);
        
        if (alpha > 0) {
            p5.stroke(0, 100, 255, alpha);
            p5.strokeWeight(1);
            p5.rect(gx, gy, gridSize, gridSize);
        }
      }
    }
  };

  const mouseMoved = (p5) => {
    // This tells the animation to redraw ONLY when the mouse moves.
    p5.redraw();
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
    p5.redraw();
  }

  return <Sketch setup={setup} draw={draw} mouseMoved={mouseMoved} windowResized={windowResized} />;
};

export default AnimatedBackground;
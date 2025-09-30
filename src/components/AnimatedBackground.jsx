import Sketch from "react-p5";
import { useState } from "react";

const AnimatedBackground = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.noFill();
  };

  const draw = (p5) => {
    p5.background('#121212');
    const gridSize = 60; 
    const highlightRange = 2;

    if (mousePos.x > 0 && mousePos.y > 0) {
      const mouseGridX = Math.floor(mousePos.x / gridSize);
      const mouseGridY = Math.floor(mousePos.y / gridSize);

      for (let i = -highlightRange; i <= highlightRange; i++) {
        for (let j = -highlightRange; j <= highlightRange; j++) {
          const gx = (mouseGridX + i) * gridSize;
          const gy = (mouseGridY + j) * gridSize;

        
          const distToMouse = p5.dist(mousePos.x, mousePos.y, gx + gridSize / 2, gy + gridSize / 2);
          const maxDist = gridSize * (highlightRange + 1);

         
          let alpha = p5.map(distToMouse, 0, maxDist, 255, 0);
          alpha = p5.constrain(alpha, 0, 255);

          p5.stroke(0, 100, 255, alpha); 
          p5.strokeWeight(1);
          p5.rect(gx, gy, gridSize, gridSize);
        }
      }
    }
  };

  const mouseMoved = (p5) => {
    setMousePos({ x: p5.mouseX, y: p5.mouseY });
  };

  return <Sketch setup={setup} draw={draw} mouseMoved={mouseMoved} />;
};

export default AnimatedBackground;
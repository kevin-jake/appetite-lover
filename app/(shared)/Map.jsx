"use client";
import React, { useEffect, useRef, useState } from "react";
import ManilaShapes from "./constants/ManilaShapes.json";

const MapTooltip = ({ visible, position, content }) => {
  if (!visible) return null;

  const tooltipStyle = {
    top: position.y,
    left: position.x,
    position: "absolute",
    backgroundColor: "rgb(191 255 120)",
  };

  return (
    <span style={tooltipStyle} className="map-tooltip">
      {content}
    </span>
  );
};

const Map = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const mapShapes = ManilaShapes.find(
    (shapes) => shapes.place === "Metro Manila"
  );
  const svgRef = useRef(null);

  useEffect(() => {
    const adjustViewBox = () => {
      const svg = svgRef.current;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate new viewBox values based on window size
      const viewBoxWidth = 900;
      // const viewBoxHeight = 1800; this is for mobile
      const viewBoxHeight = 1300;
      const viewBoxRatio = viewBoxWidth / viewBoxHeight;
      const windowRatio = windowWidth / windowHeight;

      let newViewBox;
      if (windowRatio < viewBoxRatio) {
        const scaledHeight = viewBoxWidth / windowRatio;
        const yOffset = (viewBoxHeight - scaledHeight) / 2;
        newViewBox = `0 ${yOffset} ${viewBoxWidth} ${scaledHeight}`;
      } else {
        const scaledWidth = viewBoxHeight * windowRatio;
        const xOffset = (viewBoxWidth - scaledWidth) / 2;
        newViewBox = `${xOffset} 0 ${scaledWidth} ${viewBoxHeight}`;
      }

      svg.setAttribute("viewBox", newViewBox);
    };

    adjustViewBox();
    window.addEventListener("resize", adjustViewBox);

    return () => {
      window.removeEventListener("resize", adjustViewBox);
    };
  }, []);

  const handleProvinceClick = (event) => {
    setSelectedProvince(event.target.getAttribute("id"));
    setMenuVisible(true);
  };

  const handleMouseHover = (event) => {
    event.target.setAttribute("fill", "#CCCCCC");
    const targetElement = event.target.parentNode;
    const tooltipContent = targetElement.getAttribute("id").replace(/_/g, " ");
    const position = targetElement.getBoundingClientRect();
    setTooltipPosition({
      x: position.x + window.pageXOffset,
      y: position.y + window.pageYOffset,
    });
    setTooltipContent(tooltipContent);
    setTooltipVisible(true);
  };

  const handleMouseLeave = (event) => {
    event.target.setAttribute("fill", "#fff");
    setTooltipVisible(false);
  };

  const handleOutsideClick = () => {
    setMenuVisible(false);
  };

  return (
    <>
      {menuVisible && (
        <div
          className="level-menu"
          style={{
            position: "absolute",
            top: 159.803,
            left: 544.363,
          }}
        >
          <div>
            <div className="menu-header" onClick={() => window.open(searchUrl)}>
              {selectedProvince} ↗{" "}
            </div>
            {menuOptions.map(({ label, level }) => (
              <div
                key={level}
                level={level}
                className={`level-${level}`}
                onClick={(event) => console.log("test")}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
      <MapTooltip
        visible={tooltipVisible}
        content={tooltipContent}
        position={tooltipPosition}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="svg574"
        version="1.1"
        ref={svgRef}
        style={{ width: "100%" }}
      >
        <g
          transform={
            "translate(" +
            mapShapes.mapTransformTranslate.X +
            "," +
            mapShapes.mapTransformTranslate.Y +
            ")"
          }
        >
          {mapShapes.shapes.map((shape, i) => {
            return (
              <g className="province-layer" id={shape.id} key={i}>
                <path
                  d={shape.d}
                  id={shape.id}
                  fill="#ffffff"
                  fillRule="nonzero"
                  stroke="#000000"
                  strokeDasharray="none"
                  strokeDashoffset="0"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="4"
                  strokeWidth="1"
                  opacity="1"
                  vectorEffect="non-scaling-stroke"
                  onClick={(event) => handleProvinceClick(event)}
                  onMouseEnter={(event) => handleMouseHover(event)}
                  onMouseLeave={(event) => handleMouseLeave(event)}
                ></path>
              </g>
            );
          })}
        </g>
      </svg>
    </>
  );
};

export default Map;

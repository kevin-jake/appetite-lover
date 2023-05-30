"use client";
import { database } from "@/libs/appwrite";
import React, { useEffect, useRef, useState } from "react";

const MapTooltip = ({ visible, position, content }) => {
  if (!visible) return null;

  const tooltipStyle = {
    top: position.y,
    left: position.x,
  };

  return (
    <span
      style={tooltipStyle}
      className="absolute font-bold bg-emerald-100 z-10 rounded-lg text-sm p-1"
    >
      {content}
    </span>
  );
};

const Map = ({ setisTopListVisible, isTopListVisible, setAreaSelected }) => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mapShapes, setMapshapes] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const mapshapes = async () => {
      try {
        const areas = await database.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE,
          process.env.NEXT_PUBLIC_AREA
        );
        setMapshapes(areas.documents);
      } catch (error) {
        console.log(error);
      }
    };

    mapshapes();
  }, []);

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
        // Add /2 on the windowRatio if TopLists is active
        const scaledWidth = isTopListVisible
          ? (viewBoxHeight * windowRatio) / 2
          : viewBoxHeight * windowRatio;
        const xOffset = (viewBoxWidth - scaledWidth) / 2;
        newViewBox = `${xOffset} 0 ${scaledWidth} ${viewBoxHeight}`;
      }

      svg.setAttribute("viewBox", newViewBox);
    };
    adjustViewBox();
    setTooltipVisible(false);
    window.addEventListener("resize", adjustViewBox);
    return () => {
      window.removeEventListener("resize", adjustViewBox);
    };
  }, [isTopListVisible]);

  const handleProvinceClick = (event) => {
    if (selectedProvince) {
      setSelectedProvince(null);
      selectedProvince.setAttribute("fill", "#fff");
      setisTopListVisible(false);
    }
    if (
      selectedProvince?.getAttribute("id") != event.target.getAttribute("id")
    ) {
      setisTopListVisible(true);
      event.target.setAttribute("fill", "#4ade80");
      setSelectedProvince(event.target);
      setAreaSelected(event.target.getAttribute("id"));
    }
  };

  const handleMouseHover = (event) => {
    if (
      selectedProvince?.getAttribute("id") != event.target.getAttribute("id")
    ) {
      event.target.setAttribute("fill", "#CCCCCC");
      const position = event.target.parentNode.getBoundingClientRect();
      setTooltipPosition({
        x: position.x + window.pageXOffset + 5,
        y: position.y + window.pageYOffset + 5,
      });
      setTooltipContent(
        event.target.parentNode.getAttribute("id").replace(/_/g, " ")
      );
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = (event) => {
    if (
      selectedProvince?.getAttribute("id") != event.target.getAttribute("id")
    ) {
      event.target.setAttribute("fill", "#fff");
      setTooltipVisible(false);
    }
  };

  return (
    <>
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
        style={{ width: "100%", position: "relative" }}
      >
        <g transform="translate(-140.998,-140.998)">
          {mapShapes.map((area, i) => {
            return (
              <g className="province-layer" id={area.areaName} key={i}>
                <path
                  d={area.areaShape}
                  id={area.areaName}
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

"use client";
import Loading from "@/components/Loading";
import { database } from "@/libs/appwrite";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import SearchArea from "./SearchArea";

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

const Map = ({
  setisTopListVisible,
  isTopListVisible,
  areaSelected,
  setAreaSelected,
}) => {
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
        setLoading(false);
      }
    };

    mapshapes();
  }, []);

  useEffect(() => {
    if (isTopListVisible) {
      setTooltipVisible(false);
    }
  }, [areaSelected, isTopListVisible]);

  useEffect(() => {
    const adjustViewBox = () => {
      const svg = svgRef.current;
      if (!svg) return;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate new viewBox values based on window size
      const viewBoxWidth = 900;
      // const viewBoxHeight = 1800; this is for mobile
      const viewBoxHeight = 800;
      const viewBoxRatio = viewBoxWidth / viewBoxHeight;
      const windowRatio = windowWidth / windowHeight;

      let newViewBox;
      if (windowRatio < viewBoxRatio) {
        const scaledHeight = viewBoxWidth / windowRatio;
        const yOffset = viewBoxHeight - scaledHeight / 3;
        newViewBox = `50 ${yOffset - 50} ${viewBoxWidth - 200} ${
          scaledHeight - 1100
        }`;
      } else {
        // Add /2 on the windowRatio if TopLists is active
        const scaledWidth = (viewBoxHeight * windowRatio) / 2;
        const xOffset = (viewBoxWidth - scaledWidth) / 2;
        newViewBox = `${xOffset} 0 ${scaledWidth} ${viewBoxHeight}`;
      }
      svg.setAttribute("height", windowHeight - 200);
      svg.setAttribute("viewBox", newViewBox);
    };
    adjustViewBox();
    window.addEventListener("resize", adjustViewBox);
    return () => {
      window.removeEventListener("resize", adjustViewBox);
    };
  }, [loading, isTopListVisible]);

  const handleAreaClick = (event) => {
    if (areaSelected) {
      const shape = document.getElementById(areaSelected).childNodes[0];
      shape.setAttribute("fill", "#fff");
    }
    if (areaSelected != event.target.getAttribute("id")) {
      setAreaSelected(event.target.getAttribute("id"));
      event.target.setAttribute("fill", "#4ad840");
      setisTopListVisible(true);
    } else if (areaSelected == event.target.getAttribute("id")) {
      event.target.setAttribute("fill", "#fff");
      setAreaSelected(null);
      setisTopListVisible(false);
    }
  };

  const handleMouseHover = (event) => {
    if (
      areaSelected != event.target.getAttribute("id") ||
      areaSelected != event.target.innerHTML
    ) {
      const shapeArea = document.getElementById(
        event.target.getAttribute("id") || event.target.innerHTML
      ).childNodes[0];
      areaSelected != event.target.getAttribute("id") &&
      areaSelected != event.target.innerHTML
        ? shapeArea.setAttribute("fill", "#CCCCCC")
        : shapeArea.setAttribute("fill", "#4ad840");
      const position = shapeArea.parentNode.getBoundingClientRect();
      setTooltipPosition({
        x: position.x + window.pageXOffset + 5,
        y: position.y + window.pageYOffset + 5,
      });
      setTooltipContent(
        shapeArea.parentNode.getAttribute("id").replace(/_/g, " ")
      );
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = (event) => {
    if (
      areaSelected != event.target.getAttribute("id") ||
      areaSelected != event.target.innerHTML
    ) {
      const shapeArea = document.getElementById(
        event.target.getAttribute("id") || event.target.innerHTML
      ).childNodes[0];
      areaSelected != event.target.getAttribute("id") &&
      areaSelected != event.target.innerHTML
        ? shapeArea.setAttribute("fill", "#fff")
        : shapeArea.setAttribute("fill", "#4ad840");
      setTooltipVisible(false);
    }
  };

  const handleSearch = (areaName) => {
    if (areaSelected) {
      const shape = document.getElementById(areaSelected).childNodes[0];
      shape.setAttribute("fill", "#fff");
    }
    if (areaSelected != areaName) {
      const selectedShape = document.getElementById(areaName)?.childNodes[0];
      setAreaSelected(areaName);
      selectedShape.setAttribute("fill", "#4ad840");
      setisTopListVisible(true);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center w-full items-start">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex justify-center w-full items-center">
        <SearchArea
          areas={mapShapes}
          areaSelected={areaSelected}
          onSearch={handleSearch}
          handleMouseHover={handleMouseHover}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
      <MapTooltip
        visible={tooltipVisible}
        content={tooltipContent}
        position={tooltipPosition}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="svg574"
        version="1.1"
        // width="300"
        height="510"
        ref={svgRef}
        viewBox="150 100 475 600"
        style={{ width: "100%", position: "relative" }}
      >
        <g transform="translate(-20.998,-140.998)">
          {mapShapes.map((area, i) => {
            return (
              <g className="area-layer" id={area.areaName} key={i}>
                <path
                  d={area.areaShape}
                  id={area.areaName}
                  fill="#fff"
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
                  onClick={(event) => handleAreaClick(event)}
                  onMouseEnter={(event) => handleMouseHover(event)}
                  onMouseLeave={(event) => handleMouseLeave(event)}
                ></path>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Map;

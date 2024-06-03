import * as d3 from "d3";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

export const handler = async (event, context) => {
  try {
    const width = 960;
    const height = 600;

    const coordinatesInformation = [
      "-117.032351,48.999188 -117.035545,46.410012 -116.915989,45.995413 -118.987129,45.999855 -121.084933,45.647893 -122.262625,45.544321 -123.547659,46.259109 -124.080983,46.735003 -124.412106,47.691199 -124.050734,48.177747 -122.760448,48.14324 -122.75802,49.002357 -118.8366130356,49.0003077593 -117.032351,48.999188",
      // Añade las demás coordenadas aquí...
    ];

    const projection = d3.geoAlbersUsa().scale(1300).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    const svg = d3.select(document.body)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    coordinatesInformation.forEach(coordinates => {
      const polygon = svg.append("polygon")
        .attr("points", coordinates)
        .attr("stroke", "black")
        .attr("fill", "none");
    });

    const svgString = svg.node().outerHTML;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
      body: svgString,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";
import Loading from "./Loading.jsx";

const groupData = [
  {
    name: "Norte 1",
    states: ["Acre", "Rondônia", "Amazonas", "Roraima"],
    color: "#1f77b4",
  }, // Blue
  { name: "Norte 2", states: ["Pará", "Amapá"], color: "#aec7e8" }, // Light Blue
  {
    name: "Nordeste 1",
    states: ["Maranhão", "Piauí", "Ceará"],
    color: "#2ca02c",
  }, // Green
  {
    name: "Nordeste 2",
    states: ["Rio Grande do Norte", "Paraíba", "Pernambuco"],
    color: "#98df8a",
  }, // Light Green
  {
    name: "Nordeste 3",
    states: ["Alagoas", "Sergipe", "Bahia"],
    color: "#ffbb78",
  }, // Light Yellow
  {
    name: "Leste",
    states: ["Minas Gerais", "Espírito Santo", "Rio de Janeiro"],
    color: "#ff7f0e",
  }, // Orange
  {
    name: "Oeste",
    states: [
      "Distrito Federal",
      "Tocantins",
      "Goiás",
      "Mato Grosso",
      "Mato Grosso do Sul",
    ],
    color: "#d62728",
  }, // Red
  { name: "Paulista", states: ["São Paulo"], color: "#9467bd" }, // Purple
  {
    name: "Sul",
    states: ["Paraná", "Santa Catarina", "Rio Grande do Sul"],
    color: "#8c564b",
  }, // Brown
];

const BrazilMap = () => {
  const [topoJsonData, setTopoJsonData] = useState(null);

  useEffect(() => {
    const fetchTopoJson = async () => {
      try {
        const response = await axios.get(
          "https://cdn.jsdelivr.net/gh/alexandrenf/ifmsabrazil/src/assets/brazilstates.json"
        );
        setTopoJsonData(response.data);
      } catch (error) {
        console.error("Error fetching TopoJSON data:", error);
      }
    };

    fetchTopoJson();
  }, []);

  return (
    <div className="container">
      {topoJsonData ? (
        <>
          <div className="map-container">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 750, center: [-54, -15] }} // Adjusted scale and center to crop the map
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={topoJsonData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.nome;
                    const group = groupData.find((g) =>
                      g.states.includes(stateName)
                    );
                    const fillColor = group ? group.color : "#EEE";
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
          <div className="legend-container">
            {groupData.map((group, index) => (
              <div key={index} className="legend-item">
                <div
                  className="color-box"
                  style={{ backgroundColor: group.color }}
                ></div>
                <span>{group.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default BrazilMap;

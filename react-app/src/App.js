import "./styles.css";
import React from "react";
import ChartComponent from './components/ChartComponent';
import FilterDropdown from './components/FilterDropdown';

export default function App() {
  
  return (
    <div id="app-inner">
      <div id="dropdown">
        <FilterDropdown />
      </div>
      <div id="chart-wrapper">
        <ChartComponent />
      </div>
    </div>
  );
}



import React from "react";


import "assets/scss/main.scss?v=1.9.0";

// pages for this product
import Home from "views/home/";
import Portfolio from "views/Portfolio.js";
import Contact from "views/Contact.js";


export default function Index(props) {
  return (
    <div>
      <Home />
      <Portfolio />
      <Contact />
    </div>
  )
}
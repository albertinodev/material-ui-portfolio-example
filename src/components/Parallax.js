import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "../styles/components/parallax.js";

const useStyles = makeStyles(styles);

export default function Parallax(props) {
  const [innerWidth, setInnerWidth] = useState(0);
  const [pageYOffset, setPageYOffset] = useState(0)
  const [windowScrollTop, setWindowScrollTop] = useState(0);

  const [transform, setTransform] = useState("translate3d(0," + windowScrollTop + "px,0)");

  useEffect(() => {
    setInnerWidth(window ? window.innerWidth : 0);
    setPageYOffset(window ? window.pageYOffset: 0);

    if (innerWidth >= 768) {
      setWindowScrollTop(pageYOffset / 3);
    } else {
      setWindowScrollTop(0);
    }

    if (innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }

    // Do some transform code updates
    setTransform("translate3d(0," + windowScrollTop + "px,0)");

    return function cleanup() {
      if (innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  },[]);

  const resetTransform = () => {
    var windowScrollTop = pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };

  const { filter, className, children, style, image, small } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [className]: className !== undefined
  });
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: "url(" + image + ")",
        transform: transform
      }}
    >
      {children}
    </div>
  );
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool
};

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preconnect("https://assets.dbplay.app");
  ReactDOM.preload("https://assets.dbplay.app/ibm-plex-sans-tc/css/ibm-plex-sans-tc-default-swap.min.css", {
    as: "style",
  });

  return null;
}

/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}


declare module "*.less" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.json" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.jpg";
declare module "*.png";
declare module "file-saver";
declare module "xlsx";
declare module "*.mp3";
declare module "react-select-virtualized";
declare const IS_PROD: boolean;
declare const IS_DEV: boolean;
declare const IS_DEV_SERVER: boolean;

declare module "react-window";
declare module "react-windowed-select";
declare module "react-minimal-pie-chart";
declare module "leaflet.motion/src/leaflet.motion";

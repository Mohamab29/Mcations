import "./LoadingGIF.css";
import loadingGif from "../../../assets/images/plane-loader-trans.gif";
function LoadingGIF(): JSX.Element {
  return (
    <div className="LoadingGIF">
      <img src={loadingGif} alt="loading GIF"></img>
    </div>
  );
}

export default LoadingGIF;

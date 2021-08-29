import "./Footer.css";

function Footer(): JSX.Element {
  const getYear = () => new Date().getFullYear();

  return (
    <div className="Footer">
      <div className="social-media-footer">
        <div className="logo">Instagram</div>
        <div className="logo">linkedIn</div>
        <div className="logo">GitHub</div>
      </div>

      <p>All rights reserved | {getYear()} ©.</p>
    </div>
  );
}

export default Footer;

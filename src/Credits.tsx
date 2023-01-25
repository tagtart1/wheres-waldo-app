import HeaderCredits from "./HeaderCredits";
import "./styles/Credits.css";
import instagramPng from "./images/instagram.png";
import patreonPng from "./images/patreon.png";
import twitterPng from "./images/twitter.png";
import youtubePng from "./images/youtube.png";
import githubPng from "./images/github-mark-white.png";
import linkedInPng from "./images/LI-In-Bug.png";
import { Link } from "react-router-dom";
const Credits = () => {
  return (
    <div className="credits-container">
      <HeaderCredits />
      <div className="credits-main">
        <div className="credits-modal">
          <h2>Level Art</h2>
          <div className="credits-row">
            <span>The Loc Nar by Egor Klyuchnyk</span>
          </div>
          <div className="social-links">
            <div className="social-item">
              <a
                href="https://www.instagram.com/chekavo/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={instagramPng} alt="instagram" />
                chekavo
              </a>
            </div>
            <div className="social-item">
              <a
                href="https://www.patreon.com/Egor"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={patreonPng} alt="Patreon" />
                egor
              </a>
            </div>
            <div className="social-item">
              <a
                href="https://www.youtube.com/c/EgorZoidberg"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={youtubePng} alt="Youtube" />
                EgorZoidberg
              </a>
            </div>
            <div className="social-item">
              <a
                href="https://twitter.com/egor_klyuchnyk"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={twitterPng} alt="Twitter" />
                egor_klyuchnyk
              </a>
            </div>
          </div>
        </div>
        <div className="credits-modal">
          <h2>Project</h2>
          <div className="credits-row">
            <span>by Adam Twitty</span>
          </div>
          <div className="social-links">
            <div className="social-item">
              <a
                href="https://github.com/tagtart1"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img className="social-logo" src={githubPng} alt="Github" />
                tagtart1
              </a>
            </div>
            <div className="social-item">
              <a href=" " target="_blank" rel="noreferrer noopener">
                <img className="social-logo" src={linkedInPng} alt="LinkedIn" />
                WIP
              </a>
            </div>
          </div>
        </div>
        <Link to={"/"}>
          <button className="credits-back">{`< Back`}</button>
        </Link>
      </div>
    </div>
  );
};

export default Credits;

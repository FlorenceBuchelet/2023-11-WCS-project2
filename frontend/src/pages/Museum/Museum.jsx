import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Museum.scss";

function Museum() {
  const [arts, setArts] = useState();
  useEffect(() => {
    fetch("http://localhost:3310/artpieces")
      .then((response) => response.json())
      .then((data) => setArts(data))
      .catch((error) => console.error(error));
  }, []);

  const [clickAhead, setClickAhead] = useState();
  const [artsIndexLeft, setArtsIndexLeft] = useState(0);
  const [artsIndexRight, setArtsIndexRight] = useState(1);
  const [popUpLeft, setPopUpLeft] = useState("museum__wall museum__wall--left");
  const [popUpRight, setPopUpRight] = useState(
    "museum__wall museum__wall--right"
  );

  const handleClickNext = (e) => {
    e.preventDefault();
    setClickAhead(!clickAhead);
    setTimeout(() => {
      setClickAhead();
    }, 2000);
    setArtsIndexLeft(artsIndexLeft + 2);
    setArtsIndexRight(artsIndexRight + 2);
  };

  const handleClickPrevious = (e) => {
    e.preventDefault();
    setArtsIndexLeft(artsIndexLeft - 2);
    setArtsIndexRight(artsIndexRight - 2);
  };

  const handleClickPopUpLeft = (e) => {
    e.preventDefault();
    if (popUpLeft !== "museum__wall museum__wall--left museum__popUpImg") {
      setPopUpLeft("museum__wall museum__wall--left museum__popUpImg");
    } else {
      setPopUpLeft("museum__wall museum__wall--left");
    }
  };

  const handleClickPopUpRight = (e) => {
    e.preventDefault();
    if (popUpRight !== "museum__wall museum__wall--right museum__popUpImg") {
      setPopUpRight("museum__wall museum__wall--right museum__popUpImg");
    } else {
      setPopUpRight("museum__wall museum__wall--right");
    }
  };

  return (
    <div className="museum">
      <div className="museum__background">
        <img src="src/assets/bg main.jpg" alt="Portrait de Camille Claudel" />
      </div>
      <div className="museum__walls">
        {arts ? (
          <div className={popUpLeft}>
            <button
              type="button"
              className="museum__img--button"
              onClick={handleClickPopUpLeft}
            >
              <img
                className={clickAhead && "museum__img--left"}
                src={`http://localhost:3310/${arts[artsIndexLeft].imgSrc}`}
                alt={arts[artsIndexLeft].imgAlt}
              />
            </button>
            <p className="museum__caption">
              <strong>
                {`${arts[artsIndexLeft].artist} - ${arts[artsIndexLeft].city} `}
              </strong>
              {`(${arts[artsIndexLeft].street})`} <br />
              {arts[artsIndexLeft].description}
            </p>
            {popUpLeft ===
            "museum__wall museum__wall--left museum__popUpImg" ? (
              <p className="museum__img--escapeMessage">
                Cliquez ou touchez l'oeuvre pour retourner au Musée.
              </p>
            ) : null}
          </div>
        ) : (
          "Loading"
        )}
        {arts ? (
          <div className={popUpRight}>
            <button
              type="button"
              className="museum__img--button"
              onClick={handleClickPopUpRight}
            >
              <img
                className={clickAhead && "museum__img--right"}
                src={`http://localhost:3310/${arts[artsIndexRight].imgSrc}`}
                alt={arts[artsIndexRight].imgAlt}
              />
            </button>
            <p className="museum__caption">
              <strong>
                {`${arts[artsIndexRight].artist} - ${arts[artsIndexRight].city} `}
              </strong>
              {`(${arts[artsIndexRight].street})`} <br />
              {arts[artsIndexRight].description}
            </p>
            {popUpRight ===
            "museum__wall museum__wall--right museum__popUpImg" ? (
              <p className="museum__img--escapeMessage">
                Cliquez ou touchez l'oeuvre pour retourner au Musée.
              </p>
            ) : null}
          </div>
        ) : (
          "Loading"
        )}
        <nav className="museum__navigationArrows">
          <button
            type="button"
            className="museum__navigationArrows--left"
            onClick={handleClickNext}
          >
            Avant
          </button>
          <button
            type="button"
            className="museum__navigationArrows--right"
            onClick={handleClickPrevious}
          >
            Arrière
          </button>
        </nav>
      </div>
    </div>
  );
}

Museum.propTypes = {
  arts: PropTypes.shape({
    imgAlt: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Museum;

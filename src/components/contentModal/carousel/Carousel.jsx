import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../../config/Config";
import "./carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);

  const fetchCredits = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US `
      );
      setCredits(data.cast);
    } catch (error) {
      console.log("error fetching cast/credits api");
    }
  };

  const items = credits.map((c) => (
    <div className="carouselItem" key={id}>
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  useEffect(() => {
    fetchCredits();
  }, []);
  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      mouseTracking
      items={items}
      infinite
      disableButtonsControls
      disableDotsControls
    />
  );
};

export default Carousel;

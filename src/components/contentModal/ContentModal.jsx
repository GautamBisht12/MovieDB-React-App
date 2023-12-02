import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { YouTube } from "@mui/icons-material";

// import "../singleContent/SingleContainer.css";
import "./contentmodal.css";

import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/Config";
import Carousel from "./carousel/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  color: "white",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "#22092c",
  border: "1px solid white",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id, className }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=68c3ad2897ef4acd7987e0e9218396c0&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.log("error in fetching modal Api");
    }
  };
  const fetchVideo = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      console.log(data);
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.log("error in fetching video Api");
    }
  };
  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div onClick={handleOpen} className={className}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <Box className="ContentModal">
                <img
                  className="ContentModal__portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                <img
                  className="ContentModal__landscape"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <Box>
                    <Carousel media_type={media_type} id={id} />
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="error"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch The Trailer
                  </Button>
                </div>
              </Box>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}

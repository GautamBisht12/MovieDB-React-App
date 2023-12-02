import React from "react";
import { Badge, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { img_300, unavailable } from "../../config/Config";
import "./SingleContainer.css";
import ContentModal from "../contentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const maxLength = 30;

  // Function to truncate the title if it exceeds maxLength
  const truncateTitle = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Truncate the title if it exceeds maxLength
  const truncatedTitle = truncateTitle(title, maxLength);

  return (
    <ContentModal media_type={media_type} id={id} className="poster-container">
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <Card className="single-card" sx={{ width: 200 }}>
        <CardMedia
          component="img"
          image={
            poster
              ? `${img_300}/https://image.tmdb.org/t/p/original/${poster}`
              : unavailable
          }
          alt={title}
        />
        <CardContent className="single-card">
          <Typography
            style={{
              fontFamily: "futura",
              lineHeight: "1",
              marginBottom: "8px",
            }}
            variant="h6"
            component="div"
          >
            {truncatedTitle}
          </Typography>
          <Typography style={{ fontFamily: "futura" }} variant="body2">
            Date: {date}
          </Typography>
          <Typography style={{ fontFamily: "futura" }} variant="body2">
            Type: {media_type === "tv" ? "Tv Series" : "Movie"}
          </Typography>
        </CardContent>
      </Card>
    </ContentModal>
  );
};

export default SingleContent;

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CardMedia } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "#000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  border: ".1rem #FFF solid",
};

function BasicModal(winner) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The winner is:
          </Typography>
          <Typography
            className="headline"
            gutterBottom
            variant="h4"
            component="div"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
            padding="1rem"
            fontFamily="'Pokemon Solid', sans-serif"
            letterSpacing=".2rem"
            color="#FFCD09"
          >
            {winner.winner}
          </Typography>
          <CardMedia
            component="img"
            alt={winner.winner}
            image={winner.winnerImg}
            sx={{
              height: 300,
              width: "100%",
              objectFit: "contain",
              marginBottom: "1rem",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
export default BasicModal;

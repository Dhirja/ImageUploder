import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate  } from "react-router-dom";
import axios from "axios"

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

const StyledButton = styled(Button)({
  marginTop: "20px",
});

const Addfile = () => {
  const [fname, setFName] = useState("");
  const [file, setFile] = useState("");
  
   const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  }

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    const res = await axios.post("/add", formData, config);

    if (res.data.status === 401 || !res.data) {
      console.log("errror")
    } else {
      history("/dash")
    }
  }
  return (
    <>
      <h1 style={{textAlign:"center"}}>Upload Your Image</h1>
      <StyledForm>
        <StyledTextField
          label="Name"
          variant="outlined"
          value={fname}
          onChange={setdata}
          required
        />
        <label htmlFor="image-upload">
          <input
            id="image-upload"
            type="file"
            onChange={setimgfile}
            // accept="image/*"
            style={{ display: "none" }}
          />
          <StyledButton
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </StyledButton>
        </label>
        <StyledButton type="submit" variant="contained"  onClick={addUserData}>
          Submit
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default Addfile;
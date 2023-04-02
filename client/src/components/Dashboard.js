import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import axios from "axios";



const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);
    const [imgdatas, setimgDatas] = useState([]);



    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }

    const fetchData = async () => {
        const res = await axios.get("/getdata", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 401 || !res.data) {
            console.log("errror")
        } else {
            setimgDatas(res.data.getUser)
        }
      }

      const dltUser = async (id) => {
        const res = await axios.delete(`http://localhost:8009/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 401 || !res.data) {
            console.log("errror")
        } else {
            fetchData()
            // setShow(true)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
            fetchData();
        }, 2000)

    }, [])
   

    return (
        <>
            {
                data ? 
                <Grid container spacing={2}>
                {imgdatas.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="180"
                        width='80'
                        image={`/uploads/${item.imgpath}`}
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {item.fname}
                        </Typography>
                        <Button variant="danger" className='col-lg-6 text-center' onClick={() => dltUser(item._id)}>Delete</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

                : 
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }

        </>

    )
}

export default Dashboard
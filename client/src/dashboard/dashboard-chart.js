import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);



export const DashboardChart = (props) => {
    const [da, setDa] = useState([]);
    const [loading, setLoading] = useState(true);
     const data = {
        labels: ['Admins', 'All Assets', 'Free Softwares', 'Free Hardware', 'HW', 'SW' , 'Users'],
        datasets: [
          {
            label: '# of Votes',
            data: [da.admins, da.allAssets, da.freeSoftwares, da.freeHardware, da.hw, da.sw, da.users],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 251, 9, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 251, 9, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };



      useEffect(() => {
        let active = true;
    
        const fetchData = async () => {
          setLoading(true);
          try {
            const { data: response } = await axios.get(
              "http://localhost:3030/statistics"
            );
            setDa(response);
            console.log(da);
    
            
    
            if (!active) {
              return;
            }
          } catch (error) {
            console.error(error.message);
          }
    
          setLoading(false);
        };
    
        fetchData();
    
        return () => {
          active = false;
        };
      }, []);

    return (
        <>

<Box
      sx={{
        width: 550,
        height: 100,
        marginTop: '4rem',
        marginLeft: '20rem',
        
        
      }}
    >

        <Doughnut
        data={data}

        
        
        
        />
        </Box>
                               
        </>
    )
}
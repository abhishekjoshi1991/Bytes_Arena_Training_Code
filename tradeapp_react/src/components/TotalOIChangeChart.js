import { Bar } from "react-chartjs-2";

export default function TotalOIChangeChart({ chartData }) {
    return (
        <div className="">
                <Bar
                    
                    width='2000'
                    height='2400'
                    data={chartData}
                    
                    options={{
                        // responsive: true,
                        // maintainAspectRatio: false,
                        // aspectRatio: 0.5,
                        // canvas:{
                        //     height: '2000px', // Set the desired height
                        //     width: 1000, // Set the desired width
                        //   },
                        // scales: {
                        //     y: {
                        //         min: 0,
                        //         max: 3000000,
                        //         ticks: {
                        //           // forces step size to be 50 units
                        //           stepSize: 500000
                        //         }
                        //       }
                        // },
                        plugins: {
                            title: {
                                display: true,
                                text: "Total OI Change",
                                position: 'left'
                            },
                            legend: {
                                display: false
                            },
                            datalabels:
                            {
                                color: 'black',
                                display: false,

                            }
                        },
                        interaction: {
                            mode: "index",
                            intersect: true
                        }
                    }}
                />
        </div>
    );
};


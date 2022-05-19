import React from 'react';
import { Line } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';

interface IProps {
    locomotiveNumber: string | number;
    handleOnClickDrawDiagram: () => void;
    chartData: any
}

const ChartDiagram: React.FC<IProps> = ({handleOnClickDrawDiagram, locomotiveNumber, chartData}): JSX.Element => {
    const isMobile = useMediaQuery({query: '(max-width: 1119px)'});
    const legendPosition = isMobile ? 'bottom' : 'right';

    return (
        <div className="diagram-style">
              <Line
                data={chartData} 
                options={{
                  showLine: false,
                  scales: {
                    x: {
                      ticks: {
                        color: 'white'
                      },
                    },
                    yAxes: 
                      {             
                        beginAtZero: false,                  
                        ticks: {
                          color: 'white'
                        },
                        grid: {
                          color: 'gray'
                        }              
                      },                           
                  },
                  plugins: {
                  title: {
                    display: true,
                    text: `Nazwa lokomotywy: ${locomotiveNumber}`,
                    color: 'white'
                  },
                  legend: {
                    display: true,
                    position: legendPosition,
                    labels: {
                      color: 'white'
                    }
                  },
                  tooltip: {
                    bodyColor: 'white'
                  }
                }}}
              />
              <button onClick={handleOnClickDrawDiagram}>Zamknij</button>
            </div>
    )
}

export default ChartDiagram;
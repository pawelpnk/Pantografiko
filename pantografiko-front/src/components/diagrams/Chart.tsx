import { useEffect, useLayoutEffect, useState } from 'react';
import { Scatter, Line } from 'react-chartjs-2';
 
const Chart = ({activeDiagram, setActiveDiagram, locomotiveNumber, chartData}: any) => {
  // const [diagramData, setDiagramData] = useState<any>([]);
  // const [numberLocomotive, setNumberLocomotive] = useState<string>('');

//   useEffect(() => { 
//   setDiagramData({
//     // labels: filterInsp.map((insp: any) => insp.)
//     datasets: [
//       {
//         label: 'Grubość nakładki 1',
//         // data: filterInsp.map((insp: any) => {
//         //   return {
//         //     x: insp.inspectionOfNumber,
//         //     y: insp.overlayThickness1
//         //   }
//         // }),
//         data: [{x: 1, y: 3}, {x: 3, y: 4}, {x: 4, y: 6}, {x: 6, y: 9}],
//         fill: true,
//         borderColor: 'rgba(0, 200, 0, 1)'
//       },
//       {
//         label: 'Grubość nakładki 2',
//         // data: filterInsp.map((insp: any) => {
//         //   return {
//         //     x: insp.inspectionOfNumber,
//         //     y: insp.overlayThickness2
//         //   }
//         // }),
//         data: [{x: 1, y: 2}, {x: 2, y: 4}, {x: 3, y: 8},{x: 4, y: 16}],
//         fill: true,
//         borderColor: 'rgba(200, 0, 0, 1)'
//       }
//     ]
//   });
//   setNumberLocomotive(filterInsp.locomotiveNumber);
// },[])
  useLayoutEffect(()=>{
    console.log(chartData)
  },[])


  return ( 
    <>
      <Line
        data={chartData}
        options={{
          // chart: {
          //   type: 'scatter'
          // },
          scales: {
            // chart: {
            //   type: "scatter",
            // },
            yAxes: 
              {             
                beginAtZero: true                
              }            
          },
          plugins: {
          title: {
            display: true,
            text: `Nazwa lokomotywy: ${locomotiveNumber}`
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}}
      />
      {/* <Scatter 
        data={diagramData}
        options={{
          // chart: {
          //   type: 'scatter'
          // },
          scales: {
            // chart: {
            //   type: "scatter",
            // },
            yAxes: 
              {             
                beginAtZero: true                
              }            
          },
          plugins: {
          title: {
            display: true,
            text: `Nazwa lokomotywy: ${locomotiveNumber}`
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}}
      /> */}
    </>
   );
}
 
export default Chart;
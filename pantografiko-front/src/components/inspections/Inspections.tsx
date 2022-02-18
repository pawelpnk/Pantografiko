import React, { useEffect } from 'react';
import './Inspections.css';
import req from '../../helpers/request';
import { Link } from 'react-router-dom';
// import Chart from '../diagrams/Chart';
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';

const Inspections: React.FC = (): JSX.Element => {
  const [inspections, setInspections] = React.useState<any>([]);
  const [filterInsp, setFilterInsp] = React.useState<any>([]);
  const [locomotiveNumber, setLocomotiveNumber] = React.useState<string | number>('');
  const [collectorNumber, setCollectorNumber] = React.useState<string | number>('');
  const [frontOrRear, setFrontOrRear] = React.useState<string | number>('');
  const [activeDiagram, setActiveDiagram] = React.useState<boolean>(false);
  const [chartData, setChartData] = React.useState<any>({});

  useEffect(() => {
    Chart.register(...registerables);
    fetchInspections();
  },[]);

  const fetchInspections = async () => {
    let data: any;
    
    data = await req.get("pages/fetch");
    setInspections(data.data);
  }

  const handleOnClickCleanFetch = () => {
    setInspections([]);
    console.log('Wyczyszczono');
  } 

  const deleteItem = async (inspection: any) => {
    await req.delete(`pages/delete/${inspection._id}`);
    fetchInspections();
    filterInputsAndSetsDataForDiagram();
    console.log('ok');
  }

  const renderInspections = filterInsp.length > 0 ? filterInsp.map((inspection: any) =>{
    return (
    <div className="inspection-block" key={inspection._id}>      
      <p>Osoba wykonująca przegląd: {inspection.loginUserID}</p>
      <p>Numer lokomotywy: {inspection.locomotiveNumber}</p>
      <p>Data przeglądu: {inspection.inspectionDate}</p>      
      <p>Numer przeglądu: {inspection.inspectionOfNumber}</p>
      <Link onClick={handleOnClickCleanFetch} className={'link-inspection'} to={`/display/${inspection._id}`}>
        Przejdź do szczegółów
      </Link>      
      <button onClick={() => deleteItem(inspection)} className='delete-inspection'>Usuń</button>
      <Link className='update-inspection' to={`/display/edit/${inspection._id}`}>Edytuj</Link> 
    </div>
    )
  }) : inspections.map((inspection: any) =>{
    return (
    <div className="inspection-block" key={inspection._id}>      
      <p>Osoba wykonująca przegląd: {inspection.loginUserID}</p>
      <p>Numer lokomotywy: {inspection.locomotiveNumber}</p>
      <p>Data przeglądu: {inspection.inspectionDate}</p>      
      <p>Numer przeglądu: {inspection.inspectionOfNumber}</p>
      <Link onClick={handleOnClickCleanFetch} className={'link-inspection'} to={`/display/${inspection._id}`}>
        Przejdź do szczegółów
      </Link>      
      <button onClick={() => deleteItem(inspection)} className='delete-inspection'>Usuń</button>
      <Link className='update-inspection' to={`/display/edit/${inspection._id}`}>Edytuj</Link>      
    </div>
    )
  });

  const handleOnChangeLocomotiveNumber = (e: React.ChangeEvent<HTMLInputElement>) => setLocomotiveNumber(e.target.value.toUpperCase());
  const handleOnChangeCollectorNumber = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
    if(+e.target.value) {
      setCollectorNumber(+e.target.value)
    } else {
      setCollectorNumber('');
    }
  }
  const handleOnChangeFrontOrRear = (e: React.ChangeEvent<HTMLInputElement>): void =>  {
    if(+e.target.value) {
      setFrontOrRear(+e.target.value)
    } else {
      setFrontOrRear('');
    }
  }

  const filterInputsAndSetsDataForDiagram = (): void => {
    let filtersInspection = inspections;

    if(locomotiveNumber && collectorNumber && frontOrRear) {
      filtersInspection = inspections
      .filter((item: any) => {
        return item.locomotiveNumber === locomotiveNumber;
       })
      .filter((item:any) => {
        return item.collectorNumber === collectorNumber;
      })
      .filter((item: any) => {
        return item.frontOrRear === frontOrRear;
      })
    } else if(locomotiveNumber && collectorNumber) {
      filtersInspection = inspections
      .filter((item: any) => {
        return item.locomotiveNumber === locomotiveNumber;
       })
      .filter((item:any) => {
        return item.collectorNumber === collectorNumber;
      }) 
    } else if(locomotiveNumber && frontOrRear) {
      filtersInspection = inspections
      .filter((item: any) => {
       return item.locomotiveNumber === locomotiveNumber;
       }).filter((item: any) => {
        return item.frontOrRear === frontOrRear;
      })
    } else if(collectorNumber && frontOrRear) {
      filtersInspection = inspections
      .filter((item:any) => {
        return item.collectorNumber === collectorNumber;
      })
      .filter((item: any) => {
        return item.frontOrRear === frontOrRear;
      })
    } else if(locomotiveNumber) {
      filtersInspection = inspections
      .filter((item: any) => {
        return item.locomotiveNumber === locomotiveNumber;
       })
    } else if(collectorNumber) {
      filtersInspection = inspections
      .filter((item: any) => {
        return item.collectorNumber === collectorNumber;
       })
    } else if(frontOrRear) {
      filtersInspection = inspections
      .filter((item: any) => {
        return item.frontOrRear === frontOrRear;
      })
    }
    setFilterInsp(filtersInspection);    
  }

  useEffect(()=> {
    setChartData({
      labels: filterInsp.map((insp: any) => insp.inspectionOfNumber),
      datasets: [
        {
          type: 'line',
          label: 'Grubość nakładki 1',
          // data: filterInsp.map((insp: any) => {
          //   return {
          //     x: insp.inspectionOfNumber,
          //     y: insp.overlayThickness1
          //   }
          // }),
          // data: [{x: 1, y: 3}, {x: 3, y: 4}, {x: 4, y: 6}, {x: 6, y: 9}],
          data: filterInsp.map((insp: any) => insp.overlayThickness1),
          // fill: true,
          backgroundColor: 'rgba(23, 56, 12, 5)',
          fontColor: 'red',
          fill: false,
          borderColor: 'rgba(0, 200, 0, 1)'
        },
        {
          type: 'line',
          label: 'Grubość nakładki 2',
          // data: filterInsp.map((insp: any) => {
          //   return {
          //     x: insp.inspectionOfNumber,
          //     y: insp.overlayThickness2
          //   }
          // }),
          // data: [{x: 1, y: 2}, {x: 2, y: 4}, {x: 3, y: 8},{x: 4, y: 16}],
          data: filterInsp.map((insp: any) => insp.overlayThickness2),
          // fill: true,
          backGroundColor: 'rgba(185, 124, 191, 26)',
          borderColor: 'rgba(200, 0, 0, 1)'
        }
      ]
    });
  },[filterInsp])

  const handleOnClickDrawDiagram = (): void => {
    setActiveDiagram(prevValue => !prevValue);
    // if(filterInsp){
    //   setFilterInsp('');
    // }
  }

  const buttonDiagram = (locomotiveNumber && !collectorNumber && filterInsp.length > 0) ? <button onClick={handleOnClickDrawDiagram}>Rysuj wykres</button> : null;

  return (
    <>
      <div className="search-engine">
        <p>Wybierz filtry</p>
        <input onChange={handleOnChangeLocomotiveNumber} type="text" value={locomotiveNumber} placeholder='Wpisz numer lokomotywy'/>
        <input onChange={handleOnChangeCollectorNumber} value={collectorNumber} type="text" placeholder='Wpisz numer odbieraka'/>
        <input onChange={handleOnChangeFrontOrRear} type="text" value={frontOrRear} placeholder='Przedni(1)/tylni(2) odbierak' />
        <button onClick={filterInputsAndSetsDataForDiagram}>Filtruj</button>
        {buttonDiagram}
      </div>    
      <div className='inspections-display-page'>
        {renderInspections}
        {/* {(activeDiagram && filterInsp.length > 0) ? <Chart value={{activeDiagram, setActiveDiagram, locomotiveNumber, chartData}}/> : null} */}
        {(activeDiagram && filterInsp.length > 0) ?  <div className="diagram-style">
        <Line
          data={chartData} 
          options={{
            // backgroundColor: 'red',
            showLine: false,
            // chart: {
            //   type: 'scatter'
            // },
            scales: {
              // backgroundColor: 'red',
              x: {
                ticks: {
                  color: 'white'
                },
                
                grid: {
                  // color: 'gray',
                  // borderColor: 'gray',
                  // fontColor: 'red'
                  // tickColor: 'red'
                }
              },
              // y: {
              //   ticks: {
              //     color: 'black'
              //   }
              // },
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
              position: 'right',
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
        </div> : null}
        
        </div>
    </>
  )
}

export default Inspections;
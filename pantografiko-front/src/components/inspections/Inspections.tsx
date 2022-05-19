import React, { useEffect, useState } from 'react';
import './Inspections.css';
import req from '../../helpers/request';
import { Chart, registerables} from 'chart.js';
import { useMediaQuery } from 'react-responsive';
import { InspectionInterface } from './inspection.interface/inspection-interface';
import InspectionMinItem from './InspectionMinItem';
import ChartDiagram from '../chartDiagram/ChartDiagram';

const Inspections: React.FC = (): JSX.Element => {
  const [inspections, setInspections] = useState<InspectionInterface[]>([]);
  const [filterInsp, setFilterInsp] = useState<InspectionInterface[]>([]);
  const [locomotiveNumber, setLocomotiveNumber] = useState<string | number>('');
  const [collectorNumber, setCollectorNumber] = useState<string | number>('');
  const [activeDiagram, setActiveDiagram] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any>({});
  const [openSearchEngine, setOpenSearchEngine] = useState<boolean>(false);

  useEffect(() => {
    Chart.register(...registerables);
    fetchInspections();
  },[]);

  const fetchInspections = async () => {    
    let data = await req.get("pages/fetch");
    setInspections(data.data);
  }

  const handleOnClickCleanFetch = () => {
    setInspections([]);
  } 

  const deleteItem = async (inspection: InspectionInterface) => {
    await req.delete(`pages/delete/${inspection._id}`);
    fetchInspections();
    filterInputsAndSetsDataForDiagram();
  }

  const renderInspections = filterInsp.length > 0 ? filterInsp.map((inspection: InspectionInterface) =>{
    return (
      <InspectionMinItem key={inspection._id} inspection={inspection} handleOnClickCleanFetch={handleOnClickCleanFetch} deleteItem={deleteItem} />
    )
  }) : inspections.map((inspection: InspectionInterface) =>{
    return (
      <InspectionMinItem key={inspection._id} inspection={inspection} handleOnClickCleanFetch={handleOnClickCleanFetch} deleteItem={deleteItem} />
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

  const filterInputsAndSetsDataForDiagram = (): void => {
    let filtersInspection = inspections;

    if(locomotiveNumber && collectorNumber) {
      filtersInspection = inspections
      .filter((item: InspectionInterface) => {
        return item.locomotiveNumber === locomotiveNumber;
       })
      .filter((item: InspectionInterface) => {
        return item.collectorNumber === collectorNumber;
      })
    } else if(locomotiveNumber && collectorNumber) {
      filtersInspection = inspections
      .filter((item: InspectionInterface) => {
        return item.locomotiveNumber === locomotiveNumber;
       })
      .filter((item:InspectionInterface) => {
        return item.collectorNumber === collectorNumber;
      }) 
    } else if(locomotiveNumber) {
      filtersInspection = inspections
      .filter((item: InspectionInterface) => {
        return item.locomotiveNumber === locomotiveNumber;
       })
    } else if(collectorNumber) {
      filtersInspection = inspections
      .filter((item: InspectionInterface) => {
        return item.collectorNumber === collectorNumber;
       })
    }
    setFilterInsp(filtersInspection);    
  }

  useEffect(()=> {
    setChartData({
      labels: filterInsp.map((insp: InspectionInterface) => insp.inspectionOfNumber),
      datasets: [
        {
          type: 'line',
          label: 'Grubość nakładki 1',
          data: filterInsp.map((insp: InspectionInterface) => insp.overlayThickness1),
          backgroundColor: 'rgba(23, 56, 12, 5)',
          fontColor: 'red',
          fill: false,
          borderColor: 'rgba(0, 200, 0, 1)'
        },
        {
          type: 'line',
          label: 'Grubość nakładki 2',
          data: filterInsp.map((insp: InspectionInterface) => insp.overlayThickness2),
          backGroundColor: 'rgba(185, 124, 191, 26)',
          borderColor: 'rgba(200, 0, 0, 1)'
        }
      ]
    });
  },[filterInsp])

  const handleOnClickDrawDiagram = (): void => {
    setActiveDiagram(prevValue => !prevValue);
  }

  const buttonDiagram: JSX.Element | null = (locomotiveNumber && !collectorNumber && filterInsp.length > 0) ? <button onClick={handleOnClickDrawDiagram}>Rysuj wykres</button> : null;

  const searchEngine: JSX.Element = 
    <div className="search-engine">
      <p>Wybierz filtry</p>
      <input onChange={handleOnChangeLocomotiveNumber} type="text" value={locomotiveNumber} placeholder='Wpisz numer lokomotywy'/>
      <input onChange={handleOnChangeCollectorNumber} value={collectorNumber} type="text" placeholder='Wpisz numer odbieraka'/>
      <button onClick={filterInputsAndSetsDataForDiagram}>Filtruj</button>
      {buttonDiagram}
    </div>  

  const isMobile750: boolean = useMediaQuery({query: '(max-width: 750px)'});

  const handleOnClickOpenSearchEngine = () => {
    setOpenSearchEngine(prev => !prev);
  }

  const searchEngineOpen: JSX.Element | false = isMobile750 ? openSearchEngine && searchEngine : searchEngine;
  const signSearchEngine: JSX.Element | null = isMobile750 ? <div onClick={handleOnClickOpenSearchEngine} className="sign-search-engine">X</div> : null;


  return (
    <>
      {signSearchEngine}
      {searchEngineOpen}    
      <div className='inspections-display-page'>
        {renderInspections}
        {(activeDiagram && filterInsp.length > 0) 
          ?  
            <ChartDiagram locomotiveNumber={locomotiveNumber} handleOnClickDrawDiagram={handleOnClickDrawDiagram} chartData={chartData}  /> 
          : 
          null}
        
        </div>
    </>
  )
}

export default Inspections;
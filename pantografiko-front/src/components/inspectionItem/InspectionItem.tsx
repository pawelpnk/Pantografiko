import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import req from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';
import { InspectionInterface } from '../inspections/inspection.interface/inspection-interface';
import './InspectionItem.css';

const InspectionItem: React.FC = (): JSX.Element => {
  const [inspection, setInspection] = React.useState<InspectionInterface[]>([]);

  const { inspectionID } = useParams();
  const { userObject } = useContext(StoreContext);

  useEffect(() => {
    const fetchOneInspection = async (): Promise<void> => {
      let item = await req.get(`pages/fetch/${inspectionID}`);
      setInspection(item.data.inspection);
    }
    fetchOneInspection();
  },[])

  const deleteItem = async (): Promise<void> => {
    await req.delete(`pages/delete/${inspectionID}`);
    setInspection([]);
  }

  const renderInspection: JSX.Element[] | string = inspection.length > 0 ? inspection.map((item: InspectionInterface)=>{
    return (
      <div className="inspection-block-inside" key={item._id}>
        <p>Osoba wykonująca przegląd: {item.loginUserID}</p>
        <p>Numer lokomotywy: {item.locomotiveNumber}</p>
        <p>Numer odbieraka: {item.collectorNumber}</p>  
        <p>Data przeglądu: {item.inspectionDate}</p>      
        <p>Numer przeglądu: {item.inspectionOfNumber}</p>        
        <p>Typ odbieraka: {item.collectorType}</p>
        <p>Przedni(1) czy tylni(2): {item.frontOrRear}</p>
        <p>Grubość nakładki 1: {item.overlayThickness1}</p>        
        <p>Grubość nakładki 2: {item.overlayThickness2}</p>
        <p>Czas podnoszenia odbieraka prądu: {item.timeOfLiftingTheCurrentCollector}</p> 
        <p>Czas opuszczania odbieraka prądu: {item.fallTimeOfTheCurrentCollector}</p> 
        <p>Prawidłowość sterowania odbierakami z obu kabin: {item.correctOperationOfTheCollectorFromTwoCabins}</p>
        <p>Średni nacisk statyczny: {item.averageStaticPressure}</p>
        <p>Różnica sił podczas podnoszenia i opuszczania: {item.forceDifferenceWhenLiftingAndLowering}</p>
        <p>Pomiar siły utrzymującej: {item.holdingForceMeasurement}</p>   
        <p>Sprawdzenie stopnia zużycia wkładek stykowych ślizgacza: {item.checkThedegreeOfWearOfTheContactInsertsOfTheSlider}</p>   
        <p>Pomiar rezystancji izolacji: {item.insulationResistanceMeasurement}</p>
        <p>Stan zdatności: {item.conditionOfFitness}</p>
        <p>Przyczyna wymiany nakładki ślizgowej: {item.reasonReplaceSlidePlate}</p>
        <p>Przyczyna wymiany odbieraka prądu: {item.reasonReplaceCurrentCollector}</p>
        <p>Dodatkowe informacje związane z czynnościami obsługowymi: {item.maintenanceActivities}</p>
        { (userObject?.role === "admin" || userObject?.role === "editor" || userObject?.login === item.loginUserID) &&
        <button onClick={deleteItem} className='delete-inspection2 one-inspection'><Link to={`/display`}>Usuń</Link></button>
        }
        { (userObject?.role === "admin" || userObject?.role === "editor" || userObject?.login === item.loginUserID) &&
        <button className='update-inspection2 one-inspection'><Link to={`/display/edit/${item._id}`}>Edytuj</Link></button>
        }
        <button className="return-page one-inspection"><Link to="/display">Wróć</Link></button>
      </div>
    )
  }) : 'Loading...';

  return (
    <div className='inspections-display-page-inside'>
      {renderInspection}
    </div>
  )
}

export default InspectionItem;
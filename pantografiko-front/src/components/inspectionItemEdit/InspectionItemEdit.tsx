import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import req from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';
import Modal from '../modal/modal';
import './InspectionItemEdit.css';

const text = 'Pomyślnie zaaktualizowano inspekcje';

const InspectionItemEdit: React.FC = (): JSX.Element => {
  const [inspection, setInspection] = useState<object[]>([]);
  const [collectorNumber, setCollectorNumber] = useState<string | number>('');
  const [inspectionDate, setInspectionDate] = useState<string>('');
  const [collectorType, setCollectorType] = useState<number | string>('');
  const [frontOrRear, setFrontOrRear] = useState<number | string>('');
  const [overlayThickness1, setOverlayThickness1] = useState<number | string>('');
  const [overlayThickness2, setOverlayThickness2] = useState<number | string>('');
  const [timeOfLiftingTheCurrentCollector, setTimeOfLiftingTheCurrentCollector] = useState<number | string>('');
  const [fallTimeOfTheCurrentCollector, setFallTimeOfTheCurrentCollector] = useState<number | string>('');
  const [correctOperationOfTheCollectorFromTwoCabins, setCorrectOperationOfTheCollectorFromTwoCabins] = useState<string>('');
  const [averageStaticPressure, setAverageStaticPressure] = useState<number | string>('');
  const [forceDifferenceWhenLiftingAndLowering, setForceDifferenceWhenLiftingAndLowering] = useState<number | string>('');
  const [holdingForceMeasurement, setHoldingForceMeasurement] = useState<number | string>('');
  const [checkThedegreeOfWearOfTheContactInsertsOfTheSlider, setCheckThedegreeOfWearOfTheContactInsertsOfTheSlider] = useState<string>('');
  const [insulationResistanceMeasurement, setInsulationResistanceMeasurement] = useState<number | string>('');
  const [conditionOfFitness, setConditionOfFitness] = useState<string>('');
  const [reasonReplaceSlidePlate, setReasonReplaceSlidePlate] = useState<string>('');
  const [reasonReplaceCurrentCollector, setReasonReplaceCurrentCollector] = useState<string>('');
  const [maintenanceActivities, setMaintenanceActivities] = useState<string>(''); 

  const [messageValidation, setMessageValidation] = useState<string>('');

  const { inspectionID } = useParams();
  let navigate = useNavigate();

  const { openModal, setOpenModal } = useContext(StoreContext);

  useEffect(() => {
    const fetchOneInspection = async (): Promise<void> => {
      let item: any;
      item = await req.get(`pages/fetch/${inspectionID}`);
      setInspection(item.data.inspection);

      const { 
        collectorNumber,
        inspectionDate,
        collectorType,
        frontOrRear,
        overlayThickness1,
        overlayThickness2,
        timeOfLiftingTheCurrentCollector,
        fallTimeOfTheCurrentCollector,
        correctOperationOfTheCollectorFromTwoCabins,
        averageStaticPressure,
        forceDifferenceWhenLiftingAndLowering,
        holdingForceMeasurement,
        checkThedegreeOfWearOfTheContactInsertsOfTheSlider,
        insulationResistanceMeasurement,
        conditionOfFitness,
        reasonReplaceSlidePlate,
        reasonReplaceCurrentCollector,
        maintenanceActivities
       } = item.data.inspection[0];

      setCollectorNumber(collectorNumber);
      setInspectionDate(inspectionDate);
      setCollectorType(collectorType);
      setFrontOrRear(frontOrRear);
      setOverlayThickness1(overlayThickness1);
      setOverlayThickness2(overlayThickness2);
      setTimeOfLiftingTheCurrentCollector(timeOfLiftingTheCurrentCollector);
      setFallTimeOfTheCurrentCollector(fallTimeOfTheCurrentCollector);
      setCorrectOperationOfTheCollectorFromTwoCabins(correctOperationOfTheCollectorFromTwoCabins);
      setAverageStaticPressure(averageStaticPressure);
      setForceDifferenceWhenLiftingAndLowering(forceDifferenceWhenLiftingAndLowering);
      setHoldingForceMeasurement(holdingForceMeasurement);
      setCheckThedegreeOfWearOfTheContactInsertsOfTheSlider(checkThedegreeOfWearOfTheContactInsertsOfTheSlider);
      setInsulationResistanceMeasurement(insulationResistanceMeasurement);
      setConditionOfFitness(conditionOfFitness);
      setReasonReplaceSlidePlate(reasonReplaceSlidePlate);
      setReasonReplaceCurrentCollector(reasonReplaceCurrentCollector);
      setMaintenanceActivities(maintenanceActivities);
    }
    fetchOneInspection();    
  },[])

  const handleOnChangeCollectorNumber = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value) {
      setCollectorNumber(+e.target.value);
    } else {
      setCollectorNumber('');
    }
  }

  const handleOnChangeInspectionDate  = (event: ChangeEvent<HTMLInputElement>) => setInspectionDate(event.target.value);
  const handleOnChangeCollectorType = (event: ChangeEvent<HTMLSelectElement>) => setCollectorType(event.target.value);
  const handleOnChangeFrontOrRear = (event: ChangeEvent<HTMLSelectElement>) => setFrontOrRear(event.target.value);
  const handleOnChangeOverlayThickness1 = (event: ChangeEvent<HTMLInputElement>) => setOverlayThickness1(event.target.value);      
  const handleOnChangeOverlayThickness2 = (event: ChangeEvent<HTMLInputElement>) =>    
  setOverlayThickness2(event.target.value);
  const handleOnChangetimeOfLiftingTheCurrentCollector = (event: ChangeEvent<HTMLInputElement>): void => {
    if(+event.target.value) {
      setTimeOfLiftingTheCurrentCollector(+event.target.value);
      } else {
        setTimeOfLiftingTheCurrentCollector('');
      }
  }; 
  const handleOnChangefallTimeOfTheCurrentCollector = (event: ChangeEvent<HTMLInputElement>): void => {
    if(+event.target.value) {
      setFallTimeOfTheCurrentCollector(+event.target.value);
      } else {
        setFallTimeOfTheCurrentCollector('');
      }   
  };
  const handleOnChangeCorrectOperationOfTheCollectorFromTwoCabins = (event: ChangeEvent<HTMLSelectElement>) => setCorrectOperationOfTheCollectorFromTwoCabins(event.target.value);
  const handleOnChangeAverageStaticPressure = (event: ChangeEvent<HTMLInputElement>): void => {
    if(+event.target.value) {
      setAverageStaticPressure(+event.target.value);
      } else {
        setAverageStaticPressure('');
      }   
  };
  const handleOnChangeForceDifferenceWhenLiftingAndLowering = (event: ChangeEvent<HTMLInputElement>): void => {
    if(+event.target.value) {
      setForceDifferenceWhenLiftingAndLowering(+event.target.value);
      } else {
        setForceDifferenceWhenLiftingAndLowering('');
      }   
  }; 
  const handleOnChangeHoldingForceMeasurement = (event: ChangeEvent<HTMLInputElement>): void => {
    if(+event.target.value) {
      setHoldingForceMeasurement(+event.target.value);
      } else {
        setHoldingForceMeasurement('');
      }   
  }; 
  const handleOnChangeCheckThedegreeOfWearOfTheContactInsertsOfTheSlider = (event: ChangeEvent<HTMLInputElement>) => setCheckThedegreeOfWearOfTheContactInsertsOfTheSlider(event.target.value);
  const handleOnChangeInsulationResistanceMeasurement = (event: ChangeEvent<HTMLInputElement>): void => {
    if(+event.target.value) {
      setInsulationResistanceMeasurement(+event.target.value);
      } else {
        setInsulationResistanceMeasurement('');
      }   
  }; 
  const handleOnChangeConditionOfFitness = (event: ChangeEvent<HTMLSelectElement>) => setConditionOfFitness(event.target.value);
  const handleOnChangeReasonReplaceSlidePlate = (event: ChangeEvent<HTMLSelectElement>) => setReasonReplaceSlidePlate(event.target.value);
  const handleOnChangeReasonReplaceCurrentCollector = (event: ChangeEvent<HTMLTextAreaElement>) => setReasonReplaceCurrentCollector(event.target.value);
  const handleOnChangeMaintenanceActivities = (event: ChangeEvent<HTMLTextAreaElement>) => setMaintenanceActivities(event.target.value); 
  
  const resetInputs = (): void => {
    setCollectorNumber('');
    setInspectionDate('');
    setOverlayThickness1('');
    setOverlayThickness2('');
    setTimeOfLiftingTheCurrentCollector('');
    setFallTimeOfTheCurrentCollector('');
    setAverageStaticPressure('');
    setForceDifferenceWhenLiftingAndLowering('');
    setHoldingForceMeasurement('');
    setCheckThedegreeOfWearOfTheContactInsertsOfTheSlider('');
    setInsulationResistanceMeasurement('');
    setReasonReplaceCurrentCollector('');
    setMaintenanceActivities('');
    setMessageValidation('');
  }

  const validateInputs = (): boolean => {
    let validateVariable = true;
    setMessageValidation('');

    if(typeof collectorNumber !== 'number' || collectorNumber === NaN) {
      setMessageValidation('Numer odbieraka musi być typu liczbowego');
      validateVariable = false;
      return validateVariable;
    }
    if(!inspectionDate) {
      setMessageValidation('Brak daty');
      validateVariable = false;
      return validateVariable;
    }
     if(!inspectionDate.match(/^(([0][1-9])|([1-2][0-9])|([3][0-1]))\.(([0][1-9])|([1][0-2]))\.\d{4}$/)) {
      setMessageValidation('Niepoprawny format daty, użyj dd.mm.rrrr');
      validateVariable = false;
      return validateVariable;
    }
    if(!overlayThickness1 || !overlayThickness2) {
      setMessageValidation('Brak grubości nakładki');
      validateVariable = false;
      return validateVariable;
    }
     if(!overlayThickness1|| !overlayThickness2) {
      setMessageValidation('Brak długości nakładki 1 lub 2');
      validateVariable = false;
      return validateVariable;
    }
    if(typeof timeOfLiftingTheCurrentCollector !== 'number' || typeof fallTimeOfTheCurrentCollector !== 'number') {
      setMessageValidation('Czas podnoszenia i opuszczania musi być typu liczbowego');
      validateVariable = false;
      return validateVariable;
    }
    if(typeof averageStaticPressure !== 'number') {
      setMessageValidation('Średni nacisk statyczny musi być typu liczbowego');
      validateVariable = false;
      return validateVariable;
    }
    if(typeof forceDifferenceWhenLiftingAndLowering !== 'number') {
      setMessageValidation('Różnica sił przy podnoszeniu i opadaniu musi być typu liczbowego');
      validateVariable = false;
      return validateVariable;
    }
    if(typeof holdingForceMeasurement !== 'number') {
      setMessageValidation('Pomiar siły utrzymującej musi być typu liczbowego');
      validateVariable = false;
      return validateVariable;
    }
    if(typeof insulationResistanceMeasurement !== 'number') {
      setMessageValidation('Pomiar rezystancji izolacji musi być typu liczbowego');
      validateVariable = false;
      return validateVariable;
    }
    setMessageValidation('');
    return validateVariable;
  }

  const handleOnSubmitInspection = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if(validateInputs()) {

    let result;
    console.log(result);
    result = await req.patch(`/pages/update/${inspectionID}`, {
      collectorNumber,
      inspectionDate,
      collectorType,
      frontOrRear,
      overlayThickness1,
      overlayThickness2,
      timeOfLiftingTheCurrentCollector,
      fallTimeOfTheCurrentCollector,
      correctOperationOfTheCollectorFromTwoCabins,
      averageStaticPressure,
      forceDifferenceWhenLiftingAndLowering,
      holdingForceMeasurement,
      checkThedegreeOfWearOfTheContactInsertsOfTheSlider,
      insulationResistanceMeasurement,
      conditionOfFitness,
      reasonReplaceSlidePlate,
      reasonReplaceCurrentCollector,
      maintenanceActivities
    })
    resetInputs();
    setInspection([]);
    setOpenModal(1);
    setTimeout(()=>{
      setOpenModal(0);
      navigate(`/display/${inspectionID}`);      
    }, 3000);    
    }    
  }

  const handleOnChangeCleanInspection = (): void => {
    resetInputs();
    setInspection([]);
  }

  const checkMessageValidation: JSX.Element | null = messageValidation.length > 0 ? <p className='validation-message-form-add'>{messageValidation}</p> : null;

  useEffect(()=> {
    resetInputs();
  },[])  

  const renderEditInspection: JSX.Element[] | string = inspection.length > 0 ? inspection.map((item: any) => {
    return (
    <form className="inspection-block-edit" key={item._id} onSubmit={handleOnSubmitInspection}>
      {checkMessageValidation}
      <p>Osoba wykonująca przegląd: {item.loginUserID}</p> 
      <p>Numer lokomotywy: {item.locomotiveNumber}</p>     
      <div className="all-block-edit">
        <label>
          <p>Numer odbieraka:</p>
          <input onChange={handleOnChangeCollectorNumber} type="text" value={collectorNumber} placeholder={item.collectorNumber}/> 
        </label>
      </div>
      <div className="all-block-edit">
          <label>
            <p>Data przeglądu</p>
            <input onChange={handleOnChangeInspectionDate} type="text" value={inspectionDate} placeholder={item.inspectionDate}/>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Typ Odbieraka: 1-DSA 150, 2-AKP-4E, 3-5ZL, wybrano: {item.collectorType}</p>
            <select onChange={handleOnChangeCollectorType}  value={collectorType}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        </div>    
        <div className="all-block-edit">
          <label>
            <p>Przedni odbierak - 1, tylni odbierak - 2, wybrano: {item.frontOrRear}</p>
            <select value={frontOrRear} onChange={handleOnChangeFrontOrRear}> 
              <option value="1">1</option>             
              <option value="2">2</option>             
            </select>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Grubość nakładki 1</p>
            <input onChange={handleOnChangeOverlayThickness1} type="text" value={overlayThickness1} placeholder={item.overlayThickness1}/>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Grubość nakładki 2</p>
            <input onChange={handleOnChangeOverlayThickness2} type="text" value={overlayThickness2} placeholder={item.overlayThickness2}/>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Czas podnoszenia odbieraka prądu</p>
            <input onChange={handleOnChangetimeOfLiftingTheCurrentCollector} type="text" value={timeOfLiftingTheCurrentCollector} placeholder={item.timeOfLiftingTheCurrentCollector}/>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Czas opadania odbieraka prądu</p>
            <input onChange={handleOnChangefallTimeOfTheCurrentCollector} type="text" value={fallTimeOfTheCurrentCollector} placeholder={item.fallTimeOfTheCurrentCollector} />
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Prawidłowość sterowania odbierakami z obu kabin, wybrano: {item.correctOperationOfTheCollectorFromTwoCabins}</p>
            <select value={correctOperationOfTheCollectorFromTwoCabins} onChange={handleOnChangeCorrectOperationOfTheCollectorFromTwoCabins}> 
              <option value="pozytywne">pozytywne</option>             
              <option value="negatywne">negatywne</option>             
            </select>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Średni nacisk statyczny</p>
            <input onChange={handleOnChangeAverageStaticPressure} type="text" value={averageStaticPressure} placeholder={item.averageStaticPressure}/>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Różnica sił przy podnoszeniu i opuszczaniu</p>
            <input onChange={handleOnChangeForceDifferenceWhenLiftingAndLowering} type="text" value={forceDifferenceWhenLiftingAndLowering} placeholder={item.forceDifferenceWhenLiftingAndLowering}/>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Pomiar siły utrzymującej</p>
            <input onChange={handleOnChangeHoldingForceMeasurement} type="text" value={holdingForceMeasurement} placeholder={item.holdingForceMeasurement} />
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Sprawdzenie stopnia zużycia wkładek stykowych ślizgacza</p>
            <input onChange={handleOnChangeCheckThedegreeOfWearOfTheContactInsertsOfTheSlider} type="text" value={checkThedegreeOfWearOfTheContactInsertsOfTheSlider} placeholder={item.checkThedegreeOfWearOfTheContactInsertsOfTheSlider} />
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Pomiar rezystancji izolacji</p>
            <input onChange={handleOnChangeInsulationResistanceMeasurement} type="text" value={insulationResistanceMeasurement} placeholder={item.insulationResistanceMeasurement} />
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Stan zdatności, wybrano: {item.conditionOfFitness}</p>
            <select value={conditionOfFitness} onChange={handleOnChangeConditionOfFitness}> 
              <option value="Stan zdatności">Stan zdatności</option>             
              <option value="Stan niepełnej zdatności">Stan niepełnej zdatności</option>             
              <option value="Stan niezdatności">Stan niezdatności</option>             
            </select>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Przyczyna wymiany nakładki ślizgowej, wybrano: {item.reasonReplaceSlidePlate}</p>
            <select value={reasonReplaceSlidePlate} onChange={handleOnChangeReasonReplaceSlidePlate}>
              <option value="Nie wymieniono">Nie wymieniono</option> 
              <option value="Zużycie">Zużycie</option>             
              <option value="Uszkodzenie nakładki">Uszkodzenie nakładki</option>             
              <option value="Zmiana regulacji">Zmiana regulacji</option>             
              <option value="Uszkodzenie całego odbieraka">Uszkodzenie całego odbieraka</option>             
            </select>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Przyczyna wymiany odbieraka prądu</p>
            <textarea value={reasonReplaceCurrentCollector} onChange={handleOnChangeReasonReplaceCurrentCollector} placeholder={item.reasonReplaceCurrentCollector} ></textarea>
          </label>
        </div>
        <div className="all-block-edit">
          <label>
            <p>Dodatkowe informacje związane z czynnościami obsługowymi</p>
            <textarea value={maintenanceActivities} onChange={handleOnChangeMaintenanceActivities} placeholder={item.maintenanceActivities} ></textarea>
          </label>
        </div>
        <div className="all-block-edit ">
          <button onClick={handleOnChangeCleanInspection} className='return-item'>
            <Link to={`/display/${item._id}`}>Wróć</Link>
          </button>
          <button type='submit' className='return-item'>Aktualizuj</button>
        </div>
    </form>
  )}) : 'Error';

  return (
    <div className='inspections-display-page-edit'>
      <Modal text={text} openModal={openModal} setOpenModal={setOpenModal} />
      {renderEditInspection}
    </div>
  )
}

export default InspectionItemEdit;
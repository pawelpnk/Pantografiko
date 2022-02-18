import React, { useState, ChangeEvent, useEffect} from 'react';
import req from '../../helpers/request';
import './inspectionAddForm.css';

const InspectionAddForm = () => {
  const [locomotiveNumber, setLocomotiveNumber] = useState<string>('');
  const [collectorNumber, setCollectorNumber] = useState<number | string>(0);
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

  const handleOnChangeLocomotiveNumber = (event: ChangeEvent<HTMLInputElement>) => setLocomotiveNumber(event.target.value.toUpperCase());
  const handleOnChangeCollectorNumber = (event: ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value) {
    setCollectorNumber(+event.target.value);
    } else {
      setCollectorNumber(0);
    }
  };
  const handleOnChangeInspectionDate  = (event: ChangeEvent<HTMLInputElement>) => setInspectionDate(event.target.value);
  const handleOnChangeCollectorType = (event: ChangeEvent<HTMLSelectElement>) => setCollectorType(event.target.value);
  const handleOnChangeFrontOrRear = (event: ChangeEvent<HTMLSelectElement>) => setFrontOrRear(event.target.value);
  const handleOnChangeOverlayThickness1 = (event: ChangeEvent<HTMLInputElement>) =>      setOverlayThickness1(event.target.value);      
  const handleOnChangeOverlayThickness2 = (event: ChangeEvent<HTMLInputElement>) =>    
  setOverlayThickness2(event.target.value);
  const handleOnChangetimeOfLiftingTheCurrentCollector = (event: ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value) {
      setTimeOfLiftingTheCurrentCollector(+event.target.value);
      } else {
        setTimeOfLiftingTheCurrentCollector(0);
      }
  }; 
  const handleOnChangefallTimeOfTheCurrentCollector = (event: ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value) {
      setFallTimeOfTheCurrentCollector(+event.target.value);
      } else {
        setFallTimeOfTheCurrentCollector(0);
      }   
  };
  const handleOnChangeCorrectOperationOfTheCollectorFromTwoCabins = (event: ChangeEvent<HTMLSelectElement>) => setCorrectOperationOfTheCollectorFromTwoCabins(event.target.value);
  const handleOnChangeAverageStaticPressure = (event: ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value) {
      setAverageStaticPressure(+event.target.value);
      } else {
        setAverageStaticPressure(0);
      }   
  };
  const handleOnChangeForceDifferenceWhenLiftingAndLowering = (event: ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value) {
      setForceDifferenceWhenLiftingAndLowering(+event.target.value);
      } else {
        setForceDifferenceWhenLiftingAndLowering(0);
      }   
  }; 
  const handleOnChangeHoldingForceMeasurement = (event: ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value) {
      setHoldingForceMeasurement(+event.target.value);
      } else {
        setHoldingForceMeasurement(0);
      }   
  }; 
  const handleOnChangeCheckThedegreeOfWearOfTheContactInsertsOfTheSlider = (event: ChangeEvent<HTMLInputElement>) => setCheckThedegreeOfWearOfTheContactInsertsOfTheSlider(event.target.value);
  const handleOnChangeInsulationResistanceMeasurement = (event: ChangeEvent<HTMLInputElement>) => {
    if(+event.target.value) {
      setInsulationResistanceMeasurement(+event.target.value);
      } else {
        setInsulationResistanceMeasurement(0);
      }   
  }; 
  const handleOnChangeConditionOfFitness = (event: ChangeEvent<HTMLSelectElement>) => setConditionOfFitness(event.target.value);
  const handleOnChangeReasonReplaceSlidePlate = (event: ChangeEvent<HTMLSelectElement>) => setReasonReplaceSlidePlate(event.target.value);
  const handleOnChangeReasonReplaceCurrentCollector = (event: ChangeEvent<HTMLTextAreaElement>) => setReasonReplaceCurrentCollector(event.target.value);
  const handleOnChangeMaintenanceActivities = (event: ChangeEvent<HTMLTextAreaElement>) => setMaintenanceActivities(event.target.value);

  const resetInputs = () => {
    setLocomotiveNumber('');
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

  const validateInputs = () => {
    let validateVariable = true;
    setMessageValidation('');

    if(!locomotiveNumber) {
      setMessageValidation('Brak numeru lokomotywy');
      validateVariable = false;
      return validateVariable;
    }
    if(typeof collectorNumber !== 'number') {
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

  const handleOnSubmitInspection = async (e: React.FormEvent) => {
    e.preventDefault();

    if(validateInputs()) {

    await req.post('/pages/create', {
      locomotiveNumber,
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
    }).then(response => console.log(response));
    resetInputs();
    }
    
  }

  const checkMessageValidation = messageValidation.length > 0 ? <p className='validation-message-form-add'>{messageValidation}</p> : null;

  useEffect(()=> {
    resetInputs();
  },[])

  return (
    <div className='inspection-add-form'>
      <form method="post" className="inspection-form" onSubmit={handleOnSubmitInspection}>
        {checkMessageValidation}
        <div className="all-form-block">
          <label>
            <h4>Number lokomotywy</h4>
            <input onChange={handleOnChangeLocomotiveNumber} type="text" value={locomotiveNumber} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Numer odbieraka prądu</h4>
            <input onChange={handleOnChangeCollectorNumber} type="text" value={collectorNumber} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Data przeglądu</h4>
            <input onChange={handleOnChangeInspectionDate} type="text" value={inspectionDate} placeholder="dd-mm-rrrr" />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Typ Odbieraka: 1-DSA 150, 2-AKP-4E, 3-5ZL</h4>
            <select onChange={handleOnChangeCollectorType}  value={collectorType}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        </div>    
        <div className="all-form-block">
          <label>
            <h4>Przedni odbierak - 1, tylni odbierak - 2</h4>
            <select value={frontOrRear} onChange={handleOnChangeFrontOrRear}> 
              <option value="1">1</option>             
              <option value="2">2</option>             
            </select>
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Grubość nakładki 1</h4>
            <input onChange={handleOnChangeOverlayThickness1} type="text" value={overlayThickness1} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Grubość nakładki 2</h4>
            <input onChange={handleOnChangeOverlayThickness2} type="text" value={overlayThickness2} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Czas podnoszenia odbieraka prądu</h4>
            <input onChange={handleOnChangetimeOfLiftingTheCurrentCollector} type="text" value={timeOfLiftingTheCurrentCollector} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Czas opadania odbieraka prądu</h4>
            <input onChange={handleOnChangefallTimeOfTheCurrentCollector} type="text" value={fallTimeOfTheCurrentCollector} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Prawidłowość sterowania odbierakami z obu kabin</h4>
            <select value={correctOperationOfTheCollectorFromTwoCabins} onChange={handleOnChangeCorrectOperationOfTheCollectorFromTwoCabins}> 
              <option value="Brak danych">Brak danych</option>
              <option value="pozytywne">pozytywne</option>             
              <option value="negatywne">negatywne</option>             
            </select>
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Średni nacisk statyczny</h4>
            <input onChange={handleOnChangeAverageStaticPressure} type="text" value={averageStaticPressure} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Różnica sił przy podnoszeniu i opuszczaniu</h4>
            <input onChange={handleOnChangeForceDifferenceWhenLiftingAndLowering} type="text" value={forceDifferenceWhenLiftingAndLowering} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Pomiar siły utrzymującej</h4>
            <input onChange={handleOnChangeHoldingForceMeasurement} type="text" value={holdingForceMeasurement} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Sprawdzenie stopnia zużycia wkładek stykowych ślizgacza</h4>
            <input onChange={handleOnChangeCheckThedegreeOfWearOfTheContactInsertsOfTheSlider} type="text" value={checkThedegreeOfWearOfTheContactInsertsOfTheSlider} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Pomiar rezystancji izolacji</h4>
            <input onChange={handleOnChangeInsulationResistanceMeasurement} type="text" value={insulationResistanceMeasurement} />
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Stan zdatności</h4>
            <select value={conditionOfFitness} onChange={handleOnChangeConditionOfFitness}> 
              <option value="Brak danych">Brak danych</option>
              <option value="Stan zdatności">Stan zdatności</option>             
              <option value="Stan niepełnej zdatności">Stan niepełnej zdatności</option>             
              <option value="Stan niezdatności">Stan niezdatności</option>             
            </select>
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Przyczyna wymiany nakładki ślizgowej</h4>
            <select value={reasonReplaceSlidePlate} onChange={handleOnChangeReasonReplaceSlidePlate}>
              <option value="Nie wymieniono">Nie wymieniono</option> 
              <option value="Zużycie">Zużycie</option>             
              <option value="Uszkodzenie nakładki">Uszkodzenie nakładki</option>             
              <option value="Zmiana regulacji">Zmiana regulacji</option>             
              <option value="Uszkodzenie całego odbieraka">Uszkodzenie całego odbieraka</option>             
            </select>
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Przyczyna wymiany odbieraka prądu</h4>
            <textarea value={reasonReplaceCurrentCollector} onChange={handleOnChangeReasonReplaceCurrentCollector} ></textarea>
          </label>
        </div>
        <div className="all-form-block">
          <label>
            <h4>Dodatkowe informacje związane z czynnościami obsługowymi</h4>
            <textarea value={maintenanceActivities} onChange={handleOnChangeMaintenanceActivities} ></textarea>
          </label>
        </div>
        <div className="all-form-block btn-form-add">
          <button type='submit'>Wyślij</button>
        </div>
      </form>
    </div>
  )
}

export default InspectionAddForm;
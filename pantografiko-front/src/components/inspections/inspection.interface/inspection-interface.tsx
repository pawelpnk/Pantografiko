export interface InspectionInterface {
    _id: string;
    loginUserID: string;
    locomotiveNumber: string;
    collectorNumber: number;
    inspectionDate: string;
    collectorType: number;
    frontOrRear: number;
    overlayThickness1: string;
    overlayThickness2: string;
    inspectionOfNumber: number;
    timeOfLiftingTheCurrentCollector: number;
    fallTimeOfTheCurrentCollector: number;
    correctOperationOfTheCollectorFromTwoCabins: string;
    averageStaticPressure: number;
    forceDifferenceWhenLiftingAndLowering: number;
    holdingForceMeasurement: number;
    checkThedegreeOfWearOfTheContactInsertsOfTheSlider: string;
    insulationResistanceMeasurement: number;
    numberOfInspections: number;
    conditionOfFitness: string;
    reasonReplaceSlidePlate: string;
    reasonReplaceCurrentCollector: string;
    maintenanceActivities: string;
    
}
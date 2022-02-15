import * as mongoose from 'mongoose';

export const PagesSchema = new mongoose.Schema({
  loginUserID: String,
  locomotiveNumber: String,
  collectorNumber: Number,
  inspectionDate: String,
  collectorType: Number,
  frontOrRear: Number,
  overlayThickness1: String,
  overlayThickness2: String,
  inspectionOfNumber: Number,
  timeOfLiftingTheCurrentCollector: Number,
  fallTimeOfTheCurrentCollector: Number,
  correctOperationOfTheCollectorFromTwoCabins: String,
  averageStaticPressure: Number,
  forceDifferenceWhenLiftingAndLowering: Number,
  holdingForceMeasurement: Number,
  checkThedegreeOfWearOfTheContactInsertsOfTheSlider: String,
  insulationResistanceMeasurement: Number,
  numberOfInspections: Number,
  conditionOfFitness: String,
  reasonReplaceSlidePlate: String,
  reasonReplaceCurrentCollector: String,
  maintenanceActivities: String
})
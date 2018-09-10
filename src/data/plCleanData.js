import * as rawData from "./plRawData.json";

// ======= Drop attributes that you do not need ======= //
export const raw = rawData;
const dropUnusedAttributes = rawData.map(
  ({ a, campaignid, userid, frienddomainid, ...keepRest }) => keepRest
);

// ================= Date parsing ===================== //
const moment = require("moment");

// Create time(HH:mm) date(DD.MM.YYYY) attributes with required format
// manual test that parsing was successful
const dataWithTimeDate = dropUnusedAttributes.map(obj => {
  obj.time = moment(obj.date).format("HH:mm");
  obj.germanDate = moment(obj.date).format("DD.MM.YYYY");
  return obj;
});
// delete the previous ISO date attribute and rename the "germanDate" attribute to "date"
const dataWithTimeDateClean = dataWithTimeDate
  .map(({ date, ...keepRest }) => keepRest)
  .map(({ germanDate: date, ...keepRest }) => ({ date, ...keepRest }));

// ======= Convert boolean(freeclick) to string YES/NO ========== //
const mutateDataWithTimeDateClean = dataWithTimeDateClean.map(x => {
  x.freeclick = x.freeclick ? "true" : "false";
  return x;
});
// ======= Add primary key ========== //
const cleanDataWithRowId = dataWithTimeDateClean.map((obj, index) => {
  obj.key = index;
  return obj;
});

// ======= Export data after preprocess ========== //
export const plCleanData = cleanDataWithRowId;

// ========================================================= //
// ========================================================= //
// ========================================================= //
// ========================================================= //
// ======= BONUS: make everything with 1 function ========== //
export const cleanTheData = data => {
  const clean = data
    .map(({ a, campaignid, userid, frienddomainid, ...keepRest }) => keepRest)
    .map(obj => {
      obj.time = moment(obj.date).format("HH:mm");
      obj.germanDate = moment(obj.date).format("DD.MM.YYYY");
      return obj;
    })
    .map(({ date, ...keepRest }) => keepRest)
    .map(({ germanDate: date, ...keepRest }) => ({ date, ...keepRest }))
    .map((obj, index) => {
      obj.key = index;
      return obj;
    })
    .map(x => {
      x.freeclickString = x.freeclick ? "true" : "false";
      return x;
    })
    .map(({ freeclick, ...keepRest }) => keepRest)
    .map(({ freeclickString: freeclick, ...keepRest }) => ({
      freeclick,
      ...keepRest
    }))
    .map(x => {
      x.camp_cpc = `€ ${x.camp_cpc}`;
      return x;
    });

  return clean;
};

// ======= BONUS: Define PlistaProduct value range ========== //
// parse product numbers
const plistaProductNumbers = dataWithTimeDateClean.map(obj =>
  parseInt(obj.PlistaProduct.match(/\d+/)[0], 10)
);
// find max product number (10)
const maxProductNumber = Math.max(
  ...dataWithTimeDateClean.map(obj => obj.PlistaProduct.match(/\d+/)[0])
);
// Product Range to use 1-10

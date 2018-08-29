import * as rawData from "./fixtures/data.json";

// ======= Drop attributes that you do not need ======= //
// check other methods at the following link
// https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript

const dropUnusedAttributes = rawData.map(
  ({ a, campaignid, userid, frienddomainid, ...keepRest }) => keepRest
);

// ================= Date parsing ===================== //
const moment = require("moment");

// Create time(HH:mm) date(DD.MM.YYYY) attributes with required format
// manual test that parsing was successful
export const dataWithTimeDate = dropUnusedAttributes.map(obj => {
  obj.time = moment(obj.date).format("HH:mm");
  obj.germanDate = moment(obj.date).format("DD.MM.YYYY");
  return obj;
});

export const preprocessData = dataWithTime;

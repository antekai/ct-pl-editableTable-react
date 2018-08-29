import * as rawData from "./fixtures/data.json";

// Drop attributes that we do not need
// check other methods
// https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript

const dropUnusedAttributes = rawData.map(
  ({ a, campaignid, userid, frienddomainid, ...keepRest }) => keepRest
);

const moment = require("moment");

export const testMoment = moment()
  .startOf("day")
  .fromNow();

export const preprocessData = dropUnusedAttributes;

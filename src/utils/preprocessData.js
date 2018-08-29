import * as rawData from "./fixtures/data.json";

// Drop attributes that we do not need
// check other methods at the following link
// https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript

const dropUnusedAttributes = rawData.map(
  ({ a, campaignid, userid, frienddomainid, ...keepRest }) => keepRest
);

const moment = require("moment");

const isoDateTimeString = "2016-02-29T10:00:06";
export const testDateParsing = moment(isoDateTimeString).format("DD.MM.YYYY");
export const testTimeParsing = moment(isoDateTimeString).format("HH:mm");

export const preprocessData = dropUnusedAttributes;

import Parse from "parse";

const responses = Parse.Object.extend("survey_responses");

export default async function getSurveyResponses() {
    const Query = new Parse.Query(responses);
    Query.limit(100000);   
    const allResponses = await Query.find();

    return allResponses
}
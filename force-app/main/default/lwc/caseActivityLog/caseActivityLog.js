import { LightningElement, api, track } from "lwc";
import getCaseActivityLog from "@salesforce/apex/CaseHistoryController.getCaseActivityLog";
import { registerRefreshHandler } from "lightning/refresh";

export default class CaseActivityLog extends LightningElement {
  @api recordId; // Holds the current record Id dynamically
  @track activityLog; //List of Case activities
  refreshHandlerId; // in case there are many handlers

  // @wire(getCaseActivityLog, { caseId: "$recordId" })
  // wiredActivityLog({ data, error }) {
  //   if (data) {
  //     this.activityLog = data;
  //   } else if (error) {
  //     console.log("Error:", error);
  //   }
  // }

  connectedCallback() {
    this.refreshHandlerId = registerRefreshHandler(this, this.refreshHandler); //Handles record page refresh and refreshes lwc comp
    this.fetchCaseActivities();
  }
  //Must return a promise
  refreshHandler() {
    console.log("Change");
    return new Promise((resolve) => {
      this.fetchCaseActivities();
      resolve(true);
    }); // has to return a promise
  }
  async fetchCaseActivities() {
    try {
      const response = await getCaseActivityLog({ caseId: this.recordId });
      console.log(response);
      this.activityLog = response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// const FIELDS = [
//   "Case.CaseNumber",
//   "Case.SuppliedEmail",
//   "Case.ContactId",
//   "Case.Status",
//   "Case.OwnerId",
//   "Case.Priority"
// ];

// get isActivityLogDefined() {
//   return this.activityLog !== undefined;
// }

// @wire(getRecord, {
//   recordId: "$recordId",
//   fields: FIELDS
// })
// caseObjectData({ data, error }) {
//   if (data) {
//     this.caseData = data.fields;
//     console.log("data : ", data.fields);
//   } else if (error) {
//     console.error("Error:", error);
//   }
// }

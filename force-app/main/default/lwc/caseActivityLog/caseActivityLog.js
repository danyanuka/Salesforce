import { LightningElement, api, track } from "lwc";
import getCaseActivityLog from "@salesforce/apex/CaseHistoryController.getCaseActivityLog";
import { registerRefreshHandler } from "lightning/refresh";

export default class CaseActivityLog extends LightningElement {
  @api recordId; // Holds the current record Id (@api for var to be public)
  // @track caseData;
  @track activityLog;
  refreshHandlerId;

  // @wire(getCaseActivityLog, { caseId: "$recordId" })
  // wiredActivityLog({ data, error }) {
  //   if (data) {
  //     this.activityLog = data;
  //   } else if (error) {
  //     console.log("Error:", error);
  //   }
  // }

  connectedCallback() {
    this.refreshHandlerId = registerRefreshHandler(this, this.refreshHandler);
    this.fetchCaseActivities();
  }
  refreshHandler() {
    console.log("Change");
    return new Promise((resolve) => {
      this.fetchCaseActivities();
      resolve(true);
    });
  }
  fetchCaseActivities() {
    getCaseActivityLog({ caseId: this.recordId })
      .then((response) => {
        console.log(response);
        this.activityLog = response;
      })
      .catch((err) => {
        console.log(err);
      });
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

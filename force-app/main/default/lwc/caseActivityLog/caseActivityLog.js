import { LightningElement, wire, api, track } from "lwc";
// import { getRecord, recordUpdated } from "lightning/uiRecordApi";
import getCaseActivityLog from "@salesforce/apex/CaseHistoryController.getCaseActivityLog";
// import CASE_OBJ from "@salesforce/schema/Case"; // Represents the Case object

// const FIELDS = [
//   "Case.CaseNumber",
//   "Case.SuppliedEmail",
//   "Case.ContactId",
//   "Case.Status",
//   "Case.OwnerId",
//   "Case.Priority"
// ];

export default class CaseActivityLog extends LightningElement {
  @api recordId; // Holds the current record Id (@api for var to be public)
  // @track caseData;
  @track activityLog;

  @wire(getCaseActivityLog, { caseId: "$recordId" })
  wiredActivityLog({ data, error }) {
    if (data) {
      this.activityLog = data;
      console.log(this.activityLog);
    } else if (error) {
      console.log("Error:", error);
    }
  }

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
  connectedCallback() {
    console.log("Helloyaas");
  }
}

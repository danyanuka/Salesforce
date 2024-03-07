import { LightningElement, wire, api, track } from "lwc";
import { getRecord, recordUpdated } from "lightning/uiRecordApi";
// import CASE_OBJ from "@salesforce/schema/Case"; // Represents the Case object

const FIELDS = [
  "Case.CaseNumber",
  "Case.SuppliedEmail",
  "Case.ContactId",
  "Case.OwnerId",
  "Case.Priority",
  "Case.Subject",
  "Case.Description"
];

export default class CaseActivityLog extends LightningElement {
  @api recordId; // Holds the current record Id (@api for var to be public)
  // @track caseData;
  @track activityLog = [];

  @wire(getRecord, {
    recordId: "$recordId",
    fields: FIELDS
  })
  wiredRecordData({ data, error }) {
    if (data) {
      // this.caseData = data.fields;
      console.log("data : ", data);
    } else if (error) {
      console.error("Error:", error);
    }
  }

  connectedCallback() {
    // Register record updated event listener on component initialization, filtering for **Case object**
    recordUpdated.addEventListener("case", this.handleRecordUpdated);
  }

  disconnectedCallback() {
    // Remove event listener on component cleanup
    recordUpdated.removeEventListener("case", this.handleRecordUpdated);
  }
  handleRecordUpdated(event) {
    console.log(event);
    // const changedFields = event.detail.changedFields;
    // const newLogEntry = {
    //   timestamp: new Date(),
    //   changedBy: changedFields.OwnerId.displayValue,
    //   changes: Object.keys(changedFields).map((field) => ({
    //     field: field,
    //     from: changedFields[field].previousValue,
    //     to: changedFields[field].currentValue
    //   }))
    // };
    // this.activityLogs.push(newLogEntry);
  }
}

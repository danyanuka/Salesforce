import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import CaseNumber from "@salesforce/schema/Case.CaseNumber"; // Represents the Case object

export default class CaseActivityLog extends LightningElement {
  @api recordId;
  caseData; // Holds the current record Id (@api for var to be public)

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [CaseNumber]
  })
  caseObjectData({ data, error }) {
    if (data) {
      this.caseData = data.fields;
      console.log(data);
    } else {
      console.log(error);
    }
  }

  // handleCaseChange() {
  //   if (this.caseData.data) {
  //     // Logic to handle Case record data changes
  //     console.log("Case record data:", this.caseData.data);
  //   } else if (this.caseData.error) {
  //     // Handle error fetching Case record data
  //     console.error("Error fetching Case record data:", this.caseData.error);
  //   }
  // }
  // renderedCallback() {
  //   if (this.caseData.data) {
  //     console.log("Case record data:", this.caseData.data);
  //   } else if (this.caseData.error) {
  //     console.error("Error fetching Case record data:", this.caseData.error);
  //   }
  // }

  connectedCallback() {
    console.log("Helloyaas");
  }
}

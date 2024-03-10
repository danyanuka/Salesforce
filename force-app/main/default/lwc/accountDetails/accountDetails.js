import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

const FIELDS = ["Account.Phone", "Account.Type", "Account.Description"]; //Fiedls to retrieve from Account

export default class AccountRecordComponent extends LightningElement {
  @api recordId; // Current Account record Id passed from Lightning Record Page dynamically
  accountRecord;
  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  wiredAccountRecord({ error, data }) {
    if (data) {
      console.log("data:", data);
    } else if (error) {
      console.log(error);
    }
  }
}

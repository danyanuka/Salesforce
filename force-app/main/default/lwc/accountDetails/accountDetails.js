import { LightningElement, wire, api, track } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import TYPE_FIELD from "@salesforce/schema/Account.Type";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";

const FIELDS = ["Account.Phone", "Account.Type", "Account.Description"]; //Fiedls to retrieve from Account

export default class AccountRecordComponent extends LightningElement {
  @api recordId; // Current Account record Id passed from Lightning Record Page dynamically
  accountRecord;
  @track Phone = "";
  @track Type = "";
  @track Description = "";
  accountRecordTypeId;
  accTypeOptions;

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  wiredAccountRecord({ error, data }) {
    if (data) {
      this.accountRecord = data.fields;
    } else if (error) {
      console.log("Error :", error);
    }
  }

  //Getting recordTypeId to pass as parameter to the next wire decorator (getPickListValues)
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  wiredAccTypeOptions({ error, data }) {
    if (data) {
      this.accountRecordTypeId = data.defaultRecordTypeId;
    } else if (error) {
      console.log("Error :", error);
    }
  }
  //Getting the options of field Type of Account
  @wire(getPicklistValues, {
    recordTypeId: "$accountRecordTypeId",
    fieldApiName: TYPE_FIELD
  })
  picklistResults({ error, data }) {
    if (data) {
      this.accTypeOptions = data.values.map((option) => option.value);
      console.log(data.values.map((option) => option));
    } else if (error) {
      console.log("Error :", error);
      this.accTypeOptions = undefined;
    }
  }

  handleChange(ev) {
    console.log("change", ev.target.value);
  }

  connectedCallback() {}
}

import { LightningElement, api } from "lwc";

// import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_PHONE_FIELD from "@salesforce/schema/Account.Phone";
import ACCOUNT_TYPE_FIELD from "@salesforce/schema/Account.Type";
import ACCOUNT_DESCRIPTION_FIELD from "@salesforce/schema/Account.Description";

export default class AccountRecordComponent extends LightningElement {
  @api recordId; // Current Account record Id passed from Lightning Record Page dynamically
  @api objectApiName;
  //Fiedls to retrieve from Account
  phoneField = ACCOUNT_PHONE_FIELD;
  typeField = ACCOUNT_TYPE_FIELD;
  descriptionField = ACCOUNT_DESCRIPTION_FIELD;
  connectedCallback() {}

  //import { getRecord } from "lightning/uiRecordApi";
  //import TYPE_FIELD from "@salesforce/schema/Account.Type";

  // accountRecord;
  // @track Phone = "";
  // @track Type = "";
  // @track Description = "";
  // accountRecordTypeId;
  // accTypeOptions;
  // FIELDS = [ACCOUNT_PHONE_FIELD, ACCOUNT_TYPE_FIELD, ACCOUNT_DESCRIPTION_FIELD];
  // import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
  // Get Record account Fields
  // @wire(getRecord, { recordId: "$recordId", fields: this.FIELDS })
  // wiredAccountRecord({ error, data }) {
  //   if (data) {
  //     this.accountRecord = data.fields;
  //   } else if (error) {
  //     console.log("Error :", error);
  //   }
  // }

  //Getting recordTypeId to pass as parameter to the next wire decorator (getPickListValues)
  // @wire(getObjectInfo, { objectApiName: "$objectApiName" })
  // wiredAccTypeOptions({ error, data }) {
  //   if (data) {
  //     this.accountRecordTypeId = data.defaultRecordTypeId;
  //   } else if (error) {
  //     console.log("Error :", error);
  //   }
  // }
  // //Getting the options of field Type of Account
  // @wire(getPicklistValues, {
  //   recordTypeId: "$accountRecordTypeId",
  //   fieldApiName: TYPE_FIELD
  // })
  // picklistResults({ error, data }) {
  //   if (data) {
  //     this.accTypeOptions = data.values.map((option) => option.value);
  //   } else if (error) {
  //     console.log("Error :", error);
  //     this.accTypeOptions = undefined;
  //   }
  // }
}

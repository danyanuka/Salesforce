import { LightningElement, api, wire } from "lwc";
import getUnassociatedContact from "@salesforce/apex/ContactController.getUnassociatedContact";

//Account Related
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_PHONE_FIELD from "@salesforce/schema/Account.Phone";
import ACCOUNT_TYPE_FIELD from "@salesforce/schema/Account.Type";
import ACCOUNT_DESCRIPTION_FIELD from "@salesforce/schema/Account.Description";
//Contact Related
import CONTACT_OBJECT from "@salesforce/schema/Contact";

export default class AccountRecordComponent extends LightningElement {
  @api recordId; // Current Account record Id passed from Lightning Record Page dynamically
  // @api objectApiName;
  unassociatedContacts;

  accountApiName = ACCOUNT_OBJECT;
  contactApiName = CONTACT_OBJECT;
  //Expose fields of account
  phoneField = ACCOUNT_PHONE_FIELD;
  typeField = ACCOUNT_TYPE_FIELD;
  descriptionField = ACCOUNT_DESCRIPTION_FIELD;

  @wire(getUnassociatedContact)
  wiredUnassociatedContacts({ error, data }) {
    if (data) {
      console.log(data);
      this.unassociatedContacts = data;
    } else if (error) {
      console.log("Error: ", error);
    }
  }

  // @wire(getRecords, {
  //   objectApiName: CONTACT_OBJECT,
  //   fields: CONTACT_FIELDS,
  //   filter: { AccountId: null },
  //   sortBy: CONTACT_NAME_FIELD,
  //   pageSize: 10
  // })
  // wiredContacts({ error, data }) {
  //   if (data) {
  //     console.log(data);
  //   } else if (error) {
  //     console.log("Error :", error);
  //   }
  // }

  handleContactAssociation() {
    console.log("hey");
  }
  connectedCallback() {}

  //@wire(getRecord, {
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

  //import TYPE_FIELD from "@salesforce/schema/Account.Type";
  //import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
  // import CONTACT_EMAIL_FIELD from "@salesforce/schema/Contact.Email";
  // import CONTACT_MOBILEPHONE_FIELD from "@salesforce/schema/Contact.MobilePhone";

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

  // const CONTACT_FIELDS = [
  //   CONTACT_NAME_FIELD,
  //   CONTACT_EMAIL_FIELD,
  //   CONTACT_MOBILEPHONE_FIELD
  // ];
}

import { LightningElement, api, wire } from "lwc";
import getUnassociatedContact from "@salesforce/apex/ContactController.getUnassociatedContact";
import updateContactAccountId from "@salesforce/apex/ContactController.updateContactAccountId";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

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
  selectedContactId;

  //getter function for creating the Options of the radio button
  get options() {
    return this.unassociatedContacts.map((contact) => ({
      label: contact.Name,
      value: contact.Id
    }));
  }

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

  handleContactSelection(ev) {
    this.selectedContactId = ev.target.dataset.value;
    // Disable the option for multiple checks
    Array.from(this.template.querySelectorAll("lightning-input")).forEach(
      (element) => {
        element.checked = false;
      }
    );
    const checkbox = this.template.querySelector(
      'lightning-input[data-value="' + ev.target.dataset.value + '"]'
    );
    checkbox.checked = true;
  }

  async handleContactAssociation() {
    //listening to sucess event to trigger the Success Toast
    this.template
      .querySelector("lightning-record-edit-form")
      .addEventListener("success", this.showSuccessToast);
    // Check if a contact is selected/ if not, account will still be updated if fields changed
    if (this.selectedContactId) {
      try {
        //Custom apex method
        await updateContactAccountId({
          contactId: this.selectedContactId,
          accountId: this.recordId
        });

        this.selectedContactId = null;
      } catch (error) {
        console.error("Error associating contact:", error);
      }
    } else {
      console.log("No contact selected.");
    }
  }

  showSuccessToast() {
    const event = new ShowToastEvent({
      title: "Success",
      message: "Account updated succsefully!",
      variant: "success"
    });
    this.dispatchEvent(event);
    //Remove listener
    // this.template
    //   .querySelector("lightning-record-edit-form")
    //   .removeEventListener("success", this.showSuccessToast);
  }
}

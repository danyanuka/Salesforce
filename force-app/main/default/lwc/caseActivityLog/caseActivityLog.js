import { LightningElement, api, track } from "lwc";
import getCaseActivityLog from "@salesforce/apex/CaseHistoryController.getCaseActivityLog";
import { registerRefreshHandler } from "lightning/refresh";

export default class CaseActivityLog extends LightningElement {
  @api recordId; // Holds the current record Id dynamically
  @track activityLog; //List of Case activities
  refreshHandlerId; // in case there are many handlers

  connectedCallback() {
    this.refreshHandlerId = registerRefreshHandler(this, this.refreshHandler); //Identifies record page refresh and triggers LWC componenet refresh, takes context and a funtion as params
    this.fetchCaseActivities();
  }

  //Must return a promise
  refreshHandler() {
    console.log("Change");
    return new Promise((resolve) => {
      this.fetchCaseActivities();
      resolve(true);
    });
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

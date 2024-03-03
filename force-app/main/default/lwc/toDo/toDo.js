import { LightningElement } from "lwc";

export default class ToDo extends LightningElement {
  // Life Cycle Hook
  connectedCallback() {
    console.log("Hello LWC");
  }
}

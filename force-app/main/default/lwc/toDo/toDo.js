import { LightningElement, wire, track } from "lwc";
import getToDos from "@salesforce/apex/ToDoController.getToDos";
import createToDo from "@salesforce/apex/ToDoController.createToDo";
import deleteToDo from "@salesforce/apex/ToDoController.deleteToDo";

export default class ToDo extends LightningElement {
  @track description = "";
  @track dueDate = "";

  @track toDos; //Declare class prop , (Wil holds all the To-Dos from DB)
  @wire(getToDos) //Fetches a response obj and passes down to wiredToDos
  wiredToDos({ error, data }) {
    if (data) {
      console.log("data :", data);
      this.toDos = data;
    } else if (error) {
      console.log(error);
    }
  }

  handleInputChange(event) {
    // Get the name of the input field and the new value
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    // Update the component's state based on the input field
    this[fieldName] = fieldValue;
    console.log(this.description, this.dueDate);
  }

  handleCreateToDo(ev) {
    ev.preventDefault();
    createToDo({
      description: this.description,
      dueDate: this.dueDate
    })
      .then((result) => {
        this.template.querySelector("form").reset(); //Clear Fields
        this.toDos = [...this.toDos, result]; //Update UI (Result holds the newly created instance returned from Apex)
        console.log("ToDo created successfully:", result);
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating ToDo:", error);
      });
  }

  handleDeleteToDo(ev) {
    let todoId = ev.target.dataset.id;
    deleteToDo({ todoId: todoId })
      .then((result) => {
        this.toDos = this.toDos.filter((toDo) => toDo.Id !== todoId); //Update UI
        console.log("ToDo removed successfully:", result);
      })
      .catch((error) => {
        console.log("Error removing toDo:", error);
      });
  }

  // When component mounts
  connectedCallback() {
    console.log("Hello LWC");
  }
}

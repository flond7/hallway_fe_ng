# Common
## Delete modal

To be reusable the modal works with a boolean variable confirm = false If the user conferms the value is changed to true and goes back to the parent component the parent checks the value and proceeds deleting the element.
This way you can use the modal with multiple components without having to specify anything because the actual element to delete is never passed here

<app-delete-modal [message]="string" ></app-delete-modal>
[message] = the message to be displayed on the modal

The modal is invoked through the modal service

openDeleteModal(message: string) {}



# PEG

## Peg goal
Row to create or edit a single goal. 
It doesn't handle office, year, manager. These values have to be handled in the page where the component is included

<app-peg-goal *ngFor="let goal of goalList; index as i" [inputGoal]="goal" [typeInput]="'extraordinary'" (goalUpdated)="updateExtraGoal($event, i)" (sliceElement)="deleteGoal($event, i)"></app-peg-goal>
[inputGoal] = the goal the row has to display (if it's used in an edit page) or that has to creat (if it is used in an add new page)
[typeInput] = 'ordinary' or 'extraordinary'. Is used to add the type of the goal dinamically reusing the same component. Ideally if you need a thir type of goal (eg: pluriannual) you can go inside the component, add a plury var for every ord or extra var there is already and you're ready to go
(goalUpdated) = output value that is emitted every time the user blurs out from an input
(sliceElement) = output value, the element that has to be sliced from the local goal list and put inside a deleteArray to be sent to the be to be deleted

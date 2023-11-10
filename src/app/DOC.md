# Common
## Delete modal

To be reusable the modal works with a boolean variable that starts as confirm = false
If the user conferms the value is changed to true and goes back to the parent component the parent checks the value and proceeds deleting the element.
This way you can use the modal with multiple components without having to specify anything because the actual element to delete is never passed here.

<app-delete-modal [message]="string" (confirmOutput)="boolean"></app-delete-modal>

[message] = the message to be displayed on the modal
[confirmOutput] = the return value of the user choice

The modal is invoked through the modal service
openDeleteModal(message: string) {}
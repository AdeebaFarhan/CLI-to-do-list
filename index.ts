#!/usr/bin/env node

import inquirer from "inquirer";

async function main() {
  let todo: string[] = [];
  let condition = true;

  while (condition) {
    const action = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "Which action do you want to perform?",
        choices: ["add", "edit", "delete", "exit"],
      },
    ]);

    if (action.action === "add") {
      const addTask = await inquirer.prompt([
        {
          name: "todo",
          type: "input",
          message: "What task do you want to add to your To-Do list?",
        },
        {
          name: "addMore",
          type: "confirm",
          message: "Do you want to continue adding more tasks?",
          default: false,
        },
      ]);
      todo.push(addTask.todo);
      condition = addTask.addMore;
    } else if (action.action === "edit") {
      const { taskIndex } = await inquirer.prompt([
        {
          name: "taskIndex",
          type: "list",
          message: "Select the task you want to edit:",
          choices: todo,
        },
      ]);
      
      const { newTask } = await inquirer.prompt([
        {
          name: "newTask",
          type: "input",
          message: "Enter the new task:",
        },
      ]);
      
      const index = todo.indexOf(taskIndex); // Find the index of the selected task
      if (index !== -1) {
        todo[index] = newTask; // Update the task at the found index
      } else {
        console.log("Invalid task index.");
      }
    } else if (action.action === "delete") {
      const { task } = await inquirer.prompt([
        {
          name: "task",
          type: "list",
          message: "Select the task you want to delete:",
          choices: todo,
        },
      ]);
      const index = todo.indexOf(task); // Find the index of the selected task
      if (index !== -1) {
        todo.splice(index, 1); // Remove the task at the found index
      } else {
        console.log("Invalid task index.");
      }
    } else if (action.action === "exit") {
      condition = false; // Exit the loop and end the program
    }
    
    console.log("Current To-Do List:");
    console.log(todo.join("\n")); 
  }

  console.log("Goodbye!"); // Message displayed upon exiting the loop
}

main();

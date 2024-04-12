//#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.red.underline.bold("\n\tWELCOME TO\'CODE WITH SNAZ'\-CLI PROJECT(TO DO LIST 2)\n"))
let todo_list: string[] = [];
let condition = true;

let main = async () => {
  while (condition) {
    let options = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.green.italic("Select an option you want to do: \n"),
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo-List",
          "Exit",
        ],
      },
    ]);
    if (options.choice === "Add Task") {
      await add_task();
    } else if (options.choice === "Delete Task") {
      await delete_task();
    } else if (options.choice === "Update Task") {
      await update_task();
    } else if (options.choice === "View Todo-List") {
      view_task();
    } else if (options.choice === "Exit") {
      condition = false;
    }
  }
};

//! function to " add " a task in the Todo-list

let add_task = async () => {
  let new_task = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.green.italic("Enter your new task:"),
    },
  ]);
  todo_list.push(new_task.task);
  console.log(`\n${new_task.task}, task added successfully in Todo-List! \n`);
};

//* function to " view " all todo-list tasks

let view_task = () => {
  console.log("\nYour Todo-List: \n");
  todo_list.forEach((task, index) => {
    console.log(`${index + 1}: ${task}\n`);
  });
};

//! function to " delete " a task from list

let delete_task = async () => {
  view_task();
  let task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green.italic(
        "Enter the 'index No.' of the task you want to delete:"
      ),
    },
  ]);
  let deleted_task = todo_list.splice(task_index.index - 1, 1);
  console.log(`\n${deleted_task}, this task has been deleted successfully from your Todo-List! \n`);
};

//* function to "update" a task

let update_task = async () => {
  view_task();
  let updated_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green.italic(
        "Enter the 'index No.' of the task you want to update:"
      ),
    },
    {
      name: "new_task",
      type: "input",
      message: chalk.green.italic("Now Enter your new task name:"),
    },
  ]);
  todo_list[updated_task_index.index - 1] = updated_task_index.new_task;
  console.log(
    `\nTask at index no ${
      updated_task_index.index - 1
    } updated successfully (for updated list check option: "View Todo-List")`
  );
};

main();
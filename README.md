# Task Management API

This is a **Task Management API** built with **Node.js**, **Express**, and **MongoDB**. The API allows users to create, read, update, delete, and manage tasks with features like task completion, categorization, and due dates.

## Features

- **Create Tasks**: Add a new task with a title and description.
- **View All Tasks**: Retrieve a list of all tasks.
- **Update Tasks**: Edit the details of a task.
- **Mark Tasks as Completed**: Mark a task as completed.
- **Delete Tasks**: Remove a task from the list.
- **Validation**: Ensures that task titles are not empty and that tasks cannot be marked as complete more than once.
- **Error Handling**: Provides meaningful error messages for invalid requests.
- **Optional**: Support for task categorization and due dates.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing tasks.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Jest & Supertest**: Testing framework and library for HTTP assertions.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api

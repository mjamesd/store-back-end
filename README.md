# E-Commerce Store Back End
![status: stable, version 1.0](https://img.shields.io/badge/stable-version%201.0-green)

![License: GNU General Publice License v3.0](https://img.shields.io/badge/license-GNU%20General%20Publice%20License%20v3.0-yellowgreen)

## Description
This app is the back end for an e-commerce site written in Express.js and Node.js. It utilizes asyncronous JavaScript functions and a MySQL database to perform CRUD (Create, Read, Update, and Delete) operations on each asset type: Products, Categories, and Tags. Users can create new assets and associate them with each other. For example, the Product "Plain White T-shirt" is associated with the Category "Shirts" and the Tag "white". The database login information is protected by using environmental variables. The app uses the `MySQL2`, `Express`, `dotenv`, and `Sequelize` Node.js packages.

## User Story
```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Table of Contents
1. [Description & User Stories](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Demonstration](#demonstration)
5. [License](#license)
6. [Questions](#questions)

## Installation

To start using the store's back end, first clone the repo to your server. Then run `npm i` to install all the dependent packages.

Next, rename the file ".env EDIT THIS FILE" to ".env". Open it and add your database user's name after "DB_USER=" and its password after "DB_PW=". Do not include quotes. Save and close the file.

The demonstration video shows how to create the schema by logging into MySQL from the command line and running the command `source ./db/schema.sql`. This will create the database. Exit the MySQL command line utility.

Next, the demonstration video shows how to seed the database with information. From the command line, run `npm run seed`. When you view your database now, it should be full of data.

## Usage

After creating and seeding the database, install dependencies and start the Express.js server by running this command from the command line:

```
npm run start
```

There are no HTTP endpoints for the app; it is strictly an API backend. Therefore, you will need to use an API client such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/). I created a collection of API requests in Insomnia and exported them. You can find them in the repo as "storeBackEnd_Insomnia_collection.json". Import this collection into Insomnia and then you can interact with the app. If you are running your own build of the app, you may have to change the "host" variable in the Insomnia environment.

## Demonstration

Please view the demonstration video to see the app's functionality via the Insomnia app: [Demonstration Video](https://drive.google.com/file/d/1QUTq7Kzz1MkckYk1s1RXqUa_nyfnF5yZ/view)

## License

This work is licensed under GNU General Publice License v3.0.

## Questions

Visit [my GitHub profile](https://github.com/mjamesd).

To reach me with additional questions, send me an [email](mailto:mjamesd@gmail.com).
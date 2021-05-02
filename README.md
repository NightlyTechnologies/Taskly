<br />

<p align="center">
  <img alt="Logo" src="./.github/logo.png" width="150px" />
</p>

<h1 align="center" style="text-align: center;">Taskly</h1>

<p align="center">
	<a href="https://github.com/NightlyTechnologies">
		<img alt="Author" src="https://img.shields.io/badge/author-Nightly%20Technologies-ED3F47?style=flat" />
	</a>
	<a href="#">
		<img alt="Languages" src="https://img.shields.io/github/languages/count/NightlyTechnologies/Taskly?color=ED3F47&style=flat" />
	</a>
	<a href="hhttps://github.com/NightlyTechnologies/Taskly/stargazers">
		<img alt="Stars" src="https://img.shields.io/github/stars/NightlyTechnologies/Taskly?color=ED3F47&style=flat" />
	</a>
	<a href="https://github.com/NightlyTechnologies/Taskly/network/members">
		<img alt="Forks" src="https://img.shields.io/github/forks/NightlyTechnologies/Taskly?color=ED3F47&style=flat" />
	</a>
	<a href="https://github.com/NightlyTechnologies/Taskly/graphs/contributors">
		<img alt="Contributors" src="https://img.shields.io/github/contributors/NightlyTechnologies/Taskly?color=ED3F47&style=flat" />
	</a>
</p>

<p align="center">
	<b>Create tasks for you and your team!</b><br />
	<span>Created with Node.js and React Native, all with Typescript.</span><br />
	<sub>Made with ❤️</sub>
</p>

<br />

<p align="center">
  <img alt="Banner" src="./.github/banner.png" />
  <img alt="Activities list" src="./.github/activities1.png" width="260px" />
  <img alt="City list" src="./.github/cities1.png" width="260px" />
  <img alt="Profile" src="./.github/profile.png" width="260px" />
  <img alt="Activities details" src="./.github/activities2.png" width="260px" />
  <img alt="City details" src="./.github/cities2.png" width="260px" />
  <img alt="Login" src="./.github/login.png" width="260px" />
</p>

<br />

# :pushpin: Contents

- [Features](#rocket-features)
- [Installation](#wrench-installation)
- [Getting started](#bulb-getting-started)
- [Techs](#fire-techs)
- [Issues](#bug-issues)
- [License](#book-license)

# :rocket: Features

- Create activities for you and your teammates
- Update and delete activities
- Create sub-activities for main activities
- Update and delete sub-activities
- See all activities and activities associated with you
- See activity details like responsibles, requester, descriptions and sub-activities
- Make progress with your activities
- See all available cities
- See city details
- Update city
- Update profile
- See teammates profiles

# :wrench: Installation

### Required :warning:
- Yarn
- Node.js
- Postgres database
- Docker and Docker Compose

### SSH

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have an SSH key registered in your GitHub account, clone the project using this command:

```git@github.com:NightlyTechnologies/Taskly.git```

### HTTPS

In case you don't have an SSH key on your GitHub account, you can clone the project using the HTTPS URL, run this command:

```https://github.com/NightlyTechnologies/Taskly.git```

**Both of this commands will generates a folder called Taskly, with all the project**

# :bulb: Getting started

### Server

1. Open the **server** folder an run ```yarn``` to install the dependencies;
2. Rename the ```.env.example``` to ```.env``` and set a secret to your app;
3. Rename the ```ormconfig.example.json``` to ```ormconfig.json``` and add your postgres **port**, **user** and **password** in the archive;
4. Run docker containers using ```docker-compose up -d```;
6. Create a database named ```taskly``` on your postgres;
7. Run ```yarn typeorm migration:run``` to run the migrations to your database;
8. If all goes well, the development server will be running on port 3333.
11. **Extra:** if you want to see node logs, you can do it through ```docker logs -f taskly_server```; 
12. **Extra:** if you want to access postgres from cli, run the command ```docker exec -it taskly_postgres psql -d taskly -U user_name -w```; 


### Mobile

1. Open the **mobile** folder and run ```yarn``` to install the dependencies;
2. In ```src/services/api.ts``` change the baseURL for your IPv4 address: ```baseURL: 'http://YOUR-IPV4-ADDRESS:3333'```;
> Example: ```baseURL: 'http://192.168.1.11:3333'```
3. Download the Expo Go app (available for IOS or Android) on your smartphone;
5. Run ```yarn start``` to open the metro-bundler and get access to the server app on Expo Go.

# :fire: Techs

### Typescript (language)

### Node.js (server)
- Express
- CORS
- TypeORM

### React Native (mobile)
- Expo
- Axios
- Styled Components
- React Navigation
- Date FNS

# :bug: Issues

Find a bug or error on the project? Please, feel free to send us the issue on the [Taskly issues area](https://github.com/NightlyTechnologies/Taskly/issues), with a title and a description of your found!

If you know the origin of the error and know how to resolve it, please, send us a pull request, we will love to review it!

# :book: License

Released in 2020.

This project is under the [ license](https://github.com/LuizFerK/GoBarber/blob/master/LICENSE).

<p align="center">
	< keep coding /> :rocket: :heart:
</p>
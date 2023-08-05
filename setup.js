const inquirer = require("inquirer");
const { execSync } = require("child_process");
const fs = require("fs");

//  install tailwind or sass/scss based on the user's choice
inquirer
	.prompt([
		{
			type: "confirm",
			name: "useTailwind",
			message: "Do you want to use tailwindcss?",
			default: true,
		},
		{
			type: "confirm",
			name: "useSass",
			message: "Do you want to use sass/scss for styling?",
			default: true,
		},
		{
			type: "confirm",
			name: "createComponents",
			message: "Do you want to create a component folder?",
			default: true,
		},
		{
			type: "confirm",
			name: "createStyles",
			message: "Do you want to create a style folder?",
			default: true,
		},
		{
			type: "confirm",
			name: "createUtils",
			message: "Do you want to create an utility folder?",
			default: true,
		},
		{
			type: "confirm",
			name: "createAssets",
			message: "Do you want to create an asset folder?",
			default: true,
		},
		{
			type: "confirm",
			name: "createPages",
			message: "Do you want to a page folder?",
			default: true,
		},
	])
	.then((answers) => {
		const additionalDependencies = [];
		const additionalDevDependencies = [];

		// file creation logic
		if (answers.createComponents) {
			// create components folder if it doesn't exist
			if (!fs.existsSync("./components")) {
				fs.mkdirSync("./components");
				fs.mkdieSync("./components/Navbar");
				fs.mkdieSync("./components/Hero");
				fs.mkdieSync("./components/footer");
			}

			//create sample component jsx files
			fs.writeFileSync(
				"./src/components/Navbar/Navbar.jsx",
				"import React from 'react';\n\nconst Navbar = function(){\n return <section>Navbar</section>; \n} \n\nexport default Navbar;\n"
			);
			fs.writeFileSync(
				"./src/components/Hero/Hero.jsx",
				"import React from 'react';\n\nconst Hero = function(){\n return <section>Hero</section>; \n} \n\nexport default Hero;"
			);
			fs.writeFileSync(
				"./src/components/Footer/Footer.jsx",
				"import React from 'react';\n\nconst Footer = function(){\n return <footer>Footer</footer>; \n} \n\nexport default Footer;"
			);
		}

		if (answers.createAssets) {
			// create assets folder if it doesn't exist
			if (!fs.existsSync("./assets")) {
				fs.mkdirSync("./assets");
				fs.mkdirSync("./assets/images");
				fs.mkdirSync("./assets/fonts");
				fs.mkdirSync("./assets/icons");
			}
		}

		if (answers.createStyles) {
			// Create a styles directory if it doesn't exist
			if (!fs.existsSync("./src/styles")) {
				fs.mkdirSync("./src/styles");
			}

			// Create sample stylesheet
			// fs.writeFileSync(
			// 	"./src/styles/main.scss",
			// 	'body {\n  font-family: "Arial", sans-serif;\n}\n'
			// );
		}

		if (answers.createUtils) {
			// create utils folder if it doesn't exist
			if (!fs.existsSync("./utils")) {
				fs.mkdirSync("./utils");
			}
		}

		if (answers.createPages) {
			// Create a 'pages' directory if it doesn't exist
			if (!fs.existsSync("./src/pages")) {
				fs.mkdirSync("./src/pages");
			}
		}

		// install teailwind/sass conditionally
		if (answers.useTailwind) {
			additionalDependencies.push("tailwindcss");
			// additionalDevDependencies.push("autoprefixer");
			// additionalDevDependencies.push("postcss");
		}

		if (answers.useSass) {
			additionalDependencies.push("node-sass");
			// additionalDependencies.push("sass");
		}

		// Install additional dependencies and devDependencies
		if (additionalDependencies.length > 0) {
			execSync(`npm install ${additionalDependencies.join(" ")}`, {
				stdio: "inherit",
			});
		}

		if (additionalDevDependencies.length > 0) {
			execSync(
				`npm install ${additionalDevDependencies.join(" ")} --save-dev`,
				{ stdio: "inherit" }
			);
		}

		console.log("Setup completed! Now you can start your React project.");
	})
	.catch((error) => {
		console.error("Error occured during setup", error);
	});

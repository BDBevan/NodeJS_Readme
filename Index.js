const inquirer = require('inquirer');
const fs = require('fs');

// Array of questions for user input2
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "What is the title of your project?",
    },
    {
        type: 'input',
        name: 'description',
        message: "Provide a short description explaining the what, why, and how of your project.",
    },
    {
        type: 'input',
        name: 'installation',
        message: "What are the steps required to install your project?",
    },
    {
        type: 'input',
        name: 'usage',
        message: "Provide instructions and examples for use. Include screenshots if needed.",
    },
    {
        type: 'list',
        name: 'license',
        message: "Choose a license for your project:",
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None'],
    },
    {
        type: 'input',
        name: 'contributing',
        message: "Provide guidelines for contributing to your project.",
    },
    {
        type: 'input',
        name: 'tests',
        message: "Provide instructions for running tests.",
    },
    {
        type: 'input',
        name: 'github',
        message: "What is your GitHub username?",
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your email address?",
    }
];

// Function to generate the README content
function generateReadme(answers) {
    const licenseBadge = answers.license !== 'None'
        ? `![License](https://img.shields.io/badge/license-${answers.license.replace(' ', '%20')}-blue.svg)`
        : '';

    return `# ${answers.title}

${licenseBadge}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description

${answers.description}

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This project is licensed under the ${answers.license} license.

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

If you have any questions, please contact me:

- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: [${answers.email}](mailto:${answers.email})
`;
}

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("Successfully wrote to", fileName);
        }
    });
}

// Function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            const content = generateReadme(answers);
            writeToFile('README.md', content);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

// Function call to initialize app
init();

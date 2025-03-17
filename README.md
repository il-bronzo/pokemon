# Bolttedex

Bolttedex is a web application built with React.js that allows users to explore and learn about various Pokémon. The application fetches data from the [PokeAPI](https://pokeapi.co/) and provides an infinite scroll list of Pokémon, along with detailed information about each Pokémon in a modal.

![Bolttedex Screenshot](.public/bolttedex.png) 

## Features
- **Infinite Scroll List**: Displays a list of Pokémon with their front image, name, and types. The list loads more Pokémon as you scroll down.
- **Pokémon Details Modal**: Clicking on a Pokémon card opens a modal with detailed information, including:
  - Front and back images
  - Name
  - Types
  - Region
  - Weaknesses
- **Error Handling**: Displays an error message if the API request fails.

## Getting Started
### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)


## Installation
Follow these steps to run the project locally:
1. Clone the repository:
  git clone https://github.com/il-bronzo/pokemon

2. Navigate to he project directory:
cd pokemon

3. Install dependencies:
npm install

4. Start the application:
npm run dev

4. Open your browser and go to http://localhost:5173


## Tests 
The application includes Cypress end-to-end tests that cover the following scenarios:
- Loading the Pokémon list: verifies that the list of Pokémon is loaded correctly.
- Infinite scroll: verifies that more Pokémon are loaded as the user scrolls down.
- Opening and closing the Pokémon details modal: verifies that the modal opens and closes correctly.
- Displaying Pokémon details: verifies that the Pokémon details (name, types, region, weaknesses) are displayed correctly.
- Error handling: verifies that the application handles API errors.

### Running Tests
1.	Start the development server (if not already running):
npm run dev

2.	Run Cypress tests:
npm run test

3.	Select the test file spec.cy.js from the Cypress test runner.

## Usage
- Pokémon List: Scroll down to load more Pokémon.
- Pokémon Details: Click on a Pokémon to open a modal with its details.

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Cypress**: End-to-end testing framework for testing the application's functionality.
- **PokeAPI**: Public API for fetching Pokémon data.

## Contributing
If you'd like to contribute to the project, follow these steps:
1.	Fork the repository.
2.	Create a new branch (git checkout -b feature/new-feature).
3.	Commit your changes (git commit -m 'Add a new feature').
4.	Push the branch (git push origin feature/new-feature).
5.	Open a Pull Request.

## About Me

Hi there! 👋 I'm **Andrea Bronzoni**, a recently graduated Full Stack Web Developer from a coding bootcamp. I'm passionate about programming because it's a field full of variety, where you can achieve the same result in many different ways, and it allows you to express your unique style.

### Why This Project?
This Pokémon Explorer project is a technical challenge I completed as part of a job application. It was a great opportunity to showcase my skills in React.js, API integration, and testing with Cypress. Moreover, who doesn't love Pokémon? 😄

### My Skills
- **Frontend Development**: React.js, JavaScript, HTML, CSS
- **Backend Development**: Node.js, Express.js, MongoDB
- **Testing**: Cypress, Jasmine
- **Tools**: Git, Vite, npm

### Hobbies
When I'm not coding, I love:
- **Traveling**: Exploring new places and cultures.
- **Gaming**: Playing video games (Pokémon included, of course!).
- **Languages**: Learning new languages and understanding how they work.
- **Math**: Solving problems and exploring its beauty.

### Let's Connect!
Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/andreabronzoni-webdev) or check out my other projects on [GitHub](https://github.com/il-bronzo). I'm always open to feedback, collaboration, or just a chat about coding, gaming, or traveling!

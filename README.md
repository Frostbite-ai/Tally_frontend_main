# Keyboard Kombat - byte crusaders - Tally Codebrewers 2023

Welcome to our Keyboard Kombat App, a project developed for the Tally Codebrewers 2023 hackathon. This application is inspired by Monkeytype, with a similar UI and functionality, but with the added feature of multiplayer mode. 

## Features

- **Solo Mode**: Practice your typing skills alone and track your progress.
- **Multiplayer Mode**: Compete against other players in real-time.
- **Leaderboard**: See how you stack up against other solo record holders.
- **Login with Gmail**: Keep track of your progress and compete with friends.
- **Customizable Themes**: Choose a theme that suits your style.
- **Typing Modes**: Choose from various typing modes similar to Monkeytype.

## Tech Stack

- Next.js / React.js
- Tailwind CSS
- TypeScript
- PostgreSQL

This project was bootstrapped with [this template](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter).

## Screenshots

![Desktop Screenshot 1](https://i.ibb.co/VJ85xNr/image.png)

<details>
  <summary>Click to expand!</summary>
  
  ![Desktop Screenshot 2](https://i.ibb.co/VJ85xNr/image.png)
</details>

## Setup

We recommend using Yarn for setting up this project locally. Follow these steps:

1. Clone the repository
```bash
git clone https://github.com/Frostbite-ai/Tally_frontend_main.git
```
2. Install the dependencies
```bash
cd Tally_frontend_main
yarn install
```
3. Create a `.env` file in the root directory and set the following environment variables:

```bash
NEXTAUTH_URL = # The base URL of your site (e.g., 'http://localhost:3000' for local development)
NEXTAUTH_SECRET = # A secret used to encrypt session data on the server (use a long random string)
NEXT_PUBLIC_API_URL = # The URL of your API server (if different from your Next.js site)
DATABASE_URL = # The connection string of your PostgreSQL database
NEXT_PUBLIC_SOCKET_URL = # The URL of your socket server for real-time updates in multiplayer mode
GOOGLE_CLIENT_SECRET = # The client secret of your Google OAuth application for Gmail login
GOOGLE_CLIENT_ID = # The client ID of your Google OAuth application for Gmail login
```

Please replace the comments after `=` with your actual values. For example, if your base URL is 'http://localhost:3000', you would write `NEXTAUTH_URL = 'http://localhost:3000'`.

4. Start the development server
```bash
yarn dev
```

## Team Members

- [Aryan Nayar](https://github.com/ArNGiHhttp:// "Aryan Nayar")
- [Vaibhav Meena](https://github.com/Frostbite-ai/ "Vaibhav Meena")
- [Vibhav Goel](https://github.com/vibhavgpt "Vibhav Goel")

## Hackathon Problem Statement

The problem statement for this hackathon was to create a Speed Typing game application where players can practice and compete against each other. The detailed problem statement can be found [here](https://mirror1.tallysolutions.com/Downloads/Forms/eDM/2023/JAS/TCB/CommanderOfFullStack.pdf).

## Note

This project is a part of a hackathon and is developed under time constraints. Therefore, not all features mentioned in the problem statement are implemented. The main focus was to create a functional and user-friendly application that provides a platform for users to improve their typing skills and compete with others.

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contact

If you have any questions, feel free to reach out to us. You can also raise an issue for any bugs you find or improvements you think can be made.

Happy Typing!
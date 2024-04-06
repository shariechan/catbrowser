

# Cat Browser Assignment

This is a simple item listing application using Vite.

## Table of Contents

- [Installation](#installation)
- [Features](#features)


## Installation

1. Clone this repository and go to the root folder.
2.  Run `npm install`.
3. Copy the `.env.example` as `.env` and replace the value of `VITE_API_KEY`. (Sign up [here](https://thecatapi.com/)).
4. Run `npm run build` to generate dist files.
5. Run `npm run preview` to see the preview of build in your localhost.

### Development
If you want to update the code base, run `npm run dev` to start the app and have it listen to your modifications.

Note: It is running in strict mode so you will be observing repeated api calls and rendering in dev mode.

## Features

### Preview
![CatBrowser Screenshot](public/CatBrowserScreenshot.png)

### Homepage
- Loads the Cat breed dropdown and Cat image list
### Product Detail Page
* Loads the Cat image details with breed information

####  Used Libraries


- react-router-dom  (v6)
- react-bootstrap 
- fetch API
- Context API (for state management)  
- emotion
- typescript
- eslint (Vite default)



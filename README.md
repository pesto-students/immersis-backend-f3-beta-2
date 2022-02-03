# README

# **Immersis**

## **Table of Contents**

1.  [About The Project](#about-the-project)

2.  [Getting Started](#getting-started)

    1.  [Prerequisites](#Prerequisites)

    2.  [Installation](#installation)

3.  [Tech Stack](#tech-stack)

4.  [Tools](#tools)

5.  [Resources](#resources)

6.  [Developers](#developers)

7.  [UI Screens](#ui-screens)

## **About The Project**

Immersis is a one stop platform for all the audiophiles out there, where you can find your music, videos and lyrics; all in one place. It provides rich user experience, hassle free music searching, music in all forms, ease of access.

## **Live Link**

Immersis App Link:
<https://immersis.netlify.app>

## **Getting Started**

To get a local copy up and running follow these simple steps.

### **Prerequisites**

This is an example of how you need to use the application
and how to install them.

-   node

> Go to https://nodejs.org/en/download and download your suitable LTS package.

### **Installation**

1.  Clone the repos backend & frontend

> git clone https://github.com/pesto-students/immersis-backend-f3-beta-2/tree/master

> git clone https://github.com/pesto-students/immersis-frontend-f3-beta-2/tree/master

2.  Install NPM packages in both

    > npm install

3.  Add the .env file in the root for backend app.

> GENIUS_TOKEN="Genius_Developers_Token" (Get it from https://docs.genius.com)

> MONGO_URI="mongo_URL"

> JWT_SECRET="jwt_secret_key"

> EMAIL_ID="sender_email_id"

> EMAIL_PASSWORD="sender_email_password"

4.  Run the backend server

> npm run dev

5.  Run the frontend app

> npm start

### **Tech Stack**

-   [React.js](https://reactjs.org/)

-   [Redux](https://redux.js.org/)

-   [Node.js](https://nodejs.org/en/)

-   [MongoDB](https://www.mongodb.com/)

### **Servers**

-   [Heroku](http://heroku.com/)

-   [Netlify](https://www.netlify.com/)

### **Tools**

-   [Figma](https://figma.com/)

-   [Draw.io](https://app.diagrams.net/)

-   [Github](https://github.com/)

### **Source Code Repo**

-   Front End Source Repo -
    <https://github.com/pesto-students/immersis-frontend-f3-beta-2/tree/master>

-   Back End Source Repo -
    <https://github.com/pesto-students/immersis-backend-f3-beta-2/tree/master>

## **Developers**

-   Mehedi Mondal

-   Ubair Noor

## **Mentor**

-   Harshit Kedia

## **Resources**

-   [PRD](https://github.com/pesto-students/immersis-frontend-f3-beta-2/blob/readme/docs/prd.pdf)

-   [Wireframes](https://drive.google.com/file/d/1exO60-g4It1k5m_aaqjNBaskljzBF8DC/view?usp=sharing)

-   [HLD](https://github.com/pesto-students/immersis-frontend-f3-beta-2/blob/readme/docs/hld.pdf)

-   [Stack Justification](https://github.com/pesto-students/immersis-frontend-f3-beta-2/blob/readme/docs/stack.pdf)

-   [API Docs](https://github.com/pesto-students/immersis-backend-f3-beta-2/blob/master/API.md)

## **UI Screens**

### Landing Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Home_1.png)

This is the Landing page of our application. You can navigate to the
below mentioned links from the homepage.

1. Home (Landing page)

2. Search

3. Login

4. Signup

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Home_2.png)

We have added the music player that will float at bottom of the page all the time so that you can enjoy music at your fingertip. This will be available if you have a song previuosly played in memory or play from search results page.

### Search Results Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Search.png)

You can search from the search bar that is available across most of the pages and that will land you to this page. Choose between Music, Video or Lyrics from this page.

### Video Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Video.png)

You can watch the youtube music video of the picked search result here.

### Lyrics Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Lyrics.png)

You can surf the lyrics of the picked search result here.

### Login Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Login.png)

You can login from this page.

### Signup Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Signup.png)

You can Register/Signup from this page.

### Forgot Password Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/Forgot.png)

You can reset your password from here and the next reset password page that you get from the Email.

### Search History Page

![](https://github.com/pesto-students/song-finder-frontend-f3-beta-2/blob/readme/images/History.png)

You can check your search history from here if you are logged in.

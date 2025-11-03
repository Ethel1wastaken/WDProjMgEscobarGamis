# MgEscobarGamis Project Proposal

## Conway's PlayGround
### Logo:
![CS3  Q2 Project Proposal](https://github.com/user-attachments/assets/fd049769-18d8-4315-8382-07bf89bfb3a0)

## Description
Conway's PlayGround is the hub for all things related to [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). Conway's PlayGround is a library of well-known lifeforms such as the Gosper Glider Gun, a lifeform builder for making your very own projects, and a platform for sharing your creations and interacting with the Life community. We created Conway's PlayGround as we felt available libraries and builders for Life were lackluster. A main problem that we noticed was a lack of organization in lifeform libraries, as well as an overly simplified interface for building lifeforms. PlayGround is the direct product to address these problems. We want a more fitting site for such a cool game, and that's what we've done!

## Website Breakdown
1) Homepage: Contains important updates, a search bar, and a list of featured projects. If the user has not logged in, there will be an optional prompt to log in upon entering the site.
2) Advanced Search: Contains filters for types of lifeforms, users, creation date, and other parameters to narrow down your search. Search results will be displayed similarly to featured projects on the homepage.
3) Exploration: An expanded view of the featured projects page. It may contain projects personalized to the user's interests.
4) Backpack: A directory for the user's saved lifeforms. It is largely customizable, allowing for color-coding, folders, sorting, and tags. The backpack is accessible only to users with accounts.
5) Project View: A detailed view of a project. It contains a thumbnail, title, description of the project, a link to the user who shared the project, and optional tags for better organization. When the thumbnail is clicked, it will lead to the project editor screen.
6) Project Edit: Where you build and modify lifeforms. Contains features other simulators have, such as a speed slider, canvas size editor, population and generation tracker, etc. The backpack is accessible from a minimized tab, allowing the user to drag and drop other lifeforms into their project. When saving/sharing the project, there is an option to save the project either at its current generation, or the first generation.

## Wireframe
The working user interface for Conway's PlayGround may be accessed at this [link](https://www.canva.com/design/DAG2zR02FDs/DpkxQuONIKW5XFavxaDppg/edit?utm_content=DAG2zR02FDs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton). Note that the link is only accessible by accounts under the PSHS Canva Education Team.

### **Home Page**
![Account Home Page](./assets/[CS3]%20Q2%20Project%20Proposal/Home%20Page.png "Home Page")

### Home Page (Search Bar)
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Home%20Page%20w_%20dropdown.png)

### Home Page (Search Bar)
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Home%20Page%20[Search].png)

### Home Page (Search Bar - Filters)
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Home%20Page%20[Search]%20(2).png)

### Backpack
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Backpack.png)

### Backpack - Uncollapsed
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Backpack%20-%20Uncollapsed.png)

### Backpack - My Creations
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Backpack%20-%20Uncollapsed%20(2).png)

### View Project
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/File%20View.png)

### Create Project
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Create%20Project.png)

### Save Project
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Save%20Project.png)

### Footer
![Search via Filters](./assets/[CS3]%20Q2%20Project%20Proposal/Footer.png)

## JavaScript Implementation

Due to the technical nature of our website, JS will be used often. More specifically, we plan to use JS in the following:
1. Project editing and management: An intetactive grid for making lifeforms, as well as save and upload function
2. Accounts: Logging in, commenting on projects, etc.
3. Sharing: Making sure shared projects show up on the website

This is not a finalized list, and its contents may change over the course of this website's development.
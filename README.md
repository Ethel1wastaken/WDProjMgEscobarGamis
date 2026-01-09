# MgEscobarGamis Project Proposal (UPDATED)

## Conway's PlayGround
### Logo:
<img src="assets/[CS3] Q2 Project Proposal/[CS3] Q2 Project Proposal.png">

## Description
Conway's PlayGround is the hub for all things related to [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). Conway's PlayGround is a library of well-known lifeforms such as the Gosper Glider Gun, a lifeform builder for making your very own projects, and a platform for sharing your creations and interacting with the Life community. We created Conway's PlayGround as we felt available libraries and builders for Life were lackluster. A main problem that we noticed was a lack of organization in lifeform libraries, as well as an overly simplified interface for building lifeforms. PlayGround is the direct product to address these problems. We want a more fitting site for such a cool game, and that's what we've done!

## Website Breakdown

1) **Homepage:** Contains important updates, a search bar, and a list of featured projects. If the user has not logged in, there will be an optional prompt to log in upon entering the site.
2) **Advanced Search:** Contains filters for types of lifeforms, users, creation date, and other parameters to narrow down your search. Search results will be displayed similarly to featured projects on the homepage.
3) **Search Results:**
3) **Backpack:** A directory for the user's saved lifeforms. It is largely customizable, allowing for color-coding, folders, sorting, and tags. The backpack is accessible only to users with accounts.
4) **Project View:** A detailed view of a project. It contains a thumbnail, title, description of the project, a link to the user who shared the project, and optional tags for better organization. When the thumbnail is clicked, it will lead to the project editor screen.
5) **Project Edit:**     Where you build and modify lifeforms. Contains features other simulators have, such as a speed slider, canvas size editor, population and generation tracker, etc. The backpack is accessible from a minimized tab, allowing the user to drag and drop other lifeforms into their project. When saving/sharing the project, there is an option to save the project either at its current generation, or the first generation.
6) **Settings**
7) **Account Sign-up/Log-in**



## Wireframe
The working user interface for Conway's PlayGround may be accessed at this [link](  ). Note that the link is only accessible by accounts under the PSHS Canva Education Team.

## JavaScript Implementation
1) **Homepage:** Search terms entered into the search bar are converted into an array of strings which will be saved.
2) **Advanced Search:** Tags which are selected will be added to an array of strings which will be saved.
3) **Search Results:** The array of search terms from the home page as well as the array of tags from the homepage will be compared with terms in the description of projects and lifeforms saved on the website. Depending on how similar the project/lifeform is to the search, it will be assigned a value which dictates how high it is in the search results.
4) **Backpack:** The backpack saves the user's projects by making them JS objects. Within these objects are saved the project's name, description, search terms/tags, and the pattern of the lifeform.
5) **Project View:** Like the backpack, it simply displays more information on a specific project using the same object.
5) **Project Edit:** The project edit page mainly uses JS to simulate Conway's GoL. It currently uses a matrix of 0s and 1s to represent live and dead cells, and each time step applies the rules of GoL. The time taken for each timestep can be changed, and when the project is ready to be saved, the user will be prompted to fill out information on the project, which is saved as the object we see in the backpack and project view.
7) **Settings:**
8) **Account Sign-Up/Log-In:**



## HTML Forms
### Search Bar

- Results shown in *search results: lifeforms* and *search results: projects*

The search bar on the home page will be used by the users to look up any publicly shared lifeform/project. Based on the string of text typed, it will return corresponding/matching lifeforms on one page, and corresponding projects on a separate page.
**Form Type: Text**

### Filter/Advanced Search

- Results shown in *search results: lifeforms* and *search results: projects*

Similar to the search bar, the filter will compare the tags checked (saved as an array of strings) with the tags of different projects/lifeforms, which is also saved as an array of strings. Based on how similar the two arrays are, the search results will be displayed in descending order of similarity to the searched tags.
**Form Type: Checkbox**

### Account Sign up
- Results shown in *homepage* and *settings*

The sign-up page is where users will create or log into their accounts in the website, which will be used to store their creations and saved lifeforms/projects in their backpacks. Additionally, they may also get recommendations in their emails if they consent. In the settings page, they can also adjust information about themselves.
**Form Type: Text + Email + Password**

### Project Editing & Management

### Project Sharing


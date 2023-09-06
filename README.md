<h1 style='text-align:center;'>Rich's Northcoders News Website</h1>

<p>Welcome to Rich's Northcoders News website! The place place to get your Northcoders News fix! Here you can browse all the latest news articles from Northcoders, apply your own filters, vote on articles, and even leave comments!</p>
<p>To start, here is the link for the website

```
https://richs-northcoders-news.netlify.app/
```

 </p>

 <p>If you want to see the back-end project that helped develop this website, please visit my other repo:

```
https://github.com/RichRavenM/RichM-nc-news/
```

 </p>
 <br>

 <h2 style='text-align:center;'>About the Website</h2>
 <p>The website has several components. Globally, there will always be a Header and a Nav bar. From there, pages are split into the Home page, Article page, Article Topics page, and individual Article pages. There are front-end protocols for loading times and errors. The website is <strong>fully responsive</strong> to various device sizes.</p>

 <p>It should be noted that you will hardcoded in as the user <strong>tickle122</strong></p>

 <br>
 <h3>Home page</h3>
 <p>Nothing much here, just an introduction to what's going on on the website.</p>

 <h3>Articles page</h3>
 <p>Here you can view all the articles, including their authors, dates of creation, and vote and comment counts. There is an additional component, Filters, that allows you to apply sorting criteria. Additionally, you can click on a topic to filter by that topic. With any filters applied, you have the option to reset the filters.</p>

 <h3>Article Topics Page</h3>
 <p>This page provides you with links to the articles, filtered by topic, as well as a brief description of each topic.</p>

 <h3>Individual article pages</h3>
 <p>Here you can read an individual article. There is a component here that allows you to upvote or downvote on an article, optimistically rendered. Underneath, you can see all the comments thanks to the Comments component, and then you can add your own comment using the MakeComment component, also rendered optimistically. You have the option of deleting any comments associated to the logged-in user (tickle122), rendered optimistically</p>

 <h4>Forms</h4>
 <p>To prevent errors, forms are validated at the front-end of the website

<br>
 <h2 style='text-align:center;'>Running the code yourself</h2>

 <p>To run the code yourself, ensure you have at least Node.js v20.3.1.</p>

 <p>To clone the repo, open the directory you wish to work in and copy into your terminal
 
 ```
git clone https://github.com/RichRavenM/fe-nc-news
 ```
 </p>

 <p>To run all the relevant dependencies, simply type into your terminal</p>

```
npm install
```

</p>

 <p>This should allow you to install all the dependencies and devDependencies that came with the repo.</p>

 <p>In case of issues, the dependencies you need are react, react-dom, react-router-dom, and axios.</p>

 <p>If you were succuessful with downloading the dependencies and devDependencies, you package.json should look something like

```
"dependencies": {
   "axios": "^1.5.0",
   "react": "^18.2.0",
   "react-dom": "^18.2.0",
   "react-router-dom": "^6.15.0"
 },
 "devDependencies": {
   "@types/react": "^18.2.15",
   "@types/react-dom": "^18.2.7",
   "@vitejs/plugin-react": "^4.0.3",
   "eslint": "^8.45.0",
   "eslint-plugin-react": "^7.32.2",
   "eslint-plugin-react-hooks": "^4.6.0",
   "eslint-plugin-react-refresh": "^0.4.3",
   "vite": "^4.4.9"
 }
```

</p>

<br>
<p>The git repo should contain an excalidraw file. Here you can see my initial outline for the website, if you'd like to implement any additional functionality yourself.</p>

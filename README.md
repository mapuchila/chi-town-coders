#Supreme Chi-Town Coding Crew

This will be the basic framework for our new site.  Please feel free to contribute as you may see fit.

## Set Up
```
# clone the repo
git clone <this-repo>
cd <this-repo>

# install node dependencies
npm install

# view the app
# Note: to develop, see instructions below
node src
```

## Developing
```
# make sure you have some popular node tools installed
npm install -g nodemon
npm install -g node-inspector

# have nodemon run the app in one terminal tab
# nodemon will watch for file changes in the express app
# and restart the server
nodemon --debug src

# run the debugger in another terminal
# node-inspector will break the application when a break point
# or `debugger` statement is reached in the JavaScript
node-inspector
```
# Finished Product Link
https://sc3.github.io
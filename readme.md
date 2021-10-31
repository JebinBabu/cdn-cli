CDN CLI
---------

A simple cli using nodejs to search and download libraries and dependencies for web development.
Downloads the library to the same directory

-- Uses the api of cdn.js - https://cdnjs.com/api
-- Node modules used - yarg, axios, fs


Install globally
--------
npm i -g 


Search for library
-------------------
cdn -n library_name


Limit search results
-------------------
cdn -n library_name -l 25

default value is 10




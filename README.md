# Nutritrack
A full stack web application where users can create an account, log meals, and visualize calorie and macronutrient intake trends.
## Demo
[https://nutritiontrackerzhxu33.herokuapp.com/](https://nutritrack-7081b988c353.herokuapp.com/)
<a href="https://gyazo.com/1289e8ba9c4a76cf4a50b5fae8ee6d1b"><img src="https://i.gyazo.com/1289e8ba9c4a76cf4a50b5fae8ee6d1b.gif" alt="Image from Gyazo" width="1919.999999999999"/></a>
## Built With
React, Material-UI, Node.js, Express, MongoDB, Docker
### Usage
  ```
  docker compose up
  ```
### Deployment On Heroku:
```
heroku login
heroku container:login
heroku create nutritrack
docker build -t nutritrack -f Dockerfile.web .
heroku container:push --recursive -a nutritrack
heroku container:release -a nutritrack web
heroku open nutritrack
```

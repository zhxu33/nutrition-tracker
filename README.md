# Nutritrack
A web application where users can create an account, log meals, visualize calorie and macronutrient intake trends.

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
1. Add .env to server
   ```
   cd server
   cd . > .env
   ```
2. Configure environment variables
   ```
    MONGO_URL = link
    NODE_ENV = production
    JWT_SECRET = secret
   ```
4. Install NPM packages
   ```sh
   npm install
   npm install --force --prefix client
   ```   
### Usage
 * Configure proxy to "http:localhost:5000" in server/client/package.json
```sh
npm start dev
```
### Run on local machine
 * Configure proxy to "http://nutritrack-api:5000" in server/client/package.json
 * Download Docker: https://www.docker.com/products/docker-desktop/
```
docker compose up
```

## Demo
[https://nutritiontrackerzhxu33.herokuapp.com/](https://nutritrack-7081b988c353.herokuapp.com/)
<a href="https://gyazo.com/30175083e2dae4ae9c3e6b9b1174e71a"><img src="https://i.gyazo.com/30175083e2dae4ae9c3e6b9b1174e71a.gif" alt="Image from Gyazo" width="1280"/></a>

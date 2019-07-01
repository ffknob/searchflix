- Initiate a Node project:
  `npm init -y`

- Configure Node scripts in `package.json`:

```json
  "scripts": {
    "dev": "nodemon",
  },
```

- Install dev dependencies:
  `npm i --save-dev nodemon`

- Install dependencies:
  `npm i --save express body-parser morgan dotenv ejs @elastic/elasticsearch`

- Build:
  `npm build`

- Serve watching modifications in files:
  `npm run dev`

- Access [http://localhost:3000/](http://localhost:3000/)

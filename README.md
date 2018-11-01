# Planning Poker

Let's make your planning session go online!

## Getting Started

If you want to start project locally follow the instructions below.

### Prerequisites


```
node.js ^8.*.*

npm or yarn as packgage manager
```

### Installing

First install packages in root folder of the project.

```
yarn install
```

Then go to `/client` folder and repeat

```
cd client/
yarn install 
```

Next you need to go to the `package.json` in your `root` and change or add line to

```
"proxy": "http://localhost:5000",
```

This allow our `create-react-app` application to know where our api is running (which port).
After you finish just type in `root` folder

```
yarn dev
```

And that's it!

## Testing

There is no test for now as i need to wait for the `StyledComponent` jest package to be updated.


## Deployment

After you deploy this program into some kind of hosting you need to remember to change `proxy` in our `package.json` in `/client/package.json` to

```
"proxy": "yourdomain",
```

## Built With

* [create-react-app](https://github.com/facebook/create-react-app) - client side
* [node.js](https://github.com/nodejs) - server
* [socket.io](https://github.com/socketio/socket.io) - WebSockets

## Authors

* **Sebastian Ogarek** - *Main work* - [ProPanek](https://github.com/ProPanek)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

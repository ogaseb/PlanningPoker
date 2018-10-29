import { decorate, observable } from "mobx";
import socketIOClient from "socket.io-client";

class UserStore {
  constructor() {
    this.rooms = [];
    this.socket = socketIOClient(process.env.ENDPOINT);
    this.socket.on("hello", response => {
      console.log(response);
    });
  }

  createRoom(userName, roomName, roomPassword) {
    this.userName = userName;
    this.roomName = roomName;
    const data = {
      userName: this.userName,
      roomName: this.roomName,
      roomPassword: roomPassword
    };
    this.socket.emit("createRoom", data);
    this.socket.on("createRoom", response => {
      this.roomName = response.roomId;
    });
  }
  fetchRooms() {
    this.socket.on("fetchRooms", response => {
      this.rooms = response;
    });
  }
  joinRoom(roomId, roomPassword, userName) {
    this.userName = userName;
    this.roomName = roomId;
    const data = {
      userName: this.userName,
      roomId: this.roomName,
      roomPassword: roomPassword
    };
    this.socket.emit("joinRoom", data);
  }
}

decorate(UserStore, {
  userName: observable,
  userId: observable,
  roomName: observable,
  roomId: observable,
  socket: observable,
  rooms: observable
});

export default UserStore;

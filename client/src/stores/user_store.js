import { decorate, observable } from "mobx";
import socketIOClient from "socket.io-client";

class UserStore {
  constructor() {
    this.rooms = [];
  }

  async createRoom(userName, roomName, roomPassword) {
    this.userName = userName;
    this.roomName = roomName;
    const data = {
      userName: this.userName,
      roomName: this.roomName,
      roomPassword: roomPassword
    };
    this.socket = socketIOClient(process.env.ENDPOINT);
    await this.socket.emit("createRoom", data);
    this.socket.on("createRoom", response => {
      console.log(response);
    });
  }
  async fetchRooms() {
    this.socket.on("fetchRooms", response => {
      this.rooms = response;
    });
  }
  async joinRoom() {}
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

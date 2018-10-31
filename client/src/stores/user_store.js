import React from 'react'
import { decorate, observable } from "mobx";
import {  } from 'react-router-dom'
import socketIOClient from "socket.io-client";

class UserStore {
  constructor() {
    this.rooms = [];
    this.cardResults = [];
    this.users = [];
    this.admin = false;
    this.kicked = false
    this.connected = false
    this.notificationMessage = null
    this.notificationVariant = "info"
    this.blockCard = false
    this.openJoinDialog = false
    this.socket = socketIOClient(process.env.ENDPOINT);
    this.socket.on("sendCard", (response) => {
      this.cardResults = response
    });
    this.socket.on("waitingFor", (response) => {
      this.waiting = response
    });
    this.socket.on("resetCards", () => {
      this.cardResults = []
      this.blockCard = false
    });
    this.socket.on("kickUser", (data) =>{
      console.log(data)
      if (this.userId !== "" && this.userId === data.userId){
        this.kicked = true
        this.notificationMessage = "You have been kicked from the Room"
        this.notificationVariant = "error"
      }
    })
    this.socket.on("changeAdmin", (data) =>{
      console.log(data)
      if (this.userId === data){
        this.admin = true
        this.notificationMessage = "You have been given admin privileges"
        this.notificationVariant = "info"
        console.log(this.admin)
      }
    })
  }

  createRoom(userName, roomName, roomPassword) {
    this.userName = userName;
    const data = {
      userName: this.userName,
      roomName,
      roomPassword: roomPassword
    };
    this.socket.emit("createRoom", data);
    this.socket.on("createRoom", response => {
      console.log(response)
      this.userId = response.user[response.user.length - 1].userId;
      this.roomId = response.roomId;
      this.roomName = response.roomName
      this.admin = true
      this.connected = true

    });

  }

  fetchRooms() {
    this.socket.on("fetchRooms", (response )=> {
      this.rooms = response;
    });
  }

  joinRoom(roomId, roomPassword, userName) {
    this.userName = userName;
    const data = {
      userName: this.userName,
      roomId: roomId,
      roomPassword: roomPassword
    };
    this.socket.emit("joinRoom", data);
    this.socket.on("joinRoom", (response) => {
      this.userId = response.user[response.user.length - 1].userId;
      this.roomId = response.roomId;
      this.roomName = response.roomName
      this.connected = true
    });
  }

  sendCard(card){
    const data = {
      userName: this.userName,
      roomId: this.roomId,
      cardValue: card
    };
    this.socket.emit("sendCard", data);
  }

  resetCards(){
    const data = {
      roomId: this.roomId,
    };
    this.socket.emit("resetCards", data);

  }

  fetchUsers(){
    const data = {
      roomId: this.roomId,
    };
    this.socket.emit("fetchUsers", data)
    this.socket.on("fetchUsers", (response )=> {
      this.users = response;
    });
  }

  kickUser(userId){
    const data = {
      userId: userId ,
    };
    this.socket.emit("kickUser", data)
  }

  changeAdmin(userId){
    const data = {
      userId: userId ,
    };
    this.socket.emit("changeAdmin", data)
  }
}

decorate(UserStore, {
  userName: observable,
  userId: observable,
  roomName: observable,
  roomId: observable,
  socket: observable,
  rooms: observable,
  waiting: observable,
  cardResults: observable,
  users: observable,
  kicked: observable,
  admin: observable,
  connected: observable,
  notificationMessage: observable,
  notificationVariant: observable,
  blockCard: observable,
  openJoinDialog: observable
});

export default UserStore;

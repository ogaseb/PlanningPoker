!function (t) {
  var e = {};

  function r(n) {
    if (e[n]) return e[n].exports;
    var o = e[n] = {i: n, l: !1, exports: {}};
    return t[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
  }

  r.m = t, r.c = e, r.d = function (t, e, n) {
    r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
  }, r.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
  }, r.t = function (t, e) {
    if (1 & e && (t = r(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (r.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) r.d(n, o, function (e) {
      return t[e]
    }.bind(null, o));
    return n
  }, r.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return r.d(e, "a", e), e
  }, r.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, r.p = "", r(r.s = 42)
}([function (t, e, r) {
  var n = r(23), o = "object" == typeof self && self && self.Object === Object && self,
    i = n || o || Function("return this")();
  t.exports = i
}, function (t, e) {
  var r = Array.isArray;
  t.exports = r
}, function (t, e, r) {
  var n = r(57), o = r(62);
  t.exports = function (t, e) {
    var r = o(t, e);
    return n(r) ? r : void 0
  }
}, function (t, e, r) {
  var n = r(43), o = r(44), i = r(125), u = Math.max;
  t.exports = function (t, e, r) {
    var s = null == t ? 0 : t.length;
    if (!s) return -1;
    var c = null == r ? 0 : i(r);
    return c < 0 && (c = u(s + c, 0)), n(t, o(e, 3), c)
  }
}, function (t, e, r) {
  var n = r(8), o = r(58), i = r(59), u = "[object Null]", s = "[object Undefined]", c = n ? n.toStringTag : void 0;
  t.exports = function (t) {
    return null == t ? void 0 === t ? s : u : c && c in Object(t) ? o(t) : i(t)
  }
}, function (t, e) {
  t.exports = function (t) {
    return null != t && "object" == typeof t
  }
}, function (t, e, r) {
  var n = r(47), o = r(48), i = r(49), u = r(50), s = r(51);

  function c(t) {
    var e = -1, r = null == t ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }

  c.prototype.clear = n, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = u, c.prototype.set = s, t.exports = c
}, function (t, e, r) {
  var n = r(21);
  t.exports = function (t, e) {
    for (var r = t.length; r--;) if (n(t[r][0], e)) return r;
    return -1
  }
}, function (t, e, r) {
  var n = r(0).Symbol;
  t.exports = n
}, function (t, e) {
  t.exports = function (t) {
    var e = typeof t;
    return null != t && ("object" == e || "function" == e)
  }
}, function (t, e, r) {
  var n = r(2)(Object, "create");
  t.exports = n
}, function (t, e, r) {
  var n = r(71);
  t.exports = function (t, e) {
    var r = t.__data__;
    return n(e) ? r["string" == typeof e ? "string" : "hash"] : r.map
  }
}, function (t, e, r) {
  var n = r(4), o = r(5), i = "[object Symbol]";
  t.exports = function (t) {
    return "symbol" == typeof t || o(t) && n(t) == i
  }
}, function (t, e, r) {
  var n = r(12), o = 1 / 0;
  t.exports = function (t) {
    if ("string" == typeof t || n(t)) return t;
    var e = t + "";
    return "0" == e && 1 / t == -o ? "-0" : e
  }
}, function (t, e, r) {
  var n = r(2)(r(0), "Map");
  t.exports = n
}, function (t, e, r) {
  var n = r(63), o = r(70), i = r(72), u = r(73), s = r(74);

  function c(t) {
    var e = -1, r = null == t ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }

  c.prototype.clear = n, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = u, c.prototype.set = s, t.exports = c
}, function (t, e) {
  var r = 9007199254740991;
  t.exports = function (t) {
    return "number" == typeof t && t > -1 && t % 1 == 0 && t <= r
  }
}, function (t, e, r) {
  var n = r(1), o = r(12), i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, u = /^\w*$/;
  t.exports = function (t, e) {
    if (n(t)) return !1;
    var r = typeof t;
    return !("number" != r && "symbol" != r && "boolean" != r && null != t && !o(t)) || u.test(t) || !i.test(t) || null != e && t in Object(e)
  }
}, function (t, e) {
  t.exports = require("express")
}, function (t, e) {
  t.exports = require("path")
}, function (t, e, r) {
  var n = r(6), o = r(52), i = r(53), u = r(54), s = r(55), c = r(56);

  function a(t) {
    var e = this.__data__ = new n(t);
    this.size = e.size
  }

  a.prototype.clear = o, a.prototype.delete = i, a.prototype.get = u, a.prototype.has = s, a.prototype.set = c, t.exports = a
}, function (t, e) {
  t.exports = function (t, e) {
    return t === e || t != t && e != e
  }
}, function (t, e, r) {
  var n = r(4), o = r(9), i = "[object AsyncFunction]", u = "[object Function]", s = "[object GeneratorFunction]",
    c = "[object Proxy]";
  t.exports = function (t) {
    if (!o(t)) return !1;
    var e = n(t);
    return e == u || e == s || e == i || e == c
  }
}, function (t, e) {
  var r = "object" == typeof global && global && global.Object === Object && global;
  t.exports = r
}, function (t, e) {
  var r = Function.prototype.toString;
  t.exports = function (t) {
    if (null != t) {
      try {
        return r.call(t)
      } catch (t) {
      }
      try {
        return t + ""
      } catch (t) {
      }
    }
    return ""
  }
}, function (t, e, r) {
  var n = r(75), o = r(5);
  t.exports = function t(e, r, i, u, s) {
    return e === r || (null == e || null == r || !o(e) && !o(r) ? e != e && r != r : n(e, r, i, u, t, s))
  }
}, function (t, e, r) {
  var n = r(76), o = r(79), i = r(80), u = 1, s = 2;
  t.exports = function (t, e, r, c, a, f) {
    var l = r & u, p = t.length, d = e.length;
    if (p != d && !(l && d > p)) return !1;
    var v = f.get(t);
    if (v && f.get(e)) return v == e;
    var g = -1, h = !0, y = r & s ? new n : void 0;
    for (f.set(t, e), f.set(e, t); ++g < p;) {
      var b = t[g], m = e[g];
      if (c) var x = l ? c(m, b, g, e, t, f) : c(b, m, g, t, e, f);
      if (void 0 !== x) {
        if (x) continue;
        h = !1;
        break
      }
      if (y) {
        if (!o(e, function (t, e) {
          if (!i(y, e) && (b === t || a(b, t, r, c, f))) return y.push(e)
        })) {
          h = !1;
          break
        }
      } else if (b !== m && !a(b, m, r, c, f)) {
        h = !1;
        break
      }
    }
    return f.delete(t), f.delete(e), h
  }
}, function (t, e, r) {
  var n = r(92), o = r(99), i = r(103);
  t.exports = function (t) {
    return i(t) ? n(t) : o(t)
  }
}, function (t, e, r) {
  var n = r(94), o = r(5), i = Object.prototype, u = i.hasOwnProperty, s = i.propertyIsEnumerable, c = n(function () {
    return arguments
  }()) ? n : function (t) {
    return o(t) && u.call(t, "callee") && !s.call(t, "callee")
  };
  t.exports = c
}, function (t, e, r) {
  (function (t) {
    var n = r(0), o = r(95), i = e && !e.nodeType && e, u = i && "object" == typeof t && t && !t.nodeType && t,
      s = u && u.exports === i ? n.Buffer : void 0, c = (s ? s.isBuffer : void 0) || o;
    t.exports = c
  }).call(this, r(30)(t))
}, function (t, e) {
  t.exports = function (t) {
    return t.webpackPolyfill || (t.deprecate = function () {
    }, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
      enumerable: !0,
      get: function () {
        return t.l
      }
    }), Object.defineProperty(t, "id", {
      enumerable: !0, get: function () {
        return t.i
      }
    }), t.webpackPolyfill = 1), t
  }
}, function (t, e) {
  var r = 9007199254740991, n = /^(?:0|[1-9]\d*)$/;
  t.exports = function (t, e) {
    var o = typeof t;
    return !!(e = null == e ? r : e) && ("number" == o || "symbol" != o && n.test(t)) && t > -1 && t % 1 == 0 && t < e
  }
}, function (t, e, r) {
  var n = r(96), o = r(97), i = r(98), u = i && i.isTypedArray, s = u ? o(u) : n;
  t.exports = s
}, function (t, e, r) {
  var n = r(9);
  t.exports = function (t) {
    return t == t && !n(t)
  }
}, function (t, e) {
  t.exports = function (t, e) {
    return function (r) {
      return null != r && r[t] === e && (void 0 !== e || t in Object(r))
    }
  }
}, function (t, e, r) {
  var n = r(36), o = r(13);
  t.exports = function (t, e) {
    for (var r = 0, i = (e = n(e, t)).length; null != t && r < i;) t = t[o(e[r++])];
    return r && r == i ? t : void 0
  }
}, function (t, e, r) {
  var n = r(1), o = r(17), i = r(112), u = r(115);
  t.exports = function (t, e) {
    return n(t) ? t : o(t, e) ? [t] : i(u(t))
  }
}, function (t, e) {
  t.exports = require("http")
}, function (t, e) {
  t.exports = require("socket.io")
}, function (t, e, r) {
  var n = r(128), o = r(130);
  t.exports = function (t, e, r) {
    var i = e && r || 0;
    "string" == typeof t && (e = "binary" === t ? new Array(16) : null, t = null);
    var u = (t = t || {}).random || (t.rng || n)();
    if (u[6] = 15 & u[6] | 64, u[8] = 63 & u[8] | 128, e) for (var s = 0; s < 16; ++s) e[i + s] = u[s];
    return e || o(u)
  }
}, function (t, e) {
  t.exports = require("jira-connector")
}, function (t, e) {
  t.exports = require("date-and-time")
}, function (t, e, r) {
  "use strict";
  r.r(e), function (t) {
    var e = r(18), n = r.n(e), o = r(37), i = r.n(o), u = r(38), s = r.n(u), c = r(3), a = r.n(c), f = r(19),
      l = r.n(f), p = r(39), d = r.n(p), v = r(40), g = r.n(v), h = r(41), y = r.n(h);
    const b = process.env.PORT || 5e3, m = n()(), x = i.a.createServer(m), _ = s()(x, {cookie: !1});
    let j, w = [], O = new Map, I = new Map, S = new Map;
    _.on("connection", t => {
      console.log("User -> connected to server id:", t.id), t.on("jiraLogin", ({jiraLogin: e, jiraPassword: r, jiraSubdomain: n}) => {
        (j = new g.a({
          host: `${n}.atlassian.net`,
          basic_auth: {username: e, password: r}
        })) && j.board.getAllBoards({startAt: 0}, function (e, r) {
          t.emit("jiraLogin", r), console.log("Jira -> connecting and fetching boards", e), e && t.emit("errors", {error: e})
        })
      }), t.on("jiraGetBoard", e => {
        j.board.getIssuesForBacklog({boardId: e}, function (e, r) {
          let n = [];
          for (let t = 0; t < r.issues.length; t++) n.push({
            id: r.issues[t].id,
            key: r.issues[t].key,
            summary: r.issues[t].fields.summary,
            description: r.issues[t].fields.description,
            comments: r.issues[t].fields.comment.comments,
            priorityType: r.issues[t].fields.priority.name,
            priorityUrl: r.issues[t].fields.priority.iconUrl,
            issueUrl: r.issues[t].fields.issuetype.iconUrl
          });
          t.emit("jiraGetBacklogBoard", n), console.log("Jira -> fetching singe board"), e && t.emit("errors", {error: e})
        }), j.board.getIssuesForBoard({boardId: e}, function (e, r) {
          let n = [];
          for (let t = 0; t < r.issues.length; t++) n.push({
            id: r.issues[t].id,
            key: r.issues[t].key,
            summary: r.issues[t].fields.summary,
            description: r.issues[t].fields.description,
            comments: r.issues[t].fields.comment.comments,
            priorityType: r.issues[t].fields.priority.name,
            priorityUrl: r.issues[t].fields.priority.iconUrl,
            issueUrl: r.issues[t].fields.issuetype.iconUrl
          });
          t.emit("jiraGetBoard", n), console.log("Jira -> fetching singe board"), e && t.emit("errors", {error: e})
        })
      }), t.on("jiraSetEstimation", ({issueId: e, boardId: r, estimationScore: n}) => {
        j.issue.setIssueEstimation({issueId: e, boardId: r, value: n}, function (r) {
          console.log(`Jira -> setting estimation for id: ${e} value: ${n}`), r && t.emit("errors", {error: r})
        })
      }), t.on("createRoom", ({userName: e, roomName: r, roomPassword: n}) => {
        const o = {roomName: "", roomId: "", createTimestamp: "", user: [], game: [], gameHistory: []}, i = d()();
        let u = new Date;
        u = y.a.format(u, "YYYY/MM/DD HH:mm:ss"), o.user.push({
          userId: t.id,
          userName: e
        }), o.roomName = r, o.roomId = i, o.createTimestamp = u, S.set(i, n), I.set(i, o), O.set(t.id, i), w.push(o), t.join(i), t.emit("createRoom", o), _.in(i).emit("waitingFor", o.game.length), console.log("User -> Created room! RoomId:", i)
      }), setInterval(() => {
        t.emit("fetchRooms", w)
      }, 1e3), t.on("joinRoom", ({roomId: e, roomPassword: r, userName: n}) => {
        let o = I.get(e);
        if (o) {
          if (r === S.get(e)) {
            o.user.push({userId: t.id, userName: n}), O.set(t.id, e), t.join(e);
            let r = a()(o, function (t) {
              return t.roomId === e
            });
            -1 !== r && w[r].user.push({
              userId: t.id,
              userName: n
            }), console.log("User -> Joined room! RoomId:", e), t.emit("joinRoom", o), I.set(e, o), _.in(e).emit("waitingFor", o.game.length)
          } else t.emit("errors", {error: "Invalid Password"})
        } else t.emit("errors", {error: "Room not found"})
      }), t.on("deleteRoom", ({roomId: e, roomPassword: r}) => {
        if (r === S.get(e)) {
          let t = lodash.findIndex(w, function (t) {
            return t.roomId === e
          });
          w.splice(t, 1), I.delete(e)
        } else t.emit("errors", {error: "Invalid Password"})
      }), t.on("sendCard", ({roomId: t, userName: e, cardValue: r}) => {
        let n = I.get(t);
        if (n) {
          n.game.push({userName: e, cardValue: r});
          let o = a()(n.user, function (t) {
            return t.userName === e
          });
          n.user[o].userName = `${n.user[o].userName} - ✔`, n.user.length === n.game.length ? (_.in(t).emit("sendCard", n.game), _.in(t).emit("waitingFor", n.game.length)) : _.in(t).emit("waitingFor", n.game.length), I.set(t, n)
        }
      }), t.on("resetCards", ({roomId: t}) => {
        let e = I.get(t);
        if (e) {
          for (let t = 0; t < e.user.length; t++) {
            let r = e.user[t].userName.split(" - ");
            e.user[t].userName = r[0]
          }
          e.gameHistory.push(e.game), console.log(e.gameHistory), _.in(t).emit("resetCards", e.gameHistory), e.game = [], e.title = "", e.description = "", _.in(t).emit("waitingFor", e.game.length), I.set(t, e)
        }
      }), t.on("fetchUsers", ({roomId: t}) => {
        setInterval(() => {
          const e = I.get(t);
          e && (_.in(t).emit("fetchUsers", e.user), 1 === e.user.length && _.in(t.toString()).emit("changeAdmin", e.user[0].userId))
        }, 1e3)
      }), t.on("kickUser", ({userId: t}) => {
        let e = O.get(t);
        if (e) {
          let r = I.get(e.toString()), n = a()(r.user, function (e) {
            return e.userId === t
          });
          -1 !== n && (_.in(e.toString()).emit("kickUser", r.user[n]), r.user.splice(n, 1), _.in(e.toString()).emit("waitingFor", r.game.length), 1 === r.user.length && _.in(e.toString()).emit("changeAdmin", r.user[0].userId), I.set(e.toString(), r), console.log("User -> kicked"))
        }
      }), t.on("changeAdmin", ({userId: t}) => {
        let e = O.get(t);
        if (e) {
          let r = I.get(e.toString()), n = a()(r.user, function (e) {
            return e.userId === t
          });
          -1 !== n && (_.in(e.toString()).emit("changeAdmin", r.user[n].userId), console.log("User -> admin permissions given"))
        }
      }), t.on("broadcastTitle", ({roomId: e, title: r}) => {
        let n = I.get(e);
        n.title !== r && (n.title = r, t.broadcast.to(e).emit("broadcastTitle", r), I.set(e, n))
      }), t.on("broadcastDescription", ({roomId: e, description: r}) => {
        let n = I.get(e);
        n.description !== r && (n.description = r, t.broadcast.to(e).emit("broadcastDescription", r), I.set(e, n))
      }), t.on("disconnect", () => {
        let e = O.get(t.id);
        if (void 0 !== e) {
          let r = I.get(e.toString());
          if (void 0 !== r) {
            let n = a()(r.user, function (e) {
              return e.userId === t.id
            });
            -1 !== n && (r.user.splice(n, 1), _.in(e.toString()).emit("waitingFor", r.game.length), 1 === r.user.length && _.in(e.toString()).emit("changeAdmin", r.user[0].userId), I.set(e.toString(), r), console.log("User -> disconnected from room"))
          }
        }
        console.log("User -> disconnected from server")
      }), t.on("disconnecting", t => {
        console.log("User -> disconnecting reason:", t)
      }), t.on("reconnecting", t => {
        console.log("User -> lost connection in process of reconnection reason:", t)
      }), t.on("reconnect", () => {
        console.log("User -> user reconnected")
      })
    }), m.use(n.a.static(l.a.join(t, "client/build"))), m.get("*", function (e, r) {
      r.sendFile(l.a.join(t, "client/build", "index.html"))
    }), x.listen(b, () => console.log(`Listening on port ${b}`))
  }.call(this, "/")
}, function (t, e) {
  t.exports = function (t, e, r, n) {
    for (var o = t.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o;) if (e(t[i], i, t)) return i;
    return -1
  }
}, function (t, e, r) {
  var n = r(45), o = r(110), i = r(121), u = r(1), s = r(122);
  t.exports = function (t) {
    return "function" == typeof t ? t : null == t ? i : "object" == typeof t ? u(t) ? o(t[0], t[1]) : n(t) : s(t)
  }
}, function (t, e, r) {
  var n = r(46), o = r(109), i = r(34);
  t.exports = function (t) {
    var e = o(t);
    return 1 == e.length && e[0][2] ? i(e[0][0], e[0][1]) : function (r) {
      return r === t || n(r, t, e)
    }
  }
}, function (t, e, r) {
  var n = r(20), o = r(25), i = 1, u = 2;
  t.exports = function (t, e, r, s) {
    var c = r.length, a = c, f = !s;
    if (null == t) return !a;
    for (t = Object(t); c--;) {
      var l = r[c];
      if (f && l[2] ? l[1] !== t[l[0]] : !(l[0] in t)) return !1
    }
    for (; ++c < a;) {
      var p = (l = r[c])[0], d = t[p], v = l[1];
      if (f && l[2]) {
        if (void 0 === d && !(p in t)) return !1
      } else {
        var g = new n;
        if (s) var h = s(d, v, p, t, e, g);
        if (!(void 0 === h ? o(v, d, i | u, s, g) : h)) return !1
      }
    }
    return !0
  }
}, function (t, e) {
  t.exports = function () {
    this.__data__ = [], this.size = 0
  }
}, function (t, e, r) {
  var n = r(7), o = Array.prototype.splice;
  t.exports = function (t) {
    var e = this.__data__, r = n(e, t);
    return !(r < 0 || (r == e.length - 1 ? e.pop() : o.call(e, r, 1), --this.size, 0))
  }
}, function (t, e, r) {
  var n = r(7);
  t.exports = function (t) {
    var e = this.__data__, r = n(e, t);
    return r < 0 ? void 0 : e[r][1]
  }
}, function (t, e, r) {
  var n = r(7);
  t.exports = function (t) {
    return n(this.__data__, t) > -1
  }
}, function (t, e, r) {
  var n = r(7);
  t.exports = function (t, e) {
    var r = this.__data__, o = n(r, t);
    return o < 0 ? (++this.size, r.push([t, e])) : r[o][1] = e, this
  }
}, function (t, e, r) {
  var n = r(6);
  t.exports = function () {
    this.__data__ = new n, this.size = 0
  }
}, function (t, e) {
  t.exports = function (t) {
    var e = this.__data__, r = e.delete(t);
    return this.size = e.size, r
  }
}, function (t, e) {
  t.exports = function (t) {
    return this.__data__.get(t)
  }
}, function (t, e) {
  t.exports = function (t) {
    return this.__data__.has(t)
  }
}, function (t, e, r) {
  var n = r(6), o = r(14), i = r(15), u = 200;
  t.exports = function (t, e) {
    var r = this.__data__;
    if (r instanceof n) {
      var s = r.__data__;
      if (!o || s.length < u - 1) return s.push([t, e]), this.size = ++r.size, this;
      r = this.__data__ = new i(s)
    }
    return r.set(t, e), this.size = r.size, this
  }
}, function (t, e, r) {
  var n = r(22), o = r(60), i = r(9), u = r(24), s = /^\[object .+?Constructor\]$/, c = Function.prototype,
    a = Object.prototype, f = c.toString, l = a.hasOwnProperty,
    p = RegExp("^" + f.call(l).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  t.exports = function (t) {
    return !(!i(t) || o(t)) && (n(t) ? p : s).test(u(t))
  }
}, function (t, e, r) {
  var n = r(8), o = Object.prototype, i = o.hasOwnProperty, u = o.toString, s = n ? n.toStringTag : void 0;
  t.exports = function (t) {
    var e = i.call(t, s), r = t[s];
    try {
      t[s] = void 0;
      var n = !0
    } catch (t) {
    }
    var o = u.call(t);
    return n && (e ? t[s] = r : delete t[s]), o
  }
}, function (t, e) {
  var r = Object.prototype.toString;
  t.exports = function (t) {
    return r.call(t)
  }
}, function (t, e, r) {
  var n = r(61), o = function () {
    var t = /[^.]+$/.exec(n && n.keys && n.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : ""
  }();
  t.exports = function (t) {
    return !!o && o in t
  }
}, function (t, e, r) {
  var n = r(0)["__core-js_shared__"];
  t.exports = n
}, function (t, e) {
  t.exports = function (t, e) {
    return null == t ? void 0 : t[e]
  }
}, function (t, e, r) {
  var n = r(64), o = r(6), i = r(14);
  t.exports = function () {
    this.size = 0, this.__data__ = {hash: new n, map: new (i || o), string: new n}
  }
}, function (t, e, r) {
  var n = r(65), o = r(66), i = r(67), u = r(68), s = r(69);

  function c(t) {
    var e = -1, r = null == t ? 0 : t.length;
    for (this.clear(); ++e < r;) {
      var n = t[e];
      this.set(n[0], n[1])
    }
  }

  c.prototype.clear = n, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = u, c.prototype.set = s, t.exports = c
}, function (t, e, r) {
  var n = r(10);
  t.exports = function () {
    this.__data__ = n ? n(null) : {}, this.size = 0
  }
}, function (t, e) {
  t.exports = function (t) {
    var e = this.has(t) && delete this.__data__[t];
    return this.size -= e ? 1 : 0, e
  }
}, function (t, e, r) {
  var n = r(10), o = "__lodash_hash_undefined__", i = Object.prototype.hasOwnProperty;
  t.exports = function (t) {
    var e = this.__data__;
    if (n) {
      var r = e[t];
      return r === o ? void 0 : r
    }
    return i.call(e, t) ? e[t] : void 0
  }
}, function (t, e, r) {
  var n = r(10), o = Object.prototype.hasOwnProperty;
  t.exports = function (t) {
    var e = this.__data__;
    return n ? void 0 !== e[t] : o.call(e, t)
  }
}, function (t, e, r) {
  var n = r(10), o = "__lodash_hash_undefined__";
  t.exports = function (t, e) {
    var r = this.__data__;
    return this.size += this.has(t) ? 0 : 1, r[t] = n && void 0 === e ? o : e, this
  }
}, function (t, e, r) {
  var n = r(11);
  t.exports = function (t) {
    var e = n(this, t).delete(t);
    return this.size -= e ? 1 : 0, e
  }
}, function (t, e) {
  t.exports = function (t) {
    var e = typeof t;
    return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t
  }
}, function (t, e, r) {
  var n = r(11);
  t.exports = function (t) {
    return n(this, t).get(t)
  }
}, function (t, e, r) {
  var n = r(11);
  t.exports = function (t) {
    return n(this, t).has(t)
  }
}, function (t, e, r) {
  var n = r(11);
  t.exports = function (t, e) {
    var r = n(this, t), o = r.size;
    return r.set(t, e), this.size += r.size == o ? 0 : 1, this
  }
}, function (t, e, r) {
  var n = r(20), o = r(26), i = r(81), u = r(85), s = r(104), c = r(1), a = r(29), f = r(32), l = 1,
    p = "[object Arguments]", d = "[object Array]", v = "[object Object]", g = Object.prototype.hasOwnProperty;
  t.exports = function (t, e, r, h, y, b) {
    var m = c(t), x = c(e), _ = m ? d : s(t), j = x ? d : s(e), w = (_ = _ == p ? v : _) == v,
      O = (j = j == p ? v : j) == v, I = _ == j;
    if (I && a(t)) {
      if (!a(e)) return !1;
      m = !0, w = !1
    }
    if (I && !w) return b || (b = new n), m || f(t) ? o(t, e, r, h, y, b) : i(t, e, _, r, h, y, b);
    if (!(r & l)) {
      var S = w && g.call(t, "__wrapped__"), A = O && g.call(e, "__wrapped__");
      if (S || A) {
        var P = S ? t.value() : t, k = A ? e.value() : e;
        return b || (b = new n), y(P, k, r, h, b)
      }
    }
    return !!I && (b || (b = new n), u(t, e, r, h, y, b))
  }
}, function (t, e, r) {
  var n = r(15), o = r(77), i = r(78);

  function u(t) {
    var e = -1, r = null == t ? 0 : t.length;
    for (this.__data__ = new n; ++e < r;) this.add(t[e])
  }

  u.prototype.add = u.prototype.push = o, u.prototype.has = i, t.exports = u
}, function (t, e) {
  var r = "__lodash_hash_undefined__";
  t.exports = function (t) {
    return this.__data__.set(t, r), this
  }
}, function (t, e) {
  t.exports = function (t) {
    return this.__data__.has(t)
  }
}, function (t, e) {
  t.exports = function (t, e) {
    for (var r = -1, n = null == t ? 0 : t.length; ++r < n;) if (e(t[r], r, t)) return !0;
    return !1
  }
}, function (t, e) {
  t.exports = function (t, e) {
    return t.has(e)
  }
}, function (t, e, r) {
  var n = r(8), o = r(82), i = r(21), u = r(26), s = r(83), c = r(84), a = 1, f = 2, l = "[object Boolean]",
    p = "[object Date]", d = "[object Error]", v = "[object Map]", g = "[object Number]", h = "[object RegExp]",
    y = "[object Set]", b = "[object String]", m = "[object Symbol]", x = "[object ArrayBuffer]",
    _ = "[object DataView]", j = n ? n.prototype : void 0, w = j ? j.valueOf : void 0;
  t.exports = function (t, e, r, n, j, O, I) {
    switch (r) {
      case _:
        if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
        t = t.buffer, e = e.buffer;
      case x:
        return !(t.byteLength != e.byteLength || !O(new o(t), new o(e)));
      case l:
      case p:
      case g:
        return i(+t, +e);
      case d:
        return t.name == e.name && t.message == e.message;
      case h:
      case b:
        return t == e + "";
      case v:
        var S = s;
      case y:
        var A = n & a;
        if (S || (S = c), t.size != e.size && !A) return !1;
        var P = I.get(t);
        if (P) return P == e;
        n |= f, I.set(t, e);
        var k = u(S(t), S(e), n, j, O, I);
        return I.delete(t), k;
      case m:
        if (w) return w.call(t) == w.call(e)
    }
    return !1
  }
}, function (t, e, r) {
  var n = r(0).Uint8Array;
  t.exports = n
}, function (t, e) {
  t.exports = function (t) {
    var e = -1, r = Array(t.size);
    return t.forEach(function (t, n) {
      r[++e] = [n, t]
    }), r
  }
}, function (t, e) {
  t.exports = function (t) {
    var e = -1, r = Array(t.size);
    return t.forEach(function (t) {
      r[++e] = t
    }), r
  }
}, function (t, e, r) {
  var n = r(86), o = 1, i = Object.prototype.hasOwnProperty;
  t.exports = function (t, e, r, u, s, c) {
    var a = r & o, f = n(t), l = f.length;
    if (l != n(e).length && !a) return !1;
    for (var p = l; p--;) {
      var d = f[p];
      if (!(a ? d in e : i.call(e, d))) return !1
    }
    var v = c.get(t);
    if (v && c.get(e)) return v == e;
    var g = !0;
    c.set(t, e), c.set(e, t);
    for (var h = a; ++p < l;) {
      var y = t[d = f[p]], b = e[d];
      if (u) var m = a ? u(b, y, d, e, t, c) : u(y, b, d, t, e, c);
      if (!(void 0 === m ? y === b || s(y, b, r, u, c) : m)) {
        g = !1;
        break
      }
      h || (h = "constructor" == d)
    }
    if (g && !h) {
      var x = t.constructor, _ = e.constructor;
      x != _ && "constructor" in t && "constructor" in e && !("function" == typeof x && x instanceof x && "function" == typeof _ && _ instanceof _) && (g = !1)
    }
    return c.delete(t), c.delete(e), g
  }
}, function (t, e, r) {
  var n = r(87), o = r(89), i = r(27);
  t.exports = function (t) {
    return n(t, i, o)
  }
}, function (t, e, r) {
  var n = r(88), o = r(1);
  t.exports = function (t, e, r) {
    var i = e(t);
    return o(t) ? i : n(i, r(t))
  }
}, function (t, e) {
  t.exports = function (t, e) {
    for (var r = -1, n = e.length, o = t.length; ++r < n;) t[o + r] = e[r];
    return t
  }
}, function (t, e, r) {
  var n = r(90), o = r(91), i = Object.prototype.propertyIsEnumerable, u = Object.getOwnPropertySymbols,
    s = u ? function (t) {
      return null == t ? [] : (t = Object(t), n(u(t), function (e) {
        return i.call(t, e)
      }))
    } : o;
  t.exports = s
}, function (t, e) {
  t.exports = function (t, e) {
    for (var r = -1, n = null == t ? 0 : t.length, o = 0, i = []; ++r < n;) {
      var u = t[r];
      e(u, r, t) && (i[o++] = u)
    }
    return i
  }
}, function (t, e) {
  t.exports = function () {
    return []
  }
}, function (t, e, r) {
  var n = r(93), o = r(28), i = r(1), u = r(29), s = r(31), c = r(32), a = Object.prototype.hasOwnProperty;
  t.exports = function (t, e) {
    var r = i(t), f = !r && o(t), l = !r && !f && u(t), p = !r && !f && !l && c(t), d = r || f || l || p,
      v = d ? n(t.length, String) : [], g = v.length;
    for (var h in t) !e && !a.call(t, h) || d && ("length" == h || l && ("offset" == h || "parent" == h) || p && ("buffer" == h || "byteLength" == h || "byteOffset" == h) || s(h, g)) || v.push(h);
    return v
  }
}, function (t, e) {
  t.exports = function (t, e) {
    for (var r = -1, n = Array(t); ++r < t;) n[r] = e(r);
    return n
  }
}, function (t, e, r) {
  var n = r(4), o = r(5), i = "[object Arguments]";
  t.exports = function (t) {
    return o(t) && n(t) == i
  }
}, function (t, e) {
  t.exports = function () {
    return !1
  }
}, function (t, e, r) {
  var n = r(4), o = r(16), i = r(5), u = {};
  u["[object Float32Array]"] = u["[object Float64Array]"] = u["[object Int8Array]"] = u["[object Int16Array]"] = u["[object Int32Array]"] = u["[object Uint8Array]"] = u["[object Uint8ClampedArray]"] = u["[object Uint16Array]"] = u["[object Uint32Array]"] = !0, u["[object Arguments]"] = u["[object Array]"] = u["[object ArrayBuffer]"] = u["[object Boolean]"] = u["[object DataView]"] = u["[object Date]"] = u["[object Error]"] = u["[object Function]"] = u["[object Map]"] = u["[object Number]"] = u["[object Object]"] = u["[object RegExp]"] = u["[object Set]"] = u["[object String]"] = u["[object WeakMap]"] = !1, t.exports = function (t) {
    return i(t) && o(t.length) && !!u[n(t)]
  }
}, function (t, e) {
  t.exports = function (t) {
    return function (e) {
      return t(e)
    }
  }
}, function (t, e, r) {
  (function (t) {
    var n = r(23), o = e && !e.nodeType && e, i = o && "object" == typeof t && t && !t.nodeType && t,
      u = i && i.exports === o && n.process, s = function () {
        try {
          var t = i && i.require && i.require("util").types;
          return t || u && u.binding && u.binding("util")
        } catch (t) {
        }
      }();
    t.exports = s
  }).call(this, r(30)(t))
}, function (t, e, r) {
  var n = r(100), o = r(101), i = Object.prototype.hasOwnProperty;
  t.exports = function (t) {
    if (!n(t)) return o(t);
    var e = [];
    for (var r in Object(t)) i.call(t, r) && "constructor" != r && e.push(r);
    return e
  }
}, function (t, e) {
  var r = Object.prototype;
  t.exports = function (t) {
    var e = t && t.constructor;
    return t === ("function" == typeof e && e.prototype || r)
  }
}, function (t, e, r) {
  var n = r(102)(Object.keys, Object);
  t.exports = n
}, function (t, e) {
  t.exports = function (t, e) {
    return function (r) {
      return t(e(r))
    }
  }
}, function (t, e, r) {
  var n = r(22), o = r(16);
  t.exports = function (t) {
    return null != t && o(t.length) && !n(t)
  }
}, function (t, e, r) {
  var n = r(105), o = r(14), i = r(106), u = r(107), s = r(108), c = r(4), a = r(24), f = a(n), l = a(o), p = a(i),
    d = a(u), v = a(s), g = c;
  (n && "[object DataView]" != g(new n(new ArrayBuffer(1))) || o && "[object Map]" != g(new o) || i && "[object Promise]" != g(i.resolve()) || u && "[object Set]" != g(new u) || s && "[object WeakMap]" != g(new s)) && (g = function (t) {
    var e = c(t), r = "[object Object]" == e ? t.constructor : void 0, n = r ? a(r) : "";
    if (n) switch (n) {
      case f:
        return "[object DataView]";
      case l:
        return "[object Map]";
      case p:
        return "[object Promise]";
      case d:
        return "[object Set]";
      case v:
        return "[object WeakMap]"
    }
    return e
  }), t.exports = g
}, function (t, e, r) {
  var n = r(2)(r(0), "DataView");
  t.exports = n
}, function (t, e, r) {
  var n = r(2)(r(0), "Promise");
  t.exports = n
}, function (t, e, r) {
  var n = r(2)(r(0), "Set");
  t.exports = n
}, function (t, e, r) {
  var n = r(2)(r(0), "WeakMap");
  t.exports = n
}, function (t, e, r) {
  var n = r(33), o = r(27);
  t.exports = function (t) {
    for (var e = o(t), r = e.length; r--;) {
      var i = e[r], u = t[i];
      e[r] = [i, u, n(u)]
    }
    return e
  }
}, function (t, e, r) {
  var n = r(25), o = r(111), i = r(118), u = r(17), s = r(33), c = r(34), a = r(13), f = 1, l = 2;
  t.exports = function (t, e) {
    return u(t) && s(e) ? c(a(t), e) : function (r) {
      var u = o(r, t);
      return void 0 === u && u === e ? i(r, t) : n(e, u, f | l)
    }
  }
}, function (t, e, r) {
  var n = r(35);
  t.exports = function (t, e, r) {
    var o = null == t ? void 0 : n(t, e);
    return void 0 === o ? r : o
  }
}, function (t, e, r) {
  var n = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    o = /\\(\\)?/g, i = r(113)(function (t) {
      var e = [];
      return 46 === t.charCodeAt(0) && e.push(""), t.replace(n, function (t, r, n, i) {
        e.push(n ? i.replace(o, "$1") : r || t)
      }), e
    });
  t.exports = i
}, function (t, e, r) {
  var n = r(114), o = 500;
  t.exports = function (t) {
    var e = n(t, function (t) {
      return r.size === o && r.clear(), t
    }), r = e.cache;
    return e
  }
}, function (t, e, r) {
  var n = r(15), o = "Expected a function";

  function i(t, e) {
    if ("function" != typeof t || null != e && "function" != typeof e) throw new TypeError(o);
    var r = function () {
      var n = arguments, o = e ? e.apply(this, n) : n[0], i = r.cache;
      if (i.has(o)) return i.get(o);
      var u = t.apply(this, n);
      return r.cache = i.set(o, u) || i, u
    };
    return r.cache = new (i.Cache || n), r
  }

  i.Cache = n, t.exports = i
}, function (t, e, r) {
  var n = r(116);
  t.exports = function (t) {
    return null == t ? "" : n(t)
  }
}, function (t, e, r) {
  var n = r(8), o = r(117), i = r(1), u = r(12), s = 1 / 0, c = n ? n.prototype : void 0, a = c ? c.toString : void 0;
  t.exports = function t(e) {
    if ("string" == typeof e) return e;
    if (i(e)) return o(e, t) + "";
    if (u(e)) return a ? a.call(e) : "";
    var r = e + "";
    return "0" == r && 1 / e == -s ? "-0" : r
  }
}, function (t, e) {
  t.exports = function (t, e) {
    for (var r = -1, n = null == t ? 0 : t.length, o = Array(n); ++r < n;) o[r] = e(t[r], r, t);
    return o
  }
}, function (t, e, r) {
  var n = r(119), o = r(120);
  t.exports = function (t, e) {
    return null != t && o(t, e, n)
  }
}, function (t, e) {
  t.exports = function (t, e) {
    return null != t && e in Object(t)
  }
}, function (t, e, r) {
  var n = r(36), o = r(28), i = r(1), u = r(31), s = r(16), c = r(13);
  t.exports = function (t, e, r) {
    for (var a = -1, f = (e = n(e, t)).length, l = !1; ++a < f;) {
      var p = c(e[a]);
      if (!(l = null != t && r(t, p))) break;
      t = t[p]
    }
    return l || ++a != f ? l : !!(f = null == t ? 0 : t.length) && s(f) && u(p, f) && (i(t) || o(t))
  }
}, function (t, e) {
  t.exports = function (t) {
    return t
  }
}, function (t, e, r) {
  var n = r(123), o = r(124), i = r(17), u = r(13);
  t.exports = function (t) {
    return i(t) ? n(u(t)) : o(t)
  }
}, function (t, e) {
  t.exports = function (t) {
    return function (e) {
      return null == e ? void 0 : e[t]
    }
  }
}, function (t, e, r) {
  var n = r(35);
  t.exports = function (t) {
    return function (e) {
      return n(e, t)
    }
  }
}, function (t, e, r) {
  var n = r(126);
  t.exports = function (t) {
    var e = n(t), r = e % 1;
    return e == e ? r ? e - r : e : 0
  }
}, function (t, e, r) {
  var n = r(127), o = 1 / 0, i = 1.7976931348623157e308;
  t.exports = function (t) {
    return t ? (t = n(t)) === o || t === -o ? (t < 0 ? -1 : 1) * i : t == t ? t : 0 : 0 === t ? t : 0
  }
}, function (t, e, r) {
  var n = r(9), o = r(12), i = NaN, u = /^\s+|\s+$/g, s = /^[-+]0x[0-9a-f]+$/i, c = /^0b[01]+$/i, a = /^0o[0-7]+$/i,
    f = parseInt;
  t.exports = function (t) {
    if ("number" == typeof t) return t;
    if (o(t)) return i;
    if (n(t)) {
      var e = "function" == typeof t.valueOf ? t.valueOf() : t;
      t = n(e) ? e + "" : e
    }
    if ("string" != typeof t) return 0 === t ? t : +t;
    t = t.replace(u, "");
    var r = c.test(t);
    return r || a.test(t) ? f(t.slice(2), r ? 2 : 8) : s.test(t) ? i : +t
  }
}, function (t, e, r) {
  var n = r(129);
  t.exports = function () {
    return n.randomBytes(16)
  }
}, function (t, e) {
  t.exports = require("crypto")
}, function (t, e) {
  for (var r = [], n = 0; n < 256; ++n) r[n] = (n + 256).toString(16).substr(1);
  t.exports = function (t, e) {
    var n = e || 0, o = r;
    return [o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]]].join("")
  }
}]);
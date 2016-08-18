!function (t) {
    var e = function () {
    };
    e.prototype = {
        on: function (t, e) {
            this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(e)
        }, off: function (t, e) {
            this._events = this._events || {}, t in this._events != !1 && this._events[t].splice(this._events[t].indexOf(e), 1)
        }, trigger: function (t) {
            if (this._events = this._events || {}, t in this._events != !1)for (var e = 0; e < this._events[t].length; e++)this._events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
        }, triggerback: function (t) {
            this._events = this._events || {};
            var e = Array.prototype.slice.call(arguments, 1, arguments.length - 1), n = arguments[arguments.length - 1];
            if (t in this._events == !1)return void n.apply(n, e);
            var i = 0, s = this, r = function () {
                if (i == s._events[t].length)return void n.apply(n, e);
                var r = i;
                i += 1, s._events[t][r].apply(void 0, e)
            };
            e.push(r), r()
        }
    }, e.mixin = function (t) {
        for (var n = ["on", "off", "trigger", "triggerback"], i = 0; i < n.length; i++)"function" == typeof t ? t.prototype[n[i]] = e.prototype[n[i]] : t[n[i]] = e.prototype[n[i]];
        return t
    }, e.Mocker = function (t) {
        return t || this
    }, e.mixin(e.Mocker), e.Mocker.prototype.triggerback = function (t) {
        arguments[arguments.length - 1]()
    }, t.MicroEvent = e
}(this);
!function (n) {
    "use strict";
    var e = function () {
        return (new Date).getTime() + "" + Math.ceil(1e5 * Math.random())
    }, t = n.History = {};
    t.chain = [], t.current_index = -1, t.replaceState = function (n, e, i) {
        t.chain.pop(), t.current_index -= 1, t.pushState(n, e, i)
    }, t.pushState = function (n, i, r) {
        var a = e();
        t.chain.push({
            normalized: !0,
            title: i,
            url: r,
            hash: r,
            data: n || {},
            id: a,
            cleanUrl: r,
            hashedUrl: -1 === r.indexOf("?") ? r + "?&_suid=" + a : r + "&_suid=" + a
        }), t.current_index += 1, t.listener()
    }, t.getState = function () {
        return t.chain[t.current_index]
    }, t.back = function () {
        t.chain.pop(), t.current_index -= 1, t.listener()
    }, t.Adapter = {}, t.Adapter.bind = function (n, e, i) {
        t.listener = i
    }
}(window);
function nano(n, e) {
    return n.replace(/\{([\w\.]*)\}/g, function (n, t) {
        for (var r = t.split("."), f = e[r.shift()], u = 0, i = r.length; i > u; u++)f = f[r[u]];
        return "undefined" != typeof f && null !== f ? f : ""
    })
}
!function (i, t, o) {
    "use strict";
    i.riseup = i.riseup || {}, i.riseup.ripple = function (e, p, d, n, r, u, w, c, h) {
        var s = t('<div style="position: absolute;width: 0px;height: 0px;left: 0px;top: 10px;background: ' + w + ';border-radius: 50%;opacity: 0;display:block;"></div>')[0];
        t(e).prepend(s), (new o).fromTo(s, u, {
            width: "0px",
            height: "0px",
            opacity: c,
            left: p + "px",
            top: d + "0px"
        }, {
            width: $dom.outerWidth(!0),
            height: $dom.outerHeight(!0),
            opacity: 0,
            left: p - n / 2 + "px",
            top: d - r / 2 + "px"
        }).add(function () {
            i.setTimeout(function () {
                t(s).remove()
            }, 0), (h || function () {
            })()
        })
    }
}(window, window.jQuery || window.Zepto, window.TimelineMax);
!function (t, n) {
    "use strict";
    var r = function (t, r) {
        var c = 0, a = function () {
            c++, c == t && r.apply()
        }, u = [], i = function (a) {
            return function () {
                c++, u[a] = Array.prototype.slice.call(arguments), c == t && r.apply(n, u)
            }
        }, o = [];
        a.callback = function (t) {
            return o[t]
        };
        for (var e = 0; t > e; e++)o[e] = i(e);
        return a
    };
    r.timerout = function (t, c) {
        var a = new r(2, function () {
            t.apply(n, arguments[0])
        });
        return setTimeout(a.callback(1), c), a.callback(0)
    }, t.Waiter = r
}(this);
!function (t, n, e, i) {
    "use strict";
    var o = function () {
        return "cacher-" + (new Date).getTime() + "-" + Math.ceil(1e5 * Math.random())
    }, r = function () {
        var r = {}, a = function (t, o) {
            if (t = [].concat(t || []), 0 == t.length)return void(o || function () {
            })(!0);
            var r = [], a = new e(t.length, function () {
                o(!0, t, 0 == r.length ? i : r)
            });
            t.forEach(function (t) {
                n.get(t, function (n) {
                    o(!1, t, n), r.push(n), a()
                })
            })
        }, c = function (e, i, a) {
            if (!e) {
                var c = -1 != i.indexOf("?") ? i.substring(0, i.indexOf("?")) : i, d = o();
                r[c] = d;
                var u = n('<script type="text/template" data-resource="' + d + '" data-link="' + i + '" style="width:0px;height:0px;overflow:hidden;"></script>');
                u.text(a), n(t.document.body).append(u)
            }
        };
        return c.load = function (e, i) {
            var o = -1 != e.indexOf("?") ? e.substring(0, e.indexOf("?")) : e;
            i(n(t.document.body).find("script[data-resource=" + r[o] + "]").text())
        }, {load: a, cacher: c}
    };
    t.Loader = r
}(window, window.jQuery || window.Zepto, window.Waiter);
!function (t, e, i, r) {
    "use strict";
    var n = {}, o = function (t, e) {
        "undefined" != typeof t && 1 === arguments.length && "[object Number]" !== Object.prototype.toString.call(t) && "[object String]" !== Object.prototype.toString.call(t) && (e = t, t = r);
        var i = 2 === arguments.length && Object.prototype.toString.call(e) === !0;
        t = "undefined" == typeof t ? History.getState().id : t;
        var o = n[t] = n[t] || {};
        if ("undefined" != typeof e)for (var s in e)e.hasOwnProperty(s) && (o[s] = e[s]);
        return i && delete n[t], o
    }, s = function (t, e) {
        this.dom = t, this.options = e || {}, this.options.routers = "undefined" == typeof this.options.routers ? s.defaults.routers : this.options.routers, this._bind_events(t)
    };
    s.defaults = {routers: {}}, e.mixin(s), s.prototype._bind_events = function (e, i) {
        var r = this;
        History.Adapter.bind(t, "statechange", function () {
            var t = r.__is_initiative_redirect;
            r.__is_initiative_redirect = !1;
            var e = History.getState().data._ext;
            if ("undefined" != typeof e)for (var i in e)e.hasOwnProperty(i) && "[object String]" === Object.prototype.toString.call(e[i]) && 0 === e[i].indexOf("$function-persister-") && (e[i] = o(e[i], !0).fn);
            r._push(History.getState().hash, t, e)
        }), this.on(s.EVENT_SWITCH, this._on_switch.bind(this))
    }, s.prototype._on_switch = function (t, i, r, n, o) {
        var s = this;
        new e.Mocker(i).triggerback(a.EVENT_DETACH, t, s, n, function () {
            r.triggerback(a.EVENT_ATTACH, t, s, n, !!i, function () {
                new e.Mocker(i).triggerback(a.EVENT_DETACHED, t, s, n, function () {
                    r.triggerback(a.EVENT_ATTACHED, t, s, n, !!i, o)
                })
            })
        })
    }, s.prototype.redirect = function (e, i, n) {
        0 != e.indexOf("http://") && 0 != e.indexOf("https://") && 0 != e.indexOf("/") && (e = t.location.pathname.substring(0, t.location.pathname.lastIndexOf("/") + 1) + e);
        var s = this.match(e);
        if (!s)return !0;
        if (2 === arguments.length && "undefined" != typeof i && "[object Boolean]" != typeof i && (n = i, i = r), "undefined" != typeof n)for (var c in n)if (n.hasOwnProperty(c) && "[object Function]" === Object.prototype.toString.call(n[c])) {
            var u = "$function-persister-" + (new Date).getTime() + Math.ceil(1e3 * Math.random());
            o(u).fn = n[c], n[c] = u
        }
        var p = this, E = function () {
            p.__is_initiative_redirect = !0, History[i ? "replaceState" : "pushState"].bind(History)({_ext: n}, "undefined" != typeof s && null !== s && "undefined" != typeof s.title && null !== s.title ? s.title : r, e)
        };
        return "undefined" == typeof this.resource ? E() : this.resource.triggerback(a.EVENT_SAVE, function (t) {
            o({resource: p.resource, persistedstate: t});
            E()
        }), !1
    }, s.prototype.match = function (t) {
        var e = -1 != t.indexOf("?") ? t.substring(0, t.indexOf("?")) : t, n = {};
        for (var o in this.options.routers || {})if (n.params = i(o).parse(e), "undefined" != typeof n.params && null !== n.params) {
            n.route = o;
            var s = this.options.routers[o];
            n.title = s.title, n.resource = function () {
                return "[object Function]" === Object.prototype.toString.call(s.resource) ? s.resource.apply(s, arguments) : s.resource
            }
        }
        return n.resource ? n : r
    }, s.prototype._push = function (t, e, i) {
        var r = this.match(t);
        if (!r || !r.resource)throw new Error("invalid-link:" + t);
        var n = this.resource, c = e ? r.resource(this, r.route, t, r.params, i) : o().resource;
        this.resource = c;
        var u = this;
        this.triggerback(s.EVENT_SWITCH, e, n, c, t, function () {
            u.triggerback(s.EVENT_SWITCHED, e, n, c, t, function () {
                e || c.triggerback(a.EVENT_RESTORE, o().persistedstate, function () {
                })
            })
        })
    }, s.prototype.startup = function (t) {
        (t || function () {
        })()
    }, s.EVENT_SWITCH = "switch", s.EVENT_SWITCHED = "switched";
    var a = function (t, e, i, r, n) {
        this.app = t, this.route = e, this.hash = i, this.params = r || {}, this.ext = n, this._bind_events()
    };
    e.mixin(a), a.prototype._bind_events = function () {
        var t = this;
        [a.EVENT_ATTACH, a.EVENT_ATTACHED, a.EVENT_DETACH, a.EVENT_DETACHED, a.EVENT_SAVE, a.EVENT_RESTORE].forEach(function (e) {
            t["on_" + e] && t.on(e, t["on_" + e].bind(t))
        })
    }, a.EVENT_ATTACH = "attach", a.EVENT_ATTACHED = "attached", a.EVENT_DETACH = "detach", a.EVENT_DETACHED = "detached", a.EVENT_SAVE = "save", a.EVENT_RESTORE = "restore", s.Resource = a, t.Mapp = s
}(window, window.MicroEvent, window.routeMatcher);
!function (n, o) {
    "use strict";
    var t, i, c = !1;
    n.signature = function (n, r, e, u, f) {
        if ("[object Boolean]" === Object.prototype.toString.call(r) && (f = u, u = e, e = r, r = void 0), i = r, u = u || o.open.bind(o, {
                    type: 2,
                    content: "正在签名，请稍等..."
                }), t || e || (t = u()), !c) {
            f = f || o.close.bind(o);
            var a = function (n) {
                t && (e || f(t), t = void 0), c = !1, (i || function () {
                })(n), i = void 0
            };
            n = "[object Function]" === Object.prototype.toString.call(n) ? n : function (n) {
                return function (o) {
                    o(n)
                }
            }(n), n(function (n) {
                wx.config(n), wx.ready(function () {
                    a()
                }), wx.error(function (n) {
                    a(new Error(n.errMsg))
                })
            })
        }
    }
}(window, window.layer);
!function (t) {
    "use strict";
    t.dcwrapper = function (t) {
        var n = function (n) {
            return 0 === n.code ? void t(void 0, n.data) : void t(n.message? new Error(n.message) : new Error)
        };
        return n.errorhandler = function (n, r, e) {
            if (n.statusText) {
                var o = n.statusText;
                r = new Error(o || e)
            }
            t(r)
        }, n
    }, t.dcstringify = function (t) {
        return "dataContent=" + (t ? JSON.stringify(t) : "")
    }
}(window);
!function (t) {
    "use strict";
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    Math.uuid = function (t, a) {
        var n, r = e, o = [];
        if (a = a || r.length, t)for (n = 0; t > n; n++)o[n] = r[0 | Math.random() * a]; else {
            var i;
            for (o[8] = o[13] = o[18] = o[23] = "-", o[14] = "4", n = 0; 36 > n; n++)o[n] || (i = 0 | 16 * Math.random(), o[n] = r[19 == n ? 3 & i | 8 : i])
        }
        return o.join("")
    }
}(window), function (t) {
    function e(t, e, a, n, r, o) {
        t = String(t);
        for (var i = 0, c = 0, d = t.length, u = "", f = 0; d > c;) {
            var l = t.charCodeAt(c);
            for (l = 256 > l ? a[l] : -1, i = (i << r) + l, f += r; f >= o;) {
                f -= o;
                var h = i >> f;
                u += n.charAt(h), i ^= h << f
            }
            ++c
        }
        return !e && f > 0 && (u += n.charAt(i << o - f)), u
    }

    for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = "", r = [256], o = [256], i = 0, c = {
        encode: function (t) {
            var e = t.replace(/[\u0080-\u07ff]/g, function (t) {
                var e = t.charCodeAt(0);
                return String.fromCharCode(192 | e >> 6, 128 | 63 & e)
            }).replace(/[\u0800-\uffff]/g, function (t) {
                var e = t.charCodeAt(0);
                return String.fromCharCode(224 | e >> 12, 128 | e >> 6 & 63, 128 | 63 & e)
            });
            return e
        }, decode: function (t) {
            var e = t.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (t) {
                var e = (15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2);
                return String.fromCharCode(e)
            }).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (t) {
                var e = (31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1);
                return String.fromCharCode(e)
            });
            return e
        }
    }; 256 > i;) {
        var d = String.fromCharCode(i);
        n += d, o[i] = i, r[i] = a.indexOf(d), ++i
    }
    var u = t.base64 = function (t, e, a) {
        return e ? u[t](e, a) : t ? null : this
    };
    u.btoa = u.encode = function (t, n) {
        return t = u.raw === !1 || u.utf8encode || n ? c.encode(t) : t, t = e(t, !1, o, a, 8, 6), t + "====".slice(t.length % 4 || 4)
    }, u.atob = u.decode = function (t, a) {
        t = String(t).split("=");
        var o = t.length;
        do--o, t[o] = e(t[o], !0, r, n, 6, 8); while (o > 0);
        return t = t.join(""), u.raw === !1 || u.utf8decode || a ? c.decode(t) : t
    }
}(window.jQuery || window.Zepto), function (t, e, a, n) {
    "use strict";
    var r, o = function (a, c) {
        e.ajax({
            type: "get",
            url: "http://192.168.1.101:8043/web/wallmsgRead/" + a + "/fetchMsg.html?type=chat&from=" + ("undefined" == typeof r ? "" : r) + "&limit=51",
            dataType: "jsonp",
            error: function (e, r, i) {
                t.setTimeout(o.bind(n, a, c), 3e3),console.error(i)
            },
            success: function (e) {
                e = e || [];
                var d = e.length > 50;
                e = i.toLocal(d ? e.slice(0, 50) : e), r = e.length > 0 ? e[e.length - 1].creatime : r, c(e), t.setTimeout(o.bind(n, a, c), d ? 500 : 3e3)
            }
        })
    }, i = t.dservice = function (t, e, a) {
        o(e, function (t) {
            a(n, t)
        })
    };
    i.toLocal = function (t) {
        return t = [].concat(t || []), t.forEach(function (t) {
            t.data.content.small && (t.data.content.small = t.data.content.small+ "_200x200." + t.data.content.small.substring(t.data.content.small.lastIndexOf(".") + 1))
        }), t
    }, i.load = function (t, a, r, o) {
        //var auth = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE0NjYyNjE2MjMsInVzZXJuYW1lIjoiY2hlbnNoaSIsImlhdCI6IjE0NjYxNzUyMjMifQ.ZbkEy0Syvy9Mls4WDuBvd4tEl9E0s94CA2fjVrRDJMNu3j4P3eNetzvRrcw_PeSYO3Byr_a9r653GQaSgPtcH4FoZzAEpF-6wMWQwLAi5E1TkE9f4ZaBy2iJaUZnVn61jnLeZ1mZeQBj2D65OFk5b5OU25kbzxhP4cPr98qEqJgKcK_P4lwq5rQlht9efLAeGe0Ph9MXkIOHn-qNS3F6Vfr8-ZvdmI6rOMe4lsgYP07jrrWMBBBL4cWKGkYmt4xXbCZsbzSWoiM8bWH5q0RusUL36sWGqFK29BRv7pyC73KtlTyV3LE7SU7LB9T7r0R7n66FHK3zY4JvXW8b-nXAA5aJHIsyBCEFqR4aookd6KURPgHpJBV151WIZs4X6LZsA69vwFgHnERf6vboc4Kg19Z0aGwcZLjpBQT5-QowN2XRcrXjGHYcVo38HOoU8yy_wRnKGHjGOqA451Xx1m_0u7ksuHBsBGk12GjTmRENtR7MQ6B--51mCDv7-05fSNtvN_F04_6Gph5vIqZCEAwGfHEfjr4BQBbsnq4rqfMWFq7Pcx065quYLn5cav7Cun5Mhtkr3vqXziB0fF74TMSoJpPvjiFDvXg5hBK0WsF-mCGT8jvkG4grOft8R_FifDGutTMy76_vH4622G_2EAK0TDChd8OxYmk9nFwUKwd7638";
        e.ajax({
            type: "get",
            url: t,
            //dataType: "jsonp",
            dataType: "json",
            error: function (t, e, a) {
                o(a)
            },
            success: function (t) {
                o(n, t)
            }
        })
    }, i.loadpre = function (t, e, a, o) {
        a = a || 20, this.load("/wechat/msgwall/messages?_format=json", e, a + 1, function (t, e) {
            if (t)return void o(t, n);
            e = [].concat(e || []);
            var i = e.length > a;
            i && (e = e.slice(1)), r = e.length > 0 ? e[e.length - 1].creatime : r, o(n, e, i)
        })
    }, i.loadnext = function (t, e, a, o) {
        a = a || 20, this.load("/web/wallmsgRead/" + t + "/loadnext.html?", e, a + 1, function (t, e) {
            if (t)return void o(t, n);
            e = [].concat(e || []);
            var i = e.length > a;
            i && (e = e.slice(0, e.length - 1)), r = e.length > 0 ? e[e.length - 1].creatime : r, o(n, e, i)
        })
    }, i.requestInteractions = function (t, a) {
        e.getJSON("/web/wallmsgRead/" + t + "/status.html", Waiter.timerout(a, 500))
    }, i.send = function (t, a, n, r, o) {
        a = "picture" === a ? "image" : a;
        var c = dcwrapper(function (t, e) {
            t || (e.data = i.toLocal(e.data)[0]), o(t, e)
        });
        var url;
        if(a=="image"){
            url = "/wechat/media/"+r+"?_format=json";
        }
        else{
            url = "/wechat/text?_format=json";
        }
        e.ajax({
            url: url,
            data: {text: r},
            dataType: "json",
            type: "post",
            success: c,
            error: c.errorhandler
        })
    }
}(this, window.jQuery || window.Zepto, window.MicroEvent);
!function (i) {
    "use strict";
    var n, e, t = i.requestAnimationFrame || i.webkitRequestAnimationFrame || i.mozRequestAnimationFrame || i.oRequestAnimationFrame || i.msRequestAnimationFrame || function (n) {
            i.setTimeout(n, 1e3 / 60)
        };
    i.indicator = function (o, a) {
        var r = i.innerHeight, m = (new Date).getTime();
        n || ((o || function () {
        })(void 0, r, void 0, 0), n = r, e = m), n !== r ? ((o || function () {
        })(n, r, r > n ? "expand" : "collapse", m - e), n = r, e = m) : (a || function () {
        })(r);
        var u = t(i.indicator.bind(i, o, a));
        return i.clearTimeout.bind(i, u)
    }
}(window);
!function (t, n, o, e) {
    "use strict";
    function i() {
    }

    var r = function (t, n) {
        o.prototype.constructor.call(this, t, n)
    };
    n.extend(r.prototype, o.prototype), r.prototype.load = function (t, o) {
        n.get(t, o)
    }, r.prototype.startup = function (e) {
        this.isiphone = /iPhone/gi.test(t.navigator.userAgent);
        var i = this;
        o.prototype.startup.call(this, function () {
            n(i.dom).on("tap", "a", function (t) {
                var o = n(this).attr("href");
                return o && 0 !== o.indexOf("javascript:") ? i.redirect(o, !1) : !1
            }).on("click", function () {
                return !1
            }), e(), /*dservice(i.wsdomain, i.flag, function (t, n) {
                (i.on_receive_message || function () {
                })(t, n)
            }),*/ t.indicator(function (t, n, o, e) {
                i.trigger("win-resize", t, n, o, e)
            }, function (t) {
                i.trigger("win-height", t)
            })
        })
    }, r.showNotify = function (t) {
        layer.open({type: 3, content: t})
    }, r.prototype.signatured = function (n, o, r) {
        if ("[object Boolean]" === Object.prototype.toString.call(o) && (r = o, o = e), this._signatured)return void(o || i)();
        var a = this;
        t.signature(n, function (t) {
            return t ? void o(t) : (a._signatured = !0, void(o || i)())
        }, o, r)
    }, t.KpwechatMain = r;
    var a = function () {
        o.Resource.prototype.constructor.apply(this, arguments)
    };
    n.extend(a.prototype, o.Resource.prototype), a.prototype._bind_events = function () {
        var t = this;
        this.on(o.Resource.EVENT_ATTACH, function (o, i, r, a, p) {
            var c = n('.mapp-page-item[data-hash="' + encodeURIComponent(r) + '"]');
            t.container = c.length > 0 ? c[0] : e, t.container || (t.container = t.buildContainer(r)), p()
        }), o.Resource.prototype._bind_events.apply(this, arguments)
    }, a.prototype.buildContainer = function (t, o) {
        var e = n(n("#page-container-template").html()), i = this;
        return this.app.load(t, function (t) {
            t = t.replace(/{flag}/gi, i.params.flag), e.append(t), (o || function () {
            })()
        }), e.attr("data-resource-id", this.id).attr("data-hash", encodeURIComponent(t)).appendTo(this.app.dom)[0]
    }, a.prototype.on_attached = function () {
        n(self.container).hide(), arguments[arguments.length - 1]()
    }, a.prototype.on_detach = function (t, n, o, e) {
        layer.closeAll(), e()
    }, r.KpResource = a
}(window, window.jQuery || window.Zepto, window.Mapp);
!function (t, e, o, i, n, r) {
    "use strict";
    function a(t, e) {
        t = [].concat(t || []);
        for (var o = [], i = 0; i < t.length; i++)o.push(t[e]);
        return o
    }

    function s(e) {
        t.setTimeout(e, 0)
    }

    function c() {
    }

    function l(t, e, o, i, n) {
        var r = d(t, e, o), a = (new Date).getTime(), s = !1, l = function () {
            var t = (new Date).getTime() - a, e = r(t), d = i(e);
            return s === !0 || d === !1 || t > o ? void(n || c)(t, e, s) : void h(l)
        };
        return h(l), function () {
            s = !0
        }
    }

    function d(t, e, o) {
        var i = e - t;
        return function (n) {
            return n >= o ? e : i * (n / o) + t
        }
    }

    function p() {
        if (!(v.length <= g)) {
            var t = v.length - b - 1;
            v.splice(t, b), _.splice(t, b)
        }
    }

    function u() {
        v.length <= g || (v.splice(0, b), _.splice(0, b))
    }

    var h = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function (e) {
            t.setTimeout(e, 1e3 / 60)
        }, f = function () {
        o.prototype.constructor.apply(this, Array.prototype.slice.call(arguments)), this.limit = 20, this.$content = e(this.dom).find(".room-content"), this.$ptr = this.$content.find(".ptr"), this.app.on("disconnected", this.mark_data_newest.bind(this, !1))
    };
    e.extend(f.prototype, o.prototype), f.prototype.createSocket = function () {
        var c = this;
        this.socket = new Socket({
            onMessage : function(uri,payload) {
                var json = payload.msg;
                var system = payload.msg.system;
                if(system&&system.cmd==='newMessage'){
                    var e = payload.msg.data;
                    if(e.type==='notify'){
                        if($.inArray(c.app.usr.id,e.winner)!=-1)
                            c.onmessage('lottery',e);
                    }else if(e.openid!=c.app.usr.id){
                        c.onmessage('newdata',e);
                    }
                }
            },
            onClose : function(e) {
                // 连接断了后进行自动重连
                setTimeout(function(){
                    //Debug.log('wall','正在重连....');
                    c.socket.connect();
                },1000);
            }
        });
        this.socket.connect();
    },f.prototype.mark_data_newest = function (t) {
        this._is_data_newest = t
    }, f.prototype.is_data_newest = function () {
        return this._is_data_newest
    }, f.prototype.on_detach = function () {
        e(this.container).remove(), document.querySelector(".room-footer").style.visibility = "hidden", document.querySelector(".room-content").style.visibility = "hidden", this.__stop_resize = !0, this.app.off("win-resize", this._on_win_resize.bind(this)), this.app.off("win-height", this._on_win_height.bind(this)), o.prototype.on_detach.apply(this, arguments)
    }, f.prototype.on_detached = function () {
        arguments[arguments.length - 1]()
    }, f.prototype.on_attach = function () {
        this.__stop_resize = !1, document.querySelector(".room-footer").style.visibility = "visible", document.querySelector(".room-content").style.visibility = "visible", arguments[arguments.length - 1]()
    }, f.prototype.on_attached = function (o, i, n, r, a) {
        if (e(".share-button").on("tap", showShareMask), !o)return a();
        var c = this;
        this.app.on_receive_message = function (e, o) {
            t.setTimeout(c.onmessage.bind(c, e, o), 100)
        }, e("#wall-title").html(this.app.title), this.scroller = document.querySelector(".room-content-inner"), this.indicator = document.querySelector(".ptr"), this.mlist = document.querySelector(".mlist"), this.$mlist = e(this.mlist), e(t).on("resize", function () {
            c.__stop_resize
        }).trigger("resize"), document.querySelector("html").style.height = document.querySelector("html").style.minHeight = document.body.style.height = document.body.style.minHeight = t.innerHeight + "px", document.querySelector(".room-content").style.height = c.scroller.style.height = c.mlist.style.minHeight = t.innerHeight - 46 - 46 + "px", e("#emotion-button").on("tap", this.show_emotion_menu.bind(this)), e("#emotion-close-button").on("tap", this.hide_emotion_menu.bind(this)), this.emojiarea = t.emojiarea = e("#inputor").emojiarea({
            button: "#emotion-button",
            wysiwyg: !1
        }), e(this.container).on("tap", ".room-footer .emoji-wysiwyg-editor", function () {
            e(".emoji-menu").hide()
        }).on("tap", ".room-footer a.send-button", function () {
            e(".emoji-menu").hide();
            var o = e("#inputor");


            function replaceAll(str,s1,s2){
                return str.replace(new RegExp(s1,"gm"),s2);
            }
            o.trigger("blur"), t.setTimeout(function () {
                var h = o.html() || "", i = h.replace(/<br>/gi, "").replace(/<div>/gi, "<span>").replace(/<\/div>/gi, "</span>").replace(/<img /gi, '<img class="wechat-emoji" '), n = c.emojiarea.val();

                var icons = e.emojiarea.icons, path = e.emojiarea.path, len = icons.length;

                var icon={}

                for (var index = 0; len > index; index++) {


                      icon = $.extend(icon, icons[index].icons);

                    //for (var l in icon){
                    //   // var reg=new RegExp(l,"g"); //创建正则RegExp对象
                    //    var reg=eval('/'+l+'/igm')
                    //    n = n.replace(reg, '<img class="wechat-emoji" src="' + path+'/' + icon[l] + '">');
                    //    console.log(n)
                    //}
                }

                n=n.replace(new RegExp("\\[(.*?)\\]","gm"),function(m){
                    return icon[m]?'<img class="wechat-emoji" src="' + path+'/' + icon[m] + '">':m
                });
               // n=replaceAll(n,",icon["[$1]"])

                console.log(n)
                return n ? (n = n.replace(/\u00a0/gm, ""), o.empty(), o.val(""), o.css("height", ""), o.keyup(), void t.setTimeout(function () {
                    c.onsendtext(n, i)
                }, 150)) : void layer.open({type: 3, content: "请正确输入消息!"})
            }, 300)
        }), e(this.container).on("keyup change blur focus", "#inputor", function () {
            var t = c.emojiarea.val();
            t = t && t.replace(/^\s*(.*?)\s*$/, "$1"), e(this).closest(".room-footer-bar")[t ? "addClass" : "removeClass"]("for-send")
        }), e(this.container).on("tap", ".mitem-content-wraper .mitem-content.image > p > a", function () {
            var o = e(this).attr("href"), i = [];
            return e(".mitem-content.image > p > a").each(function () {
                var t = e(this).closest(".mlist-item").attr("data-picture-path");
                t && -1 === i.indexOf(t) && i.push(t)
            }), c.app.signatured(t.config, c.previewPicture.bind(c, o, i)), !1
        }).on("click", function () {
            return !1
        }).on("tap", ".room-header a.close", function () {
            t.setTimeout(function () {
                History.back()
            }, 600)
        }), e(this.container).on("tap", ".room-content,.room-header,.room-footer .inputor-wrapper,.room-footer .choose-pic,.room-footer .send-button,#emotion-button,.interaction-close-button", this.hideInteractionBox.bind(this)), e(this.container).on("tap", ".interaction", function (t) {
            t.stopPropagation(), "inline-block" === document.querySelector(".interaction-box").style.display ? c.hideInteractionBox(function () {
            }) : (c.hide_emotion_menu(), c.showInteractionBox(function () {
            }))
        }).on("tap", ".interaction-item a", function () {
            if(e(this).attr("class")=="choose-pic"){
                c.app.signatured(t.config, c.onchoosepicture.bind(c))
            }else{
                t.open(e(this).attr("href"));
            }
        }), this.container.addEventListener("touchstart", function (t) {
            c._touching_state = 0, c.interrupt()
        }), this.container.addEventListener("touchmove", function (t) {
            c._touching_state = 1, t.stopPropagation()
        }), this.container.addEventListener("touchend", function (t) {
            delete c._touching_state
        }), this.container.addEventListener("mousedown", function () {
            delete c._touching_state, c.interrupt()
        }), s(this.onloadpre.bind(this)), this.createSocket(),this.mark_data_newest(!0);
        var l;
        //this.scroller.onscroll = function () {
        //    return "undefined" == typeof l ? void(l = c.scroller.scrollTop) : (c.direction = l > c.scroller.scrollTop ? "up" : "down", l = c.scroller.scrollTop, "up" === c.direction && c.scroller.scrollTop <= 200 ? void c.onloadpre() : "down" === c.direction && c.scroller.scrollHeight - c.scroller.scrollTop - c.scroller.clientHeight <= 200 ? void c.onloadnext() : void 0)
        //};
        document.querySelector(".room-content");
        this._on_win_resize = function (t, e, o, i) {
        }, this._on_win_height = function (t) {
            return
        }, this.app.on("win-resize", this._on_win_resize.bind(this)), this.app.on("win-height", this._on_win_height.bind(this)), a()/*, dservice.requestInteractions(c.app.flag, function (t) {
            t = t || [], 0 === t.length && e(".interaction-notify").show(), e(".interaction-item").removeClass("enable").each(function () {
                var o = e(this);
                -1 !== t.indexOf(o.attr("data-type")) && o.addClass("enable")
            })
        })*/
    }, f.prototype.show_emotion_menu = function () {
        this._emotion_enabled = !0, e(".inputor-wrapper").addClass("emotion-enabled")
    }, f.prototype.hide_emotion_menu = function () {
        this._emotion_enabled = !1, e(".inputor-wrapper").removeClass("emotion-enabled"), e(".emoji-menu").hide()
    }, f.prototype.showInteractionBox = function (t) {
        if (!this.__is_hiding && !this.__is_loading) {
            this.__is_loading = !0;
            var o = this, i = this.loadTimeline = new TimelineMax({paused: !0}).add(function () {
                e(".room-footer").addClass("interaction-mode")
            }).set(".interaction-box", {display: "inline-block"}).fromTo(".interaction-box", .1, {
                bottom: "46px",
                height: "0px"
            }, {
                bottom: "46px",
                height: "95px"
            }).to(".interaction-box", .1, {height: "auto"}).fromTo(".interaction-box", .1, {backgroundColor: "rgba(238,238,238,1)"}, {backgroundColor: "rgba(189,199,217,0.9)"}).staggerFromTo(e(".interaction-item"), .1, {
                transform: "scale(0)",
                opacity: 0
            }, {
                transform: "scale(1)",
                opacity: 1
            }, .03).fromTo(".interaction-control-bar", .1, {opacity: 0}, {opacity: 1}).add(function () {
                o.__is_loading = !1
            }).add(t);
            i.play()
        }
    }, f.prototype.hideInteractionBox = function () {
        if (!this.__is_hiding && !this.__is_loading) {
            this.__is_hiding = !0;
            var t = new TimelineMax({paused: !0});
            t.add(function () {
                e(".room-footer").removeClass("interaction-mode")
            }).fromTo(".interaction-control-bar", .1, {opacity: 1}, {opacity: 0}), "" === document.querySelector(".interaction-item:first-child").style.display && t.staggerFromTo(document.querySelectorAll(".interaction-item"), .1, {
                transform: "scale(1)",
                opacity: 1
            }, {transform: "scale(0)", opacity: 0});
            var o = this;
            t.to(".interaction-box", .1, {backgroundColor: "rgba(238,238,238,1)"}).to(".interaction-box", .1, {
                height: "0px",
                bottom: "46px"
            }).set(".interaction-box", {display: "none"}).add(function () {
                o.__is_hiding = !1
            }), t.play()
        }
    }, f.prototype.previewPicture = function (t, e) {
        wx.previewImage({current: t, urls: e})
    }, f.prototype.filter = function (t) {
        if (t = [].concat(t || []), "undefined" == typeof this.filters || 0 === this.filters.length)return t;
        for (var e = [], o = 0; o < t.length; o++)for (var i = 0; i < this.filters.length; i++) {
            var n = this.filters[i](t[o]);
            "undefined" != typeof n && e.push(n)
        }
        return e
    }, f.prototype.onloadpre = function () {
        if (!this._loadingpre) {
            this._loadingpre = !0;
            var t = e(".mlist-item:first-child").attr("data-creatime");
            t = "undefined" == typeof t ? r : parseInt(t);
            var o = this;
            e(this.indicator).removeClass("normal nomoredata").addClass("loading"), this.loadpre(t, function (t, i, n) {
                return e(o.indicator).removeClass("loading"), e(o.indicator)[n ? "removeClass" : "addClass"]("nomoredata"), t ? (console.error(t), void layer.open({
                    type: 3,
                    content: "请求数据失败"
                })) : void o.scrollToTop(function (t) {
                    var e = 0;
                    if (i && i.length > 0) {
                        var n = o.buildElements(i);
                        o.prepend(n, !0)
                    } else e = 0;
                    o.keepbycrop(o.direction, 60, 10), (t || c)(e, function () {
                        o._loadingpre = !1
                    })
                })
            })
        }
    }, f.prototype.prepend = function (e, o) {
        if (e = [].concat(e), o === !1 || "undefined" == typeof o)return void this.$mlist.append(e);
        for (var i = 0; i < e.length; i++)e[i].style.visibility = "hidden";
        this.$mlist.prepend(e);
        var n = 0;
        for (i = 0; i < e.length; i++)n += parseFloat(t.getComputedStyle(e[i]).height.replace(/[^0-9|.]+/, ""));
        for (i = 0; i < e.length; i++)e[i].style.visibility = "visible";
        this.scroller.scrollTop += n
    }, f.prototype.keepbycrop = function (o, i, n) {
        i = i || 100;
        var r = document.querySelectorAll(".mlist-item"), a = r.length > i;
        if (a) {
            n = n || 10, r = [].slice.call(r);
            var c = this;
            if ("up" === o)return void s(function () {
                e(r.slice(r.length - n - 1)).remove(), c.mark_data_newest(!1)
            });
            for (var l = r.slice(0, n), d = 0, p = 0; p < l.length; p++)d += parseFloat(t.getComputedStyle(l[p]).height.replace(/[^0-9|.]+/, "")), l[p].style.visibility = "hidden";
            e(l).hide(), this.scroller.scrollTop += d, s(function () {
                e(l).remove()
            })
        }
    }, f.prototype.loadpre = function (t, e, o) {
        switch (arguments.length) {
            case 1:
                o = t, t = e = r;
                break;
            case 2:
                o = e, e = r
        }
        var i = w("top", t, e);
        return i !== !1 ? void o(r, i) : void dservice.loadpre(this.app.flag, t, e, o)
    }, f.prototype.onloadnext = function () {
        if (!this._loadingnext && this.is_data_newest() !== !0) {
            this._loadingnext = !0;
            var t = e(".mlist-item:last-child").attr("data-creatime");
            t = "undefined" == typeof t ? r : parseInt(t);
            var o = this;
            this.loadnext(t, this.limit, function (t, e, i) {
                if (o.mark_data_newest(!i), o._loadingnext = !1, t)return console.error(t), void layer.open({
                    type: 3,
                    content: "请求数据失败"
                });
                o.keepbycrop(o.direction, 60, o.limit);
                for (var n = o.buildElements(e || []) || [], r = 0; r < n.length; r++) {
                    var a = n[r], s = a.getAttribute("data-id"), c = o.$mlist.find('[data-id="' + s + '"]');
                    c.length > 0 ? c.replaceWith(a) : o.$mlist.append(a)
                }
            })
        }
    }, f.prototype.loadnext = function (t, e, o) {
        switch (arguments.length) {
            case 1:
                o = t, t = e = r;
                break;
            case 2:
                o = e, e = r
        }
        var i = w("bottom", t, e);
        return i !== !1 ? void o(r, i) : void dservice.loadnext(this.app.flag, t, e, o)
    }, f.prototype.scrollToTop = function (t) {
        var e = this;
        t(function (t, o) {
            if (1 === arguments.length && (o = t, t = r), e._scroll_interrupt === !0)return (o || c)(r, r, !0), void(e._scroll_interrupt = r);
            var i;
            i = "undefined" == typeof t ? document.querySelector(".mlist-item:first-child").offsetTop : e.scroller.scrollTop - parseFloat(t), e._scroll_interrupt = l(e.scroller.scrollTop, i, 300, function (t) {
                e.scroller.scrollTop = t
            }, function (t, i, n) {
                e._scroll_interrupt = r, (o || c)(t, i, n)
            })
        })
    }, f.prototype.scrollToBottom = function (t, e) {
        var o = this, i = o.scroller.scrollHeight - o.scroller.scrollTop - o.scroller.clientHeight < 30;
        t(function () {
            return "undefined" != typeof o._scroll_interrupt ? void(e || c)(r, r, !0) : i && "undefined" == typeof o._touching_state ? void l(o.scroller.scrollTop, o.scroller.scrollHeight, 1300, function (t) {
                o.scroller.scrollTop = t
            }, e) : void(e || c)()
        })
    }, f.prototype.interrupt = function () {
        "[object Function]" === Object.prototype.toString.call(this._scroll_interrupt) ? this._scroll_interrupt() : this._loadingpre && (this._scroll_interrupt = !0)
    };
    var m = [], y = !1;
    f.prototype.queue = function (t) {
        m.push(t), y || this._notify_next()
    }, f.prototype._notify_next = function () {
        var t = m.shift();
        return "undefined" == typeof t ? (y = !1, !1) : (y = !0, void this.notify(t, r, this._notify_next.bind(this), function () {
            return m.length > 0
        }))
    }, f.prototype.notify = function (t, o, i, n) {
        var r = this.buildElement(t, this.app.usr.id);
        r = r.querySelector(".notify");
        var a = e(".notify-tip .notify").length, s = new TimelineMax({paused: !0});
        "undefined" != typeof this._notify_timer && (clearTimeout(this._notify_timer), delete this._notify_timer);
        var l = this, d = function () {
            (o || c)(), l._notify_timer = setTimeout(function () {
                var t = (n || c)();
                return t === !0 ? (delete l._notify_timer, void(i || emptfunction)()) : void p(function () {
                    delete l._notify_timer, (i || emptfunction)()
                })
            }, 3e3)
        };
        e(".notify-tip").prepend(r), 0 === a ? s.add([TweenMax.to(".notify-tip", .3, {
            opacity: 1,
            marginTop: "46px"
        }), TweenMax.to(".notify-tip .notify:nth-child(1)", .3, {
            opacity: 1,
            delay: .1,
            transform: "translateY(0%)"
        })]).add(d) : (e(".notify-tip .notify:nth-child(2)").css("transform", "translateY(-100%)"), s.add([TweenMax.to(".notify-tip .notify:nth-child(2)", .3, {
            opacity: 0,
            onComplete: function () {
                e(".notify-tip .notify:nth-child(2)").remove()
            }
        }), TweenMax.to(".notify-tip .notify:nth-child(1)", .3, {
            opacity: 1,
            delay: .1,
            transform: "translateY(0%)"
        })]).add(d)), s.play();
        var p = function (t) {
            "undefined" != typeof l._notify_timer && new TimelineMax({paused: !0}).add([TweenMax.to(".notify-tip .notify:nth-child(1)", .3, {
                opacity: 0,
                transform: "translateY(-100%)"
            }), TweenMax.to(".notify-tip", .3, {opacity: 0, marginTop: "-14px", delay: .2})]).add(function () {
                clearTimeout(l._notify_timer), (t || c)(), e(".notify-tip").empty()
            }).play()
        };
        return p
    }, f.prototype.onmessage = function (t, o) {
        if ("close" === t)return console.log("socket closed"), void this.mark_data_newest(!1);
        if ("open" === t)return console.log("socket opened"), void this.onloadnext();
        if (this.is_data_newest() === !0) {
            o = [].concat(o || []), o = this.filter(o), o = w("bottom", [].concat(o || []));
            for (var i = 0; i < o.length; i++)"notify" === o[i].type && this.queue(o[i]);
            var n = this;
            n.scrollToBottom(function (t) {
                for (var i = n.buildElements(o), r = 0; r < i.length; r++)i[r].style.opacity = 0;
                var a = new TimelineMax({paused: !0});
                a.add(function () {
                    for (var t = 0; t < i.length; t++) {
                        var o = i[t], n = o.getAttribute("data-id"), r = e('[data-id="' + n + '"]');
                        r.length > 0 ? r.replaceWith(o) : e(".mlist").append(o)
                    }
                }), a.staggerFromTo(i, .15, {opacity: 1}, {opacity: 1}, .05).add(t), a.play()
            }, s(this.resort.bind(this)))
        }
    }, f.prototype.append = function (t, o, i) {
        if (this.is_data_newest() !== !0)return void(i || c)(r, function () {
        });
        o = w("bottom", [o])[0];
        var n = this;
        n.scrollToBottom(function (t) {
            var r = "temp-" + (new Date).getTime() + "-" + Math.ceil(1e3 * Math.random()), a = n.buildElement({
                id: r,
                openid: n.app.usr.id,
                nickName: n.app.usr.nickname,
                avatar: n.app.usr.avatarPath,
                contentType: o.chatype,
                content: o.chatype==="text"?{text:o.text}:{small: o.text,reference: o.text},
                createDate: (new Date).getTime(),
                //data: o
            }, n.app.usr.id), s = a.querySelector(".mitem-container");
            s.className += " sending", e(".mlist").append(a), t(), (i || c)(r, function (t) {
                e(s).removeClass("sending").addClass(t ? "success" : "faild")
            })
        }, s(this.resort.bind(this)))
    }, f.prototype.update = function (t, o, i) {
        if ("undefined" == typeof i||!i.data)return console.log(e('[data-id="' + t + '"]').find(".mitem-container"), o), void e('[data-id="' + t + '"]').find(".mitem-container").removeClass("sending faild keep").addClass(o);
        var n = e(this.buildElement(i, this.app.usr.id));
        n.find(".mitem-container").removeClass("sending faild").addClass(o), e('[data-id="' + t + '"]').replaceWith(n), s(this.resort.bind(this))
    }, f.prototype.send = function (t, e, o) {
        function i(t, e, o) {
            dservice.send(n.app.flag, t, n.app.usr.id, e, o)
        }

        var n = this;
        i(t, e, o)
    }, f.prototype.onsendtext = function (t, e) {
        var o = {chatype: "text", text: e || t}, i = this;
        this.append("text", o, function (e, o) {
            i.send("text", t, function (t, n) {
                return t&&console.error(t), t ? (KpwechatMain.showNotify("消息发送失败" + (t && t.message ? "(" + t.message + ")" : "")), e && i.update(e, "faild"), void console.error(t)) : (o(n), void(e && i.update(e, "success", n)))
            })
        })
    }, f.prototype.onchoosepicture = function () {
        var t = this;
        this.choosePicture(function (e, o) {
            if (e)return KpwechatMain.showNotify("选择图片失败！"), void console.error(e);
            var i = {chatype: "image", text: o};
            t.append("image", i, function (e) {
                t.uploadPicture(o, function (o, i) {
                    return o ? (KpwechatMain.showNotify("上传图片失败！"), e && t.update(e, "faild"), void console.error(o)) : void t.send("picture", i, function (o, i) {
                        return o ? (KpwechatMain.showNotify("发送图片失败！" + (o && o.message ? "(" + o.message + ")" : "")), e && t.update(e, "faild"), void console.error(o)): void(e && t.update(e, "success", n))
                    })
                })
            })
        })
    }, f.prototype.choosePicture = function (t) {
        wx.chooseImage({
            count: 1, sizeType: ["compressed"], sourceType: ["album", "camera"], success: function (e) {
                if ("undefined" == typeof e.localIds || e.localIds.length <= 0)return void t();
                var o = e.localIds[0];
                t(r, o)
            }
        })
    }, f.prototype.uploadPicture = function (t, e) {
        wx.uploadImage({
            localId: t, isShowProgressTips: 1, success: function (t) {
                e(r, t.serverId)
            }
        })
    }, f.prototype.resort = function () {
        e(".mlist").append(e(".mlist-item").sort(function (t, e) {
            return parseInt(t.getAttribute("data-creatime")) - parseInt(e.getAttribute("data-creatime"))
        }))
    }, f.prototype.buildElements = function (t) {
        t = [].concat(t || []);
        for (var e = [], o = 0; o < t.length; o++) {
            if(t[o].content&&t[o].content.reference&&t[o].content.reference.indexOf("https://")!=0)
                t[o].content.reference=wwwdomain+t[o].content.reference;
            var i = this.buildElement(t[o], this.app.usr.id);
            "undefined" != typeof i && e.push(i)
        }
        return e
    }, f.prototype.buildElement = function (t, o) {
        if ("notify" === t.type) {
            var i = e("#notify-" + t.module + "-template").html();
            t.creatimestring = t.lottery.created_at, i = nano(i, {data: t});
            var n = document.createElement("div");
            return n.innerHTML = i, n.querySelector(":first-child")
        }
        "text" === t.contentType && (t.content  || ""), "virtual" === t.msgSource && (t.virtualclass = "virtual");
        var i = e("#chat-" + t.contentType + "-template").html();
        t.location = t.openid === o ? "right" : "left", i = nano(i, {data: t});
        var n = document.createElement("div");
        return n.innerHTML = i, n.querySelector(":first-child")
    }, t.RoomResource = f;
    var v = [], _ = [], g = 3e3, b = 1e3, w = function (t, e, o, i) {
        var n = 2 === arguments.length;
        if (n && (i = e, e = o = r), i = [].concat(i || []), n && "top" === t)return v.splice(0, 0, i), _.splice(0, 0, a(i, "creatime")), s(p), i;
        if (n && "bottom" === t)return v = v.concat(i), _ = _.concat(a(i, "creatime")), s(u), i;
        var c = _.indexOf(e);
        if (-1 === c)return !1;
        var l = c + 1, d = l + o;
        return d > v.length - 1 ? (v = v.slice(0, l), _ = _.slice(0, l), !1) : v.slice(l, d)
    }
}(window, window.jQuery || window.Zepto, window.KpwechatMain.KpResource, window.riseup, _);
!function (t, o, e, n, i) {
    "use strict";
    var r = function () {
        e.prototype.constructor.apply(this, Array.prototype.slice.call(arguments))
    };
    o.extend(r.prototype, e.prototype), r.prototype.on_attach = function (t, e, n, r, a) {
        if (o(".room-header").addClass("layer-mode"), (new TimelineMax).set(this.container, {display: "block"}).fromTo(this.container, .3, {
                top: "20%",
                opacity: 0
            }, {top: "46px", opacity: 1, ease: Power3.easeOut}).fromTo(".inputor .inputor-footer", .2, {
                opacity: 0,
                bottom: "-100%"
            }, {opacity: 1, delay: .3, bottom: "0%"}).fromTo(".inputor-controls", .2, {opacity: 0}, {
                opacity: 1,
                delay: .3
            }).fromTo(".inputor-content", .3, {backgroundColor: "#ffffff"}, {backgroundColor: "#ffffff"}).add(a), this.app.on("window-resize", this.resize.bind(this)), "true" === o(this.container).attr("data-initialized"))return void a();
        o(this.container).attr("data-initialized", !0);
        var c = this;
        this.emojiarea = o(".inputor-content-editor").emojiarea({
            button: "#emotion-sender",
            wysiwyg: !0
        }), o(".emoji-wysiwyg-editor").html('<span class="placeholder">点击编辑上墙信息</span>'), o(".inputor-content-editor").on("change", function () {
            o.trim(document.querySelector(".inputor-content-editor").value) ? o(".send-button").addClass("actived") : o(".send-button").removeClass("actived")
        }), this.keyboard_height = i, o(this.container).on("tap", ".inputor-footer .send-button", function () {
            o(".emoji-wysiwyg-editor").trigger("blur");
            var t = c.text();
            return t === !1 ? (layer.open({
                type: 3,
                content: "请输入要发送的内容..."
            }), !1) : (History.back(), void setTimeout(function () {
                c.send(t)
            }, 700))
        }), o(".emoji-wysiwyg-editor").on("focus", function () {
            o(this).find(".placeholder").remove()
        }).on("blur", function () {
            c.text() || o(".emoji-wysiwyg-editor").html('<span class="placeholder">点击编辑上墙信息</span>')
        })
    }, r.prototype.resize = function (o, e) {
        o -= 46, console.log("inner height:" + o + "px scroll top : " + t.scrollTop), t.scrollTop = 0;
        try {
            document.height = o
        } catch (n) {
        }
        document.querySelector("html").style.height = document.body.style.height = document.querySelector(".inputor").style.height = document.querySelector(".inputor") = o + "px"
    }, r.prototype.text = function () {
        var t = o.trim(document.querySelector(".inputor-content-editor").value);
        return "undefined" == typeof t || "" === t ? !1 : t = t.replace(/\u00a0/gm, " ")
    }, r.prototype.send = function (t) {
        this.ext.send(t), setTimeout(function () {
            o(".emoji-wysiwyg-editor").html('<span class="placeholder">点击编辑上墙信息</span>'), o(".inputor-content-editor").val("").trigger("change")
        }, 500)
    }, r.prototype.on_attached = function (t, o, n, i, r) {
        var a = function (t) {
            r()
        };
        e.prototype.on_attached.apply(this, Array.prototype.slice.call(arguments, 0, 4).concat(a))
    }, r.prototype.on_detach = function (t, n, i, r) {
        var a = this, c = function () {
            r(), this.app.off("window-resize", this.resize.bind(this)), o(".room-header").removeClass("layer-mode"), (new TimelineMax).fromTo(".inputor .inputor-footer .inputor-controls", .1, {opacity: 1}, {opacity: 0}).to(a.container, .3, {
                top: "20%",
                opacity: 0,
                delay: .3,
                ease: Power3.easeOut
            }).add(function () {
                TweenMax.set(a.container, {top: "100%", display: "none"})
            })
        };
        e.prototype.on_detach.apply(this, Array.prototype.slice.call(arguments, 0, 3).concat(c))
    }, t.InputorResource = r
}(window, window.jQuery || window.Zepto, window.KpwechatMain.KpResource, window.riseup);
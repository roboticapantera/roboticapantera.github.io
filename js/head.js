!function(t, e) {
    "object" == typeof exports ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t)
}(this, function(t) {
    function r(t) {
        void 0 !== t.length ? this._targetElement = t : this._targetElement = [t],
        void 0 === window._progressjsId && (window._progressjsId = 1),
        void 0 === window._progressjsIntervals && (window._progressjsIntervals = {}),
        this._options = {
            theme: "blue",
            overlayMode: !1,
            considerTransition: !0
        }
    }
    function e() {
        void 0 !== this._onBeforeStartCallback && this._onBeforeStartCallback.call(this),
        function() {
            if (!document.querySelector(".progressjs-container")) {
                var t = document.createElement("div");
                t.className = "progressjs-container",
                document.body.appendChild(t)
            }
        }.call(this);
        for (var t = 0, e = this._targetElement.length; t < e; t++)
            n.call(this, this._targetElement[t])
    }
    function n(t) {
        if (!t.hasAttribute("data-progressjs")) {
            var e = function(t) {
                var e = {};
                "body" === t.tagName.toLowerCase() ? (e.width = t.clientWidth, e.height = t.clientHeight) : (e.width = t.offsetWidth, e.height = t.offsetHeight);
                var r = 0,
                    n = 0;
                for (; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);)
                    r += t.offsetLeft,
                    n += t.offsetTop,
                    t = t.offsetParent;
                return e.top = n, e.left = r, e
            }.call(this, t);
            t.setAttribute("data-progressjs", window._progressjsId);
            var r = document.createElement("div");
            r.className = "progressjs-progress progressjs-theme-" + this._options.theme,
            "body" === t.tagName.toLowerCase() ? r.style.position = "fixed" : r.style.position = "absolute",
            r.setAttribute("data-progressjs", window._progressjsId);
            var n = document.createElement("div");
            n.className = "progressjs-inner";
            var s = document.createElement("div");
            s.className = "progressjs-percent",
            s.innerHTML = "1%",
            n.appendChild(s),
            this._options.overlayMode && "body" === t.tagName.toLowerCase() ? (r.style.left = 0, r.style.right = 0, r.style.top = 0, r.style.bottom = 0) : (r.style.left = e.left + "px", r.style.top = e.top + "px", r.style.width = e.width + "px", this._options.overlayMode && (r.style.height = e.height + "px")),
            r.appendChild(n),
            document.querySelector(".progressjs-container").appendChild(r),
            a(t, 1),
            ++window._progressjsId
        }
    }
    function a(r, n) {
        var s = this;
        100 <= n && (n = 100),
        r.hasAttribute("data-progressjs") && setTimeout(function() {
            void 0 !== s._onProgressCallback && s._onProgressCallback.call(s, r, n),
            (t = l(r)).style.width = parseInt(n) + "%";
            var t = t.querySelector(".progressjs-percent"),
                e = parseInt(t.innerHTML.replace("%", ""));
            !function(t, e, r) {
                var o = !0;
                r < e && (o = !1);
                var i = 10;
                !function t(e, r, n) {
                    var s = Math.abs(r - n);
                    s < 3 ? i = 30 : s < 20 ? i = 20 : intervanIn = 1,
                    r - n != 0 && (e.innerHTML = (o ? ++r : --r) + "%", setTimeout(function() {
                        t(e, r, n)
                    }, i))
                }(t, e, r)
            }(t, e, parseInt(n))
        }, 50)
    }
    function l(t) {
        var e = parseInt(t.getAttribute("data-progressjs"));
        return document.querySelector('.progressjs-container > .progressjs-progress[data-progressjs="' + e + '"] > .progressjs-inner')
    }
    function s(t) {
        for (var e = 0, r = this._targetElement.length; e < r; e++) {
            var n = this._targetElement[e];
            if (n.hasAttribute("data-progressjs")) {
                var s = l(n),
                    o = parseInt(s.style.width.replace("%", ""));
                o && a.call(this, n, o + (t || 1))
            }
        }
    }
    function o() {
        void 0 !== this._onBeforeEndCallback && (!0 === this._options.considerTransition ? l(this._targetElement[0]).addEventListener(function() {
            var t,
                e = document.createElement("fakeelement"),
                r = {
                    transition: "transitionend",
                    OTransition: "oTransitionEnd",
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd"
                };
            for (t in r)
                if (void 0 !== e.style[t])
                    return r[t]
        }(), this._onBeforeEndCallback, !1) : this._onBeforeEndCallback.call(this));
        for (var t = parseInt(this._targetElement[0].getAttribute("data-progressjs")), e = 0, r = this._targetElement.length; e < r; e++) {
            var n = this._targetElement[e],
                s = l(n);
            if (!s)
                return;
            var o = parseInt(s.style.width.replace("%", "")),
                i = 1;
            o < 100 && (a.call(this, n, 100), i = 500),
            function(t, e) {
                setTimeout(function() {
                    t.parentNode.className += " progressjs-end",
                    setTimeout(function() {
                        t.parentNode.parentNode.removeChild(t.parentNode),
                        e.removeAttribute("data-progressjs")
                    }, 1e3)
                }, i)
            }(s, n)
        }
        if (window._progressjsIntervals[t])
            try {
                clearInterval(window._progressjsIntervals[t]),
                window._progressjsIntervals[t] = null,
                delete window._progressjsIntervals[t]
            } catch (t) {}
    }
    var i = function(t) {
        if ("object" == typeof t)
            return new r(t);
        if ("string" != typeof t)
            return new r(document.body);
        var e = document.querySelectorAll(t);
        if (e)
            return new r(e);
        throw new Error("There is no element with given selector.")
    };
    return i.version = "0.1.0", i.fn = r.prototype = {
        clone: function() {
            return new r(this)
        },
        setOption: function(t, e) {
            return this._options[t] = e, this
        },
        setOptions: function(t) {
            return this._options = function(t, e) {
                var r = {};
                for (var n in t)
                    r[n] = t[n];
                for (var n in e)
                    r[n] = e[n];
                return r
            }(this._options, t), this
        },
        start: function() {
            return e.call(this), this
        },
        set: function(t) {
            return function(t) {
                for (var e = 0, r = this._targetElement.length; e < r; e++)
                    a.call(this, this._targetElement[e], t)
            }.call(this, t), this
        },
        increase: function(t) {
            return s.call(this, t), this
        },
        autoIncrease: function(t, e) {
            return function(t, e) {
                var r = this,
                    n = parseInt(this._targetElement[0].getAttribute("data-progressjs"));
                void 0 !== window._progressjsIntervals[n] && clearInterval(window._progressjsIntervals[n]),
                window._progressjsIntervals[n] = setInterval(function() {
                    s.call(r, t)
                }, e)
            }.call(this, t, e), this
        },
        end: function() {
            return o.call(this), this
        },
        onbeforeend: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onbeforeend was not a function");
            return this._onBeforeEndCallback = t, this
        },
        onbeforestart: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onbeforestart was not a function");
            return this._onBeforeStartCallback = t, this
        },
        onprogress: function(t) {
            if ("function" != typeof t)
                throw new Error("Provided callback for onprogress was not a function");
            return this._onProgressCallback = t, this
        }
    }, t.progressJs = i
});

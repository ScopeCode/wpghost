$(document).ready(function () {
    window.CodeMirror = function () {
    "use strict";

    function e(n, r) {
        if (!(this instanceof e)) return new e(n, r);
        this.options = r = r || {};
        for (var i in Hi)!r.hasOwnProperty(i) && Hi.hasOwnProperty(i) && (r[i] = Hi[i]);
        f(r);
        var o = "string" == typeof r.value ? 0 : r.value.first,
            a = this.display = t(n, o);
        a.wrapper.CodeMirror = this, c(this), r.autofocus && !xi && ot(this), this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            draggingText: !1,
            highlight: new Er
        }, l(this), r.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
        var s = r.value;
        "string" == typeof s && (s = new Qi(r.value, r.mode)), Q(this, tr)(this, s), si && setTimeout(Vr(it, this, !0), 20), lt(this);
        var u;
        try {
            u = document.activeElement == a.input
        } catch (h) {}
        u || r.autofocus && !xi ? setTimeout(Vr(Ct, this), 20) : kt(this), Q(this, function () {
            for (var e in zi) zi.propertyIsEnumerable(e) && zi[e](this, r[e], Ri);
            for (var t = 0; t < Gi.length; ++t) Gi[t](this)
        })()
    }

    function t(e, t) {
        var n = {}, r = n.input = Ur("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none;");
        hi ? r.style.width = "1000px" : r.setAttribute("wrap", "off"), r.setAttribute("autocorrect", "off"), r.setAttribute("autocapitalize", "off"), n.inputDiv = Ur("div", [r], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), n.scrollbarH = Ur("div", [Ur("div", null, null, "height: 1px")], "CodeMirror-hscrollbar"), n.scrollbarV = Ur("div", [Ur("div", null, null, "width: 1px")], "CodeMirror-vscrollbar"), n.scrollbarFiller = Ur("div", null, "CodeMirror-scrollbar-filler"), n.lineDiv = Ur("div"), n.selectionDiv = Ur("div", null, null, "position: relative; z-index: 1"), n.cursor = Ur("div", " ", "CodeMirror-cursor"), n.otherCursor = Ur("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"), n.measure = Ur("div", null, "CodeMirror-measure"), n.lineSpace = Ur("div", [n.measure, n.selectionDiv, n.lineDiv, n.cursor, n.otherCursor], null, "position: relative; outline: none"), n.mover = Ur("div", [Ur("div", [n.lineSpace], "CodeMirror-lines")], null, "position: relative"), n.sizer = Ur("div", [n.mover], "CodeMirror-sizer"), n.heightForcer = Ur("div", " ", null, "position: absolute; height: " + no + "px"), n.gutters = Ur("div", null, "CodeMirror-gutters"), n.lineGutter = null;
        var i = Ur("div", [n.sizer, n.heightForcer, n.gutters], null, "position: relative; min-height: 100%");
        return n.scroller = Ur("div", [i], "CodeMirror-scroll"), n.scroller.setAttribute("tabIndex", "-1"), n.wrapper = Ur("div", [n.inputDiv, n.scrollbarH, n.scrollbarV, n.scrollbarFiller, n.scroller], "CodeMirror"), ci && (n.gutters.style.zIndex = -1, n.scroller.style.paddingRight = 0), e.appendChild ? e.appendChild(n.wrapper) : e(n.wrapper), wi && (r.style.width = "0px"), hi || (n.scroller.draggable = !0), gi ? (n.inputDiv.style.height = "1px", n.inputDiv.style.position = "absolute") : ci && (n.scrollbarH.style.minWidth = n.scrollbarV.style.minWidth = "18px"), n.viewOffset = n.lastSizeC = 0, n.showingFrom = n.showingTo = t, n.lineNumWidth = n.lineNumInnerWidth = n.lineNumChars = null, n.prevInput = "", n.alignWidgets = !1, n.pollingFast = !1, n.poll = new Er, n.draggingText = !1, n.cachedCharWidth = n.cachedTextHeight = null, n.measureLineCache = [], n.measureLineCachePos = 0, n.inaccurateSelection = !1, n.maxLine = null, n.maxLineLength = 0, n.maxLineChanged = !1, n.wheelDX = n.wheelDY = n.wheelStartX = n.wheelStartY = null, n
    }

    function n(t) {
        t.doc.mode = e.getMode(t.options, t.doc.modeOption), t.doc.iter(function (e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
        }), t.doc.frontier = t.doc.first, O(t, 100), t.state.modeGen++, t.curOp && et(t)
    }

    function r(e) {
        e.options.lineWrapping ? (e.display.wrapper.className += " CodeMirror-wrap", e.display.sizer.style.minWidth = "") : (e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-wrap", ""), h(e)), o(e), et(e), R(e), setTimeout(function () {
            d(e.display, e.doc.height)
        }, 100)
    }

    function i(e) {
        var t = j(e.display),
            n = e.options.lineWrapping,
            r = n && Math.max(5, e.display.scroller.clientWidth / X(e.display) - 3);
        return function (i) {
            return On(e.doc, i) ? 0 : n ? (Math.ceil(i.text.length / r) || 1) * t : t
        }
    }

    function o(e) {
        var t = e.doc,
            n = i(e);
        t.iter(function (e) {
            var t = n(e);
            t != e.height && or(e, t)
        })
    }

    function a(e) {
        var t = Ki[e.options.keyMap].style;
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (t ? " cm-keymap-" + t : "")
    }

    function l(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), R(e)
    }

    function s(e) {
        c(e), et(e)
    }

    function c(e) {
        var t = e.display.gutters,
            n = e.options.gutters;
        Kr(t);
        for (var r = 0; r < n.length; ++r) {
            var i = n[r],
                o = t.appendChild(Ur("div", null, "CodeMirror-gutter " + i));
            "CodeMirror-linenumbers" == i && (e.display.lineGutter = o, o.style.width = (e.display.lineNumWidth || 1) + "px")
        }
        t.style.display = r ? "" : "none"
    }

    function u(e, t) {
        if (0 == t.height) return 0;
        for (var n, r = t.text.length, i = t; n = Wn(i);) {
            var o = n.find();
            i = nr(e, o.from.line), r += o.from.ch - o.to.ch
        }
        for (i = t; n = Nn(i);) {
            var o = n.find();
            r -= i.text.length - o.from.ch, i = nr(e, o.to.line), r += i.text.length - o.to.ch
        }
        return r
    }

    function h(e) {
        var t = e.display,
            n = e.doc;
        t.maxLine = nr(n, n.first), t.maxLineLength = u(n, t.maxLine), t.maxLineChanged = !0, n.iter(function (e) {
            var r = u(n, e);
            r > t.maxLineLength && (t.maxLineLength = r, t.maxLine = e)
        })
    }

    function f(e) {
        for (var t = !1, n = 0; n < e.gutters.length; ++n) "CodeMirror-linenumbers" == e.gutters[n] && (e.lineNumbers ? t = !0 : e.gutters.splice(n--, 1));
        !t && e.lineNumbers && e.gutters.push("CodeMirror-linenumbers")
    }

    function d(e, t) {
        var n = t + 2 * F(e);
        e.sizer.style.minHeight = e.heightForcer.style.top = n + "px";
        var r = Math.max(n, e.scroller.scrollHeight),
            i = e.scroller.scrollWidth > e.scroller.clientWidth,
            o = r > e.scroller.clientHeight;
        o ? (e.scrollbarV.style.display = "block", e.scrollbarV.style.bottom = i ? Yr(e.measure) + "px" : "0", e.scrollbarV.firstChild.style.height = r - e.scroller.clientHeight + e.scrollbarV.clientHeight + "px") : e.scrollbarV.style.display = "", i ? (e.scrollbarH.style.display = "block", e.scrollbarH.style.right = o ? Yr(e.measure) + "px" : "0", e.scrollbarH.firstChild.style.width = e.scroller.scrollWidth - e.scroller.clientWidth + e.scrollbarH.clientWidth + "px") : e.scrollbarH.style.display = "", i && o ? (e.scrollbarFiller.style.display = "block", e.scrollbarFiller.style.height = e.scrollbarFiller.style.width = Yr(e.measure) + "px") : e.scrollbarFiller.style.display = "", vi && 0 === Yr(e.measure) && (e.scrollbarV.style.minWidth = e.scrollbarH.style.minHeight = yi ? "18px" : "12px")
    }

    function p(e, t, n) {
        var r = e.scroller.scrollTop,
            i = e.wrapper.clientHeight;
        "number" == typeof n ? r = n : n && (r = n.top, i = n.bottom - n.top), r = Math.floor(r - F(e));
        var o = Math.ceil(r + i);
        return {
            from: lr(t, r),
            to: lr(t, o)
        }
    }

    function m(e) {
        var t = e.display;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var n = y(t) - t.scroller.scrollLeft + e.doc.scrollLeft, r = t.gutters.offsetWidth, i = n + "px", o = t.lineDiv.firstChild; o; o = o.nextSibling)
                if (o.alignable)
                    for (var a = 0, l = o.alignable; a < l.length; ++a) l[a].style.left = i;
            e.options.fixedGutter && (t.gutters.style.left = n + r + "px")
        }
    }

    function g(e) {
        if (!e.options.lineNumbers) return !1;
        var t = e.doc,
            n = v(e.options, t.first + t.size - 1),
            r = e.display;
        if (n.length != r.lineNumChars) {
            var i = r.measure.appendChild(Ur("div", [Ur("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                o = i.firstChild.offsetWidth,
                a = i.offsetWidth - o;
            return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - a), r.lineNumWidth = r.lineNumInnerWidth + a, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", !0
        }
        return !1
    }

    function v(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }

    function y(e) {
        return qr(e.scroller).left - qr(e.sizer).left
    }

    function b(e, t, n) {
        var r = e.display.showingFrom,
            i = e.display.showingTo,
            o = w(e, t, n);
        return o && (Ar(e, "update", e), (e.display.showingFrom != r || e.display.showingTo != i) && Ar(e, "viewportChange", e, e.display.showingFrom, e.display.showingTo)), T(e), d(e.display, e.doc.height), o
    }

    function w(e, t, n) {
        var r = e.display,
            i = e.doc;
        if (!r.wrapper.clientWidth) return r.showingFrom = r.showingTo = i.first, r.viewOffset = 0, void 0;
        var o = p(r, i, n);
        if (!(0 == t.length && o.from > r.showingFrom && o.to < r.showingTo)) {
            g(e) && (t = [{
                from: i.first,
                to: i.first + i.size
            }]);
            var a = r.sizer.style.marginLeft = r.gutters.offsetWidth + "px";
            r.scrollbarH.style.left = e.options.fixedGutter ? a : "0";
            var l = 1 / 0;
            if (e.options.lineNumbers)
                for (var s = 0; s < t.length; ++s)
                    if (t[s].diff) {
                        l = t[s].from;
                        break
                    }
            var c = i.first + i.size,
                u = Math.max(o.from - e.options.viewportMargin, i.first),
                h = Math.min(c, o.to + e.options.viewportMargin);
            if (r.showingFrom < u && u - r.showingFrom < 20 && (u = Math.max(i.first, r.showingFrom)), r.showingTo > h && r.showingTo - h < 20 && (h = Math.min(c, r.showingTo)), Oi)
                for (u = ar(An(i, nr(i, u))); c > h && On(i, nr(i, h));)++h;
            var f = [{
                from: Math.max(r.showingFrom, i.first),
                to: Math.min(r.showingTo, c)
            }];
            if (f = f[0].from >= f[0].to ? [] : S(f, t), Oi)
                for (var s = 0; s < f.length; ++s)
                    for (var d, m = f[s]; d = Nn(nr(i, m.to - 1));) {
                        var v = d.find().from.line;
                        if (!(v > m.from)) {
                            f.splice(s--, 1);
                            break
                        }
                        m.to = v
                    }
            for (var y = 0, s = 0; s < f.length; ++s) {
                var m = f[s];
                m.from < u && (m.from = u), m.to > h && (m.to = h), m.from >= m.to ? f.splice(s--, 1) : y += m.to - m.from
            }
            if (y == h - u && u == r.showingFrom && h == r.showingTo) return x(e), void 0;
            f.sort(function (e, t) {
                return e.from - t.from
            });
            var b = document.activeElement;.7 * (h - u) > y && (r.lineDiv.style.display = "none"), k(e, u, h, f, l), r.lineDiv.style.display = "", document.activeElement != b && b.offsetHeight && b.focus();
            var C = u != r.showingFrom || h != r.showingTo || r.lastSizeC != r.wrapper.clientHeight;
            C && (r.lastSizeC = r.wrapper.clientHeight), r.showingFrom = u, r.showingTo = h, O(e, 100);
            for (var L, M = r.lineDiv.offsetTop, T = r.lineDiv.firstChild; T; T = T.nextSibling)
                if (T.lineObj) {
                    if (ci) {
                        var W = T.offsetTop + T.offsetHeight;
                        L = W - M, M = W
                    } else {
                        var N = qr(T);
                        L = N.bottom - N.top
                    }
                    var A = T.lineObj.height - L;
                    if (2 > L && (L = j(r)), A > .001 || -.001 > A) {
                        or(T.lineObj, L);
                        var I = T.lineObj.widgets;
                        if (I)
                            for (var s = 0; s < I.length; ++s) I[s].height = I[s].node.offsetHeight
                    }
                }
            return x(e), p(r, i, n).to > h && w(e, [], n), !0
        }
    }

    function x(e) {
        var t = e.display.viewOffset = sr(e, nr(e.doc, e.display.showingFrom));
        e.display.mover.style.top = t + "px"
    }

    function S(e, t) {
        for (var n = 0, r = t.length || 0; r > n; ++n) {
            for (var i = t[n], o = [], a = i.diff || 0, l = 0, s = e.length; s > l; ++l) {
                var c = e[l];
                i.to <= c.from && i.diff ? o.push({
                    from: c.from + a,
                    to: c.to + a
                }) : i.to <= c.from || i.from >= c.to ? o.push(c) : (i.from > c.from && o.push({
                    from: c.from,
                    to: i.from
                }), i.to < c.to && o.push({
                    from: i.to + a,
                    to: c.to + a
                }))
            }
            e = o
        }
        return e
    }

    function C(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.firstChild, o = 0; i; i = i.nextSibling, ++o) n[e.options.gutters[o]] = i.offsetLeft, r[e.options.gutters[o]] = i.offsetWidth;
        return {
            fixedPos: y(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: n,
            gutterWidth: r,
            wrapperWidth: t.wrapper.clientWidth
        }
    }

    function k(e, t, n, r, i) {
        function o(t) {
            var n = t.nextSibling;
            return hi && Si && e.display.currentWheelTarget == t ? (t.style.display = "none", t.lineObj = null) : t.parentNode.removeChild(t), n
        }
        var a = C(e),
            l = e.display,
            s = e.options.lineNumbers;
        r.length || hi && e.display.currentWheelTarget || Kr(l.lineDiv);
        var c = l.lineDiv,
            u = c.firstChild,
            h = r.shift(),
            f = t;
        for (e.doc.iter(t, n, function (t) {
            if (h && h.to == f && (h = r.shift()), On(e.doc, t)) {
                if (0 != t.height && or(t, 0), t.widgets && u.previousSibling)
                    for (var n = 0; n < t.widgets.length; ++n)
                        if (t.widgets[n].showIfHidden) {
                            var l = u.previousSibling;
                            if (/pre/i.test(l.nodeName)) {
                                var d = Ur("div", null, null, "position: relative");
                                l.parentNode.replaceChild(d, l), d.appendChild(l), l = d
                            }
                            var p = l.appendChild(Ur("div", [t.widgets[n].node], "CodeMirror-linewidget"));
                            M(t.widgets[n], p, l, a)
                        }
            } else if (h && h.from <= f && h.to > f) {
                for (; u.lineObj != t;) u = o(u);
                s && f >= i && u.lineNumber && Xr(u.lineNumber, v(e.options, f)), u = u.nextSibling
            } else {
                if (t.widgets)
                    for (var m, g = 0, y = u; y && 20 > g; ++g, y = y.nextSibling)
                        if (y.lineObj == t && /div/i.test(y.nodeName)) {
                            m = y;
                            break
                        }
                var b = L(e, t, f, a, m);
                if (b != m) c.insertBefore(b, u);
                else {
                    for (; u != m;) u = o(u);
                    u = u.nextSibling
                }
                b.lineObj = t
            }++f
        }); u;) u = o(u)
    }

    function L(e, t, n, r, i) {
        var o, a = Kn(e, t),
            l = t.gutterMarkers,
            s = e.display;
        if (!(e.options.lineNumbers || l || t.bgClass || t.wrapClass || t.widgets)) return a;
        if (i) {
            i.alignable = null;
            for (var c, u = !0, h = 0, f = i.firstChild; f; f = c)
                if (c = f.nextSibling, /\bCodeMirror-linewidget\b/.test(f.className)) {
                    for (var d = 0, p = !0; d < t.widgets.length; ++d) {
                        var m = t.widgets[d],
                            g = !1;
                        if (m.above || (g = p, p = !1), m.node == f.firstChild) {
                            M(m, f, i, r), ++h, g && i.insertBefore(a, f);
                            break
                        }
                    }
                    if (d == t.widgets.length) {
                        u = !1;
                        break
                    }
                } else i.removeChild(f);
            u && h == t.widgets.length && (o = i, i.className = t.wrapClass || "")
        }
        if (o || (o = Ur("div", null, t.wrapClass, "position: relative"), o.appendChild(a)), t.bgClass && o.insertBefore(Ur("div", " ", t.bgClass + " CodeMirror-linebackground"), o.firstChild), e.options.lineNumbers || l) {
            var y = o.insertBefore(Ur("div", null, null, "position: absolute; left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px"), o.firstChild);
            if (e.options.fixedGutter && (o.alignable || (o.alignable = [])).push(y), !e.options.lineNumbers || l && l["CodeMirror-linenumbers"] || (o.lineNumber = y.appendChild(Ur("div", v(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + s.lineNumInnerWidth + "px"))), l)
                for (var b = 0; b < e.options.gutters.length; ++b) {
                    var w = e.options.gutters[b],
                        x = l.hasOwnProperty(w) && l[w];
                    x && y.appendChild(Ur("div", [x], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[w] + "px; width: " + r.gutterWidth[w] + "px"))
                }
        }
        if (ci && (o.style.zIndex = 2), t.widgets && o != i)
            for (var d = 0, S = t.widgets; d < S.length; ++d) {
                var m = S[d],
                    C = Ur("div", [m.node], "CodeMirror-linewidget");
                M(m, C, o, r), m.above ? o.insertBefore(C, e.options.lineNumbers && 0 != t.height ? y : a) : o.appendChild(C), Ar(m, "redraw")
            }
        return o
    }

    function M(e, t, n, r) {
        if (e.noHScroll) {
            (n.alignable || (n.alignable = [])).push(t);
            var i = r.wrapperWidth;
            t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px"
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
    }

    function T(e) {
        var t = e.display,
            n = zt(e.doc.sel.from, e.doc.sel.to);
        n || e.options.showCursorWhenSelecting ? W(e) : t.cursor.style.display = t.otherCursor.style.display = "none", n ? t.selectionDiv.style.display = "none" : N(e);
        var r = _(e, e.doc.sel.head, "div"),
            i = qr(t.wrapper),
            o = qr(t.lineDiv);
        t.inputDiv.style.top = Math.max(0, Math.min(t.wrapper.clientHeight - 10, r.top + o.top - i.top)) + "px", t.inputDiv.style.left = Math.max(0, Math.min(t.wrapper.clientWidth - 10, r.left + o.left - i.left)) + "px"
    }

    function W(e) {
        var t = e.display,
            n = _(e, e.doc.sel.head, "div");
        t.cursor.style.left = n.left + "px", t.cursor.style.top = n.top + "px", t.cursor.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px", t.cursor.style.display = "", n.other ? (t.otherCursor.style.display = "", t.otherCursor.style.left = n.other.left + "px", t.otherCursor.style.top = n.other.top + "px", t.otherCursor.style.height = .85 * (n.other.bottom - n.other.top) + "px") : t.otherCursor.style.display = "none"
    }

    function N(e) {
        function t(e, t, n, r) {
            0 > t && (t = 0), a.appendChild(Ur("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (null == n ? l - e : n) + "px; height: " + (r - t) + "px"))
        }

        function n(n, r, o, a) {
            function c(t) {
                return V(e, $t(n, t), "div", u)
            }
            var u = nr(i, n),
                h = u.text.length,
                f = a ? 1 / 0 : -1 / 0;
            return Zr(cr(u), r || 0, null == o ? h : o, function (e, n, i) {
                var u = c("rtl" == i ? n - 1 : e),
                    d = c("rtl" == i ? e : n - 1),
                    p = u.left,
                    m = d.right;
                d.top - u.top > 3 && (t(p, u.top, null, u.bottom), p = s, u.bottom < d.top && t(p, u.bottom, null, d.top)), null == o && n == h && (m = l), null == r && 0 == e && (p = s), f = a ? Math.min(d.top, f) : Math.max(d.bottom, f), s + 1 > p && (p = s), t(p, d.top, m - p, d.bottom)
            }), f
        }
        var r = e.display,
            i = e.doc,
            o = e.doc.sel,
            a = document.createDocumentFragment(),
            l = r.lineSpace.offsetWidth,
            s = P(e.display);
        if (o.from.line == o.to.line) n(o.from.line, o.from.ch, o.to.ch);
        else {
            for (var c, u, h = nr(i, o.from.line), f = h, d = [o.from.line, o.from.ch]; c = Nn(f);) {
                var p = c.find();
                if (d.push(p.from.ch, p.to.line, p.to.ch), p.to.line == o.to.line) {
                    d.push(o.to.ch), u = !0;
                    break
                }
                f = nr(i, p.to.line)
            }
            if (u)
                for (var m = 0; m < d.length; m += 3) n(d[m], d[m + 1], d[m + 2]);
            else {
                var g, v, y = nr(i, o.to.line);
                g = o.from.ch ? n(o.from.line, o.from.ch, null, !1) : sr(e, h) - r.viewOffset, v = o.to.ch ? n(o.to.line, Wn(y) ? null : 0, o.to.ch, !0) : sr(e, y) - r.viewOffset, v > g && t(s, g, null, v)
            }
        }
        jr(r.selectionDiv, a), r.selectionDiv.style.display = ""
    }

    function A(e) {
        var t = e.display;
        clearInterval(t.blinker);
        var n = !0;
        t.cursor.style.visibility = t.otherCursor.style.visibility = "", t.blinker = setInterval(function () {
            t.cursor.offsetHeight && (t.cursor.style.visibility = t.otherCursor.style.visibility = (n = !n) ? "" : "hidden")
        }, e.options.cursorBlinkRate)
    }

    function O(e, t) {
        e.doc.mode.startState && e.doc.frontier < e.display.showingTo && e.state.highlight.set(t, Vr(I, e))
    }

    function I(e) {
        var t = e.doc;
        if (t.frontier < t.first && (t.frontier = t.first), !(t.frontier >= e.display.showingTo)) {
            var n, r = +new Date + e.options.workTime,
                i = sn(t.mode, D(e, t.frontier)),
                o = [];
            t.iter(t.frontier, Math.min(t.first + t.size, e.display.showingTo + 500), function (a) {
                if (t.frontier >= e.display.showingFrom) {
                    var l = a.styles;
                    a.styles = Vn(e, a, i);
                    for (var s = !l || l.length != a.styles.length, c = 0; !s && c < l.length; ++c) s = l[c] != a.styles[c];
                    s && (n && n.end == t.frontier ? n.end++ : o.push(n = {
                        start: t.frontier,
                        end: t.frontier + 1
                    })), a.stateAfter = sn(t.mode, i)
                } else Gn(e, a, i), a.stateAfter = 0 == t.frontier % 5 ? sn(t.mode, i) : null;
                return ++t.frontier, +new Date > r ? (O(e, e.options.workDelay), !0) : void 0
            }), o.length && Q(e, function () {
                for (var e = 0; e < o.length; ++e) et(this, o[e].start, o[e].end)
            })()
        }
    }

    function E(e, t) {
        for (var n, r, i = e.doc, o = t, a = t - 100; o > a; --o) {
            if (o <= i.first) return i.first;
            var l = nr(i, o - 1);
            if (l.stateAfter) return o;
            var s = Dr(l.text, null, e.options.tabSize);
            (null == r || n > s) && (r = o - 1, n = s)
        }
        return r
    }

    function D(e, t) {
        var n = e.doc,
            r = e.display;
        if (!n.mode.startState) return !0;
        var i = E(e, t),
            o = i > n.first && nr(n, i - 1).stateAfter;
        return o = o ? sn(n.mode, o) : cn(n.mode), n.iter(i, t, function (a) {
            Gn(e, a, o);
            var l = i == t - 1 || 0 == i % 5 || i >= r.showingFrom && i < r.showingTo;
            a.stateAfter = l ? sn(n.mode, o) : null, ++i
        }), o
    }

    function F(e) {
        return e.lineSpace.offsetTop
    }

    function P(e) {
        var t = jr(e.measure, Ur("pre", null, null, "text-align: left")).appendChild(Ur("span", "x"));
        return t.offsetLeft
    }

    function $(e, t, n, r) {
        var i = -1;
        r = r || z(e, t);
        for (var o = n;; o += i) {
            var a = r[o];
            if (a) break;
            0 > i && 0 == o && (i = 1)
        }
        return {
            left: n > o ? a.right : a.left,
            right: o > n ? a.left : a.right,
            top: a.top,
            bottom: a.bottom
        }
    }

    function z(e, t) {
        for (var n = e.display, r = e.display.measureLineCache, i = 0; i < r.length; ++i) {
            var o = r[i];
            if (o.text == t.text && o.markedSpans == t.markedSpans && n.scroller.clientWidth == o.width && o.classes == t.textClass + "|" + t.bgClass + "|" + t.wrapClass) return o.measure
        }
        var a = H(e, t),
            o = {
                text: t.text,
                width: n.scroller.clientWidth,
                markedSpans: t.markedSpans,
                measure: a,
                classes: t.textClass + "|" + t.bgClass + "|" + t.wrapClass
            };
        return 16 == r.length ? r[++n.measureLineCachePos % 16] = o : r.push(o), a
    }

    function H(e, t) {
        var n = e.display,
            r = Br(t.text.length),
            i = Kn(e, t, r);
        if (si && !ci && !e.options.lineWrapping && i.childNodes.length > 100) {
            for (var o = document.createDocumentFragment(), a = 10, l = i.childNodes.length, s = 0, c = Math.ceil(l / a); c > s; ++s) {
                for (var u = Ur("div", null, null, "display: inline-block"), h = 0; a > h && l; ++h) u.appendChild(i.firstChild), --l;
                o.appendChild(u)
            }
            i.appendChild(o)
        }
        jr(n.measure, i);
        var f = qr(n.lineDiv),
            d = [],
            p = Br(t.text.length),
            m = i.offsetHeight;
        ui && n.measure.first != i && jr(n.measure, i);
        for (var g, s = 0; s < r.length; ++s)
            if (g = r[s]) {
                for (var v = qr(g), y = Math.max(0, v.top - f.top), b = Math.min(v.bottom - f.top, m), h = 0; h < d.length; h += 2) {
                    var w = d[h],
                        x = d[h + 1];
                    if (!(w > b || y > x) && (y >= w && x >= b || w >= y && b >= x || Math.min(b, x) - Math.max(y, w) >= b - y >> 1)) {
                        d[h] = Math.min(y, w), d[h + 1] = Math.max(b, x);
                        break
                    }
                }
                h == d.length && d.push(y, b);
                var S = v.right;
                g.measureRight && (S = qr(g.measureRight).left), p[s] = {
                    left: v.left - f.left,
                    right: S - f.left,
                    top: h
                }
            }
        for (var g, s = 0; s < p.length; ++s)
            if (g = p[s]) {
                var C = g.top;
                g.top = d[C], g.bottom = d[C + 1]
            }
        if (!e.options.lineWrapping) {
            var k = i.lastChild;
            3 == k.nodeType && (k = i.appendChild(Ur("span", "���"))), p.width = qr(k).right - f.left
        }
        return p
    }

    function R(e) {
        e.display.measureLineCache.length = e.display.measureLineCachePos = 0, e.display.cachedCharWidth = e.display.cachedTextHeight = null, e.display.maxLineChanged = !0, e.display.lineNumChars = null
    }

    function B(e, t, n, r) {
        if (t.widgets)
            for (var i = 0; i < t.widgets.length; ++i)
                if (t.widgets[i].above) {
                    var o = Pn(t.widgets[i]);
                    n.top += o, n.bottom += o
                }
        if ("line" == r) return n;
        r || (r = "local");
        var a = sr(e, t);
        if ("local" != r && (a -= e.display.viewOffset), "page" == r) {
            var l = qr(e.display.lineSpace);
            a += l.top + (window.pageYOffset || (document.documentElement || document.body).scrollTop);
            var s = l.left + (window.pageXOffset || (document.documentElement || document.body).scrollLeft);
            n.left += s, n.right += s
        }
        return n.top += a, n.bottom += a, n
    }

    function V(e, t, n, r) {
        return r || (r = nr(e.doc, t.line)), B(e, r, $(e, r, t.ch), n)
    }

    function _(e, t, n, r, i) {
        function o(t, o) {
            var a = $(e, r, t, i);
            return o ? a.left = a.right : a.right = a.left, B(e, r, a, n)
        }
        r = r || nr(e.doc, t.line), i || (i = z(e, r));
        var a = cr(r),
            l = t.ch;
        if (!a) return o(l);
        for (var s, c, u = a[0].level, h = 0; h < a.length; ++h) {
            var f, d, p = a[h],
                m = p.level % 2;
            if (p.from < l && p.to > l) return o(l, m);
            var g = m ? p.to : p.from,
                v = m ? p.from : p.to;
            if (g == l) d = h && p.level < (f = a[h - 1]).level ? o(f.level % 2 ? f.from : f.to - 1, !0) : o(m && p.from != p.to ? l - 1 : l), m == u ? s = d : c = d;
            else if (v == l) {
                var f = h < a.length - 1 && a[h + 1];
                if (!m && f && f.from == f.to) continue;
                d = f && p.level < f.level ? o(f.level % 2 ? f.to - 1 : f.from) : o(m ? l : l - 1, !0), m == u ? s = d : c = d
            }
        }
        return u && !l && (c = o(a[0].to - 1)), s ? (c && (s.other = c), s) : c
    }

    function G(e, t, n) {
        var r = new $t(e, t);
        return n && (r.outside = !0), r
    }

    function U(e, t, n) {
        var r = e.doc;
        if (n += e.display.viewOffset, 0 > n) return G(r.first, 0, !0);
        var i = lr(r, n),
            o = r.first + r.size - 1;
        if (i > o) return G(r.first + r.size - 1, nr(r, o).text.length, !0);
        for (0 > t && (t = 0);;) {
            var a = nr(r, i),
                l = K(e, a, i, t, n),
                s = Nn(a),
                c = s && s.find();
            if (!(s && l.ch >= c.from.ch)) return l;
            i = c.to.line
        }
    }

    function K(e, t, n, r, i) {
        function o(r) {
            var i = _(e, $t(n, r), "line", t, c);
            return l = !0, a > i.bottom ? Math.max(0, i.left - s) : a < i.top ? i.left + s : (l = !1, i.left)
        }
        var a = i - sr(e, t),
            l = !1,
            s = e.display.wrapper.clientWidth,
            c = z(e, t),
            u = cr(t),
            h = t.text.length,
            f = ti(t),
            d = ni(t),
            p = o(f),
            m = l,
            g = o(d),
            v = l;
        if (r > g) return G(n, d, v);
        for (;;) {
            if (u ? d == f || d == oi(t, f, 1) : 1 >= d - f) {
                for (var y = g - r > r - p, b = y ? f : d; ao.test(t.text.charAt(b));)++b;
                var w = G(n, b, y ? m : v);
                return w.after = y, w
            }
            var x = Math.ceil(h / 2),
                S = f + x;
            if (u) {
                S = f;
                for (var C = 0; x > C; ++C) S = oi(t, S, 1)
            }
            var k = o(S);
            k > r ? (d = S, g = k, (v = l) && (g += 1e3), h -= x) : (f = S, p = k, m = l, h = x)
        }
    }

    function j(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == Li) {
            Li = Ur("pre");
            for (var t = 0; 49 > t; ++t) Li.appendChild(document.createTextNode("x")), Li.appendChild(Ur("br"));
            Li.appendChild(document.createTextNode("x"))
        }
        jr(e.measure, Li);
        var n = Li.offsetHeight / 50;
        return n > 3 && (e.cachedTextHeight = n), Kr(e.measure), n || 1
    }

    function X(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = Ur("span", "x"),
            n = Ur("pre", [t]);
        jr(e.measure, n);
        var r = t.offsetWidth;
        return r > 2 && (e.cachedCharWidth = r), r || 10
    }

    function q(e) {
        e.curOp = {
            changes: [],
            updateInput: null,
            userSelChange: null,
            textChanged: null,
            selectionChanged: !1,
            updateMaxLine: !1,
            updateScrollPos: !1,
            id: ++Ii
        }, to++ || (eo = [])
    }

    function Y(e) {
        var t = e.curOp,
            n = e.doc,
            r = e.display;
        if (e.curOp = null, t.updateMaxLine && h(e), r.maxLineChanged && !e.options.lineWrapping) {
            var i = z(e, r.maxLine).width;
            r.sizer.style.minWidth = Math.max(0, i + 3 + no) + "px", r.maxLineChanged = !1;
            var o = Math.max(0, r.sizer.offsetLeft + r.sizer.offsetWidth - r.scroller.clientWidth);
            o < n.scrollLeft && !t.updateScrollPos && mt(e, Math.min(r.scroller.scrollLeft, o), !0)
        }
        var a, l;
        if (t.updateScrollPos) a = t.updateScrollPos;
        else if (t.selectionChanged && r.scroller.clientHeight) {
            var s = _(e, n.sel.head);
            a = Jt(e, s.left, s.top, s.left, s.bottom)
        }(t.changes.length || a && null != a.scrollTop) && (l = b(e, t.changes, a && a.scrollTop)), !l && t.selectionChanged && T(e), t.updateScrollPos ? (r.scroller.scrollTop = r.scrollbarV.scrollTop = n.scrollTop = a.scrollTop, r.scroller.scrollLeft = r.scrollbarH.scrollLeft = n.scrollLeft = a.scrollLeft, m(e)) : a && Yt(e), t.selectionChanged && A(e), e.state.focused && t.updateInput && it(e, t.userSelChange);
        var c = t.maybeHiddenMarkers,
            u = t.maybeUnhiddenMarkers;
        if (c)
            for (var f = 0; f < c.length; ++f) c[f].lines.length || Nr(c[f], "hide");
        if (u)
            for (var f = 0; f < u.length; ++f) u[f].lines.length && Nr(u[f], "unhide");
        var d;
        if (--to || (d = eo, eo = null), t.textChanged && Nr(e, "change", e, t.textChanged), t.selectionChanged && Nr(e, "cursorActivity", e), d)
            for (var f = 0; f < d.length; ++f) d[f]()
    }

    function Q(e, t) {
        return function () {
            var n = e || this,
                r = !n.curOp;
            r && q(n);
            try {
                var i = t.apply(n, arguments)
            } finally {
                r && Y(n)
            }
            return i
        }
    }

    function Z(e) {
        return function () {
            var t, n = this.cm && !this.cm.curOp;
            n && q(this.cm);
            try {
                t = e.apply(this, arguments)
            } finally {
                n && Y(this.cm)
            }
            return t
        }
    }

    function J(e, t) {
        var n, r = !e.curOp;
        r && q(e);
        try {
            n = t()
        } finally {
            r && Y(e)
        }
        return n
    }

    function et(e, t, n, r) {
        null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), e.curOp.changes.push({
            from: t,
            to: n,
            diff: r
        })
    }

    function tt(e) {
        e.display.pollingFast || e.display.poll.set(e.options.pollInterval, function () {
            rt(e), e.state.focused && tt(e)
        })
    }

    function nt(e) {
        function t() {
            var r = rt(e);
            r || n ? (e.display.pollingFast = !1, tt(e)) : (n = !0, e.display.poll.set(60, t))
        }
        var n = !1;
        e.display.pollingFast = !0, e.display.poll.set(20, t)
    }

    function rt(e) {
        var t = e.display.input,
            n = e.display.prevInput,
            r = e.doc,
            i = r.sel;
        if (!e.state.focused || fo(t) || at(e)) return !1;
        var o = t.value;
        if (o == n && zt(i.from, i.to)) return !1;
        if (si && o && 0 === t.selectionStart) return it(e, !0), !1;
        var a = !e.curOp;
        a && q(e), i.shift = !1;
        for (var l = 0, s = Math.min(n.length, o.length); s > l && n[l] == o[l];)++l;
        var c = i.from,
            u = i.to;
        l < n.length ? c = $t(c.line, c.ch - (n.length - l)) : e.state.overwrite && zt(c, u) && !e.state.pasteIncoming && (u = $t(u.line, Math.min(nr(r, u.line).text.length, u.ch + (o.length - l))));
        var h = e.curOp.updateInput;
        return At(e.doc, {
            from: c,
            to: u,
            text: ho(o.slice(l)),
            origin: e.state.pasteIncoming ? "paste" : "+input"
        }, "end"), e.curOp.updateInput = h, o.length > 1e3 ? t.value = e.display.prevInput = "" : e.display.prevInput = o, a && Y(e), e.state.pasteIncoming = !1, !0
    }

    function it(e, t) {
        var n, r, i = e.doc;
        zt(i.sel.from, i.sel.to) ? t && (e.display.prevInput = e.display.input.value = "") : (e.display.prevInput = "", n = po && (i.sel.to.line - i.sel.from.line > 100 || (r = e.getSelection()).length > 1e3), e.display.input.value = n ? "-" : r || e.getSelection(), e.state.focused && $r(e.display.input)), e.display.inaccurateSelection = n
    }

    function ot(e) {
        "nocursor" == e.options.readOnly || xi && document.activeElement == e.display.input || e.display.input.focus()
    }

    function at(e) {
        return e.options.readOnly || e.doc.cantEdit
    }

    function lt(e) {
        function t() {
            e.state.focused && setTimeout(Vr(ot, e), 0)
        }

        function n() {
            a.cachedCharWidth = a.cachedTextHeight = null, R(e), J(e, Vr(et, e))
        }

        function r() {
            for (var e = a.wrapper.parentNode; e && e != document.body; e = e.parentNode);
            e ? setTimeout(r, 5e3) : Wr(window, "resize", n)
        }

        function i(t) {
            e.options.onDragEvent && e.options.onDragEvent(e, xr(t)) || kr(t)
        }

        function o() {
            a.inaccurateSelection && (a.prevInput = "", a.inaccurateSelection = !1, a.input.value = e.getSelection(), $r(a.input))
        }
        var a = e.display;
        Tr(a.scroller, "mousedown", Q(e, ut)), Tr(a.scroller, "dblclick", Q(e, Sr)), Tr(a.lineSpace, "selectstart", function (e) {
            st(a, e) || Sr(e)
        }), Ni || Tr(a.scroller, "contextmenu", function (t) {
            Lt(e, t)
        }), Tr(a.scroller, "scroll", function () {
            pt(e, a.scroller.scrollTop), mt(e, a.scroller.scrollLeft, !0), Nr(e, "scroll", e)
        }), Tr(a.scrollbarV, "scroll", function () {
            pt(e, a.scrollbarV.scrollTop)
        }), Tr(a.scrollbarH, "scroll", function () {
            mt(e, a.scrollbarH.scrollLeft)
        }), Tr(a.scroller, "mousewheel", function (t) {
            gt(e, t)
        }), Tr(a.scroller, "DOMMouseScroll", function (t) {
            gt(e, t)
        }), Tr(a.scrollbarH, "mousedown", t), Tr(a.scrollbarV, "mousedown", t), Tr(a.wrapper, "scroll", function () {
            a.wrapper.scrollTop = a.wrapper.scrollLeft = 0
        }), Tr(window, "resize", n), setTimeout(r, 5e3), Tr(a.input, "keyup", Q(e, function (t) {
            e.options.onKeyEvent && e.options.onKeyEvent(e, xr(t)) || 16 == t.keyCode && (e.doc.sel.shift = !1)
        })), Tr(a.input, "input", Vr(nt, e)), Tr(a.input, "keydown", Q(e, xt)), Tr(a.input, "keypress", Q(e, St)), Tr(a.input, "focus", Vr(Ct, e)), Tr(a.input, "blur", Vr(kt, e)), e.options.dragDrop && (Tr(a.scroller, "dragstart", function (t) {
            dt(e, t)
        }), Tr(a.scroller, "dragenter", i), Tr(a.scroller, "dragover", i), Tr(a.scroller, "drop", Q(e, ht))), Tr(a.scroller, "paste", function (t) {
            st(a, t) || (ot(e), nt(e))
        }), Tr(a.input, "paste", function () {
            e.state.pasteIncoming = !0, nt(e)
        }), Tr(a.input, "cut", o), Tr(a.input, "copy", o), gi && Tr(a.sizer, "mouseup", function () {
            document.activeElement == a.input && a.input.blur(), ot(e)
        })
    }

    function st(e, t) {
        for (var n = Lr(t); n != e.wrapper; n = n.parentNode) {
            if (!n) return !0;
            if (/\bCodeMirror-(?:line)?widget\b/.test(n.className) || n.parentNode == e.sizer && n != e.mover) return !0
        }
    }

    function ct(e, t, n) {
        var r = e.display;
        if (!n) {
            var i = Lr(t);
            if (i == r.scrollbarH || i == r.scrollbarH.firstChild || i == r.scrollbarV || i == r.scrollbarV.firstChild || i == r.scrollbarFiller) return null
        }
        var o, a, l = qr(r.lineSpace);
        try {
            o = t.clientX, a = t.clientY
        } catch (t) {
            return null
        }
        return U(e, o - l.left, a - l.top)
    }

    function ut(e) {
        function t(e) {
            if ("single" == u) return Ut(i.doc, Vt(a, s), e), void 0;
            if (m = Vt(a, m), g = Vt(a, g), "double" == u) {
                var t = on(nr(a, e.line).text, e);
                Ht(e, m) ? Ut(i.doc, t.from, g) : Ut(i.doc, m, t.to)
            } else "triple" == u && (Ht(e, m) ? Ut(i.doc, g, Vt(a, $t(e.line, 0))) : Ut(i.doc, m, Vt(a, $t(e.line + 1, 0))))
        }

        function n(e) {
            var r = ++y,
                l = ct(i, e, !0);
            if (l)
                if (zt(l, f)) {
                    var s = e.clientY < v.top ? -20 : e.clientY > v.bottom ? 20 : 0;
                    s && setTimeout(Q(i, function () {
                        y == r && (o.scroller.scrollTop += s, n(e))
                    }), 50)
                } else {
                    i.state.focused || Ct(i), f = l, t(l);
                    var c = p(o, a);
                    (l.line >= c.to || l.line < c.from) && setTimeout(Q(i, function () {
                        y == r && n(e)
                    }), 150)
                }
        }

        function r(e) {
            y = 1 / 0;
            var n = ct(i, e);
            n && t(n), Sr(e), ot(i), Wr(document, "mousemove", b), Wr(document, "mouseup", w)
        }
        var i = this,
            o = i.display,
            a = i.doc,
            l = a.sel;
        if (l.shift = e.shiftKey, st(o, e)) return hi || (o.scroller.draggable = !1, setTimeout(function () {
            o.scroller.draggable = !0
        }, 100)), void 0;
        if (!ft(i, e)) {
            var s = ct(i, e);
            switch (Mr(e)) {
            case 3:
                return Ni && Lt.call(i, i, e), void 0;
            case 2:
                return s && Ut(i.doc, s), setTimeout(Vr(ot, i), 20), Sr(e), void 0
            }
            if (!s) return Lr(e) == o.scroller && Sr(e), void 0;
            i.state.focused || Ct(i);
            var c = +new Date,
                u = "single";
            if (Ti && Ti.time > c - 400 && zt(Ti.pos, s)) u = "triple", Sr(e), setTimeout(Vr(ot, i), 20), an(i, s.line);
            else if (Mi && Mi.time > c - 400 && zt(Mi.pos, s)) {
                u = "double", Ti = {
                    time: c,
                    pos: s
                }, Sr(e);
                var h = on(nr(a, s.line).text, s);
                Ut(i.doc, h.from, h.to)
            } else Mi = {
                time: c,
                pos: s
            };
            var f = s;
            if (i.options.dragDrop && lo && !at(i) && !zt(l.from, l.to) && !Ht(s, l.from) && !Ht(l.to, s) && "single" == u) {
                var d = Q(i, function (t) {
                    hi && (o.scroller.draggable = !1), i.state.draggingText = !1, Wr(document, "mouseup", d), Wr(o.scroller, "drop", d), Math.abs(e.clientX - t.clientX) + Math.abs(e.clientY - t.clientY) < 10 && (Sr(t), Ut(i.doc, s), ot(i))
                });
                return hi && (o.scroller.draggable = !0), i.state.draggingText = d, o.scroller.dragDrop && o.scroller.dragDrop(), Tr(document, "mouseup", d), Tr(o.scroller, "drop", d), void 0
            }
            Sr(e), "single" == u && Ut(i.doc, Vt(a, s));
            var m = l.from,
                g = l.to,
                v = qr(o.wrapper),
                y = 0,
                b = Q(i, function (e) {
                    si || Mr(e) ? n(e) : r(e)
                }),
                w = Q(i, r);
            Tr(document, "mousemove", b), Tr(document, "mouseup", w)
        }
    }

    function ht(e) {
        var t = this;
        if (!(st(t.display, e) || t.options.onDragEvent && t.options.onDragEvent(t, xr(e)))) {
            Sr(e);
            var n = ct(t, e, !0),
                r = e.dataTransfer.files;
            if (n && !at(t))
                if (r && r.length && window.FileReader && window.File)
                    for (var i = r.length, o = Array(i), a = 0, l = function (e, r) {
                            var l = new FileReader;
                            l.onload = function () {
                                o[r] = l.result, ++a == i && (n = Vt(t.doc, n), Pt(t.doc, o.join(""), n, "around", "paste"))
                            }, l.readAsText(e)
                        }, s = 0; i > s; ++s) l(r[s], s);
                else {
                    if (t.state.draggingText && !Ht(n, t.doc.sel.from) && !Ht(t.doc.sel.to, n)) return t.state.draggingText(e), setTimeout(Vr(ot, t), 20), void 0;
                    try {
                        var o = e.dataTransfer.getData("Text");
                        if (o) {
                            var c = t.doc.sel.from,
                                u = t.doc.sel.to;
                            jt(t.doc, n, n), t.state.draggingText && Pt(t.doc, "", c, u, "paste"), t.replaceSelection(o, null, "paste"), ot(t), Ct(t)
                        }
                    } catch (e) {}
                }
        }
    }

    function ft(e, t) {
        var n = e.display;
        try {
            var r = t.clientX,
                i = t.clientY
        } catch (t) {
            return !1
        }
        if (r >= Math.floor(qr(n.gutters).right)) return !1;
        if (Sr(t), !Ir(e, "gutterClick")) return !0;
        var o = qr(n.lineDiv);
        if (i > o.bottom) return !0;
        i -= o.top - n.viewOffset;
        for (var a = 0; a < e.options.gutters.length; ++a) {
            var l = n.gutters.childNodes[a];
            if (l && qr(l).right >= r) {
                var s = lr(e.doc, i),
                    c = e.options.gutters[a];
                Ar(e, "gutterClick", e, s, c, t);
                break
            }
        }
        return !0
    }

    function dt(e, t) {
        if (!st(e.display, t)) {
            var n = e.getSelection();
            if (t.dataTransfer.setData("Text", n), t.dataTransfer.setDragImage && !mi) {
                var r = Ur("img", null, null, "position: fixed; left: 0; top: 0;");
                pi && (r.width = r.height = 1, e.display.wrapper.appendChild(r), r._top = r.offsetTop), t.dataTransfer.setDragImage(r, 0, 0), pi && r.parentNode.removeChild(r)
            }
        }
    }

    function pt(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (e.doc.scrollTop = t, li || b(e, [], t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t), e.display.scrollbarV.scrollTop != t && (e.display.scrollbarV.scrollTop = t), li && b(e, []))
    }

    function mt(e, t, n) {
        (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) || (t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), e.doc.scrollLeft = t, m(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbarH.scrollLeft != t && (e.display.scrollbarH.scrollLeft = t))
    }

    function gt(e, t) {
        var n = t.wheelDeltaX,
            r = t.wheelDeltaY;
        if (null == n && t.detail && t.axis == t.HORIZONTAL_AXIS && (n = t.detail), null == r && t.detail && t.axis == t.VERTICAL_AXIS ? r = t.detail : null == r && (r = t.wheelDelta), r && Si && hi)
            for (var i = t.target; i != a; i = i.parentNode)
                if (i.lineObj) {
                    e.display.currentWheelTarget = i;
                    break
                }
        var o = e.display,
            a = o.scroller;
        if (n && !li && !pi && null != Di) return r && pt(e, Math.max(0, Math.min(a.scrollTop + r * Di, a.scrollHeight - a.clientHeight))), mt(e, Math.max(0, Math.min(a.scrollLeft + n * Di, a.scrollWidth - a.clientWidth))), Sr(t), o.wheelStartX = null, void 0;
        if (r && null != Di) {
            var l = r * Di,
                s = e.doc.scrollTop,
                c = s + o.wrapper.clientHeight;
            0 > l ? s = Math.max(0, s + l - 50) : c = Math.min(e.doc.height, c + l + 50), b(e, [], {
                top: s,
                bottom: c
            })
        }
        20 > Ei && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = n, o.wheelDY = r, setTimeout(function () {
            if (null != o.wheelStartX) {
                var e = a.scrollLeft - o.wheelStartX,
                    t = a.scrollTop - o.wheelStartY,
                    n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                o.wheelStartX = o.wheelStartY = null, n && (Di = (Di * Ei + n) / (Ei + 1), ++Ei)
            }
        }, 200)) : (o.wheelDX += n, o.wheelDY += r))
    }

    function vt(e, t, n) {
        if ("string" == typeof t && (t = Ui[t], !t)) return !1;
        e.display.pollingFast && rt(e) && (e.display.pollingFast = !1);
        var r = e.doc,
            i = r.sel.shift,
            o = !1;
        try {
            at(e) && (e.state.suppressEdits = !0), n && (r.sel.shift = !1), o = t(e) != ro
        } finally {
            r.sel.shift = i, e.state.suppressEdits = !1
        }
        return o
    }

    function yt(e) {
        var t = e.state.keyMaps.slice(0);
        return t.push(e.options.keyMap), e.options.extraKeys && t.unshift(e.options.extraKeys), t
    }

    function bt(e, t) {
        var n = un(e.options.keyMap),
            r = n.auto;
        clearTimeout(Fi), r && !fn(t) && (Fi = setTimeout(function () {
            un(e.options.keyMap) == n && (e.options.keyMap = r.call ? r.call(null, e) : r)
        }, 50));
        var i = dn(t, !0),
            o = !1;
        if (!i) return !1;
        var a = yt(e);
        return o = t.shiftKey ? hn("Shift-" + i, a, function (t) {
            return vt(e, t, !0)
        }) || hn(i, a, function (t) {
            return "string" == typeof t && /^go[A-Z]/.test(t) ? vt(e, t) : void 0
        }) : hn(i, a, function (t) {
            return vt(e, t)
        }), "stop" == o && (o = !1), o && (Sr(t), A(e), ui && (t.oldKeyCode = t.keyCode, t.keyCode = 0)), o
    }

    function wt(e, t, n) {
        var r = hn("'" + n + "'", yt(e), function (t) {
            return vt(e, t, !0)
        });
        return r && (Sr(t), A(e)), r
    }

    function xt(e) {
        var t = this;
        if (t.state.focused || Ct(t), si && 27 == e.keyCode && (e.returnValue = !1), !t.options.onKeyEvent || !t.options.onKeyEvent(t, xr(e))) {
            var n = e.keyCode;
            t.doc.sel.shift = 16 == n || e.shiftKey;
            var r = bt(t, e);
            pi && ($i = r ? n : null, !r && 88 == n && !po && (Si ? e.metaKey : e.ctrlKey) && t.replaceSelection(""))
        }
    }

    function St(e) {
        var t = this;
        if (!t.options.onKeyEvent || !t.options.onKeyEvent(t, xr(e))) {
            var n = e.keyCode,
                r = e.charCode;
            if (pi && n == $i) return $i = null, Sr(e), void 0;
            if (!(pi && (!e.which || e.which < 10) || gi) || !bt(t, e)) {
                var i = String.fromCharCode(null == r ? n : r);
                this.options.electricChars && this.doc.mode.electricChars && this.options.smartIndent && !at(this) && this.doc.mode.electricChars.indexOf(i) > -1 && setTimeout(Q(t, function () {
                    en(t, t.doc.sel.to.line, "smart")
                }), 75), wt(t, e, i) || nt(t)
            }
        }
    }

    function Ct(e) {
        "nocursor" != e.options.readOnly && (e.state.focused || (Nr(e, "focus", e), e.state.focused = !0, -1 == e.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (e.display.wrapper.className += " CodeMirror-focused"), it(e, !0)), tt(e), A(e))
    }

    function kt(e) {
        e.state.focused && (Nr(e, "blur", e), e.state.focused = !1, e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-focused", "")), clearInterval(e.display.blinker), setTimeout(function () {
            e.state.focused || (e.doc.sel.shift = !1)
        }, 150)
    }

    function Lt(e, t) {
        function n() {
            if (r.inputDiv.style.position = "relative", r.input.style.cssText = l, ui && (r.scrollbarV.scrollTop = r.scroller.scrollTop = a), tt(e), null != r.input.selectionStart && (!si || ui)) {
                clearTimeout(Pi);
                var t = r.input.value = " " + (zt(i.from, i.to) ? "" : r.input.value),
                    n = 0;
                r.prevInput = " ", r.input.selectionStart = 1, r.input.selectionEnd = t.length;
                var o = function () {
                    " " == r.prevInput && 0 == r.input.selectionStart ? Q(e, Ui.selectAll)(e) : n++ < 10 ? Pi = setTimeout(o, 500) : it(e)
                };
                Pi = setTimeout(o, 200)
            }
        }
        var r = e.display,
            i = e.doc.sel;
        if (!st(r, t)) {
            var o = ct(e, t),
                a = r.scroller.scrollTop;
            if (o && !pi) {
                (zt(i.from, i.to) || Ht(o, i.from) || !Ht(o, i.to)) && Q(e, jt)(e.doc, o, o);
                var l = r.input.style.cssText;
                if (r.inputDiv.style.position = "absolute", r.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (t.clientY - 5) + "px; left: " + (t.clientX - 5) + "px; z-index: 1000; background: white; outline: none;" + "border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);", ot(e), it(e, !0), zt(i.from, i.to) && (r.input.value = r.prevInput = " "), Ni) {
                    kr(t);
                    var s = function () {
                        Wr(window, "mouseup", s), setTimeout(n, 20)
                    };
                    Tr(window, "mouseup", s)
                } else setTimeout(n, 50)
            }
        }
    }

    function Mt(e) {
        return $t(e.from.line + e.text.length - 1, Pr(e.text).length + (1 == e.text.length ? e.from.ch : 0))
    }

    function Tt(e, t, n) {
        if (!Ht(t.from, n)) return Vt(e, n);
        var r = t.text.length - 1 - (t.to.line - t.from.line);
        if (n.line > t.to.line + r) {
            var i = n.line - r,
                o = e.first + e.size - 1;
            return i > o ? $t(o, nr(e, o).text.length) : _t(n, nr(e, i).text.length)
        }
        if (n.line == t.to.line + r) return _t(n, Pr(t.text).length + (1 == t.text.length ? t.from.ch : 0) + nr(e, t.to.line).text.length - t.to.ch);
        var a = n.line - t.from.line;
        return _t(n, t.text[a].length + (a ? 0 : t.from.ch))
    }

    function Wt(e, t, n) {
        if (n && "object" == typeof n) return {
            anchor: Tt(e, t, n.anchor),
            head: Tt(e, t, n.head)
        };
        if ("start" == n) return {
            anchor: t.from,
            head: t.from
        };
        var r = Mt(t);
        if ("around" == n) return {
            anchor: t.from,
            head: r
        };
        if ("end" == n) return {
            anchor: r,
            head: r
        };
        var i = function (e) {
            if (Ht(e, t.from)) return e;
            if (!Ht(t.to, e)) return r;
            var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                i = e.ch;
            return e.line == t.to.line && (i += r.ch - t.to.ch), $t(n, i)
        };
        return {
            anchor: i(e.sel.anchor),
            head: i(e.sel.head)
        }
    }

    function Nt(e, t) {
        var n = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            update: function (t, n, r, i) {
                t && (this.from = Vt(e, t)), n && (this.to = Vt(e, n)), r && (this.text = r), void 0 !== i && (this.origin = i)
            },
            cancel: function () {
                this.canceled = !0
            }
        };
        return Nr(e, "beforeChange", e, n), e.cm && Nr(e.cm, "beforeChange", e.cm, n), n.canceled ? null : {
            from: n.from,
            to: n.to,
            text: n.text,
            origin: n.origin
        }
    }

    function At(e, t, n, r) {
        if (e.cm) {
            if (!e.cm.curOp) return Q(e.cm, At)(e, t, n, r);
            if (e.cm.state.suppressEdits) return
        }
        if (!(Ir(e, "beforeChange") || e.cm && Ir(e.cm, "beforeChange")) || (t = Nt(e, t))) {
            var i = Ai && !r && Mn(e, t.from, t.to);
            if (i) {
                for (var o = i.length - 1; o >= 1; --o) Ot(e, {
                    from: i[o].from,
                    to: i[o].to,
                    text: [""]
                });
                i.length && Ot(e, {
                    from: i[0].from,
                    to: i[0].to,
                    text: t.text
                }, n)
            } else Ot(e, t, n)
        }
    }

    function Ot(e, t, n) {
        var r = Wt(e, t, n);
        dr(e, t, r, e.cm ? e.cm.curOp.id : 0 / 0), Dt(e, t, r, kn(e, t));
        var i = [];
        er(e, function (e, n) {
            n || -1 != zr(i, e.history) || (br(e.history, t), i.push(e.history)), Dt(e, t, null, kn(e, t))
        })
    }

    function It(e, t) {
        var n = e.history,
            r = ("undo" == t ? n.done : n.undone).pop();
        if (r) {
            n.dirtyCounter += "undo" == t ? -1 : 1;
            var i = {
                changes: [],
                anchorBefore: r.anchorAfter,
                headBefore: r.headAfter,
                anchorAfter: r.anchorBefore,
                headAfter: r.headBefore
            };
            ("undo" == t ? n.undone : n.done).push(i);
            for (var o = r.changes.length - 1; o >= 0; --o) {
                var a = r.changes[o];
                a.origin = t, i.changes.push(fr(e, a));
                var l = o ? Wt(e, a, null) : {
                    anchor: r.anchorBefore,
                    head: r.headBefore
                };
                Dt(e, a, l, Ln(e, a));
                var s = [];
                er(e, function (e, t) {
                    t || -1 != zr(s, e.history) || (br(e.history, a), s.push(e.history)), Dt(e, a, null, Ln(e, a))
                })
            }
        }
    }

    function Et(e, t) {
        function n(e) {
            return $t(e.line + t, e.ch)
        }
        e.first += t, e.cm && et(e.cm, e.first, e.first, t), e.sel.head = n(e.sel.head), e.sel.anchor = n(e.sel.anchor), e.sel.from = n(e.sel.from), e.sel.to = n(e.sel.to)
    }

    function Dt(e, t, n, r) {
        if (e.cm && !e.cm.curOp) return Q(e.cm, Dt)(e, t, n, r);
        if (t.to.line < e.first) return Et(e, t.text.length - 1 - (t.to.line - t.from.line)), void 0;
        if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                Et(e, i), t = {
                    from: $t(e.first, 0),
                    to: $t(t.to.line + i, t.to.ch),
                    text: [Pr(t.text)],
                    origin: t.origin
                }
            }
            var o = e.lastLine();
            t.to.line > o && (t = {
                from: t.from,
                to: $t(o, nr(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin
            }), n || (n = Wt(e, t, null)), e.cm ? Ft(e.cm, t, r, n) : Qn(e, t, r, n)
        }
    }

    function Ft(e, t, n, r) {
        var o = e.doc,
            a = e.display,
            l = t.from,
            s = t.to,
            c = !1,
            h = l.line;
        e.options.lineWrapping || (h = ar(An(o, nr(o, l.line))), o.iter(h, s.line + 1, function (e) {
            return e == a.maxLine ? (c = !0, !0) : void 0
        })), Qn(o, t, n, r, i(e)), e.options.lineWrapping || (o.iter(h, l.line + t.text.length, function (e) {
            var t = u(o, e);
            t > a.maxLineLength && (a.maxLine = e, a.maxLineLength = t, a.maxLineChanged = !0, c = !1)
        }), c && (e.curOp.updateMaxLine = !0)), o.frontier = Math.min(o.frontier, l.line), O(e, 400);
        var f = t.text.length - (s.line - l.line) - 1;
        if (et(e, l.line, s.line + 1, f), Ir(e, "change")) {
            var d = {
                from: l,
                to: s,
                text: t.text,
                origin: t.origin
            };
            if (e.curOp.textChanged) {
                for (var p = e.curOp.textChanged; p.next; p = p.next);
                p.next = d
            } else e.curOp.textChanged = d
        }
    }

    function Pt(e, t, n, r, i) {
        if (r || (r = n), Ht(r, n)) {
            var o = r;
            r = n, n = o
        }
        "string" == typeof t && (t = ho(t)), At(e, {
            from: n,
            to: r,
            text: t,
            origin: i
        }, null)
    }

    function $t(e, t) {
        return this instanceof $t ? (this.line = e, this.ch = t, void 0) : new $t(e, t)
    }

    function zt(e, t) {
        return e.line == t.line && e.ch == t.ch
    }

    function Ht(e, t) {
        return e.line < t.line || e.line == t.line && e.ch < t.ch
    }

    function Rt(e) {
        return $t(e.line, e.ch)
    }

    function Bt(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }

    function Vt(e, t) {
        if (t.line < e.first) return $t(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? $t(n, nr(e, n).text.length) : _t(t, nr(e, t.line).text.length)
    }

    function _t(e, t) {
        var n = e.ch;
        return null == n || n > t ? $t(e.line, t) : 0 > n ? $t(e.line, 0) : e
    }

    function Gt(e, t) {
        return t >= e.first && t < e.first + e.size
    }

    function Ut(e, t, n, r) {
        if (e.sel.shift || e.sel.extend) {
            var i = e.sel.anchor;
            if (n) {
                var o = Ht(t, i);
                o != Ht(n, i) ? (i = t, t = n) : o != Ht(t, n) && (t = n)
            }
            jt(e, i, t, r)
        } else jt(e, t, n || t, r);
        e.cm && (e.cm.curOp.userSelChange = !0)
    }

    function Kt(e, t, n) {
        var r = {
            anchor: t,
            head: n
        };
        return Nr(e, "beforeSelectionChange", e, r), e.cm && Nr(e.cm, "beforeSelectionChange", e.cm, r), r.anchor = Vt(e, r.anchor), r.head = Vt(e, r.head), r
    }

    function jt(e, t, n, r, i) {
        if (!i && Ir(e, "beforeSelectionChange") || e.cm && Ir(e.cm, "beforeSelectionChange")) {
            var o = Kt(e, t, n);
            n = o.head, t = o.anchor
        }
        var a = e.sel;
        if (a.goalColumn = null, (i || !zt(t, a.anchor)) && (t = qt(e, t, r, "push" != i)), (i || !zt(n, a.head)) && (n = qt(e, n, r, "push" != i)), !zt(a.anchor, t) || !zt(a.head, n)) {
            a.anchor = t, a.head = n;
            var l = Ht(n, t);
            a.from = l ? n : t, a.to = l ? t : n, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0), Ar(e, "cursorActivity", e)
        }
    }

    function Xt(e) {
        jt(e.doc, e.doc.sel.from, e.doc.sel.to, null, "push")
    }

    function qt(e, t, n, r) {
        var i = !1,
            o = t,
            a = n || 1;
        e.cantEdit = !1;
        e: for (;;) {
            var l, s = nr(e, o.line);
            if (s.markedSpans) {
                for (var c = 0; c < s.markedSpans.length; ++c) {
                    var u = s.markedSpans[c],
                        h = u.marker;
                    if ((null == u.from || (h.inclusiveLeft ? u.from <= o.ch : u.from < o.ch)) && (null == u.to || (h.inclusiveRight ? u.to >= o.ch : u.to > o.ch))) {
                        if (r && h.clearOnEnter) {
                            (l || (l = [])).push(h);
                            continue
                        }
                        if (!h.atomic) continue;
                        var f = h.find()[0 > a ? "from" : "to"];
                        if (zt(f, o) && (f.ch += a, f.ch < 0 ? f = f.line > e.first ? Vt(e, $t(f.line - 1)) : null : f.ch > s.text.length && (f = f.line < e.first + e.size - 1 ? $t(f.line + 1, 0) : null), !f)) {
                            if (i) return r ? (e.cantEdit = !0, $t(e.first, 0)) : qt(e, t, n, !0);
                            i = !0, f = t, a = -a
                        }
                        o = f;
                        continue e
                    }
                }
                if (l)
                    for (var c = 0; c < l.length; ++c) l[c].clear()
            }
            return o
        }
    }

    function Yt(e) {
        var t = Qt(e, e.doc.sel.head);
        if (e.state.focused) {
            var n = e.display,
                r = qr(n.sizer),
                i = null;
            if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null != i && !bi) {
                var o = "none" == n.cursor.style.display;
                o && (n.cursor.style.display = "", n.cursor.style.left = t.left + "px", n.cursor.style.top = t.top - n.viewOffset + "px"), n.cursor.scrollIntoView(i), o && (n.cursor.style.display = "none")
            }
        }
    }

    function Qt(e, t) {
        for (;;) {
            var n = !1,
                r = _(e, t),
                i = Jt(e, r.left, r.top, r.left, r.bottom),
                o = e.doc.scrollTop,
                a = e.doc.scrollLeft;
            if (null != i.scrollTop && (pt(e, i.scrollTop), Math.abs(e.doc.scrollTop - o) > 1 && (n = !0)), null != i.scrollLeft && (mt(e, i.scrollLeft), Math.abs(e.doc.scrollLeft - a) > 1 && (n = !0)), !n) return r
        }
    }

    function Zt(e, t, n, r, i) {
        var o = Jt(e, t, n, r, i);
        null != o.scrollTop && pt(e, o.scrollTop), null != o.scrollLeft && mt(e, o.scrollLeft)
    }

    function Jt(e, t, n, r, i) {
        var o = e.display,
            a = F(o);
        n += a, i += a;
        var l = o.scroller.clientHeight - no,
            s = o.scroller.scrollTop,
            c = {}, u = e.doc.height + 2 * a,
            h = a + 10 > n,
            f = i + a > u - 10;
        s > n ? c.scrollTop = h ? 0 : Math.max(0, n) : i > s + l && (c.scrollTop = (f ? u : i) - l);
        var d = o.scroller.clientWidth - no,
            p = o.scroller.scrollLeft;
        t += o.gutters.offsetWidth, r += o.gutters.offsetWidth;
        var m = o.gutters.offsetWidth,
            g = m + 10 > t;
        return p + m > t || g ? (g && (t = 0), c.scrollLeft = Math.max(0, t - 10 - m)) : r > d + p - 3 && (c.scrollLeft = r + 10 - d), c
    }

    function en(e, t, n, r) {
        var i = e.doc;
        if (n || (n = "add"), "smart" == n)
            if (e.doc.mode.indent) var o = D(e, t);
            else n = "prev";
        var a, l = e.options.tabSize,
            s = nr(i, t),
            c = Dr(s.text, null, l),
            u = s.text.match(/^\s*/)[0];
        if ("smart" == n && (a = e.doc.mode.indent(o, s.text.slice(u.length), s.text), a == ro)) {
            if (!r) return;
            n = "prev"
        }
        "prev" == n ? a = t > i.first ? Dr(nr(i, t - 1).text, null, l) : 0 : "add" == n ? a = c + e.options.indentUnit : "subtract" == n && (a = c - e.options.indentUnit), a = Math.max(0, a);
        var h = "",
            f = 0;
        if (e.options.indentWithTabs)
            for (var d = Math.floor(a / l); d; --d) f += l, h += "	";
        a > f && (h += Fr(a - f)), h != u && Pt(e.doc, h, $t(t, 0), $t(t, u.length), "+input"), s.stateAfter = null
    }

    function tn(e, t, n) {
        var r = t,
            i = t,
            o = e.doc;
        return "number" == typeof t ? i = nr(o, Bt(o, t)) : r = ar(t), null == r ? null : n(i, r) ? (et(e, r, r + 1), i) : null
    }

    function nn(e, t, n, r, i) {
        function o() {
            var t = l + n;
            return t < e.first || t >= e.first + e.size ? u = !1 : (l = t, c = nr(e, t))
        }

        function a(e) {
            var t = (i ? oi : ai)(c, s, n, !0);
            if (null == t) {
                if (e || !o()) return u = !1;
                s = i ? (0 > n ? ni : ti)(c) : 0 > n ? c.text.length : 0
            } else s = t;
            return !0
        }
        var l = t.line,
            s = t.ch,
            c = nr(e, l),
            u = !0;
        if ("char" == r) a();
        else if ("column" == r) a(!0);
        else if ("word" == r)
            for (var h = !1; !(0 > n) || a();) {
                if (_r(c.text.charAt(s))) h = !0;
                else if (h) {
                    0 > n && (n = 1, a());
                    break
                }
                if (n > 0 && !a()) break
            }
        var f = qt(e, $t(l, s), n, !0);
        return u || (f.hitSide = !0), f
    }

    function rn(e, t, n, r) {
        var i, o = e.doc,
            a = t.left;
        if ("page" == r) {
            var l = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            i = t.top + n * l
        } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
        for (;;) {
            var s = U(e, a, i);
            if (!s.outside) break;
            if (0 > n ? 0 >= i : i >= o.height) {
                s.hitSide = !0;
                break
            }
            i += 5 * n
        }
        return s
    }

    function on(e, t) {
        var n = t.ch,
            r = t.ch;
        if (e) {
            t.after === !1 || r == e.length ? --n : ++r;
            for (var i = e.charAt(n), o = _r(i) ? _r : /\s/.test(i) ? function (e) {
                    return /\s/.test(e)
                } : function (e) {
                    return !/\s/.test(e) && !_r(e)
                }; n > 0 && o(e.charAt(n - 1));)--n;
            for (; r < e.length && o(e.charAt(r));)++r
        }
        return {
            from: $t(t.line, n),
            to: $t(t.line, r)
        }
    }

    function an(e, t) {
        Ut(e.doc, $t(t, 0), Vt(e.doc, $t(t + 1, 0)))
    }

    function ln(t, n, r, i) {
        e.defaults[t] = n, r && (zi[t] = i ? function (e, t, n) {
            n != Ri && r(e, t, n)
        } : r)
    }

    function sn(e, t) {
        if (t === !0) return t;
        if (e.copyState) return e.copyState(t);
        var n = {};
        for (var r in t) {
            var i = t[r];
            i instanceof Array && (i = i.concat([])), n[r] = i
        }
        return n
    }

    function cn(e, t, n) {
        return e.startState ? e.startState(t, n) : !0
    }

    function un(e) {
        return "string" == typeof e ? Ki[e] : e
    }

    function hn(e, t, n) {
        function r(t) {
            t = un(t);
            var i = t[e];
            if (i === !1) return "stop";
            if (null != i && n(i)) return !0;
            if (t.nofallthrough) return "stop";
            var o = t.fallthrough;
            if (null == o) return !1;
            if ("[object Array]" != Object.prototype.toString.call(o)) return r(o);
            for (var a = 0, l = o.length; l > a; ++a) {
                var s = r(o[a]);
                if (s) return s
            }
            return !1
        }
        for (var i = 0; i < t.length; ++i) {
            var o = r(t[i]);
            if (o) return o
        }
    }

    function fn(e) {
        var t = mo[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
    }

    function dn(e, t) {
        var n = mo[e.keyCode];
        return null == n || e.altGraphKey ? !1 : (e.altKey && (n = "Alt-" + n), (Wi ? e.metaKey : e.ctrlKey) && (n = "Ctrl-" + n), (Wi ? e.ctrlKey : e.metaKey) && (n = "Cmd-" + n), !t && e.shiftKey && (n = "Shift-" + n), n)
    }

    function pn(e, t) {
        this.pos = this.start = 0, this.string = e, this.tabSize = t || 8
    }

    function mn(e, t) {
        this.lines = [], this.type = t, this.doc = e
    }

    function gn(e, t, n, r, i) {
        if (r && r.shared) return yn(e, t, n, r, i);
        if (e.cm && !e.cm.curOp) return Q(e.cm, gn)(e, t, n, r, i);
        var o = new mn(e, i);
        if ("range" == i && !Ht(t, n)) return o;
        r && Rr(r, o), o.replacedWith && (o.collapsed = !0, o.replacedWith = Ur("span", [o.replacedWith], "CodeMirror-widget")), o.collapsed && (Oi = !0);
        var a, l, s, c = t.line,
            u = 0,
            h = e.cm;
        if (e.iter(c, n.line + 1, function (r) {
            h && o.collapsed && !h.options.lineWrapping && An(e, r) == h.display.maxLine && (s = !0);
            var i = {
                from: null,
                to: null,
                marker: o
            };
            u += r.text.length, c == t.line && (i.from = t.ch, u -= t.ch), c == n.line && (i.to = n.ch, u -= r.text.length - n.ch), o.collapsed && (c == n.line && (l = Tn(r, n.ch)), c == t.line ? a = Tn(r, t.ch) : or(r, 0)), xn(r, i), ++c
        }), o.collapsed && e.iter(t.line, n.line + 1, function (t) {
            On(e, t) && or(t, 0)
        }), o.readOnly && (Ai = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), o.collapsed) {
            if (a != l) throw new Error("Inserting collapsed marker overlapping an existing one");
            o.size = u, o.atomic = !0
        }
        return h && (s && (h.curOp.updateMaxLine = !0), (o.className || o.startStyle || o.endStyle || o.collapsed) && et(h, t.line, n.line + 1), o.atomic && Xt(h)), o
    }

    function vn(e, t) {
        this.markers = e, this.primary = t;
        for (var n = 0, r = this; n < e.length; ++n) e[n].parent = this, Tr(e[n], "clear", function () {
            r.clear()
        })
    }

    function yn(e, t, n, r, i) {
        r = Rr(r), r.shared = !1;
        var o = [gn(e, t, n, r, i)],
            a = o[0];
        return er(e, function (e) {
            o.push(gn(e, Vt(e, t), Vt(e, n), r, i));
            for (var l = 0; l < e.linked.length; ++l)
                if (e.linked[l].isParent) return;
            a = Pr(o)
        }), new vn(o, a)
    }

    function bn(e, t) {
        if (e)
            for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                if (r.marker == t) return r
            }
    }

    function wn(e, t) {
        for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
        return n
    }

    function xn(e, t) {
        e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
    }

    function Sn(e, t, n) {
        if (e)
            for (var r, i = 0; i < e.length; ++i) {
                var o = e[i],
                    a = o.marker,
                    l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                if (l || "bookmark" == a.type && o.from == t && (!n || !o.marker.insertLeft)) {
                    var s = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                    (r || (r = [])).push({
                        from: o.from,
                        to: s ? null : o.to,
                        marker: a
                    })
                }
            }
        return r
    }

    function Cn(e, t, n) {
        if (e)
            for (var r, i = 0; i < e.length; ++i) {
                var o = e[i],
                    a = o.marker,
                    l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                if (l || "bookmark" == a.type && o.from == t && (!n || o.marker.insertLeft)) {
                    var s = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                    (r || (r = [])).push({
                        from: s ? null : o.from - t,
                        to: null == o.to ? null : o.to - t,
                        marker: a
                    })
                }
            }
        return r
    }

    function kn(e, t) {
        var n = Gt(e, t.from.line) && nr(e, t.from.line).markedSpans,
            r = Gt(e, t.to.line) && nr(e, t.to.line).markedSpans;
        if (!n && !r) return null;
        var i = t.from.ch,
            o = t.to.ch,
            a = zt(t.from, t.to),
            l = Sn(n, i, a),
            s = Cn(r, o, a),
            c = 1 == t.text.length,
            u = Pr(t.text).length + (c ? i : 0);
        if (l)
            for (var h = 0; h < l.length; ++h) {
                var f = l[h];
                if (null == f.to) {
                    var d = bn(s, f.marker);
                    d ? c && (f.to = null == d.to ? null : d.to + u) : f.to = i
                }
            }
        if (s)
            for (var h = 0; h < s.length; ++h) {
                var f = s[h];
                if (null != f.to && (f.to += u), null == f.from) {
                    var d = bn(l, f.marker);
                    d || (f.from = u, c && (l || (l = [])).push(f))
                } else f.from += u, c && (l || (l = [])).push(f)
            }
        var p = [l];
        if (!c) {
            var m, g = t.text.length - 2;
            if (g > 0 && l)
                for (var h = 0; h < l.length; ++h) null == l[h].to && (m || (m = [])).push({
                    from: null,
                    to: null,
                    marker: l[h].marker
                });
            for (var h = 0; g > h; ++h) p.push(m);
            p.push(s)
        }
        return p
    }

    function Ln(e, t) {
        var n = mr(e, t),
            r = kn(e, t);
        if (!n) return r;
        if (!r) return n;
        for (var i = 0; i < n.length; ++i) {
            var o = n[i],
                a = r[i];
            if (o && a) e: for (var l = 0; l < a.length; ++l) {
                for (var s = a[l], c = 0; c < o.length; ++c)
                    if (o[c].marker == s.marker) continue e;
                o.push(s)
            } else a && (n[i] = a)
        }
        return n
    }

    function Mn(e, t, n) {
        var r = null;
        if (e.iter(t.line, n.line + 1, function (e) {
            if (e.markedSpans)
                for (var t = 0; t < e.markedSpans.length; ++t) {
                    var n = e.markedSpans[t].marker;
                    !n.readOnly || r && -1 != zr(r, n) || (r || (r = [])).push(n)
                }
        }), !r) return null;
        for (var i = [{
            from: t,
            to: n
        }], o = 0; o < r.length; ++o)
            for (var a = r[o], l = a.find(), s = 0; s < i.length; ++s) {
                var c = i[s];
                if (!Ht(c.to, l.from) && !Ht(l.to, c.from)) {
                    var u = [s, 1];
                    (Ht(c.from, l.from) || !a.inclusiveLeft && zt(c.from, l.from)) && u.push({
                        from: c.from,
                        to: l.from
                    }), (Ht(l.to, c.to) || !a.inclusiveRight && zt(c.to, l.to)) && u.push({
                        from: l.to,
                        to: c.to
                    }), i.splice.apply(i, u), s += u.length - 1
                }
            }
        return i
    }

    function Tn(e, t) {
        var n, r = Oi && e.markedSpans;
        if (r)
            for (var i, o = 0; o < r.length; ++o) i = r[o], i.marker.collapsed && (null == i.from || i.from < t) && (null == i.to || i.to > t) && (!n || n.width < i.marker.width) && (n = i.marker);
        return n
    }

    function Wn(e) {
        return Tn(e, -1)
    }

    function Nn(e) {
        return Tn(e, e.text.length + 1)
    }

    function An(e, t) {
        for (var n; n = Wn(t);) t = nr(e, n.find().from.line);
        return t
    }

    function On(e, t) {
        var n = Oi && t.markedSpans;
        if (n)
            for (var r, i = 0; i < n.length; ++i)
                if (r = n[i], r.marker.collapsed) {
                    if (null == r.from) return !0;
                    if (0 == r.from && r.marker.inclusiveLeft && In(e, t, r)) return !0
                }
    }

    function In(e, t, n) {
        if (null == n.to) {
            var r = n.marker.find().to,
                i = nr(e, r.line);
            return In(e, i, bn(i.markedSpans, n.marker))
        }
        if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
        for (var o, a = 0; a < t.markedSpans.length; ++a)
            if (o = t.markedSpans[a], o.marker.collapsed && o.from == n.to && (o.marker.inclusiveLeft || n.marker.inclusiveRight) && In(e, t, o)) return !0
    }

    function En(e) {
        var t = e.markedSpans;
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
            e.markedSpans = null
        }
    }

    function Dn(e, t) {
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
            e.markedSpans = t
        }
    }

    function Fn(e) {
        return function () {
            var t = !this.cm.curOp;
            t && q(this.cm);
            try {
                var n = e.apply(this, arguments)
            } finally {
                t && Y(this.cm)
            }
            return n
        }
    }

    function Pn(e) {
        return null != e.height ? e.height : (e.node.parentNode && 1 == e.node.parentNode.nodeType || jr(e.cm.display.measure, Ur("div", [e.node], null, "position: relative")), e.height = e.node.offsetHeight)
    }

    function $n(e, t, n, r) {
        var i = new ji(e, n, r);
        return i.noHScroll && (e.display.alignWidgets = !0), tn(e, t, function (t) {
            if ((t.widgets || (t.widgets = [])).push(i), i.line = t, !On(e.doc, t) || i.showIfHidden) {
                var n = sr(e, t) < e.display.scroller.scrollTop;
                or(t, t.height + Pn(i)), n && (e.curOp.updateScrollPos = {
                    scrollTop: e.doc.scrollTop + i.height,
                    scrollLeft: e.doc.scrollLeft
                })
            }
            return !0
        }), i
    }

    function zn(e, t, n) {
        var r = {
            text: e
        };
        return Dn(r, t), r.height = n ? n(r) : 1, r
    }

    function Hn(e, t, n, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), En(e), Dn(e, n);
        var i = r ? r(e) : 1;
        i != e.height && or(e, i), Ar(e, "change")
    }

    function Rn(e) {
        e.parent = null, En(e)
    }

    function Bn(e, t, n, r, i) {
        var o = e.options.flattenSpans,
            a = "",
            l = null,
            s = new pn(t, e.options.tabSize);
        for ("" == t && n.blankLine && n.blankLine(r); !s.eol();) {
            var c = n.token(s, r);
            s.pos > 5e3 && (o = !1, s.pos = Math.min(t.length, s.start + 5e4), c = null);
            var u = s.current();
            s.start = s.pos, o && l == c ? a += u : (a && i(a, l), a = u, l = c)
        }
        a && i(a, l)
    }

    function Vn(e, t, n) {
        var r = [e.state.modeGen];
        Bn(e, t.text, e.doc.mode, n, function (e, t) {
            r.push(e, t)
        });
        for (var i = 0; i < e.state.overlays.length; ++i) {
            var o = e.state.overlays[i],
                a = 1;
            Bn(e, t.text, o.mode, !0, function (e, t) {
                for (var n = a, i = e.length; i;) {
                    var l = r[a],
                        s = l.length;
                    i >= s ? i -= s : (r.splice(a, 1, l.slice(0, i), r[a + 1], l.slice(i)), i = 0), a += 2
                }
                if (t)
                    if (o.opaque) r.splice(n, a - n, e, t), a = n + 2;
                    else
                        for (; a > n; n += 2) {
                            var l = r[n + 1];
                            r[n + 1] = l ? l + " " + t : t
                        }
            })
        }
        return r
    }

    function _n(e, t) {
        return t.styles && t.styles[0] == e.state.modeGen || (t.styles = Vn(e, t, t.stateAfter = D(e, ar(t)))), t.styles
    }

    function Gn(e, t, n) {
        var r = e.doc.mode,
            i = new pn(t.text, e.options.tabSize);
        for ("" == t.text && r.blankLine && r.blankLine(n); !i.eol() && i.pos <= 5e3;) r.token(i, n), i.start = i.pos
    }

    function Un(e) {
        return e ? Xi[e] || (Xi[e] = "cm-" + e.replace(/ +/g, " cm-")) : null
    }

    function Kn(e, t, n) {
        for (var r, i, o, a = t, l = !0; r = Wn(a);) l = !1, a = nr(e.doc, r.find().from.line), i || (i = a);
        var s = {
            pre: Ur("pre"),
            col: 0,
            pos: 0,
            display: !n,
            measure: null,
            addedOne: !1,
            cm: e
        };
        a.textClass && (s.pre.className = a.textClass);
        do {
            s.measure = a == t && n, s.pos = 0, s.addToken = s.measure ? Xn : jn, n && o && a != t && !s.addedOne && (n[0] = s.pre.appendChild(Qr(e.display.measure)), s.addedOne = !0);
            var c = Yn(a, s, _n(e, a));
            o = a == i, c && (a = nr(e.doc, c.to.line), l = !1)
        } while (c);
        n && !s.addedOne && (n[0] = s.pre.appendChild(l ? Ur("span", " ") : Qr(e.display.measure))), s.pre.firstChild || On(e.doc, t) || s.pre.appendChild(document.createTextNode(" "));
        var u;
        if (n && si && (u = cr(a))) {
            var h = u.length - 1;
            u[h].from == u[h].to && --h;
            var f = u[h],
                d = u[h - 1];
            if (f.from + 1 == f.to && d && f.level < d.level) {
                var p = n[s.pos - 1];
                p && p.parentNode.insertBefore(p.measureRight = Qr(e.display.measure), p.nextSibling)
            }
        }
        return s.pre
    }

    function jn(e, t, n, r, i) {
        if (t) {
            if (qi.test(t))
                for (var o = document.createDocumentFragment(), a = 0;;) {
                    qi.lastIndex = a;
                    var l = qi.exec(t),
                        s = l ? l.index - a : t.length - a;
                    if (s && (o.appendChild(document.createTextNode(t.slice(a, a + s))), e.col += s), !l) break;
                    if (a += s + 1, "	" == l[0]) {
                        var c = e.cm.options.tabSize,
                            u = c - e.col % c;
                        o.appendChild(Ur("span", Fr(u), "cm-tab")), e.col += u
                    } else {
                        var h = Ur("span", "�ۢ", "cm-invalidchar");
                        h.title = "\\u" + l[0].charCodeAt(0).toString(16), o.appendChild(h), e.col += 1
                    }
                } else {
                    e.col += t.length;
                    var o = document.createTextNode(t)
                } if (n || r || i || e.measure) {
                    var f = n || "";
                    return r && (f += r), i && (f += i), e.pre.appendChild(Ur("span", [o], f))
                }
            e.pre.appendChild(o)
        }
    }

    function Xn(e, t, n, r, i) {
        for (var o = 0; o < t.length; ++o) {
            var a = t.charAt(o),
                l = 0 == o;
            a >= "� �" && "���" > a && o < t.length - 1 ? (a = t.slice(o, o + 2), ++o) : o && e.cm.options.lineWrapping && so.test(t.slice(o - 1, o + 1)) && e.pre.appendChild(Ur("wbr")), e.measure[e.pos] = jn(e, a, n, l && r, o == t.length - 1 && i), e.pos += a.length
        }
        t.length && (e.addedOne = !0)
    }

    function qn(e, t, n) {
        n && (e.display || (n = n.cloneNode(!0)), e.pre.appendChild(n), e.measure && t && (e.measure[e.pos] = n, e.addedOne = !0)), e.pos += t
    }

    function Yn(e, t, n) {
        var r = e.markedSpans;
        if (r)
            for (var i, o, a, l, s, c = e.text, u = c.length, h = 0, f = 1, d = "", p = 0;;) {
                if (p == h) {
                    o = a = l = "", s = null, p = 1 / 0;
                    for (var m = null, g = 0; g < r.length; ++g) {
                        var v = r[g],
                            y = v.marker;
                        v.from <= h && (null == v.to || v.to > h) ? (null != v.to && p > v.to && (p = v.to, a = ""), y.className && (o += " " + y.className), y.startStyle && v.from == h && (l += " " + y.startStyle), y.endStyle && v.to == p && (a += " " + y.endStyle), y.collapsed && (!s || s.marker.width < y.width) && (s = v)) : v.from > h && p > v.from && (p = v.from), "bookmark" == y.type && v.from == h && y.replacedWith && (m = y.replacedWith)
                    }
                    if (s && (s.from || 0) == h && (qn(t, (null == s.to ? u : s.to) - h, null != s.from && s.marker.replacedWith), null == s.to)) return s.marker.find();
                    m && !s && qn(t, 0, m)
                }
                if (h >= u) break;
                for (var b = Math.min(u, p);;) {
                    if (d) {
                        var w = h + d.length;
                        if (!s) {
                            var x = w > b ? d.slice(0, b - h) : d;
                            t.addToken(t, x, i ? i + o : o, l, h + x.length == p ? a : "")
                        }
                        if (w >= b) {
                            d = d.slice(b - h), h = b;
                            break
                        }
                        h = w, l = ""
                    }
                    d = n[f++], i = Un(n[f++])
                }
            } else
                for (var f = 1; f < n.length; f += 2) t.addToken(t, n[f], Un(n[f + 1]))
    }

    function Qn(e, t, n, r, i) {
        function o(e) {
            return n ? n[e] : null
        }
        var a = t.from,
            l = t.to,
            s = t.text,
            c = nr(e, a.line),
            u = nr(e, l.line),
            h = Pr(s),
            f = o(s.length - 1),
            d = l.line - a.line;
        if (0 == a.ch && 0 == l.ch && "" == h) {
            for (var p = 0, m = s.length - 1, g = []; m > p; ++p) g.push(zn(s[p], o(p), i));
            Hn(u, u.text, f, i), d && e.remove(a.line, d), g.length && e.insert(a.line, g)
        } else if (c == u)
            if (1 == s.length) Hn(c, c.text.slice(0, a.ch) + h + c.text.slice(l.ch), f, i);
            else {
                for (var g = [], p = 1, m = s.length - 1; m > p; ++p) g.push(zn(s[p], o(p), i));
                g.push(zn(h + c.text.slice(l.ch), f, i)), Hn(c, c.text.slice(0, a.ch) + s[0], o(0), i), e.insert(a.line + 1, g)
            } else if (1 == s.length) Hn(c, c.text.slice(0, a.ch) + s[0] + u.text.slice(l.ch), o(0), i), e.remove(a.line + 1, d);
        else {
            Hn(c, c.text.slice(0, a.ch) + s[0], o(0), i), Hn(u, h + u.text.slice(l.ch), f, i);
            for (var p = 1, m = s.length - 1, g = []; m > p; ++p) g.push(zn(s[p], o(p), i));
            d > 1 && e.remove(a.line + 1, d - 1), e.insert(a.line + 1, g)
        }
        Ar(e, "change", e, t), jt(e, r.anchor, r.head, null, !0)
    }

    function Zn(e) {
        this.lines = e, this.parent = null;
        for (var t = 0, n = e.length, r = 0; n > t; ++t) e[t].parent = this, r += e[t].height;
        this.height = r
    }

    function Jn(e) {
        this.children = e;
        for (var t = 0, n = 0, r = 0, i = e.length; i > r; ++r) {
            var o = e[r];
            t += o.chunkSize(), n += o.height, o.parent = this
        }
        this.size = t, this.height = n, this.parent = null
    }

    function er(e, t, n) {
        function r(e, i, o) {
            if (e.linked)
                for (var a = 0; a < e.linked.length; ++a) {
                    var l = e.linked[a];
                    if (l.doc != i) {
                        var s = o && l.sharedHist;
                        (!n || s) && (t(l.doc, s), r(l.doc, e, s))
                    }
                }
        }
        r(e, null, !0)
    }

    function tr(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, o(e), n(e), e.options.lineWrapping || h(e), e.options.mode = t.modeOption, et(e)
    }

    function nr(e, t) {
        for (t -= e.first; !e.lines;)
            for (var n = 0;; ++n) {
                var r = e.children[n],
                    i = r.chunkSize();
                if (i > t) {
                    e = r;
                    break
                }
                t -= i
            }
        return e.lines[t]
    }

    function rr(e, t, n) {
        var r = [],
            i = t.line;
        return e.iter(t.line, n.line + 1, function (e) {
            var o = e.text;
            i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i
        }), r
    }

    function ir(e, t, n) {
        var r = [];
        return e.iter(t, n, function (e) {
            r.push(e.text)
        }), r
    }

    function or(e, t) {
        for (var n = t - e.height, r = e; r; r = r.parent) r.height += n
    }

    function ar(e) {
        if (null == e.parent) return null;
        for (var t = e.parent, n = zr(t.lines, e), r = t.parent; r; t = r, r = r.parent)
            for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
        return n + t.first
    }

    function lr(e, t) {
        var n = e.first;
        e: do {
            for (var r = 0, i = e.children.length; i > r; ++r) {
                var o = e.children[r],
                    a = o.height;
                if (a > t) {
                    e = o;
                    continue e
                }
                t -= a, n += o.chunkSize()
            }
            return n
        } while (!e.lines);
        for (var r = 0, i = e.lines.length; i > r; ++r) {
            var l = e.lines[r],
                s = l.height;
            if (s > t) break;
            t -= s
        }
        return n + r
    }

    function sr(e, t) {
        t = An(e.doc, t);
        for (var n = 0, r = t.parent, i = 0; i < r.lines.length; ++i) {
            var o = r.lines[i];
            if (o == t) break;
            n += o.height
        }
        for (var a = r.parent; a; r = a, a = r.parent)
            for (var i = 0; i < a.children.length; ++i) {
                var l = a.children[i];
                if (l == r) break;
                n += l.height
            }
        return n
    }

    function cr(e) {
        var t = e.order;
        return null == t && (t = e.order = go(e.text)), t
    }

    function ur() {
        return {
            done: [],
            undone: [],
            undoDepth: 1 / 0,
            lastTime: 0,
            lastOp: null,
            lastOrigin: null,
            dirtyCounter: 0
        }
    }

    function hr(e, t, n, r) {
        var i = t["spans_" + e.id],
            o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function (n) {
            n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
        })
    }

    function fr(e, t) {
        var n = {
            from: t.from,
            to: Mt(t),
            text: rr(e, t.from, t.to)
        };
        return hr(e, n, t.from.line, t.to.line + 1), er(e, function (e) {
            hr(e, n, t.from.line, t.to.line + 1)
        }, !0), n
    }

    function dr(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var o = +new Date,
            a = Pr(i.done);
        if (a && (i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastTime > o - 600 || "*" == t.origin.charAt(0)))) {
            var l = Pr(a.changes);
            zt(t.from, t.to) && zt(t.from, l.to) ? l.to = Mt(t) : a.changes.push(fr(e, t)), a.anchorAfter = n.anchor, a.headAfter = n.head
        } else {
            for (a = {
                changes: [fr(e, t)],
                anchorBefore: e.sel.anchor,
                headBefore: e.sel.head,
                anchorAfter: n.anchor,
                headAfter: n.head
            }, i.done.push(a); i.done.length > i.undoDepth;) i.done.shift();
            i.dirtyCounter < 0 ? i.dirtyCounter = 0 / 0 : i.dirtyCounter++
        }
        i.lastTime = o, i.lastOp = r, i.lastOrigin = t.origin
    }

    function pr(e) {
        if (!e) return null;
        for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t : null : e
    }

    function mr(e, t) {
        var n = t["spans_" + e.id];
        if (!n) return null;
        for (var r = 0, i = []; r < t.text.length; ++r) i.push(pr(n[r]));
        return i
    }

    function gr(e, t) {
        for (var n = 0, r = []; n < e.length; ++n) {
            var i = e[n],
                o = i.changes,
                a = [];
            r.push({
                changes: a,
                anchorBefore: i.anchorBefore,
                headBefore: i.headBefore,
                anchorAfter: i.anchorAfter,
                headAfter: i.headAfter
            });
            for (var l = 0; l < o.length; ++l) {
                var s, c = o[l];
                if (a.push({
                    from: c.from,
                    to: c.to,
                    text: c.text
                }), t)
                    for (var u in c)(s = u.match(/^spans_(\d+)$/)) && zr(t, Number(s[1])) > -1 && (Pr(a)[u] = c[u], delete c[u])
            }
        }
        return r
    }

    function vr(e, t, n, r) {
        n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0)
    }

    function yr(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
            for (var o = e[i], a = !0, l = 0; l < o.changes.length; ++l) {
                var s = o.changes[l];
                if (o.copied || (s.from = Rt(s.from), s.to = Rt(s.to)), n < s.from.line) s.from.line += r, s.to.line += r;
                else if (t <= s.to.line) {
                    a = !1;
                    break
                }
            }
            o.copied || (o.anchorBefore = Rt(o.anchorBefore), o.headBefore = Rt(o.headBefore), o.anchorAfter = Rt(o.anchorAfter), o.readAfter = Rt(o.headAfter), o.copied = !0), a ? (vr(o.anchorBefore), vr(o.headBefore), vr(o.anchorAfter), vr(o.headAfter)) : (e.splice(0, i + 1), i = 0)
        }
    }

    function br(e, t) {
        var n = t.from.line,
            r = t.to.line,
            i = t.text.length - (r - n) - 1;
        yr(e.done, n, r, i), yr(e.undone, n, r, i)
    }

    function wr() {
        kr(this)
    }

    function xr(e) {
        return e.stop || (e.stop = wr), e
    }

    function Sr(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }

    function Cr(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }

    function kr(e) {
        Sr(e), Cr(e)
    }

    function Lr(e) {
        return e.target || e.srcElement
    }

    function Mr(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Si && e.ctrlKey && 1 == t && (t = 3), t
    }

    function Tr(e, t, n) {
        if (e.addEventListener) e.addEventListener(t, n, !1);
        else if (e.attachEvent) e.attachEvent("on" + t, n);
        else {
            var r = e._handlers || (e._handlers = {}),
                i = r[t] || (r[t] = []);
            i.push(n)
        }
    }

    function Wr(e, t, n) {
        if (e.removeEventListener) e.removeEventListener(t, n, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, n);
        else {
            var r = e._handlers && e._handlers[t];
            if (!r) return;
            for (var i = 0; i < r.length; ++i)
                if (r[i] == n) {
                    r.splice(i, 1);
                    break
                }
        }
    }

    function Nr(e, t) {
        var n = e._handlers && e._handlers[t];
        if (n)
            for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r)
    }

    function Ar(e, t) {
        function n(e) {
            return function () {
                e.apply(null, i)
            }
        }
        var r = e._handlers && e._handlers[t];
        if (r) {
            var i = Array.prototype.slice.call(arguments, 2);
            eo || (++to, eo = [], setTimeout(Or, 0));
            for (var o = 0; o < r.length; ++o) eo.push(n(r[o]))
        }
    }

    function Or() {
        --to;
        var e = eo;
        eo = null;
        for (var t = 0; t < e.length; ++t) e[t]()
    }

    function Ir(e, t) {
        var n = e._handlers && e._handlers[t];
        return n && n.length > 0
    }

    function Er() {
        this.id = null
    }

    function Dr(e, t, n) {
        null == t && (t = e.search(/[^\s\u00a0]/), -1 == t && (t = e.length));
        for (var r = 0, i = 0; t > r; ++r) "	" == e.charAt(r) ? i += n - i % n : ++i;
        return i
    }

    function Fr(e) {
        for (; io.length <= e;) io.push(Pr(io) + " ");
        return io[e]
    }

    function Pr(e) {
        return e[e.length - 1]
    }

    function $r(e) {
        wi ? (e.selectionStart = 0, e.selectionEnd = e.value.length) : e.select()
    }

    function zr(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0, r = e.length; r > n; ++n)
            if (e[n] == t) return n;
        return -1
    }

    function Hr(e, t) {
        function n() {}
        n.prototype = e;
        var r = new n;
        return t && Rr(t, r), r
    }

    function Rr(e, t) {
        t || (t = {});
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }

    function Br(e) {
        for (var t = [], n = 0; e > n; ++n) t.push(void 0);
        return t
    }

    function Vr(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function () {
            return e.apply(null, t)
        }
    }

    function _r(e) {
        return /\w/.test(e) || e > "�" && (e.toUpperCase() != e.toLowerCase() || oo.test(e))
    }

    function Gr(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && e[t]) return !1;
        return !0
    }

    function Ur(e, t, n, r) {
        var i = document.createElement(e);
        if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) Xr(i, t);
        else if (t)
            for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i
    }

    function Kr(e) {
        if (si)
            for (; e.firstChild;) e.removeChild(e.firstChild);
        else e.innerHTML = "";
        return e
    }

    function jr(e, t) {
        return Kr(e).appendChild(t)
    }

    function Xr(e, t) {
        ui ? (e.innerHTML = "", e.appendChild(document.createTextNode(t))) : e.textContent = t
    }

    function qr(e) {
        return e.getBoundingClientRect()
    }

    function Yr(e) {
        if (null != co) return co;
        var t = Ur("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        return jr(e, t), t.offsetWidth && (co = t.offsetHeight - t.clientHeight), co || 0
    }

    function Qr(e) {
        if (null == uo) {
            var t = Ur("span", "���");
            jr(e, Ur("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (uo = t.offsetWidth <= 1 && t.offsetHeight > 2 && !ci)
        }
        return uo ? Ur("span", "���") : Ur("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
    }

    function Zr(e, t, n, r) {
        if (!e) return r(t, n, "ltr");
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            (o.from < n && o.to > t || t == n && o.to == t) && r(Math.max(o.from, t), Math.min(o.to, n), 1 == o.level ? "rtl" : "ltr")
        }
    }

    function Jr(e) {
        return e.level % 2 ? e.to : e.from
    }

    function ei(e) {
        return e.level % 2 ? e.from : e.to
    }

    function ti(e) {
        var t = cr(e);
        return t ? Jr(t[0]) : 0
    }

    function ni(e) {
        var t = cr(e);
        return t ? ei(Pr(t)) : e.text.length
    }

    function ri(e, t) {
        var n = nr(e.doc, t),
            r = An(e.doc, n);
        r != n && (t = ar(r));
        var i = cr(r),
            o = i ? i[0].level % 2 ? ni(r) : ti(r) : 0;
        return $t(t, o)
    }

    function ii(e, t) {
        for (var n, r; n = Nn(r = nr(e.doc, t));) t = n.find().to.line;
        var i = cr(r),
            o = i ? i[0].level % 2 ? ti(r) : ni(r) : r.text.length;
        return $t(t, o)
    }

    function oi(e, t, n, r) {
        var i = cr(e);
        if (!i) return ai(e, t, n, r);
        for (var o = r ? function (t, n) {
                do t += n; while (t > 0 && ao.test(e.text.charAt(t)));
                return t
            } : function (e, t) {
                return e + t
            }, a = i[0].level, l = 0; l < i.length; ++l) {
            var s = i[l],
                c = s.level % 2 == a;
            if (s.from < t && s.to > t || c && (s.from == t || s.to == t)) break
        }
        for (var u = o(t, s.level % 2 ? -n : n); null != u;)
            if (s.level % 2 == a) {
                if (!(u < s.from || u > s.to)) break;
                s = i[l += n], u = s && (n > 0 == s.level % 2 ? o(s.to, -1) : o(s.from, 1))
            } else if (u == Jr(s)) s = i[--l], u = s && ei(s);
        else {
            if (u != ei(s)) break;
            s = i[++l], u = s && Jr(s)
        }
        return 0 > u || u > e.text.length ? null : u
    }

    function ai(e, t, n, r) {
        var i = t + n;
        if (r)
            for (; i > 0 && ao.test(e.text.charAt(i));) i += n;
        return 0 > i || i > e.text.length ? null : i
    }
    var li = /gecko\/\d/i.test(navigator.userAgent),
        si = /MSIE \d/.test(navigator.userAgent),
        ci = si && (null == document.documentMode || document.documentMode < 8),
        ui = si && (null == document.documentMode || document.documentMode < 9),
        hi = /WebKit\//.test(navigator.userAgent),
        fi = hi && /Qt\/\d+\.\d+/.test(navigator.userAgent),
        di = /Chrome\//.test(navigator.userAgent),
        pi = /Opera\//.test(navigator.userAgent),
        mi = /Apple Computer/.test(navigator.vendor),
        gi = /KHTML\//.test(navigator.userAgent),
        vi = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent),
        yi = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
        bi = /PhantomJS/.test(navigator.userAgent),
        wi = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        xi = wi || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
        Si = wi || /Mac/.test(navigator.platform),
        Ci = /windows/i.test(navigator.platform),
        ki = pi && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    ki && (ki = Number(ki[1]));
    var Li, Mi, Ti, Wi = Si && (fi || pi && (null == ki || 12.11 > ki)),
        Ni = li || si && !ui,
        Ai = !1,
        Oi = !1,
        Ii = 0,
        Ei = 0,
        Di = null;
    si ? Di = -.53 : li ? Di = 15 : di ? Di = -.7 : mi && (Di = -1 / 3);
    var Fi, Pi, $i = null;
    e.Pos = $t, e.prototype = {
        focus: function () {
            window.focus(), ot(this), Ct(this), nt(this)
        },
        setOption: function (e, t) {
            var n = this.options,
                r = n[e];
            (n[e] != t || "mode" == e) && (n[e] = t, zi.hasOwnProperty(e) && Q(this, zi[e])(this, t, r))
        },
        getOption: function (e) {
            return this.options[e]
        },
        getDoc: function () {
            return this.doc
        },
        addKeyMap: function (e) {
            this.state.keyMaps.push(e)
        },
        removeKeyMap: function (e) {
            for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                if (("string" == typeof e ? t[n].name : t[n]) == e) return t.splice(n, 1), !0
        },
        addOverlay: Q(null, function (t, n) {
            var r = t.token ? t : e.getMode(this.options, t);
            if (r.startState) throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: r,
                modeSpec: t,
                opaque: n && n.opaque
            }), this.state.modeGen++, et(this)
        }),
        removeOverlay: Q(null, function (e) {
            for (var t = this.state.overlays, n = 0; n < t.length; ++n)
                if (t[n].modeSpec == e) return t.splice(n, 1), this.state.modeGen++, et(this), void 0
        }),
        indentLine: Q(null, function (e, t, n) {
            "string" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), Gt(this.doc, e) && en(this, e, t, n)
        }),
        indentSelection: Q(null, function (e) {
            var t = this.doc.sel;
            if (zt(t.from, t.to)) return en(this, t.from.line, e);
            for (var n = t.to.line - (t.to.ch ? 0 : 1), r = t.from.line; n >= r; ++r) en(this, r, e)
        }),
        getTokenAt: function (e) {
            var t = this.doc;
            e = Vt(t, e);
            for (var n = D(this, e.line), r = this.doc.mode, i = nr(t, e.line), o = new pn(i.text, this.options.tabSize); o.pos < e.ch && !o.eol();) {
                o.start = o.pos;
                var a = r.token(o, n)
            }
            return {
                start: o.start,
                end: o.pos,
                string: o.current(),
                className: a || null,
                type: a || null,
                state: n
            }
        },
        getStateAfter: function (e) {
            var t = this.doc;
            return e = Bt(t, null == e ? t.first + t.size - 1 : e), D(this, e + 1)
        },
        cursorCoords: function (e, t) {
            var n, r = this.doc.sel;
            return n = null == e ? r.head : "object" == typeof e ? Vt(this.doc, e) : e ? r.from : r.to, _(this, n, t || "page")
        },
        charCoords: function (e, t) {
            return V(this, Vt(this.doc, e), t || "page")
        },
        coordsChar: function (e) {
            var t = qr(this.display.lineSpace),
                n = window.pageYOffset || (document.documentElement || document.body).scrollTop,
                r = window.pageXOffset || (document.documentElement || document.body).scrollLeft;
            return U(this, e.left - t.left - r, e.top - t.top - n)
        },
        defaultTextHeight: function () {
            return j(this.display)
        },
        setGutterMarker: Q(null, function (e, t, n) {
            return tn(this, e, function (e) {
                var r = e.gutterMarkers || (e.gutterMarkers = {});
                return r[t] = n, !n && Gr(r) && (e.gutterMarkers = null), !0
            })
        }),
        clearGutter: Q(null, function (e) {
            var t = this,
                n = t.doc,
                r = n.first;
            n.iter(function (n) {
                n.gutterMarkers && n.gutterMarkers[e] && (n.gutterMarkers[e] = null, et(t, r, r + 1), Gr(n.gutterMarkers) && (n.gutterMarkers = null)), ++r
            })
        }),
        addLineClass: Q(null, function (e, t, n) {
            return tn(this, e, function (e) {
                var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "wrapClass";
                if (e[r]) {
                    if (new RegExp("\\b" + n + "\\b").test(e[r])) return !1;
                    e[r] += " " + n
                } else e[r] = n;
                return !0
            })
        }),
        removeLineClass: Q(null, function (e, t, n) {
            return tn(this, e, function (e) {
                var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "wrapClass",
                    i = e[r];
                if (!i) return !1;
                if (null == n) e[r] = null;
                else {
                    var o = i.replace(new RegExp("^" + n + "\\b\\s*|\\s*\\b" + n + "\\b"), "");
                    if (o == i) return !1;
                    e[r] = o || null
                }
                return !0
            })
        }),
        addLineWidget: Q(null, function (e, t, n) {
            return $n(this, e, t, n)
        }),
        removeLineWidget: function (e) {
            e.clear()
        },
        lineInfo: function (e) {
            if ("number" == typeof e) {
                if (!Gt(this.doc, e)) return null;
                var t = e;
                if (e = nr(this.doc, e), !e) return null
            } else {
                var t = ar(e);
                if (null == t) return null
            }
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        getViewport: function () {
            return {
                from: this.display.showingFrom,
                to: this.display.showingTo
            }
        },
        addWidget: function (e, t, n, r, i) {
            var o = this.display;
            e = _(this, Vt(this.doc, e));
            var a = e.bottom,
                l = e.left;
            if (t.style.position = "absolute", o.sizer.appendChild(t), "over" == r) a = e.top;
            else if ("above" == r || "near" == r) {
                var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                    c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                ("above" == r || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (a = e.bottom), l + t.offsetWidth > c && (l = c - t.offsetWidth)
            }
            t.style.top = a + F(o) + "px", t.style.left = t.style.right = "", "right" == i ? (l = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? l = 0 : "middle" == i && (l = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = l + "px"), n && Zt(this, l, a, l + t.offsetWidth, a + t.offsetHeight)
        },
        triggerOnKeyDown: Q(null, xt),
        execCommand: function (e) {
            return Ui[e](this)
        },
        findPosH: function (e, t, n, r) {
            var i = 1;
            0 > t && (i = -1, t = -t);
            for (var o = 0, a = Vt(this.doc, e); t > o && (a = nn(this.doc, a, i, n, r), !a.hitSide); ++o);
            return a
        },
        moveH: Q(null, function (e, t) {
            var n, r = this.doc.sel;
            n = r.shift || r.extend || zt(r.from, r.to) ? nn(this.doc, r.head, e, t, this.options.rtlMoveVisually) : 0 > e ? r.from : r.to, Ut(this.doc, n, n, e)
        }),
        deleteH: Q(null, function (e, t) {
            var n = this.doc.sel;
            zt(n.from, n.to) ? Pt(this.doc, "", n.from, nn(this.doc, n.head, e, t, !1), "+delete") : Pt(this.doc, "", n.from, n.to, "+delete"), this.curOp.userSelChange = !0
        }),
        findPosV: function (e, t, n, r) {
            var i = 1,
                o = r;
            0 > t && (i = -1, t = -t);
            for (var a = 0, l = Vt(this.doc, e); t > a; ++a) {
                var s = _(this, l, "div");
                if (null == o ? o = s.left : s.left = o, l = rn(this, s, i, n), l.hitSide) break
            }
            return l
        },
        moveV: Q(null, function (e, t) {
            var n = this.doc.sel,
                r = _(this, n.head, "div");
            null != n.goalColumn && (r.left = n.goalColumn);
            var i = rn(this, r, e, t);
            "page" == t && (this.display.scrollbarV.scrollTop += V(this, i, "div").top - r.top), Ut(this.doc, i, i, e), n.goalColumn = r.left
        }),
        toggleOverwrite: function () {
            (this.state.overwrite = !this.state.overwrite) ? this.display.cursor.className += " CodeMirror-overwrite" : this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", "")
        },
        scrollTo: Q(null, function (e, t) {
            this.curOp.updateScrollPos = {
                scrollLeft: e,
                scrollTop: t
            }
        }),
        getScrollInfo: function () {
            var e = this.display.scroller,
                t = no;
            return {
                left: e.scrollLeft,
                top: e.scrollTop,
                height: e.scrollHeight - t,
                width: e.scrollWidth - t,
                clientHeight: e.clientHeight - t,
                clientWidth: e.clientWidth - t
            }
        },
        scrollIntoView: function (e) {
            "number" == typeof e && (e = $t(e, 0)), e && null == e.line ? Zt(this, e.left, e.top, e.right, e.bottom) : (e = e ? Vt(this.doc, e) : this.doc.sel.head, Qt(this, e))
        },
        setSize: function (e, t) {
            function n(e) {
                return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
            }
            null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.refresh()
        },
        on: function (e, t) {
            Tr(this, e, t)
        },
        off: function (e, t) {
            Wr(this, e, t)
        },
        operation: function (e) {
            return J(this, e)
        },
        refresh: Q(null, function () {
            R(this), this.curOp.updateScrollPos = {
                scrollTop: this.doc.scrollTop,
                scrollLeft: this.doc.scrollLeft
            }, et(this)
        }),
        swapDoc: Q(null, function (e) {
            var t = this.doc;
            return t.cm = null, tr(this, e), R(this), this.curOp.updateScrollPos = {
                scrollTop: e.scrollTop,
                scrollLeft: e.scrollLeft
            }, t
        }),
        getInputField: function () {
            return this.display.input
        },
        getWrapperElement: function () {
            return this.display.wrapper
        },
        getScrollerElement: function () {
            return this.display.scroller
        },
        getGutterElement: function () {
            return this.display.gutters
        }
    };
    var zi = e.optionHandlers = {}, Hi = e.defaults = {}, Ri = e.Init = {
            toString: function () {
                return "CodeMirror.Init"
            }
        };
    ln("value", "", function (e, t) {
        e.setValue(t)
    }, !0), ln("mode", null, function (e, t) {
        e.doc.modeOption = t, n(e)
    }, !0), ln("indentUnit", 2, n, !0), ln("indentWithTabs", !1), ln("smartIndent", !0), ln("tabSize", 4, function (e) {
        n(e), R(e), et(e)
    }, !0), ln("electricChars", !0), ln("rtlMoveVisually", !Ci), ln("theme", "default", function (e) {
        l(e), s(e)
    }, !0), ln("keyMap", "default", a), ln("extraKeys", null), ln("onKeyEvent", null), ln("onDragEvent", null), ln("lineWrapping", !1, r, !0), ln("gutters", [], function (e) {
        f(e.options), s(e)
    }, !0), ln("fixedGutter", !0, function (e, t) {
        e.display.gutters.style.left = t ? y(e.display) + "px" : "0", e.refresh()
    }, !0), ln("lineNumbers", !1, function (e) {
        f(e.options), s(e)
    }, !0), ln("firstLineNumber", 1, s, !0), ln("lineNumberFormatter", function (e) {
        return e
    }, s, !0), ln("showCursorWhenSelecting", !1, T, !0), ln("readOnly", !1, function (e, t) {
        "nocursor" == t ? (kt(e), e.display.input.blur()) : t || it(e, !0)
    }), ln("dragDrop", !0), ln("cursorBlinkRate", 530), ln("cursorHeight", 1), ln("workTime", 100), ln("workDelay", 100), ln("flattenSpans", !0), ln("pollInterval", 100), ln("undoDepth", 40, function (e, t) {
        e.doc.history.undoDepth = t
    }), ln("viewportMargin", 10, function (e) {
        e.refresh()
    }, !0), ln("tabindex", null, function (e, t) {
        e.display.input.tabIndex = t || ""
    }), ln("autofocus", null);
    var Bi = e.modes = {}, Vi = e.mimeModes = {};
    e.defineMode = function (t, n) {
        if (e.defaults.mode || "null" == t || (e.defaults.mode = t), arguments.length > 2) {
            n.dependencies = [];
            for (var r = 2; r < arguments.length; ++r) n.dependencies.push(arguments[r])
        }
        Bi[t] = n
    }, e.defineMIME = function (e, t) {
        Vi[e] = t
    }, e.resolveMode = function (t) {
        if ("string" == typeof t && Vi.hasOwnProperty(t)) t = Vi[t];
        else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t)) return e.resolveMode("application/xml");
        return "string" == typeof t ? {
            name: t
        } : t || {
            name: "null"
        }
    }, e.getMode = function (t, n) {
        n = e.resolveMode(n);
        var r = Bi[n.name];
        if (!r) return e.getMode(t, "text/plain");
        var i = r(t, n);
        if (_i.hasOwnProperty(n.name)) {
            var o = _i[n.name];
            for (var a in o) o.hasOwnProperty(a) && (i.hasOwnProperty(a) && (i["_" + a] = i[a]), i[a] = o[a])
        }
        return i.name = n.name, i
    }, e.defineMode("null", function () {
        return {
            token: function (e) {
                e.skipToEnd()
            }
        }
    }), e.defineMIME("text/plain", "null");
    var _i = e.modeExtensions = {};
    e.extendMode = function (e, t) {
        var n = _i.hasOwnProperty(e) ? _i[e] : _i[e] = {};
        Rr(t, n)
    }, e.defineExtension = function (t, n) {
        e.prototype[t] = n
    }, e.defineOption = ln;
    var Gi = [];
    e.defineInitHook = function (e) {
        Gi.push(e)
    }, e.copyState = sn, e.startState = cn, e.innerMode = function (e, t) {
        for (; e.innerMode;) {
            var n = e.innerMode(t);
            t = n.state, e = n.mode
        }
        return n || {
            mode: e,
            state: t
        }
    };
    var Ui = e.commands = {
        selectAll: function (e) {
            e.setSelection($t(e.firstLine(), 0), $t(e.lastLine()))
        },
        killLine: function (e) {
            var t = e.getCursor(!0),
                n = e.getCursor(!1),
                r = !zt(t, n);
            r || e.getLine(t.line).length != t.ch ? e.replaceRange("", t, r ? n : $t(t.line), "+delete") : e.replaceRange("", t, $t(t.line + 1, 0), "+delete")
        },
        deleteLine: function (e) {
            var t = e.getCursor().line;
            e.replaceRange("", $t(t, 0), $t(t), "+delete")
        },
        undo: function (e) {
            e.undo()
        },
        redo: function (e) {
            e.redo()
        },
        goDocStart: function (e) {
            e.extendSelection($t(e.firstLine(), 0))
        },
        goDocEnd: function (e) {
            e.extendSelection($t(e.lastLine()))
        },
        goLineStart: function (e) {
            e.extendSelection(ri(e, e.getCursor().line))
        },
        goLineStartSmart: function (e) {
            var t = e.getCursor(),
                n = ri(e, t.line),
                r = e.getLineHandle(n.line),
                i = cr(r);
            if (i && 0 != i[0].level) e.extendSelection(n);
            else {
                var o = Math.max(0, r.text.search(/\S/)),
                    a = t.line == n.line && t.ch <= o && t.ch;
                e.extendSelection($t(n.line, a ? 0 : o))
            }
        },
        goLineEnd: function (e) {
            e.extendSelection(ii(e, e.getCursor().line))
        },
        goLineUp: function (e) {
            e.moveV(-1, "line")
        },
        goLineDown: function (e) {
            e.moveV(1, "line")
        },
        goPageUp: function (e) {
            e.moveV(-1, "page")
        },
        goPageDown: function (e) {
            e.moveV(1, "page")
        },
        goCharLeft: function (e) {
            e.moveH(-1, "char")
        },
        goCharRight: function (e) {
            e.moveH(1, "char")
        },
        goColumnLeft: function (e) {
            e.moveH(-1, "column")
        },
        goColumnRight: function (e) {
            e.moveH(1, "column")
        },
        goWordLeft: function (e) {
            e.moveH(-1, "word")
        },
        goWordRight: function (e) {
            e.moveH(1, "word")
        },
        delCharBefore: function (e) {
            e.deleteH(-1, "char")
        },
        delCharAfter: function (e) {
            e.deleteH(1, "char")
        },
        delWordBefore: function (e) {
            e.deleteH(-1, "word")
        },
        delWordAfter: function (e) {
            e.deleteH(1, "word")
        },
        indentAuto: function (e) {
            e.indentSelection("smart")
        },
        indentMore: function (e) {
            e.indentSelection("add")
        },
        indentLess: function (e) {
            e.indentSelection("subtract")
        },
        insertTab: function (e) {
            e.replaceSelection("	", "end", "+input")
        },
        defaultTab: function (e) {
            e.somethingSelected() ? e.indentSelection("add") : e.replaceSelection("	", "end", "+input")
        },
        transposeChars: function (e) {
            var t = e.getCursor(),
                n = e.getLine(t.line);
            t.ch > 0 && t.ch < n.length - 1 && e.replaceRange(n.charAt(t.ch) + n.charAt(t.ch - 1), $t(t.line, t.ch - 1), $t(t.line, t.ch + 1))
        },
        newlineAndIndent: function (e) {
            Q(e, function () {
                e.replaceSelection("\n", "end", "+input"), e.indentLine(e.getCursor().line, null, !0)
            })()
        },
        toggleOverwrite: function (e) {
            e.toggleOverwrite()
        }
    }, Ki = e.keyMap = {};
    Ki.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    }, Ki.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goWordLeft",
        "Ctrl-Right": "goWordRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delWordBefore",
        "Ctrl-Delete": "delWordAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    }, Ki.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goWordLeft",
        "Alt-Right": "goWordRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-Alt-Backspace": "delWordAfter",
        "Alt-Delete": "delWordAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        fallthrough: ["basic", "emacsy"]
    }, Ki["default"] = Si ? Ki.macDefault : Ki.pcDefault, Ki.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, e.lookupKey = hn, e.isModifierKey = fn, e.keyName = dn, e.fromTextArea = function (t, n) {
        function r() {
            t.value = c.getValue()
        }
        if (n || (n = {}), n.value = t.value, !n.tabindex && t.tabindex && (n.tabindex = t.tabindex), null == n.autofocus) {
            var i = document.body;
            try {
                i = document.activeElement
            } catch (o) {}
            n.autofocus = i == t || null != t.getAttribute("autofocus") && i == document.body
        }
        if (t.form) {
            Tr(t.form, "submit", r);
            var a = t.form,
                l = a.submit;
            try {
                var s = a.submit = function () {
                    r(), a.submit = l, a.submit(), a.submit = s
                }
            } catch (o) {}
        }
        t.style.display = "none";
        var c = e(function (e) {
            t.parentNode.insertBefore(e, t.nextSibling)
        }, n);
        return c.save = r, c.getTextArea = function () {
            return t
        }, c.toTextArea = function () {
            r(), t.parentNode.removeChild(c.getWrapperElement()), t.style.display = "", t.form && (Wr(t.form, "submit", r), "function" == typeof t.form.submit && (t.form.submit = l))
        }, c
    }, pn.prototype = {
        eol: function () {
            return this.pos >= this.string.length
        },
        sol: function () {
            return 0 == this.pos
        },
        peek: function () {
            return this.string.charAt(this.pos) || void 0
        },
        next: function () {
            return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
        },
        eat: function (e) {
            var t = this.string.charAt(this.pos);
            if ("string" == typeof e) var n = t == e;
            else var n = t && (e.test ? e.test(t) : e(t));
            return n ? (++this.pos, t) : void 0
        },
        eatWhile: function (e) {
            for (var t = this.pos; this.eat(e););
            return this.pos > t
        },
        eatSpace: function () {
            for (var e = this.pos;
                /[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;
            return this.pos > e
        },
        skipToEnd: function () {
            this.pos = this.string.length
        },
        skipTo: function (e) {
            var t = this.string.indexOf(e, this.pos);
            return t > -1 ? (this.pos = t, !0) : void 0
        },
        backUp: function (e) {
            this.pos -= e
        },
        column: function () {
            return Dr(this.string, this.start, this.tabSize)
        },
        indentation: function () {
            return Dr(this.string, null, this.tabSize)
        },
        match: function (e, t, n) {
            if ("string" != typeof e) {
                var r = this.string.slice(this.pos).match(e);
                return r && r.index > 0 ? null : (r && t !== !1 && (this.pos += r[0].length), r)
            }
            var i = function (e) {
                return n ? e.toLowerCase() : e
            };
            return i(this.string).indexOf(i(e), this.pos) == this.pos ? (t !== !1 && (this.pos += e.length), !0) : void 0
        },
        current: function () {
            return this.string.slice(this.start, this.pos)
        }
    }, e.StringStream = pn, e.TextMarker = mn, mn.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            var e = this.doc.cm,
                t = e && !e.curOp;
            t && q(e);
            for (var n = null, r = null, i = 0; i < this.lines.length; ++i) {
                var o = this.lines[i],
                    a = bn(o.markedSpans, this);
                null != a.to && (r = ar(o)), o.markedSpans = wn(o.markedSpans, a), null != a.from ? n = ar(o) : this.collapsed && !On(this.doc, o) && e && or(o, j(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var i = 0; i < this.lines.length; ++i) {
                    var l = An(e.doc, this.lines[i]),
                        s = u(e.doc, l);
                    s > e.display.maxLineLength && (e.display.maxLine = l, e.display.maxLineLength = s, e.display.maxLineChanged = !0)
                }
            null != n && e && et(e, n, r + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.collapsed && this.doc.cantEdit && (this.doc.cantEdit = !1, e && Xt(e)), t && Y(e), Ar(this, "clear")
        }
    }, mn.prototype.find = function () {
        for (var e, t, n = 0; n < this.lines.length; ++n) {
            var r = this.lines[n],
                i = bn(r.markedSpans, this);
            if (null != i.from || null != i.to) {
                var o = ar(r);
                null != i.from && (e = $t(o, i.from)), null != i.to && (t = $t(o, i.to))
            }
        }
        return "bookmark" == this.type ? e : e && {
            from: e,
            to: t
        }
    }, mn.prototype.getOptions = function (e) {
        var t = this.replacedWith;
        return {
            className: this.className,
            inclusiveLeft: this.inclusiveLeft,
            inclusiveRight: this.inclusiveRight,
            atomic: this.atomic,
            collapsed: this.collapsed,
            clearOnEnter: this.clearOnEnter,
            replacedWith: e ? t && t.cloneNode(!0) : t,
            readOnly: this.readOnly,
            startStyle: this.startStyle,
            endStyle: this.endStyle
        }
    }, mn.prototype.attachLine = function (e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && -1 != zr(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(e)
    }, mn.prototype.detachLine = function (e) {
        if (this.lines.splice(zr(this.lines, e), 1), !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    }, e.SharedTextMarker = vn, vn.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
            Ar(this, "clear")
        }
    }, vn.prototype.find = function () {
        return this.primary.find()
    }, vn.prototype.getOptions = function (e) {
        var t = this.primary.getOptions(e);
        return t.shared = !0, t
    };
    var ji = e.LineWidget = function (e, t, n) {
        for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
        this.cm = e, this.node = t
    };
    ji.prototype.clear = Fn(function () {
        var e = this.line.widgets,
            t = ar(this.line);
        if (null != t && e) {
            for (var n = 0; n < e.length; ++n) e[n] == this && e.splice(n--, 1);
            e.length || (this.line.widgets = null), or(this.line, Math.max(0, this.line.height - Pn(this))), et(this.cm, t, t + 1)
        }
    }), ji.prototype.changed = Fn(function () {
        var e = this.height;
        this.height = null;
        var t = Pn(this) - e;
        if (t) {
            or(this.line, this.line.height + t);
            var n = ar(this.line);
            et(this.cm, n, n + 1)
        }
    });
    var Xi = {}, qi = /[\t\u0000-\u0019\u200b\u2028\u2029\uFEFF]/g;
    Zn.prototype = {
        chunkSize: function () {
            return this.lines.length
        },
        removeInner: function (e, t) {
            for (var n = e, r = e + t; r > n; ++n) {
                var i = this.lines[n];
                this.height -= i.height, Rn(i), Ar(i, "delete")
            }
            this.lines.splice(e, t)
        },
        collapse: function (e) {
            e.splice.apply(e, [e.length, 0].concat(this.lines))
        },
        insertInner: function (e, t, n) {
            this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var r = 0, i = t.length; i > r; ++r) t[r].parent = this
        },
        iterN: function (e, t, n) {
            for (var r = e + t; r > e; ++e)
                if (n(this.lines[e])) return !0
        }
    }, Jn.prototype = {
        chunkSize: function () {
            return this.size
        },
        removeInner: function (e, t) {
            this.size -= t;
            for (var n = 0; n < this.children.length; ++n) {
                var r = this.children[n],
                    i = r.chunkSize();
                if (i > e) {
                    var o = Math.min(t, i - e),
                        a = r.height;
                    if (r.removeInner(e, o), this.height -= a - r.height, i == o && (this.children.splice(n--, 1), r.parent = null), 0 == (t -= o)) break;
                    e = 0
                } else e -= i
            }
            if (this.size - t < 25) {
                var l = [];
                this.collapse(l), this.children = [new Zn(l)], this.children[0].parent = this
            }
        },
        collapse: function (e) {
            for (var t = 0, n = this.children.length; n > t; ++t) this.children[t].collapse(e)
        },
        insertInner: function (e, t, n) {
            this.size += t.length, this.height += n;
            for (var r = 0, i = this.children.length; i > r; ++r) {
                var o = this.children[r],
                    a = o.chunkSize();
                if (a >= e) {
                    if (o.insertInner(e, t, n), o.lines && o.lines.length > 50) {
                        for (; o.lines.length > 50;) {
                            var l = o.lines.splice(o.lines.length - 25, 25),
                                s = new Zn(l);
                            o.height -= s.height, this.children.splice(r + 1, 0, s), s.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                e -= a
            }
        },
        maybeSpill: function () {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = e.children.splice(e.children.length - 5, 5),
                        n = new Jn(t);
                    if (e.parent) {
                        e.size -= n.size, e.height -= n.height;
                        var r = zr(e.parent.children, e);
                        e.parent.children.splice(r + 1, 0, n)
                    } else {
                        var i = new Jn(e.children);
                        i.parent = e, e.children = [i, n], e = i
                    }
                    n.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            }
        },
        iterN: function (e, t, n) {
            for (var r = 0, i = this.children.length; i > r; ++r) {
                var o = this.children[r],
                    a = o.chunkSize();
                if (a > e) {
                    var l = Math.min(t, a - e);
                    if (o.iterN(e, l, n)) return !0;
                    if (0 == (t -= l)) break;
                    e = 0
                } else e -= a
            }
        }
    };
    var Yi = 0,
        Qi = e.Doc = function (e, t, n) {
            if (!(this instanceof Qi)) return new Qi(e, t, n);
            null == n && (n = 0), Jn.call(this, [new Zn([zn("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.history = ur(), this.frontier = n;
            var r = $t(n, 0);
            this.sel = {
                from: r,
                to: r,
                head: r,
                anchor: r,
                shift: !1,
                extend: !1,
                goalColumn: null
            }, this.id = ++Yi, this.modeOption = t, "string" == typeof e && (e = ho(e)), Qn(this, {
                from: r,
                to: r,
                text: e
            }, null, {
                head: r,
                anchor: r
            })
        };
    Qi.prototype = Hr(Jn.prototype, {
        iter: function (e, t, n) {
            n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
        },
        insert: function (e, t) {
            for (var n = 0, r = 0, i = t.length; i > r; ++r) n += t[r].height;
            this.insertInner(e - this.first, t, n)
        },
        remove: function (e, t) {
            this.removeInner(e - this.first, t)
        },
        getValue: function (e) {
            var t = ir(this, this.first, this.first + this.size);
            return e === !1 ? t : t.join(e || "\n")
        },
        setValue: function (e) {
            var t = $t(this.first, 0),
                n = this.first + this.size - 1;
            At(this, {
                from: t,
                to: $t(n, nr(this, n).text.length),
                text: ho(e),
                origin: "setValue"
            }, {
                head: t,
                anchor: t
            }, !0)
        },
        replaceRange: function (e, t, n, r) {
            t = Vt(this, t), n = n ? Vt(this, n) : t, Pt(this, e, t, n, r)
        },
        getRange: function (e, t, n) {
            var r = rr(this, Vt(this, e), Vt(this, t));
            return n === !1 ? r : r.join(n || "\n")
        },
        getLine: function (e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        setLine: function (e, t) {
            Gt(this, e) && Pt(this, t, $t(e, 0), Vt(this, $t(e)))
        },
        removeLine: function (e) {
            Gt(this, e) && Pt(this, "", $t(e, 0), Vt(this, $t(e + 1, 0)))
        },
        getLineHandle: function (e) {
            return Gt(this, e) ? nr(this, e) : void 0
        },
        getLineNumber: function (e) {
            return ar(e)
        },
        lineCount: function () {
            return this.size
        },
        firstLine: function () {
            return this.first
        },
        lastLine: function () {
            return this.first + this.size - 1
        },
        clipPos: function (e) {
            return Vt(this, e)
        },
        getCursor: function (e) {
            var t, n = this.sel;
            return t = null == e || "head" == e ? n.head : "anchor" == e ? n.anchor : "end" == e || e === !1 ? n.to : n.from, Rt(t)
        },
        somethingSelected: function () {
            return !zt(this.sel.head, this.sel.anchor)
        },
        setCursor: Z(function (e, t, n) {
            var r = Vt(this, "number" == typeof e ? $t(e, t || 0) : e);
            n ? Ut(this, r) : jt(this, r, r)
        }),
        setSelection: Z(function (e, t) {
            jt(this, Vt(this, e), Vt(this, t || e))
        }),
        extendSelection: Z(function (e, t) {
            Ut(this, Vt(this, e), t && Vt(this, t))
        }),
        getSelection: function (e) {
            return this.getRange(this.sel.from, this.sel.to, e)
        },
        replaceSelection: function (e, t, n) {
            At(this, {
                from: this.sel.from,
                to: this.sel.to,
                text: ho(e),
                origin: n
            }, t || "around")
        },
        undo: Z(function () {
            It(this, "undo")
        }),
        redo: Z(function () {
            It(this, "redo")
        }),
        setExtending: function (e) {
            this.sel.extend = e
        },
        historySize: function () {
            var e = this.history;
            return {
                undo: e.done.length,
                redo: e.undone.length
            }
        },
        clearHistory: function () {
            this.history = ur()
        },
        markClean: function () {
            this.history.dirtyCounter = 0, this.history.lastOp = this.history.lastOrigin = null
        },
        isClean: function () {
            return 0 == this.history.dirtyCounter
        },
        getHistory: function () {
            return {
                done: gr(this.history.done),
                undone: gr(this.history.undone)
            }
        },
        setHistory: function (e) {
            var t = this.history = ur();
            t.done = e.done.slice(0), t.undone = e.undone.slice(0)
        },
        markText: function (e, t, n) {
            return gn(this, Vt(this, e), Vt(this, t), n, "range")
        },
        setBookmark: function (e, t) {
            var n = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft
            };
            return e = Vt(this, e), gn(this, e, e, n, "bookmark")
        },
        findMarksAt: function (e) {
            e = Vt(this, e);
            var t = [],
                n = nr(this, e.line).markedSpans;
            if (n)
                for (var r = 0; r < n.length; ++r) {
                    var i = n[r];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                }
            return t
        },
        getAllMarks: function () {
            var e = [];
            return this.iter(function (t) {
                var n = t.markedSpans;
                if (n)
                    for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker)
            }), e
        },
        posFromIndex: function (e) {
            var t, n = this.first;
            return this.iter(function (r) {
                var i = r.text.length + 1;
                return i > e ? (t = e, !0) : (e -= i, ++n, void 0)
            }), Vt(this, $t(n, t))
        },
        indexFromPos: function (e) {
            e = Vt(this, e);
            var t = e.ch;
            return e.line < this.first || e.ch < 0 ? 0 : (this.iter(this.first, e.line, function (e) {
                t += e.text.length + 1
            }), t)
        },
        copy: function (e) {
            var t = new Qi(ir(this, this.first, this.first + this.size), this.modeOption, this.first);
            return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = {
                from: this.sel.from,
                to: this.sel.to,
                head: this.sel.head,
                anchor: this.sel.anchor,
                shift: this.sel.shift,
                extend: !1,
                goalColumn: this.sel.goalColumn
            }, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
        },
        linkedDoc: function (e) {
            e || (e = {});
            var t = this.first,
                n = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
            var r = new Qi(ir(this, t, n), e.mode || this.modeOption, t);
            return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
                doc: r,
                sharedHist: e.sharedHist
            }), r.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: e.sharedHist
            }], r
        },
        unlinkDoc: function (t) {
            if (t instanceof e && (t = t.doc), this.linked)
                for (var n = 0; n < this.linked.length; ++n) {
                    var r = this.linked[n];
                    if (r.doc == t) {
                        this.linked.splice(n, 1), t.unlinkDoc(this);
                        break
                    }
                }
            if (t.history == this.history) {
                var i = [t.id];
                er(t, function (e) {
                    i.push(e.id)
                }, !0), t.history = ur(), t.history.done = gr(this.history.done, i), t.history.undone = gr(this.history.undone, i)
            }
        },
        iterLinkedDocs: function (e) {
            er(this, e)
        },
        getMode: function () {
            return this.mode
        },
        getEditor: function () {
            return this.cm
        }
    }), Qi.prototype.eachLine = Qi.prototype.iter;
    var Zi = "iter insert remove copy getEditor".split(" ");
    for (var Ji in Qi.prototype) Qi.prototype.hasOwnProperty(Ji) && zr(Zi, Ji) < 0 && (e.prototype[Ji] = function (e) {
        return function () {
            return e.apply(this.doc, arguments)
        }
    }(Qi.prototype[Ji]));
    e.e_stop = kr, e.e_preventDefault = Sr, e.e_stopPropagation = Cr;
    var eo, to = 0;
    e.on = Tr, e.off = Wr, e.signal = Nr;
    var no = 30,
        ro = e.Pass = {
            toString: function () {
                return "CodeMirror.Pass"
            }
        };
    Er.prototype = {
        set: function (e, t) {
            clearTimeout(this.id), this.id = setTimeout(t, e)
        }
    }, e.countColumn = Dr;
    var io = [""],
        oo = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc]/,
        ao = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;
    e.replaceGetRect = function (e) {
        qr = e
    };
    var lo = function () {
        if (ui) return !1;
        var e = Ur("div");
        return "draggable" in e || "dragDrop" in e
    }(),
        so = /^$/;
    li ? so = /$'/ : mi ? so = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/ : di && (so = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/);
    var co, uo, ho = 3 != "\n\nb".split(/\n/).length ? function (e) {
            for (var t = 0, n = [], r = e.length; r >= t;) {
                var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    a = o.indexOf("\r"); - 1 != a ? (n.push(o.slice(0, a)), t += a + 1) : (n.push(o), t = i + 1)
            }
            return n
        } : function (e) {
            return e.split(/\r\n?|\n/)
        };
    e.splitLines = ho;
    var fo = window.getSelection ? function (e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (t) {
                return !1
            }
        } : function (e) {
            try {
                var t = e.ownerDocument.selection.createRange()
            } catch (n) {}
            return t && t.parentElement() == e ? 0 != t.compareEndPoints("StartToEnd", t) : !1
        }, po = function () {
            var e = Ur("div");
            return "oncopy" in e ? !0 : (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy)
        }(),
        mo = {
            3: "Enter",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            109: "-",
            107: "=",
            127: "Delete",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63276: "PageUp",
            63277: "PageDown",
            63275: "End",
            63273: "Home",
            63234: "Left",
            63232: "Up",
            63235: "Right",
            63233: "Down",
            63302: "Insert",
            63272: "Delete"
        };
    e.keyNames = mo,
    function () {
        for (var e = 0; 10 > e; e++) mo[e + 48] = String(e);
        for (var e = 65; 90 >= e; e++) mo[e] = String.fromCharCode(e);
        for (var e = 1; 12 >= e; e++) mo[e + 111] = mo[e + 63235] = "F" + e
    }();
    var go = function () {
        function e(e) {
            return 255 >= e ? t.charAt(e) : e >= 1424 && 1524 >= e ? "R" : e >= 1536 && 1791 >= e ? n.charAt(e - 1536) : e >= 1792 && 2220 >= e ? "r" : "L"
        }
        var t = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL",
            n = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr",
            r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            i = /[stwN]/,
            o = /[LRr]/,
            a = /[Lb1n]/,
            l = /[1n]/,
            s = "L";
        return function (t) {
            if (!r.test(t)) return !1;
            for (var n, c = t.length, u = [], h = 0; c > h; ++h) u.push(n = e(t.charCodeAt(h)));
            for (var h = 0, f = s; c > h; ++h) {
                var n = u[h];
                "m" == n ? u[h] = f : f = n
            }
            for (var h = 0, d = s; c > h; ++h) {
                var n = u[h];
                "1" == n && "r" == d ? u[h] = "n" : o.test(n) && (d = n, "r" == n && (u[h] = "R"))
            }
            for (var h = 1, f = u[0]; c - 1 > h; ++h) {
                var n = u[h];
                "+" == n && "1" == f && "1" == u[h + 1] ? u[h] = "1" : "," != n || f != u[h + 1] || "1" != f && "n" != f || (u[h] = f), f = n
            }
            for (var h = 0; c > h; ++h) {
                var n = u[h];
                if ("," == n) u[h] = "N";
                else if ("%" == n) {
                    for (var p = h + 1; c > p && "%" == u[p]; ++p);
                    for (var m = h && "!" == u[h - 1] || c - 1 > p && "1" == u[p] ? "1" : "N", g = h; p > g; ++g) u[g] = m;
                    h = p - 1
                }
            }
            for (var h = 0, d = s; c > h; ++h) {
                var n = u[h];
                "L" == d && "1" == n ? u[h] = "L" : o.test(n) && (d = n)
            }
            for (var h = 0; c > h; ++h)
                if (i.test(u[h])) {
                    for (var p = h + 1; c > p && i.test(u[p]); ++p);
                    for (var v = "L" == (h ? u[h - 1] : s), y = "L" == (c - 1 > p ? u[p] : s), m = v || y ? "L" : "R", g = h; p > g; ++g) u[g] = m;
                    h = p - 1
                }
            for (var b, w = [], h = 0; c > h;)
                if (a.test(u[h])) {
                    var x = h;
                    for (++h; c > h && a.test(u[h]); ++h);
                    w.push({
                        from: x,
                        to: h,
                        level: 0
                    })
                } else {
                    var S = h,
                        C = w.length;
                    for (++h; c > h && "L" != u[h]; ++h);
                    for (var g = S; h > g;)
                        if (l.test(u[g])) {
                            g > S && w.splice(C, 0, {
                                from: S,
                                to: g,
                                level: 1
                            });
                            var k = g;
                            for (++g; h > g && l.test(u[g]); ++g);
                            w.splice(C, 0, {
                                from: k,
                                to: g,
                                level: 2
                            }), S = g
                        } else ++g;
                    h > S && w.splice(C, 0, {
                        from: S,
                        to: h,
                        level: 1
                    })
                }
            return 1 == w[0].level && (b = t.match(/^\s+/)) && (w[0].from = b[0].length, w.unshift({
                from: 0,
                to: b[0].length,
                level: 0
            })), 1 == Pr(w).level && (b = t.match(/\s+$/)) && (Pr(w).to -= b[0].length, w.push({
                from: c - b[0].length,
                to: c,
                level: 0
            })), w[0].level != Pr(w).level && w.push({
                from: c,
                to: c,
                level: w[0].level
            }), w
        }
    }();
    return e.version = "3.1", e
}(), CodeMirror.defineMode("markdown", function (e, t) {
    function n(e, t, n) {
        return t.f = t.inline = n, n(e, t)
    }

    function r(e, t, n) {
        return t.f = t.block = n, n(e, t)
    }

    function i(e) {
        return e.linkTitle = !1, e.em = !1, e.strong = !1, e.quote = !1, g || e.f != a || (e.f = u, e.block = o), null
    }

    function o(e, i) {
        if (i.list !== !1 && i.indentationDiff >= 0 ? (i.indentationDiff < 4 && (i.indentation -= i.indentationDiff), i.list = null) : i.list = !1, i.indentationDiff >= 4) return i.indentation -= 4, e.skipToEnd(), k;
        if (e.eatSpace()) return null;
        if ("#" === e.peek() || x && e.match(H)) i.header = !0;
        else if (e.eat(">")) i.indentation++, i.quote = !0;
        else {
            if ("[" === e.peek()) return n(e, i, f);
            if (e.match(P, !0)) return T;
            if (e.match($, !0) || e.match(z, !0)) i.indentation += 4, i.list = !0;
            else if (t.fencedCodeBlocks && e.match(/^```([\w+#]*)/, !0)) return i.localMode = b(RegExp.$1), i.localMode && (i.localState = i.localMode.startState()), r(e, i, l), k
        }
        return n(e, i, i.inline)
    }

    function a(e, t) {
        var n = v.token(e, t.htmlState);
        return g && "tag" === n && "openTag" !== t.htmlState.type && !t.htmlState.context && (t.f = u, t.block = o), t.md_inside && -1 != e.current().indexOf(">") && (t.f = u, t.block = o, t.htmlState.context = void 0), n
    }

    function l(e, t) {
        return e.sol() && e.match(/^```/, !0) ? (t.localMode = t.localState = null, t.f = u, t.block = o, k) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), k)
    }

    function s(e) {
        var t = [];
        return e.strong ? t.push(e.em ? F : D) : e.em && t.push(E), e.linkText && t.push(O), e.code && t.push(k), e.header && t.push(C), e.quote && t.push(L), e.list !== !1 && t.push(M), t.length ? t.join(" ") : null
    }

    function c(e, t) {
        return e.match(R, !0) ? s(t) : void 0
    }

    function u(e, i) {
        var o = i.text(e, i);
        if ("undefined" != typeof o) return o;
        if (i.list) return i.list = null, M;
        var l = e.next();
        if ("\\" === l) return e.next(), s(i);
        if (i.linkTitle) {
            i.linkTitle = !1;
            var c = l;
            "(" === l && (c = ")"), c = (c + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            var u = "^\\s*(?:[^" + c + "\\\\]+|\\\\\\\\|\\\\.)" + c;
            if (e.match(new RegExp(u), !0)) return I
        }
        if ("`" === l) {
            var f = s(i),
                d = e.pos;
            e.eatWhile("`");
            var p = 1 + e.pos - d;
            return i.code ? p === w ? (i.code = !1, f) : s(i) : (w = p, i.code = !0, s(i))
        }
        if (i.code) return s(i);
        if ("!" === l && e.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return e.match(/\[[^\]]*\]/), i.inline = i.f = h, W;
        if ("[" === l && e.match(/.*\](\(| ?\[)/, !1)) return i.linkText = !0, s(i);
        if ("]" === l && i.linkText) {
            var g = s(i);
            return i.linkText = !1, i.inline = i.f = h, g
        }
        if ("<" === l && e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !0)) return n(e, i, m(N, ">"));
        if ("<" === l && e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !0)) return n(e, i, m(A, ">"));
        if ("<" === l && e.match(/^\w/, !1)) {
            if (-1 != e.string.indexOf(">")) {
                var v = e.string.substring(1, e.string.indexOf(">"));
                /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(v) && (i.md_inside = !0)
            }
            return e.backUp(1), r(e, i, a)
        }
        if ("<" === l && e.match(/^\/\w*?>/)) return i.md_inside = !1, "tag";
        var y = !1;
        if (!t.underscoresBreakWords && "_" === l && "_" !== e.peek() && e.match(/(\w)/, !1)) {
            var b = e.pos - 2;
            if (b >= 0) {
                var x = e.string.charAt(b);
                "_" !== x && x.match(/(\w)/, !1) && (y = !0)
            }
        }
        var f = s(i);
        if ("*" === l || "_" === l && !y) {
            if (i.strong === l && e.eat(l)) return i.strong = !1, f;
            if (!i.strong && e.eat(l)) return i.strong = l, s(i);
            if (i.em === l) return i.em = !1, f;
            if (!i.em) return i.em = l, s(i)
        } else if (" " === l && (e.eat("*") || e.eat("_"))) {
            if (" " === e.peek()) return s(i);
            e.backUp(1)
        }
        return s(i)
    }

    function h(e, t) {
        if (e.eatSpace()) return null;
        var r = e.next();
        return "(" === r || "[" === r ? n(e, t, m(I, "(" === r ? ")" : "]")) : "error"
    }

    function f(e, t) {
        return e.match(/^[^\]]*\]:/, !0) ? (t.f = d, O) : n(e, t, u)
    }

    function d(e, t) {
        return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), void 0 === e.peek() ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = u, I)
    }

    function p(e) {
        return B[e] || (e = (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), B[e] = new RegExp("^(?:[^\\\\]|\\\\.)*?(" + e + ")")), B[e]
    }

    function m(e, t, n) {
        return n = n || u,
        function (r, i) {
            return r.match(p(t)), i.inline = i.f = n, e
        }
    }
    var g = CodeMirror.mimeModes.hasOwnProperty("text/html"),
        v = CodeMirror.getMode(e, g ? "text/html" : "text/plain"),
        y = {
            html: "htmlmixed",
            js: "javascript",
            json: "application/json",
            c: "text/x-csrc",
            "c++": "text/x-c++src",
            java: "text/x-java",
            csharp: "text/x-csharp",
            "c#": "text/x-csharp",
            scala: "text/x-scala"
        }, b = function () {
            var t, n, r = {}, i = {}, o = [];
            for (var a in CodeMirror.modes) CodeMirror.modes.propertyIsEnumerable(a) && o.push(a);
            for (t = 0; t < o.length; t++) r[o[t]] = o[t];
            var l = [];
            for (var a in CodeMirror.mimeModes) CodeMirror.mimeModes.propertyIsEnumerable(a) && l.push({
                mime: a,
                mode: CodeMirror.mimeModes[a]
            });
            for (t = 0; t < l.length; t++) n = l[t].mime, i[n] = l[t].mime;
            for (var s in y)(y[s] in r || y[s] in i) && (r[s] = y[s]);
            return function (t) {
                return r[t] ? CodeMirror.getMode(e, r[t]) : null
            }
        }();
    void 0 === t.underscoresBreakWords && (t.underscoresBreakWords = !0), void 0 === t.fencedCodeBlocks && (t.fencedCodeBlocks = !1);
    var w = 0,
        x = !1,
        S = !1,
        C = "header",
        k = "comment",
        L = "quote",
        M = "string",
        T = "hr",
        W = "tag",
        N = "link",
        A = "link",
        O = "link",
        I = "string",
        E = "em",
        D = "strong",
        F = "emstrong",
        P = /^([*\-=_])(?:\s*\1){2,}\s*$/,
        $ = /^[*\-+]\s+/,
        z = /^[0-9]+\.\s+/,
        H = /^(?:\={1,}|-{1,})$/,
        R = /^[^!\[\]*_\\<>` "'(]+/,
        B = [];
    return {
        startState: function () {
            return x = !1, S = !1, {
                f: o,
                block: o,
                htmlState: CodeMirror.startState(v),
                indentation: 0,
                inline: u,
                text: c,
                linkText: !1,
                linkTitle: !1,
                em: !1,
                strong: !1,
                header: !1,
                list: !1,
                quote: !1
            }
        },
        copyState: function (e) {
            return {
                f: e.f,
                block: e.block,
                htmlState: CodeMirror.copyState(v, e.htmlState),
                indentation: e.indentation,
                localMode: e.localMode,
                localState: e.localMode ? CodeMirror.copyState(e.localMode, e.localState) : null,
                inline: e.inline,
                text: e.text,
                linkTitle: e.linkTitle,
                em: e.em,
                strong: e.strong,
                header: e.header,
                list: e.list,
                quote: e.quote,
                md_inside: e.md_inside
            }
        },
        token: function (e, t) {
            if (e.sol()) {
                if (e.match(/^\s*$/, !0)) return x = !1, i(t);
                S && (x = !0, S = !1), S = !0, t.header = !1, t.code = !1, t.f = t.block;
                var n = e.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length,
                    r = 4 * Math.floor((n - t.indentation) / 4);
                r > 4 && (r = 4);
                var o = t.indentation + r;
                if (t.indentationDiff = o - t.indentation, t.indentation = o, n > 0) return null
            }
            return t.f(e, t)
        },
        blankLine: i,
        getType: s
    }
}, "xml"), CodeMirror.defineMIME("text/x-markdown", "markdown"); // Copyright (c) 2007 John Fraser.
// Original Markdown Copyright (c) 2004-2005 John Gruber
var Showdown = {
    extensions: {}
}, forEach = Showdown.forEach = function (e, t) {
        if ("function" == typeof e.forEach) e.forEach(t);
        else {
            var n, r = e.length;
            for (n = 0; r > n; n++) t(e[n], n, e)
        }
    }, stdExtName = function (e) {
        return e.replace(/[_-]||\s/g, "").toLowerCase()
    };
Showdown.converter = function (e) {
    var t, n, r, i = 0,
        o = [],
        a = [];
    if ("undefind" != typeof module && "undefined" != typeof exports && "undefind" != typeof require) {
        var l = require("fs");
        if (l) {
            var s = l.readdirSync((__dirname || ".") + "/extensions").filter(function (e) {
                return~ e.indexOf(".js")
            }).map(function (e) {
                return e.replace(/\.js$/, "")
            });
            Showdown.forEach(s, function (e) {
                var t = stdExtName(e);
                Showdown.extensions[t] = require("./extensions/" + e)
            })
        }
    }
    if (this.makeHtml = function (e) {
        return t = {}, n = {}, r = [], e = e.replace(/~/g, "~T"), e = e.replace(/\$/g, "~D"), e = e.replace(/\r\n/g, "\n"), e = e.replace(/\r/g, "\n"), e = "\n\n" + e + "\n\n", e = z(e), e = e.replace(/^[ \t]+$/gm, ""), Showdown.forEach(o, function (t) {
            e = h(t, e)
        }), e = L(e), e = d(e), e = f(e), e = m(e), e = P(e), e = e.replace(/~D/g, "$$"), e = e.replace(/~T/g, "~"), Showdown.forEach(a, function (t) {
            e = h(t, e)
        }), e
    }, e && e.extensions) {
        var c = this;
        Showdown.forEach(e.extensions, function (e) {
            if ("string" == typeof e && (e = Showdown.extensions[stdExtName(e)]), "function" != typeof e) throw "Extension '" + e + "' could not be loaded.  It was either not found or is not a valid extension.";
            Showdown.forEach(e(c), function (e) {
                e.type ? "language" === e.type || "lang" === e.type ? o.push(e) : ("output" === e.type || "html" === e.type) && a.push(e) : a.push(e)
            })
        })
    }
    var u, h = function (e, t) {
            if (e.regex) {
                var n = new RegExp(e.regex, "g");
                return t.replace(n, e.replace)
            }
            return e.filter ? e.filter(t) : void 0
        }, f = function (e) {
            return e += "~0", e = e.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm, function (e, r, i, o, a) {
                return r = r.toLowerCase(), t[r] = I(i), o ? o + a : (a && (n[r] = a.replace(/"/g, "&quot;")), "")
            }), e = e.replace(/~0/, "")
        }, d = function (e) {
            return e = e.replace(/\n/g, "\n\n"), e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, p), e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm, p), e = e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, p), e = e.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, p), e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, p), e = e.replace(/\n\n/g, "\n")
        }, p = function (e, t) {
            var n = t;
            return n = n.replace(/\n\n/g, "\n"), n = n.replace(/^\n/, ""), n = n.replace(/\n+$/g, ""), n = "\n\n~K" + (r.push(n) - 1) + "K\n\n"
        }, m = function (e) {
            e = S(e);
            var t = M("<hr />");
            return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, t), e = e.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, t), e = e.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm, t), e = C(e), e = k(e), e = A(e), e = d(e), e = O(e)
        }, g = function (e) {
            return e = T(e), e = v(e), e = E(e), e = w(e), e = y(e), e = D(e), e = I(e), e = N(e), e = e.replace(/  +\n/g, " <br />\n")
        }, v = function (e) {
            var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
            return e = e.replace(t, function (e) {
                var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
                return t = H(t, "\\`*_")
            })
        }, y = function (e) {
            return e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, b), e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, b), e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, b)
        }, b = function (e, r, i, o, a, l, s, c) {
            void 0 == c && (c = "");
            var u = r,
                h = i,
                f = o.toLowerCase(),
                d = a,
                p = c;
            if ("" == d)
                if ("" == f && (f = h.toLowerCase().replace(/ ?\n/g, " ")), d = "#" + f, void 0 != t[f]) d = t[f], void 0 != n[f] && (p = n[f]);
                else {
                    if (!(u.search(/\(\s*\)$/m) > -1)) return u;
                    d = ""
                }
            d = H(d, "*_");
            var m = '<a href="' + d + '"';
            return "" != p && (p = p.replace(/"/g, "&quot;"), p = H(p, "*_"), m += ' title="' + p + '"'), m += ">" + h + "</a>"
        }, w = function (e) {
            return e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, x), e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, x)
        }, x = function (e, r, i, o, a, l, s, c) {
            var u = r,
                h = i,
                f = o.toLowerCase(),
                d = a,
                p = c;
            if (p || (p = ""), "" == d) {
                if ("" == f && (f = h.toLowerCase().replace(/ ?\n/g, " ")), d = "#" + f, void 0 == t[f]) return u;
                d = t[f], void 0 != n[f] && (p = n[f])
            }
            h = h.replace(/"/g, "&quot;"), d = H(d, "*_");
            var m = '<img src="' + d + '" alt="' + h + '"';
            return p = p.replace(/"/g, "&quot;"), p = H(p, "*_"), m += ' title="' + p + '"', m += " />"
        }, S = function (e) {
            function t(e) {
                return e.replace(/[^\w]/g, "").toLowerCase()
            }
            return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function (e, n) {
                return M('<h1 id="' + t(n) + '">' + g(n) + "</h1>")
            }), e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function (e, n) {
                return M('<h2 id="' + t(n) + '">' + g(n) + "</h2>")
            }), e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function (e, n, r) {
                var i = n.length;
                return M("<h" + i + ' id="' + t(r) + '">' + g(r) + "</h" + i + ">")
            })
        }, C = function (e) {
            e += "~0";
            var t = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
            return i ? e = e.replace(t, function (e, t, n) {
                var r = t,
                    i = n.search(/[*+-]/g) > -1 ? "ul" : "ol";
                r = r.replace(/\n{2,}/g, "\n\n\n");
                var o = u(r);
                return o = o.replace(/\s+$/, ""), o = "<" + i + ">" + o + "</" + i + ">\n"
            }) : (t = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, e = e.replace(t, function (e, t, n, r) {
                var i = t,
                    o = n,
                    a = r.search(/[*+-]/g) > -1 ? "ul" : "ol",
                    o = o.replace(/\n{2,}/g, "\n\n\n"),
                    l = u(o);
                return l = i + "<" + a + ">\n" + l + "</" + a + ">\n"
            })), e = e.replace(/~0/, "")
        };
    u = function (e) {
        return i++, e = e.replace(/\n{2,}$/, "\n"), e += "~0", e = e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function (e, t, n, r, i) {
            var o = i,
                a = t;
            return a || o.search(/\n{2,}/) > -1 ? o = m($(o)) : (o = C($(o)), o = o.replace(/\n$/, ""), o = g(o)), "<li>" + o + "</li>\n"
        }), e = e.replace(/~0/g, ""), i--, e
    };
    var k = function (e) {
        return e += "~0", e = e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function (e, t, n) {
            var r = t,
                i = n;
            return r = W($(r)), r = z(r), r = r.replace(/^\n+/g, ""), r = r.replace(/\n+$/g, ""), r = "<pre><code>" + r + "\n</code></pre>", M(r) + i
        }), e = e.replace(/~0/, "")
    }, L = function (e) {
            return e += "~0", e = e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function (e, t, n) {
                var r = t,
                    i = n;
                return i = W(i), i = z(i), i = i.replace(/^\n+/g, ""), i = i.replace(/\n+$/g, ""), i = "<pre><code" + (r ? ' class="' + r + '"' : "") + ">" + i + "\n</code></pre>", M(i)
            }), e = e.replace(/~0/, "")
        }, M = function (e) {
            return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (r.push(e) - 1) + "K\n\n"
        }, T = function (e) {
            return e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (e, t, n, r) {
                var i = r;
                return i = i.replace(/^([ \t]*)/g, ""), i = i.replace(/[ \t]*$/g, ""), i = W(i), t + "<code>" + i + "</code>"
            })
        }, W = function (e) {
            return e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = H(e, "*_{}[]\\", !1)
        }, N = function (e) {
            return e = e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"), e = e.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>")
        }, A = function (e) {
            return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (e, t) {
                var n = t;
                return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"), n = n.replace(/~0/g, ""), n = n.replace(/^[ \t]+$/gm, ""), n = m(n), n = n.replace(/(^|\n)/g, "$1  "), n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (e, t) {
                    var n = t;
                    return n = n.replace(/^  /gm, "~0"), n = n.replace(/~0/g, "")
                }), M("<blockquote>\n" + n + "\n</blockquote>")
            })
        }, O = function (e) {
            e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
            for (var t = e.split(/\n{2,}/g), n = [], i = t.length, o = 0; i > o; o++) {
                var a = t[o];
                a.search(/~K(\d+)K/g) >= 0 ? n.push(a) : a.search(/\S/) >= 0 && (a = g(a), a = a.replace(/^([ \t]*)/g, "<p>"), a += "</p>", n.push(a))
            }
            i = n.length;
            for (var o = 0; i > o; o++)
                for (; n[o].search(/~K(\d+)K/) >= 0;) {
                    var l = r[RegExp.$1];
                    l = l.replace(/\$/g, "$$$$"), n[o] = n[o].replace(/~K\d+K/, l)
                }
            return n.join("\n\n")
        }, I = function (e) {
            return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?\$!])/gi, "&lt;")
        }, E = function (e) {
            return e = e.replace(/\\(\\)/g, R), e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, R)
        }, D = function (e) {
            return e = e.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, '<a href="$1">$1</a>'), e = e.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function (e, t) {
                return F(P(t))
            })
        }, F = function (e) {
            var t = [
                function (e) {
                    return "&#" + e.charCodeAt(0) + ";"
                },
                function (e) {
                    return "&#x" + e.charCodeAt(0).toString(16) + ";"
                },
                function (e) {
                    return e
                }
            ];
            return e = "mailto:" + e, e = e.replace(/./g, function (e) {
                if ("@" == e) e = t[Math.floor(2 * Math.random())](e);
                else if (":" != e) {
                    var n = Math.random();
                    e = n > .9 ? t[2](e) : n > .45 ? t[1](e) : t[0](e)
                }
                return e
            }), e = '<a href="' + e + '">' + e + "</a>", e = e.replace(/">.+:/g, '">')
        }, P = function (e) {
            return e = e.replace(/~E(\d+)E/g, function (e, t) {
                var n = parseInt(t);
                return String.fromCharCode(n)
            })
        }, $ = function (e) {
            return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"), e = e.replace(/~0/g, "")
        }, z = function (e) {
            return e = e.replace(/\t(?=\t)/g, "    "), e = e.replace(/\t/g, "~A~B"), e = e.replace(/~B(.+?)~A/g, function (e, t) {
                for (var n = t, r = 4 - n.length % 4, i = 0; r > i; i++) n += " ";
                return n
            }), e = e.replace(/~A/g, "    "), e = e.replace(/~B/g, "")
        }, H = function (e, t, n) {
            var r = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
            n && (r = "\\\\" + r);
            var i = new RegExp(r, "g");
            return e = e.replace(i, R)
        }, R = function (e, t) {
            var n = t.charCodeAt(0);
            return "~E" + n + "E"
        }
}, "undefined" != typeof module && (module.exports = Showdown), "function" == typeof define && define.amd && define("showdown", function () {
    return Showdown
}),
function (e, t, n) {
    "use strict";

    function r() {
        var e = document.getElementsByClassName("entry-word-count")[0],
            t = a.getValue();
        t.length && (e.innerHTML = t.match(/\S+/g).length + " words")
    }

    function i() {
        var e = document.getElementsByClassName("rendered-markdown")[0];
        e.innerHTML = o.makeHtml(a.getValue()), r()
    }
    var o = new t.converter,
        a = n.fromTextArea(document.getElementById("entry-markdown"), {
            mode: "markdown",
            tabMode: "indent",
            lineWrapping: !0
        });
    e(document).ready(function () {
        function t(t) {
            var n = e(t.target),
                r = e(".entry-preview-content"),
                i = e(".CodeMirror-sizer"),
                o = e(".rendered-markdown"),
                a = i.height() - n.height(),
                l = o.height() - r.height(),
                s = l / a,
                c = n.scrollTop() * s;
            r.scrollTop(c)
        }
        e(".entry-markdown header, .entry-preview header").click(function (t) {
            e(".entry-markdown, .entry-preview").removeClass("active"), e(t.target).closest("section").addClass("active")
        }), a.on("change", function () {
            i()
        }), i(), e(".CodeMirror-scroll").on("scroll", t), e(".CodeMirror-scroll").scroll(function () {
            e(".CodeMirror-scroll").scrollTop() > 10 ? e(".entry-markdown").addClass("scrolling") : e(".entry-markdown").removeClass("scrolling")
        }), e(".entry-preview-content").scroll(function () {
            e(".entry-preview-content").scrollTop() > 10 ? e(".entry-preview").addClass("scrolling") : e(".entry-preview").removeClass("scrolling")
        })
    })
}(jQuery, Showdown, CodeMirror);
});
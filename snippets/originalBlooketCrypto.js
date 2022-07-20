// not useful to use this code but here as a reference for how we grab the build config + how the encryption works.
function n(t, e, o, a, r, n, i) {
	try {
		var s = t[n](i)
		  , c = s.value
	} catch (t) {
		return void o(t)
	}
	s.done ? e(c) : Promise.resolve(c).then(a, r)
}
o.d(e, "a", (function() {
	return i
}
)),
o.d(e, "b", (function() {
	return s
}
)),
o.d(e, "d", (function() {
	return c
}
)),
o.d(e, "c", (function() {
	return l
}
));
var i = !0
  , s = "aa2ef0fb-acc7-403f-859b-3d5cffea51b4"
  , c = {
	headers: {
		"Content-Type": "text/plain"
	}
}
  , l = function() {
	var t, e = (t = r().mark((function t(e) {
		var o, a, n, i, s, c, l, u, p, _, m;
		return r().wrap((function(t) {
			for (; ; )
				switch (t.prev = t.next) {
				case 0:
					return o = JSON.stringify(e),
					a = (new TextEncoder).encode(o),
					n = (new TextEncoder).encode("qNX8waeU48vy0GBvzUySN8VaANZwPToX"),
					t.next = 5,
					window.crypto.subtle.digest("SHA-256", n);
				case 5:
					return i = t.sent,
					t.next = 8,
					window.crypto.subtle.importKey("raw", i, {
						name: "AES-GCM"
					}, !1, ["encrypt"]);
				case 8:
					return s = t.sent,
					c = window.crypto.getRandomValues(new Uint8Array(12)),
					l = Array.from(c).map((function(t) {
						return String.fromCharCode(t)
					}
					)).join(""),
					t.next = 13,
					window.crypto.subtle.encrypt({
						name: "AES-GCM",
						iv: c
					}, s, a);
				case 13:
					return u = t.sent,
					p = Array.from(new Uint8Array(u)),
					_ = p.map((function(t) {
						return String.fromCharCode(t)
					}
					)).join(""),
					m = window.btoa(l + _),
					t.abrupt("return", m);
				case 18:
				case "end":
					return t.stop()
				}
		}
		), t)
	}
	)),
	function() {
		var e = this
		  , o = arguments;
		return new Promise((function(a, r) {
			var i = t.apply(e, o);
			function s(t) {
				n(i, a, r, s, c, "next", t)
			}
			function c(t) {
				n(i, a, r, s, c, "throw", t)
			}
			s(void 0)
		}
		))
	}
	);
	return function(t) {
		return e.apply(this, arguments)
	}
}()
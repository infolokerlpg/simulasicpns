!function (a) {
	a(function () {
		a.support.transition = (function () {
			var b = (function () {
				var e = document.createElement("bootstrap"), d = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"}, c;
				for (c in d) {
					if (e.style[c] !== undefined) {
						return d[c]
					}
				}
			}());
			return b && {end: b}
		})()
	})
}(window.jQuery);
!function (d) {
	var c = '[data-dismiss="alert"]', b = function (e) {
		d(e).on("click", c, this.close)
	};
	b.prototype.close = function (j) {
		var i = d(this), g = i.attr("data-target"), h;
		if (!g) {
			g = i.attr("href");
			g = g && g.replace(/.*(?=#[^\s]*$)/, "")
		}
		h = d(g);
		j && j.preventDefault();
		h.length || (h = i.hasClass("alert") ? i : i.parent());
		h.trigger(j = d.Event("close"));
		if (j.isDefaultPrevented()) {
			return
		}
		h.removeClass("in");
		function f() {
			h.trigger("closed").remove()
		}

		d.support.transition && h.hasClass("fade") ? h.on(d.support.transition.end, f) : f()
	};
	var a = d.fn.alert;
	d.fn.alert = function (e) {
		return this.each(function () {
			var g = d(this), f = g.data("alert");
			if (!f) {
				g.data("alert", (f = new b(this)))
			}
			if (typeof e == "string") {
				f[e].call(g)
			}
		})
	};
	d.fn.alert.Constructor = b;
	d.fn.alert.noConflict = function () {
		d.fn.alert = a;
		return this
	};
	d(document).on("click.alert.data-api", c, b.prototype.close)
}(window.jQuery);
!function (c) {
	var b = function (e, d) {
		this.$element = c(e);
		this.options = c.extend({}, c.fn.button.defaults, d)
	};
	b.prototype.setState = function (g) {
		var i = "disabled", e = this.$element, f = e.data(), h = e.is("input") ? "val" : "html";
		g = g + "Text";
		f.resetText || e.data("resetText", e[h]());
		e[h](f[g] || this.options[g]);
		setTimeout(function () {
			g == "loadingText" ? e.addClass(i).attr(i, i) : e.removeClass(i).removeAttr(i)
		}, 0)
	};
	b.prototype.toggle = function () {
		var d = this.$element.closest('[data-toggle="buttons-radio"]');
		d && d.find(".active").removeClass("active");
		this.$element.toggleClass("active")
	};
	var a = c.fn.button;
	c.fn.button = function (d) {
		return this.each(function () {
			var g = c(this), f = g.data("button"), e = typeof d == "object" && d;
			if (!f) {
				g.data("button", (f = new b(this, e)))
			}
			if (d == "toggle") {
				f.toggle()
			} else {
				if (d) {
					f.setState(d)
				}
			}
		})
	};
	c.fn.button.defaults = {loadingText: "loading..."};
	c.fn.button.Constructor = b;
	c.fn.button.noConflict = function () {
		c.fn.button = a;
		return this
	};
	c(document).on("click.button.data-api", "[data-toggle^=button]", function (f) {
		var d = c(f.target);
		if (!d.hasClass("btn")) {
			d = d.closest(".btn")
		}
		d.button("toggle")
	})
}(window.jQuery);
!function (b) {
	var c = function (e, d) {
		this.$element = b(e);
		this.options = d;
		this.options.pause == "hover" && this.$element.on("mouseenter", b.proxy(this.pause, this)).on("mouseleave", b.proxy(this.cycle, this))
	};
	c.prototype = {cycle: function (d) {
		if (!d) {
			this.paused = false
		}
		this.options.interval && !this.paused && (this.interval = setInterval(b.proxy(this.next, this), this.options.interval));
		return this
	}, to: function (h) {
		var d = this.$element.find(".item.active"), e = d.parent().children(), f = e.index(d), g = this;
		if (h > (e.length - 1) || h < 0) {
			return
		}
		if (this.sliding) {
			return this.$element.one("slid", function () {
				g.to(h)
			})
		}
		if (f == h) {
			return this.pause().cycle()
		}
		return this.slide(h > f ? "next" : "prev", b(e[h]))
	}, pause: function (d) {
		if (!d) {
			this.paused = true
		}
		if (this.$element.find(".next, .prev").length && b.support.transition.end) {
			this.$element.trigger(b.support.transition.end);
			this.cycle()
		}
		clearInterval(this.interval);
		this.interval = null;
		return this
	}, next: function () {
		if (this.sliding) {
			return
		}
		return this.slide("next")
	}, prev: function () {
		if (this.sliding) {
			return
		}
		return this.slide("prev")
	}, slide: function (k, f) {
		if (!b.support.transition && this.$element.hasClass("slide")) {
			this.$element.find(".item").stop(true, true)
		}
		var m = this.$element.find(".item.active"), d = f || m[k](), j = this.interval, l = k == "next" ? "left" : "right", g = k == "next" ? "first" : "last", h = this, i;
		this.sliding = true;
		j && this.pause();
		d = d.length ? d : this.$element.find(".item")[g]();
		i = b.Event("slide", {relatedTarget: d[0]});
		if (d.hasClass("active")) {
			return
		}
		if (b.support.transition && this.$element.hasClass("slide")) {
			this.$element.trigger(i);
			if (i.isDefaultPrevented()) {
				return
			}
			d.addClass(k);
			d[0].offsetWidth;
			m.addClass(l);
			d.addClass(l);
			this.$element.one(b.support.transition.end, function () {
				d.removeClass([k, l].join(" ")).addClass("active");
				m.removeClass(["active", l].join(" "));
				h.sliding = false;
				setTimeout(function () {
					h.$element.trigger("slid")
				}, 0)
			})
		} else {
			if (!b.support.transition && this.$element.hasClass("slide")) {
				this.$element.trigger(i);
				if (i.isDefaultPrevented()) {
					return
				}
				m.animate({left: (l == "right" ? "100%" : "-100%")}, 600, function () {
					m.removeClass("active");
					h.sliding = false;
					setTimeout(function () {
						h.$element.trigger("slid")
					}, 0)
				});
				d.addClass(k).css({left: (l == "right" ? "-100%" : "100%")}).animate({left: "0"}, 600, function () {
					d.removeClass(k).addClass("active")
				})
			} else {
				this.$element.trigger(i);
				if (i.isDefaultPrevented()) {
					return
				}
				m.removeClass("active");
				d.addClass("active");
				this.sliding = false;
				this.$element.trigger("slid")
			}
		}
		j && this.cycle();
		return this
	}};
	var a = b.fn.carousel;
	b.fn.carousel = function (d) {
		return this.each(function () {
			var h = b(this), g = h.data("carousel"), e = b.extend({}, b.fn.carousel.defaults, typeof d == "object" && d), f = typeof d == "string" ? d : e.slide;
			if (!g) {
				h.data("carousel", (g = new c(this, e)))
			}
			if (typeof d == "number") {
				g.to(d)
			} else {
				if (f) {
					g[f]()
				} else {
					if (e.interval) {
						g.cycle()
					}
				}
			}
		})
	};
	b.fn.carousel.defaults = {interval: 5000, pause: "hover"};
	b.fn.carousel.Constructor = c;
	b.fn.carousel.noConflict = function () {
		b.fn.carousel = a;
		return this
	};
	b(document).on("click.carousel.data-api", "[data-slide]", function (i) {
		var h = b(this), f, d = b(h.attr("data-target") || (f = h.attr("href")) && f.replace(/.*(?=#[^\s]+$)/, "")), g = b.extend({}, d.data(), h.data());
		d.carousel(g);
		i.preventDefault()
	})
}(window.jQuery);
!function (b) {
	var c = function (e, d) {
		this.$element = b(e);
		this.options = b.extend({}, b.fn.collapse.defaults, d);
		if (this.options.parent) {
			this.$parent = b(this.options.parent)
		}
		this.options.toggle && this.toggle()
	};
	c.prototype = {constructor: c, dimension: function () {
		var d = this.$element.hasClass("width");
		return d ? "width" : "height"
	}, show: function () {
		var g, d, f, e;
		if (this.transitioning) {
			return
		}
		g = this.dimension();
		d = b.camelCase(["scroll", g].join("-"));
		f = this.$parent && this.$parent.find("> .accordion-group > .in");
		if (f && f.length) {
			e = f.data("collapse");
			if (e && e.transitioning) {
				return
			}
			f.collapse("hide");
			e || f.data("collapse", null)
		}
		this.$element[g](0);
		this.transition("addClass", b.Event("show"), "shown");
		b.support.transition && this.$element[g](this.$element[0][d])
	}, hide: function () {
		var d;
		if (this.transitioning) {
			return
		}
		d = this.dimension();
		this.reset(this.$element[d]());
		this.transition("removeClass", b.Event("hide"), "hidden");
		this.$element[d](0)
	}, reset: function (d) {
		var e = this.dimension();
		this.$element.removeClass("collapse")[e](d || "auto")[0].offsetWidth;
		this.$element[d !== null ? "addClass" : "removeClass"]("collapse");
		return this
	}, transition: function (h, e, f) {
		var g = this, d = function () {
			if (e.type == "show") {
				g.reset()
			}
			g.transitioning = 0;
			g.$element.trigger(f)
		};
		this.$element.trigger(e);
		if (e.isDefaultPrevented()) {
			return
		}
		this.transitioning = 1;
		this.$element[h]("in");
		b.support.transition && this.$element.hasClass("collapse") ? this.$element.one(b.support.transition.end, d) : d()
	}, toggle: function () {
		this[this.$element.hasClass("in") ? "hide" : "show"]()
	}};
	var a = b.fn.collapse;
	b.fn.collapse = function (d) {
		return this.each(function () {
			var g = b(this), f = g.data("collapse"), e = typeof d == "object" && d;
			if (!f) {
				g.data("collapse", (f = new c(this, e)))
			}
			if (typeof d == "string") {
				f[d]()
			}
		})
	};
	b.fn.collapse.defaults = {toggle: true};
	b.fn.collapse.Constructor = c;
	b.fn.collapse.noConflict = function () {
		b.fn.collapse = a;
		return this
	};
	b(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (i) {
		var h = b(this), d, g = h.attr("data-target") || i.preventDefault() || (d = h.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), f = b(g).data("collapse") ? "toggle" : h.data();
		h[b(g).hasClass("in") ? "addClass" : "removeClass"]("collapsed");
		b(g).collapse(f)
	})
}(window.jQuery);
!function (f) {
	var b = "[data-toggle=dropdown]", a = function (h) {
		var g = f(h).on("click.dropdown.data-api", this.toggle);
		f("html").on("click.dropdown.data-api", function () {
			g.parent().removeClass("open")
		})
	};
	a.prototype = {constructor: a, toggle: function (j) {
		var i = f(this), h, g;
		if (i.is(".disabled, :disabled")) {
			return
		}
		h = e(i);
		g = h.hasClass("open");
		d();
		if (!g) {
			h.toggleClass("open")
		}
		i.focus();
		return false
	}, keydown: function (l) {
		var k, m, g, j, i, h;
		if (!/(38|40|27)/.test(l.keyCode)) {
			return
		}
		k = f(this);
		l.preventDefault();
		l.stopPropagation();
		if (k.is(".disabled, :disabled")) {
			return
		}
		j = e(k);
		i = j.hasClass("open");
		if (!i || (i && l.keyCode == 27)) {
			return k.click()
		}
		m = f("[role=menu] li:not(.divider):visible a", j);
		if (!m.length) {
			return
		}
		h = m.index(m.filter(":focus"));
		if (l.keyCode == 38 && h > 0) {
			h--
		}
		if (l.keyCode == 40 && h < m.length - 1) {
			h++
		}
		if (!~h) {
			h = 0
		}
		m.eq(h).focus()
	}};
	function d() {
		f(b).each(function () {
			e(f(this)).removeClass("open")
		})
	}

	function e(i) {
		var g = i.attr("data-target"), h;
		if (!g) {
			g = i.attr("href");
			g = g && /#/.test(g) && g.replace(/.*(?=#[^\s]*$)/, "")
		}
		h = f(g);
		h.length || (h = i.parent());
		return h
	}

	var c = f.fn.dropdown;
	f.fn.dropdown = function (g) {
		return this.each(function () {
			var i = f(this), h = i.data("dropdown");
			if (!h) {
				i.data("dropdown", (h = new a(this)))
			}
			if (typeof g == "string") {
				h[g].call(i)
			}
		})
	};
	f.fn.dropdown.Constructor = a;
	f.fn.dropdown.noConflict = function () {
		f.fn.dropdown = c;
		return this
	};
	f(document).on("click.dropdown.data-api touchstart.dropdown.data-api", d).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form",function (g) {
		g.stopPropagation()
	}).on("touchstart.dropdown.data-api", ".dropdown-menu",function (g) {
			g.stopPropagation()
		}).on("click.dropdown.data-api touchstart.dropdown.data-api", b, a.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", b + ", [role=menu]", a.prototype.keydown)
}(window.jQuery);
!function (c) {
	var b = function (e, d) {
		this.options = d;
		this.$element = c(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", c.proxy(this.hide, this));
		this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
	};
	b.prototype = {constructor: b, toggle: function () {
		return this[!this.isShown ? "show" : "hide"]()
	}, show: function () {
		var d = this, f = c.Event("show");
		this.$element.trigger(f);
		if (this.isShown || f.isDefaultPrevented()) {
			return
		}
		this.isShown = true;
		this.escape();
		this.backdrop(function () {
			var e = c.support.transition && d.$element.hasClass("fade");
			if (!d.$element.parent().length) {
				d.$element.appendTo(document.body)
			}
			d.$element.show();
			if (e) {
				d.$element[0].offsetWidth
			}
			d.$element.addClass("in").attr("aria-hidden", false);
			d.enforceFocus();
			e ? d.$element.one(c.support.transition.end, function () {
				d.$element.focus().trigger("shown")
			}) : d.$element.focus().trigger("shown")
		})
	}, hide: function (f) {
		f && f.preventDefault();
		var d = this;
		f = c.Event("hide");
		this.$element.trigger(f);
		if (!this.isShown || f.isDefaultPrevented()) {
			return
		}
		this.isShown = false;
		this.escape();
		c(document).off("focusin.modal");
		this.$element.removeClass("in").attr("aria-hidden", true);
		c.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
	}, enforceFocus: function () {
		var d = this;
		c(document).on("focusin.modal", function (f) {
			if (d.$element[0] !== f.target && !d.$element.has(f.target).length) {
				d.$element.focus()
			}
		})
	}, escape: function () {
		var d = this;
		if (this.isShown && this.options.keyboard) {
			this.$element.on("keyup.dismiss.modal", function (f) {
				f.which == 27 && d.hide()
			})
		} else {
			if (!this.isShown) {
				this.$element.off("keyup.dismiss.modal")
			}
		}
	}, hideWithTransition: function () {
		var d = this, e = setTimeout(function () {
			d.$element.off(c.support.transition.end);
			d.hideModal()
		}, 500);
		this.$element.one(c.support.transition.end, function () {
			clearTimeout(e);
			d.hideModal()
		})
	}, hideModal: function (d) {
		this.$element.hide().trigger("hidden");
		this.backdrop()
	}, removeBackdrop: function () {
		this.$backdrop.remove();
		this.$backdrop = null
	}, backdrop: function (g) {
		var f = this, e = this.$element.hasClass("fade") ? "fade" : "";
		if (this.isShown && this.options.backdrop) {
			var d = c.support.transition && e;
			this.$backdrop = c('<div class="modal-backdrop ' + e + '" />').appendTo(document.body);
			this.$backdrop.click(this.options.backdrop == "static" ? c.proxy(this.$element[0].focus, this.$element[0]) : c.proxy(this.hide, this));
			if (d) {
				this.$backdrop[0].offsetWidth
			}
			this.$backdrop.addClass("in");
			d ? this.$backdrop.one(c.support.transition.end, g) : g()
		} else {
			if (!this.isShown && this.$backdrop) {
				this.$backdrop.removeClass("in");
				c.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(c.support.transition.end, c.proxy(this.removeBackdrop, this)) : this.removeBackdrop()
			} else {
				if (g) {
					g()
				}
			}
		}
	}};
	var a = c.fn.modal;
	c.fn.modal = function (d) {
		return this.each(function () {
			var g = c(this), f = g.data("modal"), e = c.extend({}, c.fn.modal.defaults, g.data(), typeof d == "object" && d);
			if (!f) {
				g.data("modal", (f = new b(this, e)))
			}
			if (typeof d == "string") {
				f[d]()
			} else {
				if (e.show) {
					f.show()
				}
			}
		})
	};
	c.fn.modal.defaults = {backdrop: true, keyboard: true, show: true};
	c.fn.modal.Constructor = b;
	c.fn.modal.noConflict = function () {
		c.fn.modal = a;
		return this
	};
	c(document).on("click.modal.data-api", '[data-toggle="modal"]', function (i) {
		var h = c(this), f = h.attr("href"), d = c(h.attr("data-target") || (f && f.replace(/.*(?=#[^\s]+$)/, ""))), g = d.data("modal") ? "toggle" : c.extend({remote: !/#/.test(f) && f}, d.data(), h.data());
		i.preventDefault();
		d.modal(g).one("hide", function () {
			h.focus()
		})
	})
}(window.jQuery);
!function (c) {
	var b = function (e, d) {
		this.init("tooltip", e, d)
	};
	b.prototype = {constructor: b, init: function (g, f, e) {
		var h, d;
		this.type = g;
		this.$element = c(f);
		this.options = this.getOptions(e);
		this.enabled = true;
		if (this.options.trigger == "click") {
			this.$element.on("click." + this.type, this.options.selector, c.proxy(this.toggle, this))
		} else {
			if (this.options.trigger != "manual") {
				h = this.options.trigger == "hover" ? "mouseenter" : "focus";
				d = this.options.trigger == "hover" ? "mouseleave" : "blur";
				this.$element.on(h + "." + this.type, this.options.selector, c.proxy(this.enter, this));
				this.$element.on(d + "." + this.type, this.options.selector, c.proxy(this.leave, this))
			}
		}
		this.options.selector ? (this._options = c.extend({}, this.options, {trigger: "manual", selector: ""})) : this.fixTitle()
	}, getOptions: function (d) {
		d = c.extend({}, c.fn[this.type].defaults, d, this.$element.data());
		if (d.delay && typeof d.delay == "number") {
			d.delay = {show: d.delay, hide: d.delay}
		}
		return d
	}, enter: function (f) {
		var d = c(f.currentTarget)[this.type](this._options).data(this.type);
		if (!d.options.delay || !d.options.delay.show) {
			return d.show()
		}
		clearTimeout(this.timeout);
		d.hoverState = "in";
		this.timeout = setTimeout(function () {
			if (d.hoverState == "in") {
				d.show()
			}
		}, d.options.delay.show)
	}, leave: function (f) {
		var d = c(f.currentTarget)[this.type](this._options).data(this.type);
		if (this.timeout) {
			clearTimeout(this.timeout)
		}
		if (!d.options.delay || !d.options.delay.hide) {
			return d.hide()
		}
		d.hoverState = "out";
		this.timeout = setTimeout(function () {
			if (d.hoverState == "out") {
				d.hide()
			}
		}, d.options.delay.hide)
	}, show: function () {
		var h, d, j, f, i, e, g;
		if (this.hasContent() && this.enabled) {
			h = this.tip();
			this.setContent();
			if (this.options.animation) {
				h.addClass("fade")
			}
			e = typeof this.options.placement == "function" ? this.options.placement.call(this, h[0], this.$element[0]) : this.options.placement;
			d = /in/.test(e);
			h.detach().css({top: 0, left: 0, display: "block"}).insertAfter(this.$element);
			j = this.getPosition(d);
			f = h[0].offsetWidth;
			i = h[0].offsetHeight;
			switch (d ? e.split(" ")[1] : e) {
				case"bottom":
					g = {top: j.top + j.height, left: j.left + j.width / 2 - f / 2};
					break;
				case"top":
					g = {top: j.top - i, left: j.left + j.width / 2 - f / 2};
					break;
				case"left":
					g = {top: j.top + j.height / 2 - i / 2, left: j.left - f};
					break;
				case"right":
					g = {top: j.top + j.height / 2 - i / 2, left: j.left + j.width};
					break
			}
			h.offset(g).addClass(e).addClass("in")
		}
	}, setContent: function () {
		var e = this.tip(), d = this.getTitle();
		e.find(".tooltip-inner")[this.options.html ? "html" : "text"](d);
		e.removeClass("fade in top bottom left right")
	}, hide: function () {
		var d = this, e = this.tip();
		e.removeClass("in");
		function f() {
			var g = setTimeout(function () {
				e.off(c.support.transition.end).detach()
			}, 500);
			e.one(c.support.transition.end, function () {
				clearTimeout(g);
				e.detach()
			})
		}

		c.support.transition && this.$tip.hasClass("fade") ? f() : e.detach();
		return this
	}, fixTitle: function () {
		var d = this.$element;
		if (d.attr("title") || typeof(d.attr("data-original-title")) != "string") {
			d.attr("data-original-title", d.attr("title") || "").removeAttr("title")
		}
	}, hasContent: function () {
		return this.getTitle()
	}, getPosition: function (d) {
		return c.extend({}, (d ? {top: 0, left: 0} : this.$element.offset()), {width: this.$element[0].offsetWidth, height: this.$element[0].offsetHeight})
	}, getTitle: function () {
		var f, d = this.$element, e = this.options;
		f = d.attr("data-original-title") || (typeof e.title == "function" ? e.title.call(d[0]) : e.title);
		return f
	}, tip: function () {
		return this.$tip = this.$tip || c(this.options.template)
	}, validate: function () {
		if (!this.$element[0].parentNode) {
			this.hide();
			this.$element = null;
			this.options = null
		}
	}, enable: function () {
		this.enabled = true
	}, disable: function () {
		this.enabled = false
	}, toggleEnabled: function () {
		this.enabled = !this.enabled
	}, toggle: function (f) {
		var d = c(f.currentTarget)[this.type](this._options).data(this.type);
		d[d.tip().hasClass("in") ? "hide" : "show"]()
	}, destroy: function () {
		this.hide().$element.off("." + this.type).removeData(this.type)
	}};
	var a = c.fn.tooltip;
	c.fn.tooltip = function (d) {
		return this.each(function () {
			var g = c(this), f = g.data("tooltip"), e = typeof d == "object" && d;
			if (!f) {
				g.data("tooltip", (f = new b(this, e)))
			}
			if (typeof d == "string") {
				f[d]()
			}
		})
	};
	c.fn.tooltip.Constructor = b;
	c.fn.tooltip.defaults = {animation: true, placement: "top", selector: false, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover", title: "", delay: 0, html: false};
	c.fn.tooltip.noConflict = function () {
		c.fn.tooltip = a;
		return this
	}
}(window.jQuery);
!function (c) {
	var b = function (e, d) {
		this.init("popover", e, d)
	};
	b.prototype = c.extend({}, c.fn.tooltip.Constructor.prototype, {constructor: b, setContent: function () {
		var f = this.tip(), e = this.getTitle(), d = this.getContent();
		f.find(".popover-title")[this.options.html ? "html" : "text"](e);
		f.find(".popover-content")[this.options.html ? "html" : "text"](d);
		f.removeClass("fade top bottom left right in")
	}, hasContent: function () {
		return this.getTitle() || this.getContent()
	}, getContent: function () {
		var e, d = this.$element, f = this.options;
		e = d.attr("data-content") || (typeof f.content == "function" ? f.content.call(d[0]) : f.content);
		return e
	}, tip: function () {
		if (!this.$tip) {
			this.$tip = c(this.options.template)
		}
		return this.$tip
	}, destroy: function () {
		this.hide().$element.off("." + this.type).removeData(this.type)
	}});
	var a = c.fn.popover;
	c.fn.popover = function (d) {
		return this.each(function () {
			var g = c(this), f = g.data("popover"), e = typeof d == "object" && d;
			if (!f) {
				g.data("popover", (f = new b(this, e)))
			}
			if (typeof d == "string") {
				f[d]()
			}
		})
	};
	c.fn.popover.Constructor = b;
	c.fn.popover.defaults = c.extend({}, c.fn.tooltip.defaults, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'});
	c.fn.popover.noConflict = function () {
		c.fn.popover = a;
		return this
	}
}(window.jQuery);
!function (c) {
	function b(g, f) {
		var h = c.proxy(this.process, this), d = c(g).is("body") ? c(window) : c(g), e;
		this.options = c.extend({}, c.fn.scrollspy.defaults, f);
		this.$scrollElement = d.on("scroll.scroll-spy.data-api", h);
		this.selector = (this.options.target || ((e = c(g).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "")) || "") + " .nav li > a";
		this.$body = c("body");
		this.refresh();
		this.process()
	}

	b.prototype = {constructor: b, refresh: function () {
		var d = this, e;
		this.offsets = c([]);
		this.targets = c([]);
		e = this.$body.find(this.selector).map(function () {
			var g = c(this), f = g.data("target") || g.attr("href"), h = /^#\w/.test(f) && c(f);
			return(h && h.length && [
				[h.position().top + d.$scrollElement.scrollTop(), f]
			]) || null
		}).sort(function (g, f) {
				return g[0] - f[0]
			}).each(function () {
				d.offsets.push(this[0]);
				d.targets.push(this[1])
			})
	}, process: function () {
		var j = this.$scrollElement.scrollTop() + this.options.offset, f = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, h = f - this.$scrollElement.height(), g = this.offsets, d = this.targets, k = this.activeTarget, e;
		if (j >= h) {
			return k != (e = d.last()[0]) && this.activate(e)
		}
		for (e = g.length; e--;) {
			k != d[e] && j >= g[e] && (!g[e + 1] || j <= g[e + 1]) && this.activate(d[e])
		}
	}, activate: function (f) {
		var e, d;
		this.activeTarget = f;
		c(this.selector).parent(".active").removeClass("active");
		d = this.selector + '[data-target="' + f + '"],' + this.selector + '[href="' + f + '"]';
		e = c(d).parent("li").addClass("active");
		if (e.parent(".dropdown-menu").length) {
			e = e.closest("li.dropdown").addClass("active")
		}
		e.trigger("activate")
	}};
	var a = c.fn.scrollspy;
	c.fn.scrollspy = function (d) {
		return this.each(function () {
			var g = c(this), f = g.data("scrollspy"), e = typeof d == "object" && d;
			if (!f) {
				g.data("scrollspy", (f = new b(this, e)))
			}
			if (typeof d == "string") {
				f[d]()
			}
		})
	};
	c.fn.scrollspy.Constructor = b;
	c.fn.scrollspy.defaults = {offset: 10};
	c.fn.scrollspy.noConflict = function () {
		c.fn.scrollspy = a;
		return this
	};
	c(window).on("load", function () {
		c('[data-spy="scroll"]').each(function () {
			var d = c(this);
			d.scrollspy(d.data())
		})
	})
}(window.jQuery);
!function (c) {
	var b = function (d) {
		this.element = c(d)
	};
	b.prototype = {constructor: b, show: function () {
		var j = this.element, g = j.closest("ul:not(.dropdown-menu)"), f = j.attr("data-target"), h, d, i;
		if (!f) {
			f = j.attr("href");
			f = f && f.replace(/.*(?=#[^\s]*$)/, "")
		}
		if (j.parent("li").hasClass("active")) {
			return
		}
		h = g.find(".active:last a")[0];
		i = c.Event("show", {relatedTarget: h});
		j.trigger(i);
		if (i.isDefaultPrevented()) {
			return
		}
		d = c(f);
		this.activate(j.parent("li"), g);
		this.activate(d, d.parent(), function () {
			j.trigger({type: "shown", relatedTarget: h})
		})
	}, activate: function (f, e, i) {
		var d = e.find("> .active"), h = i && c.support.transition && d.hasClass("fade");

		function g() {
			d.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");
			f.addClass("active");
			if (h) {
				f[0].offsetWidth;
				f.addClass("in")
			} else {
				f.removeClass("fade")
			}
			if (f.parent(".dropdown-menu")) {
				f.closest("li.dropdown").addClass("active")
			}
			i && i()
		}

		h ? d.one(c.support.transition.end, g) : g();
		d.removeClass("in")
	}};
	var a = c.fn.tab;
	c.fn.tab = function (d) {
		return this.each(function () {
			var f = c(this), e = f.data("tab");
			if (!e) {
				f.data("tab", (e = new b(this)))
			}
			if (typeof d == "string") {
				e[d]()
			}
		})
	};
	c.fn.tab.Constructor = b;
	c.fn.tab.noConflict = function () {
		c.fn.tab = a;
		return this
	};
	c(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (d) {
		d.preventDefault();
		c(this).tab("show")
	})
}(window.jQuery);
!function (b) {
	var c = function (e, d) {
		this.$element = b(e);
		this.options = b.extend({}, b.fn.typeahead.defaults, d);
		this.matcher = this.options.matcher || this.matcher;
		this.sorter = this.options.sorter || this.sorter;
		this.highlighter = this.options.highlighter || this.highlighter;
		this.updater = this.options.updater || this.updater;
		this.source = this.options.source;
		this.$menu = b(this.options.menu);
		this.shown = false;
		this.listen()
	};
	c.prototype = {constructor: c, select: function () {
		var d = this.$menu.find(".active").attr("data-value");
		this.$element.val(this.updater(d)).change();
		return this.hide()
	}, updater: function (d) {
		return d
	}, show: function () {
		var d = b.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
		this.$menu.insertAfter(this.$element).css({top: d.top + d.height, left: d.left}).show();
		this.shown = true;
		return this
	}, hide: function () {
		this.$menu.hide();
		this.shown = false;
		return this
	}, lookup: function (e) {
		var d;
		this.query = this.$element.val();
		if (!this.query || this.query.length < this.options.minLength) {
			return this.shown ? this.hide() : this
		}
		d = b.isFunction(this.source) ? this.source(this.query, b.proxy(this.process, this)) : this.source;
		return d ? this.process(d) : this
	}, process: function (d) {
		var e = this;
		d = b.grep(d, function (f) {
			return e.matcher(f)
		});
		d = this.sorter(d);
		if (!d.length) {
			return this.shown ? this.hide() : this
		}
		return this.render(d.slice(0, this.options.items)).show()
	}, matcher: function (d) {
		return ~d.toLowerCase().indexOf(this.query.toLowerCase())
	}, sorter: function (f) {
		var g = [], e = [], d = [], h;
		while (h = f.shift()) {
			if (!h.toLowerCase().indexOf(this.query.toLowerCase())) {
				g.push(h)
			} else {
				if (~h.indexOf(this.query)) {
					e.push(h)
				} else {
					d.push(h)
				}
			}
		}
		return g.concat(e, d)
	}, highlighter: function (d) {
		var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
		return d.replace(new RegExp("(" + e + ")", "ig"), function (f, g) {
			return"<strong>" + g + "</strong>"
		})
	}, render: function (d) {
		var e = this;
		d = b(d).map(function (f, g) {
			f = b(e.options.item).attr("data-value", g);
			f.find("a").html(e.highlighter(g));
			return f[0]
		});
		d.first().addClass("active");
		this.$menu.html(d);
		return this
	}, next: function (e) {
		var f = this.$menu.find(".active").removeClass("active"), d = f.next();
		if (!d.length) {
			d = b(this.$menu.find("li")[0])
		}
		d.addClass("active")
	}, prev: function (e) {
		var f = this.$menu.find(".active").removeClass("active"), d = f.prev();
		if (!d.length) {
			d = this.$menu.find("li").last()
		}
		d.addClass("active")
	}, listen: function () {
		this.$element.on("blur", b.proxy(this.blur, this)).on("keypress", b.proxy(this.keypress, this)).on("keyup", b.proxy(this.keyup, this));
		if (this.eventSupported("keydown")) {
			this.$element.on("keydown", b.proxy(this.keydown, this))
		}
		this.$menu.on("click", b.proxy(this.click, this)).on("mouseenter", "li", b.proxy(this.mouseenter, this))
	}, eventSupported: function (d) {
		var e = d in this.$element;
		if (!e) {
			this.$element.setAttribute(d, "return;");
			e = typeof this.$element[d] === "function"
		}
		return e
	}, move: function (d) {
		if (!this.shown) {
			return
		}
		switch (d.keyCode) {
			case 9:
			case 13:
			case 27:
				d.preventDefault();
				break;
			case 38:
				d.preventDefault();
				this.prev();
				break;
			case 40:
				d.preventDefault();
				this.next();
				break
		}
		d.stopPropagation()
	}, keydown: function (d) {
		this.suppressKeyPressRepeat = ~b.inArray(d.keyCode, [40, 38, 9, 13, 27]);
		this.move(d)
	}, keypress: function (d) {
		if (this.suppressKeyPressRepeat) {
			return
		}
		this.move(d)
	}, keyup: function (d) {
		switch (d.keyCode) {
			case 40:
			case 38:
			case 16:
			case 17:
			case 18:
				break;
			case 9:
			case 13:
				if (!this.shown) {
					return
				}
				this.select();
				break;
			case 27:
				if (!this.shown) {
					return
				}
				this.hide();
				break;
			default:
				this.lookup()
		}
		d.stopPropagation();
		d.preventDefault()
	}, blur: function (f) {
		var d = this;
		setTimeout(function () {
			d.hide()
		}, 150)
	}, click: function (d) {
		d.stopPropagation();
		d.preventDefault();
		this.select()
	}, mouseenter: function (d) {
		this.$menu.find(".active").removeClass("active");
		b(d.currentTarget).addClass("active")
	}};
	var a = b.fn.typeahead;
	b.fn.typeahead = function (d) {
		return this.each(function () {
			var g = b(this), f = g.data("typeahead"), e = typeof d == "object" && d;
			if (!f) {
				g.data("typeahead", (f = new c(this, e)))
			}
			if (typeof d == "string") {
				f[d]()
			}
		})
	};
	b.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1};
	b.fn.typeahead.Constructor = c;
	b.fn.typeahead.noConflict = function () {
		b.fn.typeahead = a;
		return this
	};
	b(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (f) {
		var d = b(this);
		if (d.data("typeahead")) {
			return
		}
		f.preventDefault();
		d.typeahead(d.data())
	})
}(window.jQuery);
!function (c) {
	var b = function (e, d) {
		this.options = c.extend({}, c.fn.affix.defaults, d);
		this.$window = c(window).on("scroll.affix.data-api", c.proxy(this.checkPosition, this)).on("click.affix.data-api", c.proxy(function () {
			setTimeout(c.proxy(this.checkPosition, this), 1)
		}, this));
		this.$element = c(e);
		this.checkPosition()
	};
	b.prototype.checkPosition = function () {
		if (!this.$element.is(":visible")) {
			return
		}
		var h = c(document).height(), j = this.$window.scrollTop(), d = this.$element.offset(), k = this.options.offset, f = k.bottom, g = k.top, i = "affix affix-top affix-bottom", e;
		if (typeof k != "object") {
			f = g = k
		}
		if (typeof g == "function") {
			g = k.top()
		}
		if (typeof f == "function") {
			f = k.bottom()
		}
		e = this.unpin != null && (j + this.unpin <= d.top) ? false : f != null && (d.top + this.$element.height() >= h - f) ? "bottom" : g != null && j <= g ? "top" : false;
		if (this.affixed === e) {
			return
		}
		this.affixed = e;
		this.unpin = e == "bottom" ? d.top - j : null;
		this.$element.removeClass(i).addClass("affix" + (e ? "-" + e : ""))
	};
	var a = c.fn.affix;
	c.fn.affix = function (d) {
		return this.each(function () {
			var g = c(this), f = g.data("affix"), e = typeof d == "object" && d;
			if (!f) {
				g.data("affix", (f = new b(this, e)))
			}
			if (typeof d == "string") {
				f[d]()
			}
		})
	};
	c.fn.affix.Constructor = b;
	c.fn.affix.defaults = {offset: 0};
	c.fn.affix.noConflict = function () {
		c.fn.affix = a;
		return this
	};
	c(window).on("load", function () {
		c('[data-spy="affix"]').each(function () {
			var e = c(this), d = e.data();
			d.offset = d.offset || {};
			d.offsetBottom && (d.offset.bottom = d.offsetBottom);
			d.offsetTop && (d.offset.top = d.offsetTop);
			e.affix(d)
		})
	})
}(window.jQuery);

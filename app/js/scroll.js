(function(e) {
    typeof define == "function" && define.amd ? define(["jquery"], e) : typeof exports == "object" ? module.exports = e(require("jquery")) : e(jQuery)
})(function($) {
    "use strict";
    var name = "tinyscrollbar";
    $.fn[name] = function(r) {
        return this.each(function() {
            $.data(this, "plugin_" + name) || $.data(this, "pluginame_" + name, new t($(this), r))
        })
    }

    function t(t, i) {
        this._default = {
            axis: "y",
            wheel: !0,
            wheelSpeed: 40,
            wheelLock: !0,
            touchLock: !0,
            trackSize: !1,
            thumbSize: !1,
            thumbSizeMin: 20
        };

        this.options = $.extend({}, this._default, i);
        this._name = name; //扩展的方法名

        var d = this,
            v = t.find(".viewport"),
            m = t.find(".overview"),
            g = t.find(".scrollbar"),
            y = g.find(".track"),
            b = g.find(".thumb"),
            bd = g.find(".thumb-bd"),
            hd = g.find(".thumb-hd"),
            w = "ontouchstart" in document.documentElement,
            E = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll",
            S = this.options.axis === "x",
            x = S ? "width" : "height",
            T = S ? "left" : "top",
            N = 0;
        this.contentPosition = 0;
        this.viewportSize = 0;
        this.contentSize = 0;
        this.contentRatio = 0;
        this.trackSize = 0;
        this.trackRatio = 0;
        this.thumbSize = 0;
        this.thumbPosition = 0;
        this.hasContentToSroll = !1;
        this.update = function(e) {
            var $w = $(window).width(),
                $h = $(window).height();
            var aaa=t.height();
            // console.log(aaa);
            t.css({
                width: $w + "px"
            });
            v.css({
                height: $h + "px"
            });
            var tt = x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
            this.viewportSize = v[0]["offset" + tt];
            this.contentSize = m[0]["scroll" + tt];
            this.contentRatio = this.viewportSize / this.contentSize;
            this.trackSize = this.options.trackSize || this.viewportSize;
            this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, this.options.thumbSize || this.trackSize * this.contentRatio));
            this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize);
            this.hasContentToSroll = this.contentRatio < 1;
            g.toggleClass("disable", !this.hasContentToSroll);
            switch (e) {
                case "bottom":
                    this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
                    break;
                case "relative":
                    this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                    break;
                default:
                    // this.contentPosition = parseInt(e, 10) || 0
                    this.contentPosition = Math.min(this.contentSize - this.viewportSize < 0 ? 0 : this.contentSize - this.viewportSize, Math.max(0, Math.abs(parseInt(m.css("top")))));
            }
            this.thumbPosition = this.contentPosition / this.trackRatio;
            o() //设置css样式
        };
        init();


        // 初始化函数 
        function init() {
            d.update(); //参数
            u(); //事件绑定 
        }
        //设置css样式
        function o() {
            b.css(T, d.thumbPosition);

            m.css(T, -d.contentPosition);
            g.css(x, d.trackSize);
            y.css(x, d.trackSize);
            b.css(x, d.thumbSize);
            bd.css(x, b.height() - 2 * hd.height() + "px");
        }
        // 事件绑定函数
        function u() {
            if (w) { //通过touch事件判断设备，如果是手机执行下面
                v[0].ontouchstart = function(e) {
                    1 === e.touches.length && (e.stopPropagation(), l(e.touches[0]))
                }
            } else {
                b.bind("mousedown", function(e) { //滑块绑定鼠标事件
                    e.stopPropagation();
                    l(e)
                });
                y.bind("mousedown", function(e) {
                    l(e, !0)
                });
                b.bind("mouseover", function() {
                    $(this).addClass("thumb-bd-hover")
                });
                b.bind("mouseleave", function() {
                    $(this).removeClass("thumb-bd-hover")
                });
                scrollxz(); //禁止选择文本
            }
            // 监听窗体size事件
            $(window).resize(function() {
                d.update("relative");
            });
            // 监听滚轮事件
            if (d.options.wheel && window.addEventListener) {
                t.off("mousewheel");
                t.on("mousewheel", function() {
                    c()
                });
            } else {
                d.options.wheel && (t[0].onmousewheel = c)
            }
        }
        // 只适用于手机设备上的事件
        function a() {
            return d.contentPosition > 0
        }

        function f() {
            return d.contentPosition <= d.contentSize - d.viewportSize - 5
        }

        // 滑块事件
        function l(t, n) {
            if (d.hasContentToSroll) {
                $("body").addClass("noSelect");
                N = n ? b.offset()[T] : S ? t.pageX : t.pageY;
                if (w) { //通过touch判断设备
                    document.ontouchmove = function(e) {
                        (d.options.touchLock || a() && f()) && e.preventDefault(), h(e.touches[0])
                    };
                    document.ontouchend = p
                } else {
                    $(document).bind("mousemove", h);
                    $(document).bind("mouseup", p);
                    b.bind("mouseup", p);
                    y.bind("mouseup", p)
                }
                h(t)
            }
        }

        // 滚轮事件
        function c(n) {
            if (d.hasContentToSroll) {
                var r = n || window.event,
                    i = -(r.deltaY || r.detail || -1 / 3 * r.wheelDelta) / 40,
                    s = r.deltaMode === 1 ? d.options.wheelSpeed : 1;
                d.contentPosition -= i * s * d.options.wheelSpeed;
                d.contentPosition = Math.min(d.contentSize - d.viewportSize, Math.max(0, d.contentPosition));
                d.thumbPosition = d.contentPosition / d.trackRatio, t.trigger("move");
                b.css(T, d.thumbPosition);
                m.css(T, -d.contentPosition);
                // console.log(d.contentSize);
                if (d.options.wheelLock || a() && f()) r = $.event.fix(r), r.preventDefault()
            }
        }

        // 滑块拖动事件
        function h(e) {
            if (d.hasContentToSroll) {
                var n = S ? e.pageX : e.pageY,
                    r = w ? N - n : n - N,
                    i = Math.min(d.trackSize - d.thumbSize, Math.max(0, d.thumbPosition + r));
                d.contentPosition = i * d.trackRatio;
                t.trigger("move");
                b.css(T, i);
                m.css(T, -d.contentPosition)
            }
        }
        //手机停止拖动滑块事件
        function p() {
            d.thumbPosition = parseInt(b.css(T), 10) || 0, $("body").removeClass("noSelect"), $(document).unbind("mousemove", h), $(document).unbind("mouseup", p), b.unbind("mouseup", p), y.unbind("mouseup", p), document.ontouchmove = document.ontouchend = null
        }
        // 禁止拖动滑块的时候选择文本
        function scrollxz() {
            var thumb = document.getElementById('thumb');
            thumb.onmousedown = function(ev) {
                var oEvent = ev || event;
                if (thumb.setCapture) {
                    thumb.onmouseup = mouseup;
                    thumb.setCapture(); //事件捕获
                }
                return false;
            }

            function mouseup() {
                this.onmousemove = null;
                this.onmouseup = null;
                if (thumb.releaseCapture) {
                    thumb.releaseCapture(); //释放事件捕捉
                }
            }
        }

    }

});

$(function() {
    function resize() {
        $("#scrollbar-wrapper").tinyscrollbar();
        // console.log(1);
    }
    resize();
    $(window).on("resize", function() {
        resize()
    })
})

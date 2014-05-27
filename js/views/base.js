define([
    'jquery',
    'underscore',
    'backbone'

], function ($, _, Backbone) {
    'use strict';

    var BaseView = Backbone.View.extend({


        config: function(id) {
            var page = "page"+id,
                me = this,
                pageconfig;

            me.options.pages = {

                page1: {
                    delay: 500,
                    top: 50,
                    topin: 2000,
                    topout: 2000
                },
                page2: {
                    top: 50,
                    topin: 2000,
                    topout: 2000
                }
            };

            pageconfig = me.options.pages[page];
            if (!pageconfig) {
                pageconfig = me.options.pages["page"+2];
            }
            return pageconfig;
        },

        initialize: function (options) {
            var me = this;
            me.options = (options || {});
            me.options.self = me.config(me.options.id);
        },

        render: function (options) {
            var me = this,
                callback = options.callback;

            function _renderCounter() {
                var counters = $(".counter .text");
                if (counters) {
                    counters.each(function() {
                        debugger;
                        var compile = _.template("<%= counter %>");
                        $(this).html(compile({counter:me.options.id}));
                    });
                }
            }

            function _callback() {
                _renderCounter();
                me.$el.html(me.template({counter: me.options.id}));
            }

            me.options.status = options.status;
            me.options.direction = options.direction;

            if (!me.options.status) {
                this.transitionIn(function () {
                    _callback();
                }, callback);
            } else {
                this.transitionOut(function () {
                    _callback();
                }, callback);
            }


            return this;
        },

        transitionIn: function (writecallback, callback) {

            var top,
                me = this,
                topin;

            this.$el.css("opacity", "0");

            if (writecallback) {
                writecallback.call(this);
            }

            topin = (me.options.direction === 0 ? ((-1)*(me.options.self.topin)) : me.options.self.topin);
            this.$el.css("top", topin );
            this.$el.css("opacity", "1");

            top = me.options.self.top;
            this.$el.animate({
                top: top

            }, me.options.delay, function () {
                // Animation complete.
                if (callback) {
                    callback.call(me);
                }
            });
        },

        transitionOut: function (writecallback, callback) {

            var top,
                me = this;


            if (writecallback) {
                writecallback.call(this);
            }

            top = (me.options.direction === 1 ? ((-1)*(me.options.self.topout)) : me.options.self.topout);

            this.$el.animate({
                top: top

            }, me.options.delay, function () {
                // Animation complete.
                if (callback) {
                    callback.call(me);
                }
            });

        }

    });

    return BaseView;
});

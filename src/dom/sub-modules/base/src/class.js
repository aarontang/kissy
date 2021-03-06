/**
 * @ignore
 * @fileOverview dom-class
 * @author lifesinger@gmail.com, yiminghe@gmail.com
 */
KISSY.add('dom/base/class', function (S, DOM, undefined) {

    var SPACE = ' ',
        NodeType = DOM.NodeType,
        RE_SPLIT = /[\.\s]\s*\.?/,
        RE_CLASS = /[\n\t]/g;

    function norm(elemClass) {
        return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
    }

    S.mix(DOM,

        /**
         * @override KISSY.DOM
         * @class
         * @singleton
         */
        {
            /**
             * Determine whether any of the matched elements are assigned the given classes.
             * @param {HTMLElement|String|HTMLElement[]} selector matched elements
             * @param {String} className One or more class names to search for.
             * multiple class names is separated by space
             * @return {Boolean}
             */
            hasClass: function (selector, className) {
                return batch(selector, className, function (elem, classNames, cl) {
                    var elemClass = elem.className,
                        className,
                        j,
                        ret;
                    if (elemClass) {
                        className = norm(elemClass);
                        j = 0;
                        ret = true;
                        for (; j < cl; j++) {
                            if (className.indexOf(SPACE + classNames[j] + SPACE) < 0) {
                                ret = false;
                                break;
                            }
                        }
                        if (ret) {
                            return true;
                        }
                    }
                }, true);
            },

            /**
             * Adds the specified class(es) to each of the set of matched elements.
             * @param {HTMLElement|String|HTMLElement[]} selector matched elements
             * @param {String} className One or more class names to be added to the class attribute of each matched element.
             * multiple class names is separated by space
             */
            addClass: function (selector, className) {
                batch(selector, className, function (elem, classNames, cl) {
                    var elemClass = elem.className,
                        normClassName,
                        setClass,
                        j;
                    if (!elemClass) {
                        elem.className = className;
                    } else {
                        normClassName = norm(elemClass);
                        setClass = elemClass;
                        j = 0;
                        for (; j < cl; j++) {
                            if (normClassName.indexOf(SPACE + classNames[j] + SPACE) < 0) {
                                setClass += SPACE + classNames[j];
                            }
                        }
                        elem.className = S.trim(setClass);
                    }
                }, undefined);
            },

            /**
             * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
             * @param {HTMLElement|String|HTMLElement[]} selector matched elements
             * @param {String} className One or more class names to be removed from the class attribute of each matched element.
             * multiple class names is separated by space
             */
            removeClass: function (selector, className) {
                batch(selector, className, function (elem, classNames, cl) {
                    var elemClass = elem.className,
                        className,
                        j,
                        needle;
                    if (elemClass) {
                        if (!cl) {
                            elem.className = '';
                        } else {
                            className = norm(elemClass);
                            j = 0;
                            for (; j < cl; j++) {
                                needle = SPACE + classNames[j] + SPACE;
                                // 一个 cls 有可能多次出现：'link link2 link link3 link'
                                while (className.indexOf(needle) >= 0) {
                                    className = className.replace(needle, SPACE);
                                }
                            }
                            elem.className = S.trim(className);
                        }
                    }
                }, undefined);
            },

            /**
             * Replace a class with another class for matched elements.
             * If no oldClassName is present, the newClassName is simply added.
             * @param {HTMLElement|String|HTMLElement[]} selector matched elements
             * @param {String} oldClassName One or more class names to be removed from the class attribute of each matched element.
             * multiple class names is separated by space
             * @param {String} newClassName One or more class names to be added to the class attribute of each matched element.
             * multiple class names is separated by space
             */
            replaceClass: function (selector, oldClassName, newClassName) {
                DOM.removeClass(selector, oldClassName);
                DOM.addClass(selector, newClassName);
            },

            /**
             * Add or remove one or more classes from each element in the set of
             * matched elements, depending on either the class's presence or the
             * value of the switch argument.
             * @param {HTMLElement|String|HTMLElement[]} selector matched elements
             * @param {String} className One or more class names to be added to the class attribute of each matched element.
             * multiple class names is separated by space
             * @param [state] {Boolean} optional boolean to indicate whether class
             *        should be added or removed regardless of current state.
             */
            toggleClass: function (selector, className, state) {
                var isBool = S.isBoolean(state), has, j;
                batch(selector, className, function (elem, classNames, cl) {
                    for (j=0; j < cl; j++) {
                        className = classNames[j];
                        has = isBool ? !state : DOM.hasClass(elem, className);
                        DOM[has ? 'removeClass' : 'addClass'](elem, className);
                    }
                }, undefined);
            }
        });

    function batch(selector, value, fn, resultIsBool) {
        if (!(value = S.trim(value))) {
            return resultIsBool ? false : undefined;
        }

        var elems = DOM.query(selector),
            len = elems.length,
            tmp = value.split(RE_SPLIT),
            elem,
            ret,
            classNames = [],
            t,
            i;
        for (i = 0; i < tmp.length; i++) {
            t = S.trim(tmp[i]);
            if (t) {
                classNames.push(t);
            }
        }
        for (i = 0; i < len; i++) {
            elem = elems[i];
            if (elem.nodeType == NodeType.ELEMENT_NODE) {
                ret = fn(elem, classNames, classNames.length);
                if (ret !== undefined) {
                    return ret;
                }
            }
        }

        if (resultIsBool) {
            return false;
        }
        return undefined;
    }

    return DOM;
}, {
    requires: ['./api']
});

/*
 NOTES:
 - hasClass/addClass/removeClass 的逻辑和 jQuery 保持一致
 - toggleClass 不支持 value 为 undefined 的情形（jQuery 支持）
 */

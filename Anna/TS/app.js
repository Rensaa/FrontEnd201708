"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Helper;
(function (Helper) {
    console.log('helper.ts');
    Helper.getHTMLTemplate = function (file) {
        var templateHTML = 'fail';
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            // tslint:disable-next-line:prefer-function-over-method
            if (this.readyState === 4 && this.status === 200) {
                // tslint:disable-next-line:prefer-function-over-method
                templateHTML = this.responseText;
            }
        };
        xmlHttp.open('GET', file, false);
        xmlHttp.send();
        return templateHTML;
    };
    Helper.parseHTMLString = function (target, mustache, content) {
        return target.replace(mustache, content);
    };
})(Helper || (Helper = {}));
console.log('page.ts');
/**
 * Page
 */
var Page = (function () {
    function Page() {
        // Tyhi
    }
    // tslint:disable-next-line:prefer-function-over-method
    Page.prototype._cacheDOM = function () {
        // Tyhi
    };
    // tslint:disable-next-line:prefer-function-over-method
    Page.prototype._bindEvents = function () {
        // Tyhi
    };
    // tslint:disable-next-line:prefer-function-over-method
    Page.prototype._render = function () {
        // Tyhi
    };
    return Page;
}());
/// <reference path='helper.ts' />
/// <reference path='page.ts' />
console.log('home.ts');
var Home = (function (_super) {
    __extends(Home, _super);
    function Home(parameters) {
        var _this = _super.call(this) || this;
        _this._cacheDOM();
        _this._bindEvents();
        _this._render();
        return _this;
    }
    Home.prototype._cacheDOM = function () {
        this._template = Helper.getHTMLTemplate("templates/home-template.html");
        this._homeModule = document.querySelector('main');
        this._homeModule = this._template;
        this._homeModule = document.getElementById('home');
        this._button = this._homeModule.querySelector('#refresh');
        this._list = this._homeModule.querySelector('#restOutput');
        this._refresh();
    };
    Home.prototype._bindEvents = function () {
        this._button.addEventListener('click', this._refresh.bind(this));
    };
    Home.prototype._render = function () {
        this._list.innerHTML = "Id: " + this._restJSON.id + " Sisu: " + this._restJSON.content;
    };
    Home.prototype._refresh = function () {
        var restAnswer = Helper.getHTMLTemplate('http://rest-service.guides.spring.io/greeting');
        this._restJSON = JSON.parse(restAnswer);
        this._render();
    };
    return Home;
}(Page));
/// <reference path='helper.ts' />
console.log('navigation.ts');
var Navigation = (function () {
    function Navigation(navs) {
        this._navs = navs;
        this._cacheDOM();
        this._bindEvents();
        this._render();
    }
    Navigation.prototype._cacheDOM = function () {
        this._template = Helper.getHTMLTemplate('templates/home-template.html');
        this._navModule = document.qetElementById('mainMenu');
        this._navModule.outerHTML = this._template;
        this._navModule = document.getElementById('mainMenu');
        this._microTemplate = this._navModule.querySelector('scrpit').innerText;
        this._list = this._navModule.getElementsByTagName('ul').item(0);
    };
    Navigation.prototype._bindEvents = function () {
        window.addEventListener('hashchange', this._urlChanged.bind(this));
    };
    Navigation.prototype._render = function () {
        var navLinks = '';
        this._navs.forEach(value, INavLInk);
        {
            var parsePass1 = Helper.parseHTMLString(this._microTemplate, '{{name}}', value.name);
            var parsePass2 = Helper.parseHTMLString(parsePass1, '{{link}}', value.link);
            var setActive = (window.location.hash === value.link) ? 'active' : '';
            var parsePass3 = Helper.parseHTMLString(parsePass2, '{{active}}', setActive);
            navLinks += parsePass3;
        }
    };
    Navigation.prototype._urlChanged = function (e) {
        this._render();
    };
    return Navigation;
}());
/// <reference path='helper.ts'/>
/// <reference path='navigation.ts'/>
/// <reference path='home.ts'/>
console.log('main.ts');
var App = (function () {
    function App() {
        this._navLinks = INavLink[] = [{ name: 'Pealeht', link: '#home' }];
        this._bindEvents();
        this._setup();
    }
    App.prototype._bindEvents = function () {
        window.addEventListener('hashchange', this._urlChanged.bind(this));
    };
    App.prototype._setup = function () {
        if (window.location.hash === '') {
            window.location.hash = this._navLinks[0].link;
        }
        var nav = new Navigation(this._navLinks);
    };
    App.prototype._urlChanged = function () {
        var _this = this;
        this._navLinks.forEach(function (value) {
            if (window.location.hash === value.link) {
                if (value.link === _this._navLinks[0].link) {
                    _this.page = new Home();
                }
            }
        });
    };
    return App;
}());
var app = new App();
//# sourceMappingURL=app.js.map
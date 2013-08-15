﻿/// <reference path="cryptojs-sha1.js" />
/// <reference path="class.js" />
/// <reference path="jquery-2.0.2.js" />
/// <reference path="http-requester.js" />

var persisters = (function () {
    var nickname = localStorage.getItem("nickname");
    var sessionKey = localStorage.getItem("sessionKey");

    function saveLoginData(data) {
        localStorage.setItem("nickname", data.nickname);
        localStorage.setItem("sessionKey", data.sessionKey);
        nickname = data.nickname;
        sessionKey = data.sessionKey;
    }

    function clearLoginData() {
        localStorage.removeItem("nickname");
        localStorage.removeItem("sessionKey");
        nickname = null;
        sessionKey = null;
    }

    var MainPersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl;
            this.user = new UserPersister(rootUrl);
            this.game = new GamePersister(rootUrl);
            this.battle = new BattlePersister(rootUrl);
            this.messages = new MessagesPersister(rootUrl);
        },
        getNickname: function () {
            return nickname;
        },
        hasLoggedInPlayer: function () {
            return nickname != null && sessionKey != null;
        }
    });

    var UserPersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "user/";
        },
        register: function (user, success, error) {
            var url = this.rootUrl + "register";
            var userData = {
                username: user.username,
                nickname: user.nickname,
                authCode: CryptoJS.SHA1(user.password + user.password).toString()
            }

            httpRequester.postJSON(url, userData, function (response) {
                saveLoginData(response);
                success(response);
            }, error);
        },
        login: function (user, success, error) {
            var url = this.rootUrl + "login";
            var userData = {
                username: user.username,
                authCode: CryptoJS.SHA1(user.password + user.password).toString()
            }

            httpRequester.postJSON(url, userData, function (response) {
                saveLoginData(response);
                success(response);
            }, error);
        },
        logout: function (success, error) {
            var url = this.rootUrl + "logout/" + sessionKey;
            httpRequester.getJSON(url, function (response) {
                clearLoginData();
                success(response);
            }, error);
        },
        scores: function (success, error) {
            var url = this.rootUrl + "scores/" + sessionKey;
            httpRequester.getJSON(url, success, error);
        }
    });

    var GamePersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "game/";
        },
        create: function (game, success, error) {
            var url = this.rootUrl + "create/" + sessionKey;
            var gameData = {
                title: game.title,
            }

            if (game.password) {
                gameData.password = CryptoJS.SHA1(game.password).toString();
            }

            httpRequester.postJSON(url, gameData, success, error);
        },
        join: function (game, success, error) {
            var url = this.rootUrl + "join/" + sessionKey;
            var gameData = {
                id: game.id,
            }

            if (game.password) {
                gameData.password = CryptoJS.SHA1(game.password).toString();
            }

            httpRequester.postJSON(url, gameData, success, error);
        },
        start: function (gameId, success, error) {
            var url = this.rootUrl + gameId + "/start/" + sessionKey;

            httpRequester.getJSON(url, success, error);
        },
        field: function (gameId, success, error) {
            var url = this.rootUrl + gameId + "/field/" + sessionKey;

            httpRequester.getJSON(url, success, error);
        },
        open: function (success, error) {
            var url = this.rootUrl + "open/" + sessionKey;

            httpRequester.getJSON(url, success, error);
        },
        myActive: function (success, error) {
            var url = this.rootUrl + "my-active/" + sessionKey;

            httpRequester.getJSON(url, success, error);
        },
    });

    var BattlePersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "battle/";
        },
        move: function (gameId, data, success, error) {
            var url = this.rootUrl + gameId + "/move/" + sessionKey;

            httpRequester.postJSON(url, data, success, error);
        },
        attack: function (gameId, data, success, error) {
            var url = this.rootUrl + gameId + "/attack/" + sessionKey;

            httpRequester.postJSON(url, data, success, error);
        },
        defend: function (gameId, unitId, success, error) {
            var url = this.rootUrl + gameId + "/defend/" + sessionKey;

            httpRequester.postJSON(url, unitId, success, error);
        }
    });

    var MessagesPersister = Class.create({
        init: function (rootUrl) {
            this.rootUrl = rootUrl + "messages/";
        },
        all: function (success, error) {
            var url = this.rootUrl + "all/" + sessionKey;

            httpRequester.getJSON(url, success, error);
        },
        unread: function (success, error) {
            var url = this.rootUrl + "unread/" + sessionKey;

            httpRequester.getJSON(url, success, error);
        }
    });

    return {
        get: function (rootUrl) {
            return new MainPersister(rootUrl);
        }
    }
}())

$(document).ready(function () {
    // Initialize the PubNub API connection.
    var pubnub = PUBNUB.init({
        publish_key: 'pub-c-a54c6b0d-ee2a-4161-a103-f781d15e590f',
        subscribe_key: 'sub-c-624a1f98-e270-11e2-8036-02ee2ddab7fe'

    });

    // Grab references for all of our elements.
    var messageContent = $('#messageContent'),
    sendMessageButton = $('#sendMessageButton'),
    messageList = $('#conversation');

    var currentUser = $("#sender_username").text();
    var receiverUser = $("#receiver_username").text();
    var chanelsArr = [currentUser, receiverUser];
    var showHistoryBtn = $("#showHistory"); // to do: add element with id="showHistory"
    var addChanel = $("#addChanel"); // to do: add element with id="addChanel"
    var removeChanel = $("#removeChanel"); // to do: add element with id="removeChanel"
    var closeAll = $("#closeAll"); // to do: add element with id="closeAll"
    var changeChatMate = $(".chatMate"); // to do: add element with class="chatMate"
    var isHistoryEnabled = false;

    showHistoryBtn.click(function (event) {
        if (event.currentTarget.checked) {
            isHistoryEnabled = true;

        }
        else {
            isHistoryEnabled = false;
        }
        pubnub.unsubscribe({
            channel: chanelsArr
        });
        messageList.html('');
        pubnub.subscribe({
            backfill: isHistoryEnabled,
            channel: chanelsArr,
            message: handleMessage,

        });

        return this;
    });

    addChanel.click(function (newChanel) {

        if (chanelsArr.indexOf(newChanel) >= 0) {
            chanelsArr.push(newChanel)
        }
        return this;
    });

    removeChanel.click(function (chanel) {
        var index = chanelsArr.indexOf(chanel);
        if (index >= 0) {
            chanelsArr[index] = chanelsArr[chanelsArr.length-1];
            chanelsArr.pop();

            pubnub.unsubscribe({
                channel: chanel 
            });
        }
        return this;
    });

    closeAll.click(function () {
        pubnub.unsubscribe({
            channel: chanelsArr
        });
        chanelsArr = [];
    });


    changeChatMate.click(function (event) {
        pubnub.unsubscribe({
            channel: chanelsArr
        });

        var newUser = event.currentTarget.id;
        $("#receiver_username").text(newUser);
        receiverUser = newUser;
        chanelsArr = [currentUser, receiverUser];
        messageList.html('');
        pubnub.subscribe({
            backfill: isHistoryEnabled,
            channel: chanelsArr,
            message: handleMessage,

        });
    });

    // Handles all the messages coming in from pubnub.subscribe.
    function handleMessage(message) {
        
        var messageEl = '';
        if (message.username === currentUser) {
            messageEl = $("<li class='text sent'>"
                          + "<div class='reflect'></div><p><strong>"
                          + "<a class='username' href='#'>" + message.username + "</a> said: "
                          + "</strong>"
                          + message.text
                          + "</p></li>");
        }
        else {
            messageEl = $("<li class='text receive'>"
                          + "<div class='reflect'></div><p><strong>"
                          + "<a class='username' href='#'>" + message.username + "</a> said: "
                          + "</strong>"
                          + message.text
                          + "</p></li>");
        }

        messageList.append(messageEl);

        // Scroll to bottom of page
        $("html, body, #iPhoneBro").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');
        var scroller = document.getElementById("iPhoneBro")
        scroller.scrollTop = scroller.scrollHeight;
    };

    // Compose and send a message when the user clicks send message button.
    sendMessageButton.click(function (event) {
        var message = messageContent.val();

        if (message != '') {
            pubnub.publish({
                channel: receiverUser,
                message: {
                    username: currentUser,
                    text: message
                }
            });

            
            messageContent.val("");
        }
    });

    // Send a message when the user hits the enter button in the text area.
    messageContent.bind('keydown', function (event) {
        if ((event.keyCode || event.charCode) !== 13)
            return true;
        sendMessageButton.click();
        return false;
    });

    // Subscribe to messages coming in from the channel.
    pubnub.subscribe({
        backfill: isHistoryEnabled,
        channel: chanelsArr,
        message: handleMessage,
     
    });

    //function getHistory() {
    //    pubnub.history({
    //        channel: $("#sender_username").text(),
    //        limit: 15,
    //        callback: function (notifications) {
    //            console.log(notifications);
    //        }
    //    });
    //}
    //function hereNow() {
    //    PUBNUB.here_now({
    //        channel: $("#sender_username").text(),
    //        callback: function (message) { console.log(message) }
    //    });
    //}
    //var historyArr = [];
    //pubnub.history({
    //    limit: 15,
    //    channel: $("#receiver_username").text(),
    //    callback: function (message) {
    //        historyArr = message;
    //        console.log('message :');
    //        console.log(message);
    //    }
    //});
    //$("#get").click(
    //    function getHistory() {
    //        console.log('getHistory : ');
    //        console.log(historyArr);
    //    })
});
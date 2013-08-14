
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

    // Handles all the messages coming in from pubnub.subscribe.
    function handleMessage(message) {
        var messageEl = $("<li class='text receive'>"
                          + "<div class='reflect'></div><p><strong>"
                          + "<a class='username' href='#'>" + message.username + "</a> said: "
                          + "</strong>"
                          + message.text
                          + "</p></li>");
        messageList.append(messageEl);

        // Scroll to bottom of page
        $("html, body, #iPhoneBro").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');
        $("#iPhoneBro").animate({ scrollTop: $("#iPhoneBro").height() -300 }, 'slow');
    };

    // Prints my messages 
    function printMyMessage(message) {
        var messageEl = $("<li class='text sent'>"
                          + "<div class='reflect'></div><p><strong>"
                          + "<a class='username' href='#'>" + $("#sender_username").text() + "</a> said: "
                          + "</strong>"
                          + message
                          + "</p></li>");
        messageList.append(messageEl);

        // Scroll to bottom of page
        $("#iPhoneBro").animate({ scrollTop: $("#iPhoneBro").height() - 300 }, 'slow');
    };

    // Compose and send a message when the user clicks send message button.
    sendMessageButton.click(function (event) {
        var message = messageContent.val();

        if (message != '') {
            pubnub.publish({
                channel: $("#recever_username").text(),
                message: {
                    username: $("#sender_username").text(),
                    text: message
                }
            });

            printMyMessage(message);
            messageContent.val("");
        }
    });

    // Also send a message when the user hits the enter button in the text area.
    messageContent.bind('keydown', function (event) {
        if ((event.keyCode || event.charCode) !== 13)
            return true;
        sendMessageButton.click();
        return false;
    });


    // Subscribe to messages coming in from the channel.
    pubnub.subscribe({
        channel: $("#sender_username").text(),
        message: handleMessage
    });

});


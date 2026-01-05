$(window).on('load', function(){
    //"l-empty"の高さ調整----------------------------------------------------------------------------
    const headerHeight = $('.l-header').height();
    $('.l-empty').css({
        'height': headerHeight + 10 + 'px'
    });

    //chat機能----------------------------------------------------------------------------
    /*DB読み込み*/
    $.getJSON('db/db.json',function(data) {
        let munTerms = {};
        munTerms = data;
        console.log("データベース読み込み完了");

        /*button機能活性化*/
        $('.header_inputButton').prop('disabled', false)

        /*enterキーによる挙動*/
        $('.header_inputText').on('keypress',
            function(e) {
                if (e.which === 13) { 
                    $('.header_inputButton').click();
                }
            }
        );

        /*検索ボタンクリック後の挙動*/
        let messageCount = 0;
        $('.header_inputButton').click(
            function response(){

                /*入力情報の取得*/
                const userInput = $('.header_inputText').val();

                /*入力欄の空欄化・フォーカス処理*/
                $('.header_inputText').val("").focus();

                /*処理回数の記録*/
                messageCount++

                if(userInput === ""){
                    return
                }else{
                    /*自動スクロール機能*/ 
                    const doc = $(document);
                    const win = $(window);
                    const len = $(doc).height() - $(win).height();
                    $('html, body').animate({ scrollTop: len }, 400);

                    /*".chat-unit"の生成*/ 
                    $('<div>', {
                        class: `chat_unit chat_unit__${messageCount}`, 
                    }).appendTo('.chat_content');

                    /*".chat_dialogue__user"の生成*/
                    $('<p>', {
                        class: `chat_dialogue chat_dialogue__user chat_dialogue__user__${messageCount}`, 
                    }).appendTo(`.chat_unit__${messageCount}`);

                    /*".chat_dialogue__answer"の生成*/
                    $('<p>', {
                        class: `chat_dialogue chat_dialogue___answer chat_dialogue___answer__${messageCount}`, 
                    }).appendTo(`.chat_unit__${messageCount}`);

                    /*入力情報処理と回答生成*/ 
                    const userInput__processed = userInput.toLowerCase().replace(/\s+/g, "").trim();
                    $(`.chat_dialogue__user__${messageCount}`).html(userInput);

                    setTimeout(()=>{
                        const answer = data[userInput__processed];
                        if(answer){
                            const answer_desc = answer.description;
                            $(`.chat_dialogue___answer__${messageCount}`).html(answer_desc);
                        }else{
                            $(`.chat_dialogue___answer__${messageCount}`).html('わからん。');
                        }
                    },500);
                }
            }
        )

    })
})

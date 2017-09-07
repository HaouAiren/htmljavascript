/* global Object $:true */
/**
 * Создание новой формы добавления комментария
 * @param {Boolean} isMain является ли форма главной (добавление общего комментария)
 */
var CommentForm = function(isMain) {
    var $mainForm = $('.main-form');
    var $form;
    // var sendCallback;
    // var cancelCallback;
    if(isMain) {
        $form = $mainForm;
    } else {
        $form = $mainForm.clone().removeClass('main-form');
        $form.find('.btn-cancel').css('display', 'inline-block');
        $form.find('.btn-send').css('margin-left', '7px');
    }

    var $requiredFields = $form.find('[required = true]');
    var $btnSend = $form.find('.btn-send');
    removeErrors.call($requiredFields);


    this.getFormElement = function () {
        return $form;
    };

    $btnSend.on('click', function() {
        var form = this.parentElement;
        if (checkForm()) {
            addComment(generateComment(form));
        }
    });

    $form.find('input[type=checkbox]').on('change', function() {
        $btnSend.prop('disabled', !this.checked);
    });

    $requiredFields.on('input', removeErrors)
        .on('blur', function() {
            checkField(this);
        });


    function checkForm() {
        var result = true;
        $requiredFields.each(function(index, element) {
            if (!checkField(element)) {
                result = false;
            }
        });
        return result;
    }

    function checkField(currentField) {
        var $currentField = $(currentField);
        if (!$currentField.val()) {
            $currentField.parentsUntil('form').find('.error').fadeIn();
            return false;
        }
        return true;
    }

    function removeErrors() {
        $(this).parentsUntil('form').find('.error').fadeOut();
    }

    function generateComment(form) {
        var comment = {};
        comment.userName = form.elements.name.value;
        comment.userAge = form.elements.age.value;
        //comment.userAge = comment.userAge ? ', ' + comment.userAge + ' лет ' : '';
        comment.userGender = form.elements.gender.selectedOptions[0].value;
        //comment.userGender = comment.userGender ? '(' + comment.userGender + ')' : '';
        comment.message = form.elements.message.value;
        comment.date = formatDate(new Date());
        return comment;

        function formatDate(date) {
            var day = date.getDay();
            var month = date.getMonth();
            var year = date.getFullYear();
            day = ("0" + day).substr(-2);
            month = month < 10 ? ('0' + month) : month;

            return day + '.' + month + '.' + year;
        }
    }

    function addComment(comment) {
        var $commentsSection = $('.comments');
        var $newComment = $commentsSection.find('.comment-template').clone();
        $newComment.removeClass('comment-template');

        $newComment
            .find('.user_name')
                .text(comment.userName)
                .end()
            .find('.user_age')
                .text(comment.userAge)
                .end()
            .find('.user_gender')
                .text(comment.userGender)
                .end()
            .find('.comment_info_date')
                .text(comment.date)
                .end()
            .find('.comment_body')
                .text(comment.message);
        var $commentsAmount = $commentsSection.find('.comments_amount');
        var amount = parseInt($commentsAmount.text());
        $commentsAmount.text(++amount);
        if(isMain){
            $commentsSection.append($newComment);
        }
        else{

        }

    }
};

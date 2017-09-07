$(document).ready(function() {
  $('.comments').on('click', function(event) {
      var $target = $(event.target);
      if($target.hasClass('reply')) {
        event.preventDefault();
        // if()
        var newCommentForm = new CommentForm(false);
        $target.closest('.comment').append(newCommentForm.getFormElement());
      }
  });
  // var mainCommentForm = new CommentForm(true);
  // $onReply =
});

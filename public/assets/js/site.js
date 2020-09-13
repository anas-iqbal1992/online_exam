$(document).ready(function () {
  $("#add-more").on("click", function (e) {
    e.preventDefault();
    var no = parseInt($(this).attr('data-no')) + 1;
    $.ajax({
      type:'GET',
      url: `/question/add-more`,
      data:{no:no},
      success: function (response) {
          $('#apd-ans').append(response);
          $("#add-more").attr('data-no',no);
      },
    });
  });
  $(document).on("click",'.remove-ans',function(e){
    e.preventDefault();
    $(this).closest('.r-ans').remove();
  });
});

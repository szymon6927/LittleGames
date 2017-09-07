$(document).ready(function(){
  console.log("bitmarket");
  
  $('.body').append('test');

  // $.getJSON( "https://www.bitmarket.pl/json/LTCPLN/ticker.json", function( data ) {
  //   var items = [];
  //   $.each( data, function( key, val ) {
  //     items.push( "<li id='" + key + "'>" + val + "</li>" );
  //   });
   
  //   $( "<ul/>", {
  //     "class": "my-new-list",
  //     html: items.join( "" )
  //   }).appendTo( "body" );
  // });
  
  // $.ajax({
  //   type: 'POST',
  //   url: 'https://www.bitmarket.pl/json/LTCPLN/ticker.json',
  //   onSuccess: function(data) {
  //     console.log(data);
  //   },
  //   onError: function(err) {
  //     console.log(err);
  //   }
  // })
})
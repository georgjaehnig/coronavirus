function setColumnHeaders() {
  fetch('json/columns.json')
    .then(response => response.json())
    .then(json => {
  
      for (i=-4; i<=0; i++) {
        let date = json[json.length + i -1]
  
        // Remove year from date.
        date = date.replace(/\/20$/, '')
        document.querySelector('th[data-field="day' + i + 'value"] .th-inner').innerHTML = date;
      }
    });
}

function setTab(source) {

  // Set new source.
  $('#dataTable').bootstrapTable('refresh', {
    url: 'json/' + source + '.json'
  });

  // Make new tab active.
  $(".nav .nav-link").removeClass("active");
  $(".nav .nav-item." + source + " .nav-link").addClass("active");
}

// Shorthand for $( document ).ready()
$(function() {
  setColumnHeaders();

  /*
  $('#dataTable').bootstrapTable('filterBy', {
    'day0value': 36
  })

  $('#dataTable').bootstrapTable('filterBy', {
    'day0value': 36
  })
*/


});

var $table = $('#dataTable')
var $ok = $('#ok')

$(function() {
  $ok.click(function () {
    $table.bootstrapTable('refresh')
  })
})

function queryParams() {
  var params = {}
  $('#toolbar').find('input[name]').each(function () {
    params[$(this).attr('name')] = $(this).val()
  })
  return params
}

function responseHandler(res) {
  //return res
}

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

function queryParams() {
  var params = {}
  $('#toolbar').find('input[name]').each(function () {
    params[$(this).attr('name')] = $(this).val()
  })
  return params
}

function responseHandler(rows) {
  let location = $('#toolbar input[name=location]').val()
  rows = rows.filter(row => row.location.toLowerCase().includes(location.toLowerCase()))

  let minCases = $('#toolbar input[name=minCases]').val()
  rows = rows.filter(row => row['day-4value'] > minCases)

  return rows
}

$(function() {
  setColumnHeaders();
  $('#ok').click(function () {
    $('#dataTable').bootstrapTable('refresh')
  })
});

// Set column headers.
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


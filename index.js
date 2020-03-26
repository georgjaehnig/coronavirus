const parse = require('csv-parse/lib/sync')

const fs = require('fs');

function writeData(csvFileName, jsonFileName) {

  const input = fs.readFileSync(csvFileName).toString()
  
  const locations = parse(input, {
    skip_empty_lines: true
  })
  
  const rows = [];
  
  const columns = locations[0]

  fs.writeFileSync('public/json/columns.json', JSON.stringify(columns))
  
  for (location of locations.slice(1)) {
  
    const row = {};
  
    // Location column.
    row['location'] = location[1] 
    if (location[0] != '') {
      row['location'] += ' / ' + location[0]
    }
  
    let previous_value;
    let product_growths = 1;
    let day = -4;
    for (current_value of location.slice(-5)) {
      row['day' + day + 'value'] = parseInt(current_value)
      if ((previous_value > 0) && (current_value > 0)) {
        let current_growth = (current_value/previous_value)
        const current_growth_str = Math.round(((current_growth-1))*100)
        row['day' + day + 'growth'] = current_growth_str
        product_growths = product_growths * current_growth
      }
      previous_value = current_value
      day++
    }
  
    const average_growth = Math.pow(product_growths, 1/4)
    row['average_growth'] = Math.round((average_growth-1)*100)
    rows.push(row)
  }
  fs.writeFileSync(jsonFileName, JSON.stringify(rows))
}

writeData('COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv', 'public/json/total.json')
writeData('COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv', 'public/json/deaths.json')
writeData('COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv', 'public/json/recovered.json')

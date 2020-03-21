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
    row[columns[1] + '+' + [columns[0]]] = location[1] 
    if (location[0] != '') {
      row[columns[1] + '+' + [columns[0]]] += ' / ' + location[0]
    }
  
    let previous_value;
    let sum_growths = 0;
    let day = -4;
    for (current_value of location.slice(-5)) {
      row['day' + day + 'value'] = current_value.toLocaleString(undefined,{style: 'decimal'})
      if (previous_value > 0) {
        let current_growth = (current_value/previous_value - 1)
        if (current_growth != 0) {
          let current_growth_str = ''
          if (current_growth > 0) {
            current_growth_str += '+'
          }
          current_growth_str += current_growth.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0})
          current_growth_str = (current_growth*100).toLocaleString(undefined,{maximumFractionDigits:0})
          row['day' + day + 'growth'] = current_growth_str
        }
        sum_growths += current_growth
      }
      previous_value = current_value
      day++
    }
  
    const average_growth = sum_growths / 4;
    row['average_growth'] = (average_growth*100).toLocaleString(undefined,{maximumFractionDigits:0})
    rows.push(row)
  }
  fs.writeFileSync(jsonFileName, JSON.stringify(rows))
}

writeData('COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv', 'public/json/cases.json')
writeData('COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv', 'public/json/deaths.json')

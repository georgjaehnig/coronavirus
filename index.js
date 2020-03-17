const parse = require('csv-parse/lib/sync')

function out(str) {
  //process.stdout.write(str)
}

const fs = require('fs');
const input = fs.readFileSync('COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv').toString()

const locations = parse(input, {
  skip_empty_lines: true
})

const rows = [];

out('<table>')

const columns = locations[0]

for (location of locations.slice(1)) {

  const row = {};

  row[columns[1]] = location[1]
  row[columns[0]] = location[0]

  let previous_value;
  let sum_growths = 0;
  let day = -6;
  for (current_value of location.slice(-7)) {
    row['day' + day + 'value'] = current_value
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

  const average_growth = sum_growths / 6;
  //row['average_growth'] = average_growth.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0})
  row['average_growth'] = (average_growth*100).toLocaleString(undefined,{maximumFractionDigits:0})
  rows.push(row)
}
out('</table>')

console.log(JSON.stringify(rows))

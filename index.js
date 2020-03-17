const parse = require('csv-parse/lib/sync')

function out(str) {
  //process.stdout.write(str)
}

const fs = require('fs');
const input = fs.readFileSync('COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv2').toString()

const locations = parse(input, {
  skip_empty_lines: true
})

const rows = [];

out('<table>')

const columns = locations[0]

for (location of locations.slice(1)) {

  const row = {};

  row[columns[1]] = location[1]

  out('<tr valign="top">')
  out('<td>')
  out(location[1])
  out('</td>')
  out('<td>')
  out(location[0])
  out('</td>')
  let previous_value;
  let sum_growths = 0;
  for (current_value of location.slice(-7)) {
    out('<td>')
    out(current_value)
    out('</td>')
    out('<td>')
    if (previous_value > 0) {
      let current_growth = (current_value/previous_value - 1)
      if (current_growth != 0) {
        if (current_growth > 0) {
          out('+')
        }
        out(current_growth.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0}))
      }
      sum_growths += current_growth
    }
    previous_value = current_value
    out('</td>')
  }
  out('<td valign="bottom">')
  const avg_growth = sum_growths / 6;
  out(avg_growth.toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0}))
  out('</td>')
  out('</tr>')
  rows.push(row)
}
out('</table>')

console.log(rows)

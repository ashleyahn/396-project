import '@fontsource/roboto';
import React  from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({data, tabValue, inputState}) => {
    let options = {};
    // vaccine hesitancy
    if (tabValue === 0) {
        let hesitant = parseFloat(data.estimated_hesitant)*100;
        let unsure = parseFloat(data.estimated_hesitant_or_unsure)*100;
        let strong = parseFloat(data.estimated_strongly_hesitant)*100;
        options = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: `Vaccine Hesitancy Rates in ${inputState.userInput.location.county}, ${inputState.userInput.location.state}`
          },
          series: [{
            //name: 'Brands',
            colorByPoint: true,
            data: [{
              name: 'Estimated Not Hesitant',
            //   y: 100 - hesitant - unsure - strong,
                y: 100,
              selected: true,
              sliced: true
            }, {
              name: 'Estimated Hesitant',
              y: hesitant
            }, {
              name: 'Estimated Hesitant or Unsure',
              y: unsure
            }, {
              name: 'Estimated Strongly Hesitant',
              y: strong
            }]
          }]
        }
    }
    // general covid-19 stats
    else if (tabValue === 1) {
        options = {
            chart: {
                type: 'bar'
            },
            title: {
                text: `COVID-19 Statistics for ${inputState.userInput.location.state}`
            },
            // subtitle: {
            //     text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
            // },
            xAxis: {
                categories: [inputState.userInput.location.state],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Today Cases',
                data: [data.todayCases]
            }, {
                name: 'Today Deaths',
                data: [data.todayDeaths]
            }, {
                name: 'Total Cases',
                data: [data.totalCases]
            }, {
                name: 'Total Deaths',
                data: [data.totalDeaths]
            }]
        };
    }

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )
}

export default Chart;

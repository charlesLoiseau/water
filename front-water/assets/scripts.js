var SENSOR = "Sensor-1"

window.Apex = {
    chart: {
      foreColor: '#fff',
      toolbar: {
        show: false
      },
    },
    colors: ['#FCCF31', '#17ead9', '#f02fc2'],
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: "#40475D",
    },
    xaxis: {
      axisTicks: {
        color: '#333'
      },
      axisBorder: {
        color: "#333"
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#F55555', '#6078ea', '#6094ea']
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        formatter: function (val) {
          return moment(new Date(val)).format("HH:mm:ss")
        }
      }
    },
    yaxis: {
      decimalsInFloat: 2,
      opposite: true,
      labels: {
        offsetX: -10
      }
    }
  };


  function getLastHourData() {
    let series = []
    $.ajax({
      url: `http://raspberrypi:3000/measurement/${SENSOR}/lastHour`,
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        data.forEach(e => {
          series.push([Math.round(new Date(e.timestamp).getTime()), e.data])
        })
      } 
   });
   return series;
  }

  function getLastDayData() {
    let series = []
    $.ajax({
      url: `http://raspberrypi:3000/measurement/${SENSOR}/lastDay`,
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        data.forEach(e => {
          series.push([Math.round(new Date(e.timestamp).getTime()), e.data])
        })
      } 
   });
   return series;
  }

  function getLastWeekData() {
    let series = []
    $.ajax({
      url: `http://raspberrypi:3000/measurement/${SENSOR}/lastWeek`,
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        data.forEach(e => {
          series.push([Math.round(new Date(e.timestamp).getTime()), e.data])
        })
      } 
   });
   return series;
  }

  
  var optionsLineHour = {
    chart: {
      height: 350,
      type: 'line',
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      events: {
        animationEnd: function (chartCtx, opts) {
          const newData1 = chartCtx.w.config.series[0].data.slice()
          newData1.shift()
          
  
          // check animation end event for just 1 series to avoid multiple updates
          if (opts.el.node.getAttribute('index') === '0') {
            window.setTimeout(function () {
              chartCtx.updateOptions({
                series: [{
                  data: newData1
                }],
              }, false, false)
            }, 300)
          }
  
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
      name: 'Running',
      data: getLastHourData()
    }],
    xaxis: {
      type: 'datetime',
      
    },
    title: {
      text: 'Heure',
      align: 'left',
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60
    },
  }

  var optionsLineDay = {
    chart: {
      height: 350,
      type: 'line',
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      events: {
        animationEnd: function (chartCtx, opts) {
          const newData1 = chartCtx.w.config.series[0].data.slice()
          newData1.shift()
          
  
          // check animation end event for just 1 series to avoid multiple updates
          if (opts.el.node.getAttribute('index') === '0') {
            window.setTimeout(function () {
              chartCtx.updateOptions({
                series: [{
                  data: newData1
                }],
              }, false, false)
            }, 300)
          }
  
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
      name: 'Running',
      data: getLastDayData()
    }],
    xaxis: {
      type: 'datetime',
      
    },
    title: {
      text: 'Jour',
      align: 'left',
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60
    },
  }
  
  var optionsLineWeek = {
    chart: {
      height: 350,
      type: 'line',
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22
      },
      events: {
        animationEnd: function (chartCtx, opts) {
          const newData1 = chartCtx.w.config.series[0].data.slice()
          newData1.shift()
          
  
          // check animation end event for just 1 series to avoid multiple updates
          if (opts.el.node.getAttribute('index') === '0') {
            window.setTimeout(function () {
              chartCtx.updateOptions({
                series: [{
                  data: newData1
                }],
              }, false, false)
            }, 300)
          }
  
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
      name: 'Running',
      data: getLastWeekData()
    }],
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd/MM-HH',
      }
    },
    title: {
      text: 'Semaine',
      align: 'left',
      style: {
        fontSize: '12px'
      }
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60
    },
  }

  var chartLineHour = new ApexCharts(
    document.querySelector("#linecharthour"),
    optionsLineHour
  );
  chartLineHour.render()

  var chartLineDay = new ApexCharts(
    document.querySelector("#linechartday"),
    optionsLineDay
  );
  chartLineDay.render()

  var chartLineWeek = new ApexCharts(
    document.querySelector("#linechartweek"),
    optionsLineWeek
  );
  chartLineWeek.render()


  window.setInterval(function () {
  
    chartLineHour.updateSeries([{
      data: getLastHourData()
    }])

    chartLineDay.updateSeries([{
      data: getLastDayData()
    }])

    chartLineWeek.updateSeries([{
      data: getLastWeekData()
    }])
  
  }, 6000);

  $(document).ready(function(){
    $("select").change(function(){
      SENSOR = $(this).children("option:selected").val();
      chartLineHour.updateSeries([{
        data: getLastHourData()
      }])
  
      chartLineDay.updateSeries([{
        data: getLastDayData()
      }])
  
      chartLineWeek.updateSeries([{
        data: getLastWeekData()
      }])
    });
  });
  
var SENSOR = ""

window.Apex = {
    chart: {
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: "#8C8E8C",
    },
    xaxis: {
      style: {
        colors: ['#8C8E8C'],
        
    },
      axisTicks: {
        color: '#8C8E8C'
      },
      axisBorder: {
        color: "#8C8E8C"
      },
      labels: {
        show: true,
        style: {
          color: '#8C8E8C'
        },
      }
    },
    colors: ["#77717E"],
    tooltip: {
      theme: 'light',
      x: {
        formatter: function (val) {
          return moment(new Date(val)).format("HH:mm:ss")
        }
      }
    },
    yaxis: {
      decimalsInFloat: 0,
      max: 800,
      min: 0,
      labels: {
        offsetX: -10
      }
    }
  };


  function getLastHourData() {
    let series = []
    if (SENSOR === "") {
      return;
    }
    $.ajax({
      url: `http://localhost:3000/measurement/${SENSOR}/lastHour`,
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
    if (SENSOR === "") {
      return;
    }
    $.ajax({
      url: `http://localhost:3000/measurement/${SENSOR}/lastDay`,
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
    if (SENSOR === "") {
      return;
    }
    $.ajax({
      url: `http://localhost:3000/measurement/${SENSOR}/lastWeek`,
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
      fontFamily: 'Quicksand, Arial, sans-serif',
      animations: {
        enabled: true,
        easing: 'linear',
      },
      events: {
        animationEnd: function (chartCtx, opts) {
          const newData1 = chartCtx.w.config.series[0].data.slice()
          // check animation end event for just 1 series to avoid multiple updates
          if (opts.el.node.getAttribute('index') === '0') {
            window.setTimeout(function () {
              chartCtx.updateOptions({
                series: [{
                  data: newData1
                }],
              }, false, false)
            }, 6000)
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
      curve: 'smooth',
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
        fontSize: '12px',
        color: "#8C8E8C"
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
      fontFamily: 'Quicksand, Arial, sans-serif',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      events: {
        animationEnd: function (chartCtx, opts) {
          const newData1 = chartCtx.w.config.series[0].data.slice()
          // check animation end event for just 1 series to avoid multiple updates
          if (opts.el.node.getAttribute('index') === '0') {
            window.setTimeout(function () {
              chartCtx.updateOptions({
                series: [{
                  data: newData1
                }],
              }, false, false)
            }, 6000)
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
      curve: 'smooth',
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
        fontSize: '12px',
        color: "#8C8E8C"
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
      fontFamily: 'Quicksand, Arial, sans-serif',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      events: {
        animationEnd: function (chartCtx, opts) {
          const newData1 = chartCtx.w.config.series[0].data.slice()
          if (opts.el.node.getAttribute('index') === '0') {
            window.setTimeout(function () {
              chartCtx.updateOptions({
                series: [{
                  data: newData1
                }],
              }, false, false)
            }, 6000)
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
      curve: 'smooth',
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
        format: 'dd/MM',
      }
    },
    title: {
      text: 'Semaine',
      align: 'left',
      style: {
        fontSize: '12px',
        color: "#8C8E8C"
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
  
  }, 6000);

  window.setInterval(function () {

    chartLineDay.updateSeries([{
      data: getLastDayData()
    }])
  
    chartLineWeek.updateSeries([{
      data: getLastWeekData()
    }])
  
  }, 180000);

  $(document).ready(function(){

    $.ajax({
      url: `http://localhost:3000/sensor`,
      type: 'get',
      dataType: 'json',
      async: false,
      success: function(data) {
        data.forEach(e => {
          $("select").append(new Option(e.sensorName, e.sensorName));
        })
      } 
   });
    

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
  
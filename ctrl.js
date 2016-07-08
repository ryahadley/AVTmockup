angular.module('app').controller('graphCtrl', function($scope, graphSvc) {

  $scope.graphData = function() {
    graphSvc.getData()
    .then(function(response) {
      console.log(response);

      // applicant graph
       $scope.applicants = response.data.applicant_graph.applicants;
       $scope.totalViews = response.data.applicant_graph.total_views;

      //clicks graph
      var length = response.data.clicks_graph.length;
      var days = response.data.clicks_graph;
      console.log(days);
      var clicks = [];
      var dates = [];

      for(var d in days) {
        clicks.push(days[d]);

        //change dash to a slash with reg expression
        var find = '-';
        var re = new RegExp(find, 'g');
        d = d.replace(re, '/');

        dates.push(d);
      }

      clicks.unshift(null);

      dates.unshift("");
      dates.push("");
      console.log(dates);
      console.log(clicks);

      $scope.clicks = clicks;
      $scope.labels = dates;



    $(document).ready(function() {
      var ctx = $("#mycanvas");
      var ctxx = $("#myline");

            var data = {
              labels: [
                "Applicants",
                "Total"
              ],
              datasets: [
                  {
                      data: [$scope.applicants, $scope.totalViews - $scope.applicants],
                      backgroundColor: [
                        'rgb(21,164,250)',
                        "rgb(217,228,235)"
                      ],
                      hoverBackgroundColor: [
                          "rgb(21,164,250)",
                          "rgb(217,228,235)"
                      ],
                      borderColor: [
                        'darkblue',
                        "darkblue"
                      ],
                      borderWidth: [
                        0, 0
                      ]
                  }]
                };

      var myDoughnutChart = new Chart(ctx, {
          type: 'doughnut',
          animation:{
              animateScale:true
          },
          data: data,
          options: {
              rotation: 20.5,
              cutoutPercentage: 90,
              circumference: 2* Math.PI,
              legend: {
                display: false
              },
              tooltips: {
                display: true
              },
              scales: {
                  gridLines: {
                      display: false
                  }
              }
          }
      });


      var dumdata = {
        labels: $scope.labels,
        datasets: [
            {
                fill: false,
                scaleShowGirdLines: false,
                scaleFontColor: "#FFFFFF",
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgb(16,155,227)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgb(16,155,227)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(16,155,227)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: $scope.clicks,
            }
        ]
    };

      var myLineChart = new Chart(ctxx, {
          type: 'line',
          data: dumdata,
          options: {
            legend: {
              display: false
            },
            scaleLabel: {
              fontFamily: 'gothM',
              fontColor: '#FFFFFF',
            },
            scales : {
                xAxes : [ {
                    gridLines : {
                        display : false,
                        color: "#FFFFFF",
                        lineWidth: 3
                        // offsetGridLines: true
                    },
                    ticks: {
                      fontFamily: 'gothThin',
                      fontColor: "#FFFFFF"
                    }
                } ],
                yAxes : [ {
                    gridLines : {
                        display : false,
                        color: "#FFFFFF",
                        lineWidth: 3,
                        offsetGridLines: true
                      },
                    ticks: {
                      beginAtZero: false,
                      min: 0,
                      stepSize: 50,
                      fontFamily: 'gothThin',
                      fontColor: '#FFFFFF'
                    }
                } ],
                padding: 10
            }
          }
      });

    });

    });

  }
  $scope.graphData();

});

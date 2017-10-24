/**
 * Created by liyang on 2017/3/29.
 */
import { Bar, Line } from 'vue-chartjs'
// import the component - chart you need

export default Line.extend({
    props:['statistic'],
    mounted () {
        var Arraylength = this.statistic.graphMonth.length;
        var colors = this.statistic.graphMonth.map(function (item, index) {
            return index==(Arraylength-1)? '#D8D8D8' : '#00a299';
        })
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: this.statistic.graphMonth,
            datasets: [
                    {
                        label: '订单数（个）',
                        fill:false,
                        borderColor: '#00a299',
                        pointBorderColor: '#00a299',
                        pointBackgroundColor:'#fff',
                        pointBorderWidth:2,
                        pointRadius: 4,
                        lineTension: 0,
                        borderWidth: 1,
                        data : this.statistic.finishCount.slice(0,this.statistic.finishCount.length-2),
                        borderDash:[5,5],
                    },
                    {
                        label: '订单数（个）',
                        fill:false,
                        borderColor: '#D8D8D8',
                        pointBorderColor: colors,
                        pointBackgroundColor:'#fff',
                        pointBorderWidth:2,
                        pointRadius: 4,
                        lineTension: 0,
                        borderWidth: 1,
                        data : this.statistic.finishCount,
                        borderDash:[5,5],
                    }
                ]
             },
            {
                maintainAspectRatio: false,
                animation: {
                    "duration": 1,
                    "onComplete": function () {
                        var chartInstance = this.chart;
                        var ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily,'#c0c0c0');
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        //ctx.fillStyle = '#00a299';
                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (line, index) {
                                var data = dataset.data[index];
                                if(index==(dataset.data.length-1)){
                                    ctx.fillStyle = '#D8D8D8';
                                }
                                else{
                                    ctx.fillStyle = '#00a299';
                                }
                                ctx.fillText(data, line._model.x, line._model.y-15);
                            });
                        });
                    }
                },
                hover: {
                    animationDuration:0,
                },
                tooltips: {
                    enabled: false,
                },
                grid: {
                    enabled: true,
                },
                responsive: true,
                legend: {
                    display: false,
                },
                layout: {
                    padding: {
                        left: 30,
                        right: 30,
                        top: 30,
                        bottom: 0
                    }
                },
                scales: {
                    yAxes: [{
                        display:false,
                        ticks: {
                            display: false,
                            beginAtZero: false,
                            max: Number(this.statistic.Y.finishCount.max)+Number(this.statistic.Y.finishCount.gap),
                            min: this.statistic.Y.finishCount.min-this.statistic.Y.finishCount.gap,
                            stepSize: Number(this.statistic.Y.finishCount.gap)
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                return value+'月';
                            }
                        }
                    }]
                },
            },
        )
    }
})
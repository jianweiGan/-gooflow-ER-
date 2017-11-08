/**
 * Created by chenpeng on 2017/7/5.
 */
$(document).ready(function () {
	App.setPage("google_maps");  //Set current page
	App.init(); //Initialise plugins and elements
    $.get('bmap/data/roate.json', function (data) {
        var myChart = echarts.init(document.getElementById('gmap_basic'));
        myChart.setOption(option = {
            baseOption: {
                timeline: {
                    // y: 0,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 3000,
                    data: ['2014', '2015', '2016'],
                    width: '90%',
                    bottom: 10,
                    left: 30,
                    symbolSize: 16,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999',
                                fontSize: 15
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#999',
                                fontSize: 20
                            }
                        }
                    },
                },
                bmap: {
                    center: [106.690571,26.601331],
                    zoom: 14,
                    roam: true,
                    mapStyle: {
                        'styleJson': [
                            {
                                "featureType": "all",
                                "elementType": "all",
                                "stylers": {
                                    "lightness": 10,
                                    "saturation": -100
                                }
                            }
                        ]
                    }
                },

            },
            options: [{
                series: [{
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: data.point,
                    silent: true,
                    lineStyle: {
                        normal: {
                            // color: '#c23531',
                            // color: 'rgb(200, 35, 45)',
                            opacity: 0.2,
                            width: 1
                        }
                    },
                    progressiveThreshold: 500,
                    progressive: 200
                }, {
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: data.point,
                    lineStyle: {
                        normal: {
                            width: 0
                        }
                    },
                    effect: {
                        constantSpeed: 20,
                        show: true,
                        trailLength: 0.1,
                        symbolSize: 1.5
                    },
                    zlevel: 1
                }]
            }, {
                series: [{
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: data.point1,
                    silent: true,
                    lineStyle: {
                        normal: {
                            // color: '#c23531',
                            // color: 'rgb(200, 35, 45)',
                            opacity: 0.2,
                            width: 1
                        }
                    },
                    progressiveThreshold: 500,
                    progressive: 200
                }, {
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: data.point1,
                    lineStyle: {
                        normal: {
                            width: 0
                        }
                    },
                    effect: {
                        constantSpeed: 20,
                        show: true,
                        trailLength: 0.1,
                        symbolSize: 1.5
                    },
                    zlevel: 1
                }]
            }, {
                series: [{
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: data.point2,
                    silent: true,
                    lineStyle: {
                        normal: {
                            // color: '#c23531',
                            // color: 'rgb(200, 35, 45)',
                            opacity: 0.2,
                            width: 1
                        }
                    },
                    progressiveThreshold: 500,
                    progressive: 200
                }, {
                    type: 'lines',
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: data.point2,
                    lineStyle: {
                        normal: {
                            width: 0
                        }
                    },
                    effect: {
                        constantSpeed: 20,
                        show: true,
                        trailLength: 0.1,
                        symbolSize: 1.5
                    },
                    zlevel: 1
                }]
            }]
        });
    });
});
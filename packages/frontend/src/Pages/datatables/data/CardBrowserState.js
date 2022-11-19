// ** Third Party Components
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'

export const CardBrowserState = (props) => {
  const trackBgColor = '#e9ecef'
  //console.log('+++++++++++++++++++', props.works.nodes)

  const statesArr = [
    {
      avatar: require('@src/assets/images/icons/apple-safari.png').default,
      title: 'Apple Safari',
      value: '14.6%',
      chart: {
        type: 'radialBar',
        series: [14.6],
        height: 40,
        width: 40,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: ['#7367f0'],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 5,
                size: '30%',
                image: require('@src/assets/images/icons/works/balcony.png')
                  .default,
                imageWidth: 30,
                imageHeight: 30,
                imageClipped: false,
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
    {
      avatar: require('@src/assets/images/icons/mozila-firefox.png').default,
      title: 'Mozila Firefox',
      value: '6.1%',
      chart: {
        type: 'radialBar',
        series: [6.1],
        height: 40,
        width: 40,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: ['#7367f0'],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 5,
                size: '30%',
                image: require('@src/assets/images/icons/works/basement.png')
                  .default,
                imageWidth: 30,
                imageHeight: 30,
                imageClipped: false,
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
    {
      avatar: require('@src/assets/images/icons/mozila-firefox.png').default,
      title: 'Mozila Firefox',
      value: '6.1%',
      chart: {
        type: 'radialBar',
        series: [6.1],
        height: 40,
        width: 40,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: ['#7367f0'],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 5,
                size: '30%',
                image: require('@src/assets/images/icons/works/roof.png')
                  .default,
                imageWidth: 30,
                imageHeight: 30,
                imageClipped: false,
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
    },
  ]

  const renderStates = () => {
    return props.works.nodes.map((state, i) => {
      let ind = 0
      if (state.work_id === 1.17) ind = 0
      if (state.work_id === 5.1) ind = 1
      if (state.work_id === 5.2) ind = 2

      return (
        <div key={i}>
          <Chart
            options={statesArr[ind].chart.options}
            series={[state.progress]}
            type={statesArr[ind].chart.type}
            height={statesArr[ind].chart.height}
            width={statesArr[ind].chart.width}
          />
        </div>
      )
    })
  }

  return <>{renderStates()}</>
}

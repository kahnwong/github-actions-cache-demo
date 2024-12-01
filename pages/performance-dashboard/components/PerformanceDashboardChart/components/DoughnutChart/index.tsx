import { FC, ComponentType } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import formatNumber from 'utils/formatNumber'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

ChartJS.register(ArcElement, Tooltip, Legend)
//

interface ILegends {
  label: string
  color: string
  Icon: ComponentType<any>
}

interface IDoughnutChart {
  data: { [key: string]: number }
  labels: string[]
  colors: string[]
  legends: ILegends[]
}

const DoughnutChart: FC<IDoughnutChart> = (props: IDoughnutChart) => {
  const { t } = useTranslation()
  const { data, labels, colors, legends } = props

  const totalData = data.Total

  const doughnutChart = Object.entries(data).map(([key, value]) => ({
    id: key,
    data: value
  }))

  const chartData = doughnutChart.filter((item) => item.id !== 'Total')

  const inputData = {
    labels,

    datasets: [
      {
        backgroundColor: colors,
        data: [...chartData]
      }
    ]
  }
  const options = {
    animation: {
      duration: 1500
    },
    animations: {
      // THIS MADE ANIMATION CLOCKWISE (NORM,IT IS ANTICLOCKWISE)
      startAngle: {
        from: 6.28
      },
      endAngle: {
        from: 6.28
      }
    },
    parsing: {
      // DETERMINE WHICH KEY TO LOOK VALUE (to put in graph or chart) FOR IN DATASETS
      key: 'data'
    },
    plugins: {
      legend: {
        // CREATE OWN LEGENDS TO EASE ON POSITIONING (you can try position chartjs legends but it won't look good)
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            // formatting on hover (read docs on context)
            ` ${context.label} : ${context.formattedValue} ครั้ง`
        }
      }
    }
  }

  if (!totalData || totalData === 0) {
    return (
      <div>
        <div
          key='topnodata'
          className='d-none d-sm-none d-md-block align-content-center text-center'
        >
          {/* APPEAR WHEN GRAPH ON LEFT AND RIGHT SIDE */}
          {t('performanceDashboard.performanceDetail.notFoundData')}
        </div>
        <div
          key='bottomnodata'
          className='d-flex  d-md-none d-sm-block justify-content-center align-self-center text-center text-align-center lh-300'
        >
          {/* APPEAR WHEN GRAPH ON TOP AND BOTTOM */}
          {t('performanceDashboard.performanceDetail.notFoundData')}
        </div>
      </div>
    )
  }
  return (
    <Container className='px-0 py-4'>
      <Row>
        <Col
          lg={6}
          md={12}
          xs={12}
          className=' justify-content-center align-content-center'
        >
          <Doughnut data={inputData} options={options} />
        </Col>

        <Col
          xs={12}
          md={12}
          lg={6}
          className=' justify-content-center d-flex align-items-center px-0 py-4'
        >
          <Container className='ps-2 pe-0'>
            {[...legends].reverse().map(
              ({ label, color, Icon }, index) =>
                data[label] !== 0 && (
                  <Row className=' g-0 py-1' key={`lengends-${index.toString()}`}>
                    <Col
                      className='d-none-block d-xs-block d-sm-block d-md-block d-lg-none'
                      // FILLER COL TO CENTER THINGS UP IN MOBILE & TABLET
                      xs={2}
                      sm={2}
                      md={2}
                      key={`fill${label}`}
                    >
                      {' '}
                    </Col>
                    <Col
                      // LOGO
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      key={`icon${label}`}
                      className='px-0 mx-0 '
                    >
                      <Icon size={36} round={1} />
                    </Col>
                    <Col
                      // LABELS (FACEBOOK ,TWITTER)
                      xs={3}
                      sm={3}
                      md={3}
                      lg={5}
                      key={`color${label}`}
                      className='row justify-content-left align-content-center  px-1 g-0'
                      style={{ color }}
                    >
                      {label}
                    </Col>
                    <Col
                      // VALUES AS PERCENT with colors
                      xs={4}
                      sm={4}
                      md={4}
                      lg={4}
                      key={`legend${label}`}
                      style={{ color }}
                      className='row justify-content-left align-content-center p-0 g-0'
                    >
                      {`${formatNumber((data[label] * 100) / totalData)}%`}
                    </Col>
                  </Row>
                )
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

DoughnutChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default DoughnutChart

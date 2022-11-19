// ** React Imports
import { useContext } from 'react'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap'

// ** Demo Components
import Tabs from '../datatables/Tabs'
import Gallery from './gallery/index'
import Details from './details/index'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const DataPanel = () => {
  // ** Context
  const ability = useContext(AbilityContext)
  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col lg="6" xs="12">
          <Tabs />
        </Col>
        <Col lg="6" xs="12">
          <Row className="match-height">
            <Col lg="12" xs="12">
              <Gallery />
            </Col>
            <Col lg="12" xs="12">
              <Details />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md="6" sm="12">
          <Card>
            <CardBody>
              <CardTitle tag="h4">Common</CardTitle>
              <CardText>No ability is required to view this card</CardText>
              <CardText className="text-primary">
                This card is visible to 'user' and 'admin' both
              </CardText>
            </CardBody>
          </Card>
        </Col>
        {ability.can('read', 'Analytics') ? (
          <Col md="6" sm="12">
            <Card>
              <CardBody>
                <CardTitle tag="h4">Analytics</CardTitle>
                <CardText>
                  User with 'Analytics' subject's 'Read' ability can view this
                  card
                </CardText>
                <CardText className="text-danger">
                  This card is visible to 'admin' only
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ) : null}
      </Row>
    </div>
  )
}

export default DataPanel

// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'

const characterics = [
  {
    title: 'Общие хар.',
    data: [
      { name: 'Год постр.', value: '1967' },
      { name: 'Этажей', value: '5' },
      { name: 'Подъездов', value: '6' },
      { name: 'Форма', value: 'Г-образн' },
      { name: 'Крыша', value: 'Скатная' },
    ],
  },
  {
    title: 'Размеры',
    data: [
      { name: 'Длина', value: '48,5' },
      { name: 'Ширина', value: '11,6' },
      { name: 'Высота', value: '14,95' },
      { name: 'Высота эт.', value: '2,89' },
      { name: 'Тольщ ст.', value: '0,5' },
    ],
  },
  {
    title: 'Материалы',
    data: [
      { name: 'Фунд.', value: '1967' },
      { name: 'Стен', value: '5' },
      { name: 'Перекр.', value: '6' },
      { name: 'Крыши', value: 'Г-образ' },
      { name: 'Перегор.', value: '6' },
    ],
  },
  {
    title: 'Объемы',
    data: [
      { name: 'Строит. пл.', value: '1967' },
      { name: 'Площадь', value: '5' },
      { name: 'Стр. объем', value: '6' },
      { name: 'Пл. подв.', value: 'Г-образ' },
      { name: 'Пл. участка', value: '6' },
    ],
  },
]

const PreviewCard = ({ data }) => {
  return data !== null ? (
    <Card className="invoice-preview-card mb-0">
      {/* <hr className="invoice-spacing" /> */}

      {/* Address and Contact */}
      <CardBody className="invoice-padding pt-0 pb-0">
        <Row className="invoice-spacing">
          {characterics.map((e, i) => (
            <Col
              key={i}
              className="p-0 mt-xl-0 mt-1 mb-1 "
              md="6"
              xl="6"
              width={'100%'}
            >
              <h6 className="mb-1">{e.title}:</h6>
              {/* <Table width="100%" size="sm" striped> */}
              {/* <tbody> */}
              {e.data.map((h, j) => (
                <div key={j} className="d-flex justify-content-between ">
                  <div className=" pe-1  text-nowrap">{h.name}:</div>
                  <div className=" pe-1  text-end text-nowrap">
                    <span className="fw-bold">{h.value}</span>
                  </div>
                </div>
              ))}
              {/* </tbody> */}
              {/* </Table> */}
            </Col>
          ))}
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* <hr className="invoice-spacing" /> */}

      {/* Invoice Note */}
      {/* <CardBody className="invoice-padding pt-0">
        <Row>
          <Col sm="12">
            <span className="fw-bold">Note: </span>
            <span>
              It was a pleasure working with you and your team. We hope you will
              keep us in mind for future freelance projects. Thank You!
            </span>
          </Col>
        </Row>
      </CardBody> */}
      {/* /Invoice Note */}
    </Card>
  ) : null
}

export default PreviewCard

/* eslint-disable no-tabs */
/* eslint-disable no-use-before-define */
// ** React Imports
import { Fragment, useState } from 'react'

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'
import createReport from 'docx-templates'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

import sign0 from '../signs/tarasov_go.png'
import sign1 from '../signs/evdokimova.png'
import sign2 from '../signs/akbash.png'
import sign3 from '../signs/седойкина.png'
import sign4 from '../signs/korobova.png'
import sign5 from '../signs/abramiyan.png'
import sign6 from '../signs/Ледовских.png'
import sign7 from '../signs/Абдюшеев.png'
import sign8 from '../signs/Тимофеев.png'
import sign9 from '../signs/Соловьева.png'
import sign10 from '../signs/Снегирёв.png'
import sign11 from '../signs/Савельева.png'
import sign12 from '../signs/sheglov.png'
import sign13 from '../signs/revva.png'

import templateDocx from '../signs/iul.docx'

const signs = [
  { sign: sign0, signatory: 'Тарасов Г.О.' },
  { sign: sign1, signatory: 'Евдокимова А.Н.' },
  { sign: sign2, signatory: 'Акбаш Е.Х' },
  { sign: sign3, signatory: 'Седойкина А.Н.' },
  { sign: sign4, signatory: 'Коробова Н.К.' },
  { sign: sign5, signatory: 'Абрамян С.К.' },
  { sign: sign6, signatory: 'Ледовских А.М.' },
  { sign: sign7, signatory: 'Абдюшеев Р.И.' },
  { sign: sign8, signatory: 'Тимофеев А.В.' },
  { sign: sign9, signatory: 'Соловьева И.В.' },
  { sign: sign10, signatory: 'Снегирёв Д.В.' },
  { sign: sign11, signatory: 'Савельева С.М.' },
  { sign: sign12, signatory: 'Щеглов Д.Н.' },
  { sign: sign13, signatory: 'Рева А. М.' },
]

const sections = [
  {
    num: '1',
    short: 'ПЗ',
    name: 'Раздел 1. «Пояснительная записка»',
  },
  {
    num: '3',
    short: 'АР',
    name: 'Раздел 3. «Архитектурные решения»',
  },
  {
    num: '4',
    short: 'КР',
    name: 'Раздел 4. «Конструктивные и объемно-планировочные решения»',
  },
  {
    num: '5',
    short: 'ИОС',
    name:
      'Раздел 5. «Сведения об инженерном оборудовании, о сетях инженерно-технического обеспечения, перечень инженерно-технических мероприятий, содержание технологических решений»',
  },
  {
    num: '6',
    short: 'ПОС',
    name: 'Раздел 6. «Проект организации строительства»',
  },
  {
    num: '8',
    short: 'ООС',
    name: 'Раздел 8. «Перечень мероприятий по охране окружающей среды»',
  },
  {
    num: '9',
    short: 'ПБ',
    name: 'Раздел 9. «Мероприятия по обеспечению пожарной безопасности»',
  },
  {
    num: '10',
    short: 'ОДИ',
    name: 'Раздел 10. «Мероприятия по обеспечению доступа инвалидов»',
  },
  {
    num: '10.1',
    short: 'ЭЭ',
    name:
      'Раздел 10.1. «Мероприятия по обеспечению соблюдения требований энергетической эффективности и требований оснащенности зданий, строений и сооружений приборами учета используемых энергетических ресурсов»',
  },
  {
    num: '11',
    short: 'СМ',
    name:
      'Раздел 11. «Смета на строительство объектов капитального строительства» ',
  },
  {
    num: '12',
    short: 'ИД',
    name:
      'Раздел 12. «Иная документация в случаях, предусмотренных федеральными законами»',
  },
  {
    num: '0',
    short: 'ТЗК',
    name:
      '«Отчет (заключение) по результатам обследования объекта проектирования и конструктивных элементов, относящихся к объекту проектирования»',
  },
]

const sectionsForSelect = sections.map((e, i) => {
  return { value: i, label: e.short }
})

const signsForSelect = signs.map((e, i) => {
  return { value: i, label: e.signatory }
})

const readFile = async (url) => {
  const resp = await fetch(url)
  const buffer = resp.arrayBuffer
    ? await resp.arrayBuffer()
    : await resp.buffer()
  return buffer
}
const AccountDetails = ({ stepper, type }) => {
  const [cypher, setСypher] = useState('')
  const [section, setSection] = useState(0)
  const [address, setAddress] = useState('')
  const [workName, setWorkName] = useState('')
  const [fileSection, setFileSection] = useState('')
  const [singsState, setSingsState] = useState([3, 0, 0, 1])
  const [crc, setCrc] = useState('')

  const handleGenerate = () => {
    console.log(cypher, section, address, workName, fileSection)
    if (fileSection === []) {
      alert('Не все данные введены!!!')
    } else onTemplateChosen()
  }

  // File chosen: build and save template!
  async function onTemplateChosen() {
    console.log('Template chosen')

    // Read template
    //const template = await readFileIntoArrayBuffer(fileTemplate)
    const template = await readFile(templateDocx)

    // Create report
    console.log('Creating report (can take some time) ...')

    const report = await createReport({
      template,
      cmdDelimiter: ['{', '}'],
      failFast: false,
      data: {
        date: fileSection.lastModifiedDate.toLocaleDateString(),
        datetime: `${fileSection.lastModifiedDate.toLocaleDateString()} ${fileSection.lastModifiedDate.toLocaleTimeString(
          [],
          { timeStyle: 'short' },
        )}`,
        fileSize: fileSection.size,
        fileName: fileSection.name,
        address,
        sectShort: sections[section].short,
        sectName: sections[section].name,
        sectNum: ` ${
          sections[section].num === '0' ? '' : `N ${sections[section].num}`
        }`,
        cypher,
        workName,
        crc,
        signatory: (i) => signs[singsState[i]].signatory,
      },
      //         html: `
      //         <meta charset="UTF-8">
      //         <body>
      //         <table border="1" cellpadding="1" cellspacing="1" style="width:500px">
      // 	<tbody>
      // 		<tr>
      // 			<td>fdg</td>
      // 			<td><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/sign1.png" style="position:absolute; top:-5px; width:80px" /></td>
      // 		</tr>
      // 		<tr>
      // 			<td>fgh</td>
      // 			<td></td>
      // 		</tr>
      // 		<tr>
      // 			// eslint-disable-next-line no-tabs
      // 			<td>fgh</td>
      // 			<td></td>
      // 		</tr>
      // 	</tbody>
      // </table>

      // <p></p>
      //         </body>
      //         `,

      additionalJsContext: {
        sign: async (i, w, h) => {
          const resp = await fetch(signs[singsState[i]].sign)
          const buffer = resp.arrayBuffer
            ? await resp.arrayBuffer()
            : await resp.buffer()
          return { width: w, height: h, data: buffer, extension: '.png' }
        },
      },
    })

    // Save report
    saveDataToFile(
      report,
      `Раздел ПД ${
        sections[section].num === '0' ? '' : `N ${sections[section].num}`
      } ${cypher}-${sections[section].short}-ИУЛ.docx`,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )
  }
  // ==============================================
  // Helpers
  // ==============================================
  const readFileIntoArrayBuffer = async (fd) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsArrayBuffer(fd)
    })

  const changeSignatory = (i, value) => {
    const state = singsState
    state[i] = value
    setSingsState(state)
  }

  const saveDataToFile = (data, fileName, mimeType) => {
    const blob = new Blob([data], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    downloadURL(url, fileName, mimeType)
    setTimeout(() => {
      window.URL.revokeObjectURL(url)
    }, 1000)
  }

  const downloadURL = (data, fileName) => {
    const a = document.createElement('a')
    a.href = data
    a.download = fileName
    document.body.appendChild(a)
    a.style = 'display: none'
    a.click()
    a.remove()
  }

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Основные данные</h5>
        <small className="text-muted">Введите данные для генерации</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`username-${type}`}>
              Шифр
            </Label>
            <Input
              type="text"
              name={`username-${type}`}
              id={`username-${type}`}
              placeholder="Пример: 2046-1"
              value={cypher}
              onChange={(e) => setСypher(e.target.value)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`email-${type}`}>
              Адрес
            </Label>
            <Input
              type="text"
              name={`email-${type}`}
              id={`email-${type}`}
              placeholder="Адрес объекта..."
              aria-label="john.doe"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for={`username-${type}`}>
              CRC32
            </Label>
            <Input
              type="text"
              name={`username-${type}`}
              id={`username-${type}`}
              placeholder="Вставьте CRC32..."
              value={crc}
              onChange={(e) => setCrc(e.target.value)}
            />
          </div>
          <div className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for={`confirm-password-${type}`}>
              Наимнование рабoты
            </Label>
            <Input
              type="text"
              value={workName}
              placeholder="Наименование работы..."
              onChange={(e) => setWorkName(e.target.value)}
              id={`confirm-password-${type}`}
            />
          </div>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`file1-${type}`}>
              Файл раздела
            </Label>
            <Input
              type="file"
              name={`file1-${type}`}
              id={`file-${type}`}
              placeholder="Файл для которого создается ИУЛ..."
              //value={fileSection}
              onChange={(e) => setFileSection(e.target.files[0])}
            />
          </Col>
          {/* <Col md="6" className="mb-1">
            <Label className="form-label" for={`file2-${type}`}>
              Файл шаблона
            </Label>
            <Input
              type="file"
              name={`file2-${type}`}
              id={`file2-${type}`}
              placeholder="Файл шаблона ИУЛ"
              aria-label="john.doe"
              //value={fileTemplate}
              onChange={(e) => setFileTemplate(e.target.files[0])}
            />
          </Col> */}
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">Раздел</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              onChange={(e) => {
                setSection(e.value)
              }}
              defaultValue={sectionsForSelect[0]}
              options={sectionsForSelect}
              isClearable={false}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">Разработал</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={signsForSelect[3]}
              options={signsForSelect}
              isClearable={false}
              onChange={(e) => {
                changeSignatory(0, e.value)
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">Проверил</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={signsForSelect[0]}
              options={signsForSelect}
              isClearable={false}
              onChange={(e) => {
                changeSignatory(1, e.value)
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">ГИП</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={signsForSelect[0]}
              options={signsForSelect}
              isClearable={false}
              onChange={(e) => {
                changeSignatory(2, e.value)
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">Н. контроль</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={signsForSelect[1]}
              options={signsForSelect}
              isClearable={false}
              onChange={(e) => {
                changeSignatory(3, e.value)
              }}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          {/* <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button> */}
          <Button
            color="success"
            className="btn-next"
            onClick={() => handleGenerate()}
          >
            <span className="align-middle d-sm-inline-block d-none">
              Сгенерировать
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
          {/* <Button
            color="primary"
            className="btn-next"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button> */}
        </div>
      </Form>
      {/* <Row>
        <iframe
          width="100%"
          height="300px"
          src={`https://docs.google.com/gview?url=${doc}&embedded=true`}
        ></iframe>
      </Row> */}
    </Fragment>
  )
}

export default AccountDetails

// ** Custom Components
import Avatar from '@components/avatar'
import { CardBrowserState } from './CardBrowserState'
import WorksList from './WorksList'

// ** Third Party Components
import axios from 'axios'
import './data.scss'
import {
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Folder,
} from 'react-feather'

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

// ** Vars
const states = [
  'success',
  'danger',
  'warning',
  'info',
  'dark',
  'primary',
  'secondary',
]

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' },
}

export let data

// ** Vars
const trackBgColor = '#e9ecef'

// export function getData(dataObjects) {
//   dataObjects.map((e) => {})
// }

// ** Get initial Data
axios.get('/api/datatables/initial-data').then((response) => {
  console.log('data', response.data)
  data = response.data
})

// ** Expandable table component
export const ExpandableTable = ({ data }) => {
  console.log('FFFFFFFFFFFFFFFFFFFFF', data.works.nodes)
  return <WorksList data={data.works.nodes} />
}

// ** Table Common Column
export function columns() {
  return [
    {
      name: 'Адрес',
      minWidth: '350px',
      sortable: (row) => row.address,
      cell: (row) => (
        <div className="d-flex align-items-center justify-content-between">
          {/* {row.avatar === '' ? (
            <Avatar
              color={`light-${states[row.status]}`}
              content={row.full_name}
              initials
            />
          ) : (
            <Avatar
              img={
                require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`)
                  .default
              }
            />
          )} */}
          <div className="user-info">
            <a href="file:///C:/">
              <Folder className="text-warning folder" size={20} />
            </a>
          </div>

          <div className="user-info text-wrap">
            <span className="d-block fw-bold text-wrap ms-1">
              {row.address}
            </span>
            {/* <small>{row.region}</small> */}
          </div>
        </div>
      ),
    },

    // {
    //   name: 'Email',
    //   sortable: true,
    //   minWidth: '250px',
    //   selector: (row) => row.email,
    // },
    // {
    //   name: 'Date',
    //   sortable: true,
    //   minWidth: '150px',
    //   selector: (row) => row.start_date,
    // },

    // {
    //   name: 'Salary',
    //   sortable: true,
    //   minWidth: '150px',
    //   selector: (row) => row.salary,
    // },
    // {
    //   name: 'Age',
    //   sortable: true,
    //   minWidth: '100px',
    //   selector: (row) => row.age,
    // },
    {
      name: 'Работы',
      minWidth: '50px',
      sortable: (row) => row.address,
      compact: true,
      cell: (row) => (
        <div className="d-flex align-items-center">
          {row.avatar === '' ? (
            <Avatar
              color={`light-${states[row.address]}`}
              content={row.address}
              initials
            />
          ) : (
            <CardBrowserState works={row.works} />
          )}
        </div>
      ),
    },
    // {
    //   name: 'Status',
    //   minWidth: '150px',
    //   sortable: (row) => row.address,
    //   cell: (row) => {
    //     return (
    //       <Badge color={status[5].color} pill>
    //         {status[5].title}
    //       </Badge>
    //     )
    //   },
    // },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: () => {
        return (
          <div className="d-flex">
            <UncontrolledDropdown>
              <DropdownToggle className="pe-1" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <FileText size={15} />
                  <span className="align-middle ms-50">Details</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <Archive size={15} />
                  <span className="align-middle ms-50">Archive</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <Trash size={15} />
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <Edit size={15} /> */}
          </div>
        )
      },
    },
  ]
}

export default ExpandableTable

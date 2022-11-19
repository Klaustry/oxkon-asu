// ** React Imports
import { Fragment, useState, useMemo } from "react";
import { Home, Star, Check, Search } from "react-feather";
import CompanyTable from "../datatables/TableExpandable";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Nav,
  Card,
  Button,
  NavItem,
  NavLink,
  TabPane,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  TabContent,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupText,
  Input,
  Label,
} from "reactstrap";
import Select, { components } from "react-select";
import { selectThemeColors } from "@utils";
import DndListGroup from "views/extensions/drag-and-drop/DndListGroup";

import { useQuery } from "@apollo/client";
import { GET_OBJECTS, GET_PRODUCT } from "../../graphql/queries/object.gql";

const colorOptions = [
  { value: "%%", label: "Все", color: "#00B8D9", isFixed: true },
  { value: "%1492%", label: "1492", color: "#FFC400", isFixed: false },
  { value: "%1678%", label: "1678", color: "#5243AA", isFixed: true },
  { value: "%1773%", label: "1773", color: "#FF5630", isFixed: false },
  { value: "%2015%", label: "2015", color: "#FF8B00", isFixed: false },
  { value: "%2047%", label: "2047", color: "#FFC400", isFixed: false },
];

const CardNavigation = () => {
  // ** States
  //const [activeTab, setTabActive] = useState('1')
  const [activePill, setPillActive] = useState("1");
  const [rSelected, setRSelected] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const [contractSelect, setContractSelect] = useState(colorOptions[0].value);

  const togglePills = (tab) => {
    if (activePill !== tab) {
      setPillActive(tab);
    }
  };

  const { data, loading, error, refetch } = useQuery(GET_OBJECTS, {
    variables: {
      search: "%%",
      contract: contractSelect,
      limit: 10,
      offset: 0,
    },
  });

  const handleContractSelect = (e) => {
    setContractSelect(e.value);
    refetch({
      search: `%${searchInput}%`,
      contract: contractSelect,
      limit: 10,
      offset: 0,
    });
  };
  // if (loading) return <p>"Loading..."</p>
  // if (error) return <p>Error! {error.message}</p>
  const dataObjects = data;

  console.log("datadatadata", dataObjects ? dataObjects.objects.nodes : null);

  function handleSearchChange(e) {
    setSearchInput(e.target.value);
    refetch({
      search: `%${e.target.value}%`,
      contract: contractSelect,
      limit: 10,
      offset: 0,
    });
  }

  //const item = useMemo(() => activeItem, [activeItem])
  //   const toggleTabs = (tab) => {
  //     if (activeTab !== tab) {
  //       setTabActive(tab)
  //     }
  //   }
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <Row>
            <Col className=" pl-1 mr-1" md="8" sm="12">
              <Select
                theme={selectThemeColors}
                defaultValue={contractSelect}
                // isMulti
                isClearable
                name="colors"
                options={colorOptions}
                className="react-select"
                classNamePrefix="select"
                placeholder="Выберите контракт..."
                onChange={handleContractSelect}
              />
            </Col>
            <Col className="p-0 m-0" md="4" sm="12">
              <InputGroup className="input-group-merge w-100">
                <InputGroupText>
                  <Search size={14} />
                </InputGroupText>
                <Input
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="search..."
                />
              </InputGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody style={{ padding: 0 }}>
          <CompanyTable dataObjects={data} loading={loading} error={error} />
        </CardBody>
      </Card>

      {/* <Col md="6">
          <Card className="text-center">
            <CardHeader>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activeTab === '1'}
                    onClick={() => {
                      toggleTabs('1')
                    }}
                  >
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === '2'}
                    onClick={() => {
                      toggleTabs('2')
                    }}
                  >
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink disabled>Disabled</NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <CardTitle tag="h4">Special title treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button color="primary" outline>
                    Go somewhere
                  </Button>
                </TabPane>
                <TabPane tabId="2">
                  <CardTitle tag="h4">Special title </CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button color="primary" outline>
                    Go somewhere
                  </Button>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col> */}
    </Fragment>
  );
};

export default CardNavigation;

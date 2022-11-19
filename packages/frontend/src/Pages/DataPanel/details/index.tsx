// ** React Imports
import { Fragment, useState } from "react";

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
} from "reactstrap";

import { ProductList } from "../../../services/object";
//import { IProduct } from '../../../models/ObjectModel'

import GeneralDetails from "./general/GeneralDetails";
import DndMultiDrag from "views/extensions/drag-and-drop/DndMultiDrag";

const CardNavigation = () => {
  // ** States
  const [activeTab, setTabActive] = useState("1");
  const [activePill, setPillActive] = useState("1");

  const togglePills = (tab: any) => {
    if (activePill !== tab) {
      setPillActive(tab);
    }
  };

  const toggleTabs = (tab: any) => {
    if (activeTab !== tab) {
      setTabActive(tab);
    }
  };
  const { dataObjects, loading, error, refetch } = ProductList("ddf");
  if (loading) return <p>"Loading..."</p>;
  if (error) return <p>Error! {error.message}</p>;

  console.log(dataObjects.objects.nodes);

  return (
    <Fragment>
      <Card className="">
        <CardHeader style={{ paddingBottom: 0 }}>
          <div>
            <div>
              <Nav pills>
                <NavItem>
                  <NavLink
                    active={activeTab === "1"}
                    onClick={() => {
                      toggleTabs("1");
                    }}
                  >
                    Общие
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "2"}
                    onClick={() => {
                      toggleTabs("2");
                    }}
                  >
                    Конструкции
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="p-1">
              <h5>Адрес: г. Балашиха, мкр. Керамик, ул. Заводская, д. 10</h5>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {/* <div>
            {dataObjects.objects.nodes.map((e: any, i: number) => (
              <p key={i}>{e.address}</p>
            ))}
          </div> */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div>
                <GeneralDetails
                  data={{
                    invoice: {
                      id: "2323",
                      issuedDate: "23.23.23",
                      dueDate: "23.23.34",
                      client: {
                        name: "sdfsad",
                        company: "sdgdf",
                        address: "gfhfghj",
                        contact: "asdfsdf",
                        companyEmail: "sdfjk@hgh.te",
                      },
                    },
                    paymentDetails: {
                      totalDue: "sdfg",
                      bankName: "gjghh",
                      country: "jklhjk",
                      iban: "rtyrty",
                      swiftCode: "3453245",
                    },
                  }}
                />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div>{/* <SwiperLazyLoad /> */}</div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CardNavigation;

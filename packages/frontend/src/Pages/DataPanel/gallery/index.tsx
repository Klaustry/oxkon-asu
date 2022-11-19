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

import SwiperLazyLoad from "./Swiper/index";

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
  return (
    <Fragment>
      <Card className="">
        <CardHeader style={{ paddingBottom: 0 }}>
          <Nav pills>
            <NavItem>
              <NavLink
                active={activeTab === "1"}
                onClick={() => {
                  toggleTabs("1");
                }}
              >
                Фотографии
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={activeTab === "2"}
                onClick={() => {
                  toggleTabs("2");
                }}
              >
                Паспорт Объекта
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div>
                <SwiperLazyLoad />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div>
                <SwiperLazyLoad />
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CardNavigation;

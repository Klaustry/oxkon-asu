// ** React Imports
import { useState, useContext } from "react";
// import { ThemeColors } from '@src/utility/context/ThemeColors'
// const { colors } = useContext(ThemeColors)

// ** Table columns & Expandable Data
import { ExpandableTable, columns } from "./data/data";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";

import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Spinner } from "reactstrap";
import { ProductList } from "../../services/object";
//import { IProduct } from '../../../models/ObjectModel'

import "@styles/react/libs/tables/react-dataTable-component.scss";

const DataTableWithButtons = ({ dataObjects, loading, error }) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0);

  // ** Function to handle filter

  //const { dataObjects, loading, error, refetch } = ProductList();

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={10}
      breakLabel={"..."}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName={
        "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1"
      }
    />
  );

  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle tag="h4">Expandable Row</CardTitle>
    //   </CardHeader>
    <div className="react-dataTable">
      {dataObjects ? (
        <DataTable
          noHeader
          striped
          pagination
          data={dataObjects.objects.nodes}
          expandableRows
          columns={columns()}
          expandOnRowClicked
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={ExpandableTable}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      ) : loading ? (
        <div className="d-flex justify-content-center my-1">
          <Spinner />
        </div>
      ) : (
        <div className="d-flex justify-content-center my-1">
          {error.message}
        </div>
      )}
    </div>
    // </Card>
  );
};

export default DataTableWithButtons;

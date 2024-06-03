
// import React, { Fragment, useState } from "react";
// import PropTypes from "prop-types";
// import {
//   useTable,
//   useGlobalFilter,
//   useAsyncDebounce,
//   useSortBy,
//   useFilters,
//   useExpanded,
//   usePagination,
// } from "react-table";
// import {
//   Table,
//   Row,
//   Col,
//   Button,
//   Input,
//   CardBody,
//   ButtonDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import { Filter, DefaultColumnFilter } from "./filters";
// import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter";

// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
//   isJobListGlobalFilter,
// }) {
//   const count = preGlobalFilteredRows.length;
//   const [value, setValue] = React.useState(globalFilter);
//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <React.Fragment>
//       <Col md={4}>
//         <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
//           <div className="position-relative">
//             <label htmlFor="search-bar-0" className="search-label">
//               <span id="search-bar-0-label" className="sr-only">
//                 Search this table
//               </span>
//               <input
//                 onChange={(e) => {
//                   setValue(e.target.value);
//                   onChange(e.target.value);
//                 }}
//                 id="search-bar-0"
//                 type="text"
//                 className="form-control"
//                 placeholder={`${count} records...`}
//                 value={value || ""}
//               />
//             </label>
//             <i className="bx bx-search-alt search-icon"></i>
//           </div>
//         </div>
//       </Col>
//       {isJobListGlobalFilter && <JobListGlobalFilter />}
//     </React.Fragment>
//   );
// }

// const TableContainer = ({
//   columns,
//   data,
//   isGlobalFilter,
//   isJobListGlobalFilter,
//   isAddOptions,
//   isAddUserList,
//   isAddSaleList,
//   isAddSaleOppList,
//   handleOrderClicks,
//   handleUserClick,
//   handleSaleClick,
//   handleCustomerClick,
//   isAddCustList,
//   customPageSize,
//   className,
//   customPageSizeOptions,
// }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [filteredContacts, setFilteredContacts] = useState(data);

//   const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

//   const handleFilterClick = (filterType) => {
//     if (filterType === "all") {
//       setFilteredContacts(data);
//     } else {
//       const filteredData = data.filter((contact) => contact.type === filterType);
//       setFilteredContacts(filteredData);
//     }
//   };

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data: filteredContacts,
//       defaultColumn: { Filter: DefaultColumnFilter },
//       initialState: {
//         pageIndex: 0,
//         pageSize: customPageSize,
//         sortBy: [
//           {
//             desc: true,
//           },
//         ],
//       },
//     },
//     useGlobalFilter,
//     useFilters,
//     useSortBy,
//     useExpanded,
//     usePagination
//   );

//   const generateSortingIndicator = (column) => {
//     return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
//   };

//   const onChangeInSelect = (event) => {
//     setPageSize(Number(event.target.value));
//   };

//   const onChangeInInput = (event) => {
//     const page = event.target.value ? Number(event.target.value) - 1 : 0;
//     gotoPage(page);
//   };

//   return (
//     <Fragment>
//       <Row className="mb-2">
//         <Col md={customPageSizeOptions ? 2 : 1}>
//           <select className="form-select" value={pageSize} onChange={onChangeInSelect}>
//             {[10, 20, 30, 40, 50].map((pageSize) => (
//               <option key={pageSize} value={pageSize}>
//                 Show {pageSize}
//               </option>
//             ))}
//           </select>
//         </Col>
//         {isGlobalFilter && (
//           <GlobalFilter
//             preGlobalFilteredRows={preGlobalFilteredRows}
//             globalFilter={state.globalFilter}
//             setGlobalFilter={setGlobalFilter}
//             isJobListGlobalFilter={isJobListGlobalFilter}
//           />
//         )}
//         {isAddOptions && (
//           <Col sm="7">
//             <div className="text-sm-end">
//               <Button type="button" color="success" className="btn-rounded mb-2 me-2" onClick={handleOrderClicks}>
//                 <i className="mdi mdi-plus me-1" />
//                 Add New Order
//               </Button>
//             </div>
//           </Col>
//         )}
//          {/* <i className="circle-outline " />

// <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}                 className="btn "
// >
//     <DropdownToggle style={{ backgroundColor: "#721E81", color: "white" }}>
//       Filter Contacts
//     </DropdownToggle>
//     <DropdownMenu>
//       <DropdownItem onClick={() => handleFilterClick("Client")}>Filtrar por Clientes</DropdownItem>
//       <DropdownItem onClick={() => handleFilterClick("Provider")}>Filtrar por Proveedor</DropdownItem>
//       <DropdownItem onClick={() => handleFilterClick("Employee")}>Filtrar por Empleados</DropdownItem>
//       <DropdownItem onClick={() => handleFilterClick("Partner")}>Filtrar por Socios</DropdownItem>
//       <DropdownItem divider />
//       <DropdownItem onClick={() => handleFilterClick("all")}>Mostrar Todos</DropdownItem>
//     </DropdownMenu>
//   </ButtonDropdown> */}
//         {isAddUserList && (
//           <Col sm="7">

             
//             <div className="text-sm-end d-flex align-items-center">
            
//               <Button
//                 type="button"
//                  onClick={handleUserClick}
//                 style={{ backgroundColor: "#721E81", color: "white" }}
//               >
//                 <i className="mdi mdi-plus-circle-outline me-1" />
//                 Create New User
//               </Button>
             
//             </div>
//           </Col>
//         )}
//         {isAddSaleOppList && (
//           <Col sm="7">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 className="btn mb-2 me-2"
//                 onClick={handleSaleClick}
//                 style={{ backgroundColor: "#721E81", color: "white" }}
//               >
//                 <i className="mdi mdi-plus-circle-outline me-1" />
//                 Create New Sale
//               </Button>
//             </div>
//           </Col>
//         )}
//         {isAddCustList && (
//           <Col sm="7">
//             <div className="text-sm-end">
//               <Button
//                 type="button"
//                 color="success"
//                 className="btn-rounded mb-2 me-2"
//                 onClick={handleCustomerClick}
//               >
//                 <i className="mdi mdi-plus me-1" />
//               </Button>
//             </div>
//           </Col>
//         )}
//       </Row>

//       <div className="table-responsive react-table">
//         <Table bordered hover {...getTableProps()} className={className}>
//           <thead className="table-light table-nowrap">
//             {headerGroups.map((headerGroup) => (
//               <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th key={column.id} style={{ backgroundColor: "#E8E0E9" }}>
//                     <div className="mb-2" {...column.getSortByToggleProps()}>
//                       {column.render("Header")}
//                       {generateSortingIndicator(column)}
//                     </div>
//                     <Filter column={column} />
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <Fragment key={row.getRowProps().key}>
//                   <tr>
//                     {row.cells.map((cell) => (
//                       <td key={cell.id} {...cell.getCellProps()}>
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 </Fragment>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>

//       <Row className="justify-content-md-end justify-content-center align-items-center">
//         <Col className="col-md-auto">
//           <div className="d-flex gap-1">
//             <Button
//               style={{ backgroundColor: "#774D7E", color: "white" }}
//               onClick={() => gotoPage(0)}
//               disabled={!canPreviousPage}
//             >
//               {"<<"}
//             </Button>
//             <Button
//               onClick={previousPage}
//               disabled={!canPreviousPage}
//               style={{ backgroundColor: "#774D7E", color: "white" }}
//             >
//               {"<"}
//             </Button>
//           </div>
//         </Col>
//         <Col className="col-md-auto d-none d-md-block">
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>
//         </Col>
//         <Col className="col-md-auto">
//           <Input
//             type="number"
//             min={1}
//             style={{ width: 70 }}
//             max={pageOptions.length}
//             defaultValue={pageIndex + 1}
//             onChange={onChangeInInput}
//           />
//         </Col>

//         <Col className="col-md-auto">
//           <div className="d-flex gap-1">
//             <Button
//               style={{ backgroundColor: "#774D7E", color: "white" }}
//               onClick={nextPage}
//               disabled={!canNextPage}
//             >
//               {">"}
//             </Button>
//             <Button
//               style={{ backgroundColor: "#774D7E", color: "white" }}
//               onClick={() => gotoPage(pageCount - 1)}
//               disabled={!canNextPage}
//             >
//               {">>"}
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Fragment>
//   );
// };




import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table"
import { Table, Row, Col, Button, Input, CardBody, ButtonDropdown, DropdownToggle, DropdownMenu,DropdownItem, } from "reactstrap"
import { Filter, DefaultColumnFilter } from "./filters"
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={e => {
                  setValue(e.target.value)
                  onChange(e.target.value)
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon" style={{marginTop: '10px', color: 'black'}}></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && <JobListGlobalFilter />}
    </React.Fragment>
  )
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  isAddSaleList,
  isAddSaleOppList,
  isAddInteractionList,
  handleOrderClicks,
  handleUserClick,
  handleSaleClick,
  handleInteractionClick,

  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState(data);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleFilterClick = (filterType) => {
    

    if (filterType === "all") {
      setFilteredContacts(data);
    } else {
      const filteredData = data.filter((contact) => contact.type === filterType);
      setFilteredContacts(filteredData);
    }
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,

      data:  isAddUserList ? (filteredContacts && filteredContacts.length > 0 ? filteredContacts : data) : data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  )

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }
  return (
    <Fragment>
      <Row className="mb-2" >
        <Col md={customPageSizeOptions ? 2 : 1} style={{marginTop: '15px'}}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
    <DropdownToggle style={{ backgroundColor: "#721E81", color: "white", marginBottom:'9px', marginRight:'20px', borderRadius: '4px'}}>
      Filter Contacts
    </DropdownToggle>
    <DropdownMenu>
  <DropdownItem onClick={() => handleFilterClick("Client")}>Filter by Clients</DropdownItem>
  <DropdownItem onClick={() => handleFilterClick("Provider")}>Filter by Providers</DropdownItem>
  <DropdownItem onClick={() => handleFilterClick("Employee")}>Filter by Employees</DropdownItem>
  <DropdownItem onClick={() => handleFilterClick("Partner")}>Filter by Partners</DropdownItem>
  <DropdownItem divider />
  <DropdownItem onClick={() => handleFilterClick("all")}>Show All</DropdownItem>
</DropdownMenu>
  </ButtonDropdown>
              <Button
                type="button"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
                style={{ backgroundColor: "#721E81", color: "white" }}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}

{isAddSaleOppList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                className="btn mb-2 me-2"
                onClick={handleSaleClick}
                style={{ backgroundColor: "#721E81", color: "white" }}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New Sale
              </Button>
            </div>
          </Col>
        )}

{isAddInteractionList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                className="btn mb-2 me-2"
                onClick={handleInteractionClick}
                style={{ backgroundColor: "#721E81", color: "white" }}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New Interaction
              </Button>
            </div>
          </Col>
        )}

        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className="table-responsive react-table" >
        <Table bordered hover {...getTableProps()} className={className} >
          <thead className="table-light table-nowrap" >
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map(column => (
                  <th key={column.id} style={{backgroundColor: '#E8E0E9'}}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row)
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              style={{ backgroundColor: "#774D7E", color: "white" }}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              onClick={previousPage}
              disabled={!canPreviousPage}
              style={{ backgroundColor: "#774D7E", color: "white" }}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block" style={{color: 'black'}}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              style={{ backgroundColor: "#774D7E", color: "white" }}
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              style={{ backgroundColor: "#774D7E", color: "white" }}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer

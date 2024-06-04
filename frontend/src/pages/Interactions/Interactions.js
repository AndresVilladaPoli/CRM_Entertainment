// import React, { useEffect, useState, useMemo } from "react"
// import { Link } from "react-router-dom"
// import withRouter from "components/Common/withRouter"
// import TableContainer from "../../components/Common/TableContainer"
// import {
//   Card,
//   UncontrolledTooltip,
//   CardBody,
//   Col,
//   Container,
//   Row,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Label,
//   FormFeedback,
//   Input,
//   Form,
// } from "reactstrap"
// import * as Yup from "yup"
// import { setIn, useFormik } from "formik"
// import { Type, Client, Date, Name, Description } from "./InteractionsCol"
// import Breadcrumbs from "components/Common/Breadcrumb"
// import SuccessModal from "components/Common/SuccessModalOpportunity"
// import {
//   getInteractions as onGetInteractions,
//   addNewInteraction as onAddNewInteraction,
// } from "store/interactions/actions"

// import {
//   getUsers as onGetUsers,
// } from "store/contacts/actions"

// import { useSelector, useDispatch } from "react-redux"
// import { isEmpty } from "lodash"
// // import { type } from "@testing-library/user-event/dist/types/utility"

// const InteractionsList = props => {
//   document.title = "Interactions | SpectraSphere"
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const dispatch = useDispatch()

//   const [interaction, setInteraction] = useState()

//   const [adminSalesPointUserList, setAdminSalesPointUserList] = useState([]);

//   const { users } = useSelector(state => ({
//     users: state.contacts.users,
//   }))
  
//   const salesPointUserName = adminSalesPointUserList.find(usersList => usersList.id === values.client)?.client;


//   const validation = useFormik({
//     enableReinitialize: true,


//     initialValues: {
//       type: (interaction && interaction.type) || "Call",
//       name: (interaction && interaction.name) ||"",
//       description:(interaction && interaction.description) || "",
//       client: (interaction && interaction.client) || adminSalesPointUserList.length > 0 ? adminSalesPointUserList[0].id : '',

//       date: (interaction && interaction.date) || "",
//     },
//     validationSchema: Yup.object({
//       type: Yup.string().required("Please select the type of interaction"),
//       name: Yup.string().required("Please enter the interaction's name"),
//       client: Yup.string().required("Please select the client's name"),
//       description: Yup.string().required("Please enter the description"),
//       date: Yup.string()
//         .matches(
//           /^(?:(?:19|20)\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
//           "The date must be in the format YYYY-MM-DD and valid"
//         )
//         .required("Please enter the contact's address"),
     
//     }),
//     onSubmit: values => {

//       const newInteraction = {
//         id: Math.floor(Math.random() * (30 - 20)) + 20,
//         type: values["type"],
//         name: values["name"],
//         client: salesPointUserName,
//         description: values["description"],
//         date: values["date"],
//       }
//       dispatch(onAddNewInteraction(newInteraction))
//       validation.resetForm()
//       setShowSuccessModal(true);
    
//       toggle()
//     },
//   })

//   const { interactions } = useSelector(state => ({
//     interactions: state.interactionsh.interactions,
//   }))
 

//   const [interactionList, setInteractionList] = useState([])

//   const [modal, setModal] = useState(false)
//   const [isEdit, setIsEdit] = useState(false)

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Type",
//         accessor: "type",
//         filterable: true,
//         Cell: cellProps => {
//           return <Type {...cellProps} />
//         },
//       },
//       {
//         Header: "Name",
//         accessor: "name",
//         filterable: true,
//         Cell: cellProps => {
//           return <Name {...cellProps} />
//         },
//       },
//       {
//         Header: "Client",
//         accessor: "client",
//         filterable: true,
//         Cell: cellProps => {
//           return <Client {...cellProps} />
//         },
//       },
//       {
//         Header: "Description",
//         accessor: "description",
//         filterable: true,
//         Cell: cellProps => {
//           return <Description {...cellProps} />
//         },
//       },

//       {
//         Header: "Date",
//         accessor: "date",
//         filterable: true,
//         Cell: cellProps => {
//           return <Date {...cellProps} />
//         },
//       },

//     ],
//     []
//   )

//   useEffect(() => {
//     if (interactions && !interactions.length) {
//       dispatch(onGetInteractions())
//       console.log("entre")
//       console.log(interactions)
//       setIsEdit(false)
//     }
//   }, [dispatch, interactions])

//   useEffect(() => {
//     setInteraction(interactions)
//     setIsEdit(false)
//   }, [interactions])

//   useEffect(() => {
//     if (!isEmpty(interactions) && !!isEdit) {
//       setInteraction(interactions)
//       setIsEdit(false)
//     }
//   }, [interactions])

//   const toggle = () => {
//     setModal(!modal)
//   }

//   //ensayo 
//   useEffect(() => {
//     if (users && !users.length) {
//       dispatch(onGetUsers());
//     }
//   }, [dispatch, users]);

//   useEffect(() => {

//     setAdminSalesPointUserList(users);
//   }, [users]);
//   //

//   const handleInteractionClick = arg => {
//     const inteer = arg

//     setSale({
//       id: inteer.id,
//       type: inteer.type,
//       name: inteer.name,
//       client: inteer.client,
//       description: inteer.description,
//       date: inteer.date,
//     })
//     setIsEdit(true)
//     toggle()
//   }

//   const handleInteractionClicks = () => {
//     setInteractionList("")
//     setIsEdit(false)
//     toggle()
//   }

//   const keyField = "id"

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Breadcrumbs
//             title="Interactions"
//             breadcrumbItem="Interaction List"
//           />
//           <Row>
//             <Col lg="12">
//               <Card>
//                 <CardBody>
//                   <TableContainer
//                     columns={columns}
//                     data={interactions}
//                     isGlobalFilter={true}
//                     isAddInteractionList={true}
//                     handleInteractionClick={handleInteractionClicks}
//                     customPageSize={10}
//                     className="custom-header-css"
//                   />
//                   <Modal isOpen={modal} toggle={toggle}>
//                     <ModalHeader toggle={toggle} tag="h4">
//                       {!!isEdit
//                         ? "Edit Sale Opportunity"
//                         : "Add Sale Opportunity"}
//                     </ModalHeader>
//                     <ModalBody>
//                       <Form
//                         onSubmit={e => {
//                           e.preventDefault()
//                           validation.handleSubmit()
//                           return false
//                         }}
//                       >
//                         <Row>
//                           <Col xs={12}>
//                           <div className="mb-3">
//                               <Label className="form-label">Type</Label>
//                               <Input
//                                 type="select"
//                                 name="type"
//                                 onChange={validation.handleChange}
//                                 onBlur={validation.handleBlur}
//                                 value={validation.values.type || ""}
//                                 invalid={
//                                   validation.touched.type &&
//                                   validation.errors.type
//                                     ? true
//                                     : false
//                                 }
//                               >
//                                 <option value="Call">Call</option>
//                                 <option value="Meeting">Meeting</option>
//                               </Input>
//                               {validation.touched.type &&
//                               validation.errors.type ? (
//                                 <FormFeedback type="invalid">
//                                   {validation.errors.type}
//                                 </FormFeedback>
//                               ) : null}
//                             </div>

//                             <div className="mb-3">
//                               <Label className="form-label">Name</Label>
//                               <Input
//                                 name="name"
//                                 type="text"
//                                 placeholder="Insert Name"
//                                 onChange={validation.handleChange}
//                                 onBlur={validation.handleBlur}
//                                 value={validation.values.name || ""}
//                                 invalid={
//                                   validation.touched.name &&
//                                   validation.errors.name
//                                     ? true
//                                     : false
//                                 }
//                               />
//                               {validation.touched.name &&
//                               validation.errors.name ? (
//                                 <FormFeedback type="invalid">
//                                   {validation.errors.name}
//                                 </FormFeedback>
//                               ) : null}
//                             </div>

//                             <div className="mb-3">
//                               <Label className="form-label">Client</Label>
//                               <Input
//                                 name="client"
//                                 type="text"
//                                 placeholder="Insert Name"
//                                 onChange={validation.handleChange}
//                                 onBlur={validation.handleBlur}
//                                 value={validation.values.client || ""}
//                                 invalid={
//                                   validation.touched.client &&
//                                   validation.errors.client
//                                     ? true
//                                     : false
//                                 }
//                               />
//                               {validation.touched.client &&
//                               validation.errors.client ? (
//                                 <FormFeedback type="invalid">
//                                   {validation.errors.client}
//                                 </FormFeedback>
//                               ) : null}
//                             </div>

//                             <div className="mb-3">
//                               <Label className="form-label">Description</Label>
//                               <Input
//                                 name="description"
//                                 type="text"
//                                 placeholder="Insert Description"
//                                 onChange={validation.handleChange}
//                                 onBlur={validation.handleBlur}
//                                 value={validation.values.description || ""}
//                                 invalid={
//                                   validation.touched.description &&
//                                   validation.errors.description
//                                     ? true
//                                     : false
//                                 }
//                               />
//                               {validation.touched.description &&
//                               validation.errors.description ? (
//                                 <FormFeedback type="invalid">
//                                   {validation.errors.description}
//                                 </FormFeedback>
//                               ) : null}
//                             </div>
                         
//                             <div className="mb-3">
//                               <Label className="form-label">Date</Label>
//                               <Input
//                                 name="date"
//                                 label="date"
//                                 type="text"
//                                 placeholder="Insert Date"
//                                 onChange={validation.handleChange}
//                                 onBlur={validation.handleBlur}
//                                 value={validation.values.date || ""}
//                                 invalid={
//                                   validation.touched.date &&
//                                   validation.errors.date
//                                     ? true
//                                     : false
//                                 }
//                               />
//                               {validation.touched.date &&
//                               validation.errors.date ? (
//                                 <FormFeedback type="invalid">
//                                   {validation.errors.date}
//                                 </FormFeedback>
//                               ) : null}
//                             </div>
                           
                          
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col>
//                             <div className="text-end">
//                               <button
//                                 type="submit"
//                                 className="btn save-user"
//                                 style={{
//                                     backgroundColor: "#C9B7D2",
//                                     color: "#0A0B24",
//                                   }}
//                               >
//                                 Save
//                               </button>
//                             </div>
//                           </Col>
//                         </Row>
//                       </Form>
//                     </ModalBody>
//                   </Modal>
//                   <SuccessModal
//                     show={showSuccessModal}
//                     onCloseClick={() => setShowSuccessModal(false)}
//                   />
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   )
// }

// export default withRouter(InteractionsList)
// InteractionsList.js
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
import {
  Card,
  UncontrolledTooltip,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Type, Client, Date, Name, Description, Note } from "./InteractionsCol";
import Breadcrumbs from "components/Common/Breadcrumb";
import {
  getInteractions as onGetInteractions,
  addNewInteraction as onAddNewInteraction,
  updateInteraction as onUpdateInteraction,
} from "store/interactions/actions";
import {
  getUsers as onGetUsers
} from "store/contacts/actions"
import SuccessModalInteraction from "components/Common/SuccessModalInteraction";
import SuccessModalEditInteraction from "components/Common/SuccessModalEditInteraction";
import DeleteModalNote from "components/Common/DeleteModalNote";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

const InteractionsList = ({ contacts }) => {
  document.title = "Interactions | SpectraSphere";
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const dispatch = useDispatch();
  const [interaction, setInteraction] = useState();

  const [adminSalesPointUserList, setAdminSalesPointUserList] = useState([]);

  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }));
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: (interaction && interaction.type) || "Call",
      name: (interaction && interaction.name) || "",
      description: (interaction && interaction.description) || "",
      client: (interaction && interaction.client) || (adminSalesPointUserList.length > 0 ? adminSalesPointUserList[0].id : ''),
      date: (interaction && interaction.date) || "",
      note: (interaction && interaction.note) || "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Please select the type of interaction"),
      name: Yup.string().required("Please enter the interaction's name"),
      client: Yup.string().required("Please select the client's name"),
      description: Yup.string().required("Please enter the description"),
      note: Yup.string(),
      date: Yup.string()
        .matches(
          /^(?:(?:19|20)\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
          "The date must be in the format YYYY-MM-DD and valid"
        )
        .required("Please enter the contact's address"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedInteraction = {
          ...interaction,
          note: values.note,
        };
        dispatch(onUpdateInteraction(updatedInteraction));
        setShowEditSuccessModal(true);
      } else {
      const salesPointUserName = adminSalesPointUserList.find(usersList => usersList.id === values.client)?.name;



      const newInteraction = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        type: values["type"],
        name: values["name"],
        clientName: salesPointUserName,
        client: values["client"],
        description: values["description"],
        date: values["date"],
        note: values["note"],
      };

      dispatch(onAddNewInteraction(newInteraction));
      setShowSuccessModal(true);
    }
      validation.resetForm();
      toggle();
    },
  });

  const { interactions } = useSelector((state) => ({
    interactions: state.interactionsh.interactions,
  }));

  const [interactionList, setInteractionList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return <Type {...cellProps} />;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Client",
        accessor: (row) => row.clientName || row.client,
        filterable: true,
        Cell: (cellProps) => {
          return <Client {...cellProps} />;
        },
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: true,
        Cell: (cellProps) => {
          return <Date {...cellProps} />;
        },
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
        },
      },
      {
        Header: "Note",
        accessor: "note",
        filterable: true,
        Cell: (cellProps) => {
          return <Note {...cellProps} />;
        },
      },
      {
        Header: "Action Notes",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={(event) => handleEditNoteClick(event, cellProps.row.original)}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleDeleteNoteClick(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },

    ],
    []
  );

  useEffect(() => {
    if (interactions && !interactions.length) {
      dispatch(onGetInteractions());
      setIsEdit(false);
    }
  }, [dispatch, interactions]);

  useEffect(() => {
    setInteraction(interactions);
    setIsEdit(false);
  }, [interactions]);

  useEffect(() => {
    if (!isEmpty(interactions) && !!isEdit) {
      setInteraction(interactions);
      setIsEdit(false);
    }
  }, [interactions]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleEditNoteClick = (event, interaction) => {
    event.preventDefault();
    setInteraction(interaction);
    setIsEdit(true);
    toggle();

  };

  const handleDeleteNoteClick = (interaction) => {

    
    const updatedInteraction = {
      
      ...interaction,
      note: '',
    };
    dispatch(onUpdateInteraction(updatedInteraction));
    setShowDeleteModal(true);
  };



  // const handleInteractionClick = (arg) => {
  //   const interaction = arg;

  //   setInteraction({
  //     id: interaction.id,
  //     type: interaction.type,
  //     name: interaction.name,
  //     description: interaction.description,
  //     client: contacts.find(user => user.name === interaction.client)?.id,
  //     date: interaction.date,
  //   });
  //   setIsEdit(true);

  //   toggle();
  // };

  //ensayo 
  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
    }
  }, [dispatch, users]);

  useEffect(() => {

    setAdminSalesPointUserList(users);
  }, [users]);


  const handleInteractionClicks = () => {
    setInteractionList("");
    setIsEdit(false);
    toggle();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Interactions" breadcrumbItem="Interaction List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={interactions}
                    isGlobalFilter={true}
                    isAddInteractionList={true}
                    handleInteractionClick={() => {
                      setInteraction({});
                      setIsEdit(false);
                      toggle();
                    }}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit Note" : "Add Interaction"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        
                      >
                              {isEdit ? (
        <Row form>
          <Col xs={12}>
            <div className="mb-3">
              <Label className="form-label">Note</Label>
              <Input
                name="note"
                className="form-control"
                placeholder="Enter Note"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.note || ""}
                invalid={
                  validation.touched.note &&
                  validation.errors.note
                    ? true
                    : false
                }
              />
              {validation.touched.note &&
              validation.errors.note ? (
                <FormFeedback type="invalid">
                  {validation.errors.note}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
      ) : (
        <>
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Type</Label>
                              <Input
                                name="type"
                                type="select"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.type || "Call"}
                              >
                                <option>Call</option>
                                <option>Meeting</option>
                              </Input>
                              {validation.touched.type &&
                              validation.errors.type ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.type}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                className="form-control"
                                placeholder="Enter Name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                      <Label className="form-label">Client's name</Label>
                      <Input
                        name="client"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.client || ""}
                      >
                          {adminSalesPointUserList.map(usersList => (
                              <option key={usersList.id} value={usersList.id}>
                                  {usersList.name}
                              </option>
                          ))}
                      </Input>
                      {validation.touched.client && validation.errors.client ? (
                          <FormFeedback type="invalid">{validation.errors.client}</FormFeedback>
                      ) : null}
                    </div>
                            <div className="mb-3">
                              <Label className="form-label">Date</Label>
                              <Input
                                name="date"
                                className="form-control"
                                placeholder="Enter Date"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.date || ""}
                                invalid={
                                  validation.touched.date &&
                                  validation.errors.date
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.date &&
                              validation.errors.date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.date}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Description</Label>
                              <Input
                                name="description"
                                className="form-control"
                                placeholder="Enter Description"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.description || ""}
                                invalid={
                                  validation.touched.description &&
                                  validation.errors.description
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.description &&
                              validation.errors.description ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.description}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Note</Label>
                              <Input
                                name="note"
                                className="form-control"
                                placeholder="Enter Note"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.note || ""}
                                invalid={
                                  validation.touched.note &&
                                  validation.errors.note
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.note &&
                              validation.errors.note ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.note}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>                
                        </>    
                       )}
                      <Row>
                        <Col>
                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn btn-success save-user"
                            >
                              Save
                            </button>
                          </div>
                        </Col>
                      </Row>
                        
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <SuccessModalInteraction
  show={showSuccessModal && !showEditSuccessModal}
  onCloseClick={() => setShowSuccessModal(false)}
/>
<SuccessModalEditInteraction
  show={showEditSuccessModal && !showSuccessModal}
  onCloseClick={() => setShowEditSuccessModal(false)}
/>
<DeleteModalNote
  show={showDeleteModal}
  onCloseClick={() => setShowDeleteModal(false)}
  onDeleteClick={handleDeleteNoteClick}
/>

      </div>
    </React.Fragment>
  );
};

export default withRouter(InteractionsList);

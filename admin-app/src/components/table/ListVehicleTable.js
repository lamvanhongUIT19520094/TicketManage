import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addVehicle,
  deleteVehicle,
  editVehicle,
} from "../../actions/vehicle.actions";
import { Input } from "../UI/Input";
import { Table } from "./Table";
import swal from "sweetalert";
import { SelectBox } from "../UI/select/SelectBox";
import { InputTitleLeft } from "../UI/inputTitleLeft/InputTitleLeft";
/**
 * @author
 * @function ListVehicleTable
 **/

export const ListVehicleTable = (props) => {
  const dispatch = useDispatch();
  const inputEl = useRef("");
  const prop_listVehicle = props.listVehicle;
  const prop_listEnterprise = props.listEnterprise;
  const getListVehicle = () => {
    let listVehicle = [];
    for (let i = 0; i < prop_listVehicle.length; i++) {
      if (prop_listVehicle[i].isActive === "yes") {
        //console.log(prop_listVehicle[i].isActive);
        listVehicle.push(prop_listVehicle[i]);
      }
    }
    return listVehicle;
  };
  const getListEnterprise = () => {
    let list = [];
    for (let i = 0; i < prop_listEnterprise.enterprises.length; i++) {
      if (prop_listEnterprise.enterprises[i].isActive === "yes") {
        //console.log(prop_listEnterprise[i].isActive);
        list.push(prop_listEnterprise.enterprises[i]);
      }
    }
    return list;
  };
  const term = props.term;
  const initVehicle = () => {
    return {
      _id: "",
      lisensePlate: "",
      idEnterprise: "",
      totalSeat: 0,
      quality: "",
      isActive: "yes",
    };
  };

  const [vehicle, setVehicle] = useState(initVehicle);
  const [modalShow, setModalShow] = useState(false);
  const [modalFlag, setModalFlag] = useState("Add");
  const [modalTitle, setModalTitle] = useState();
  const [editData, setEditData] = useState(false);

  const checkEditData = () => {
    if (
      vehicle.quality &&
      vehicle.totalSeat &&
      vehicle.lisensePlate &&
      vehicle.idEnterprise
    ) {
      setEditData(true);
    } else {
      setEditData(false);
    }
  };
  const handleModalShow = (iFlag, vehicle = []) => {
    if (iFlag === "Add") {
      setModalFlag("Add");
      setModalTitle("Th??m ph????ng ti???n");
    } else {
      setModalFlag("Edit");
      setModalTitle("S???a ph????ng ti???n");
      setVehicle(vehicle);
    }
    setModalShow(true);
  };
  const handleModalSave = () => {
    const form = vehicle;
    if (modalFlag === "Add") {
      delete form._id;
      dispatch(addVehicle(form));
    } else {
      dispatch(editVehicle(form));
    }
    setVehicle(initVehicle);
    if (props.type !== "Main") {
      if (props.reLoadEnterpriseDetails());
    }
    setModalShow(false);
  };
  const handleModalClose = () => {
    setVehicle(initVehicle);
    setModalShow(false);
  };

  const delVehicle = (selectedVeh) => {
    const form = selectedVeh;
    swal({
      title: "B???n ch???c ch???n x??a",
      text: "B???n c?? ch???c s??? x??a ph????ng ti???n n??y kh??ng",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Ph????ng ti???n ???? ???????c x??a th??nh c??ng!", {
          icon: "success",
        });
        form.isActive = "no";
        dispatch(editVehicle(form));
        if (props.type !== "Main") {
          props.reLoadEnterpriseDetails();
        }
      } else {
        swal("Ph????ng ti???n v???n ch??a b??? x??a!");
      }
    });
  };

  const vehicles = {
    header: ["Bi???n s???", "S??? gh???", "Ch???t l?????ng", "T??y ch???n"],
    body: [],
  };
  const renderHead = (item, ind) => {
    return <th key={ind}>{item}</th>;
  };

  const renderVehicles = (vehicles) => {
    let myVehicles = [];
    for (let vehicle of vehicles) {
      myVehicles.push(
        <tr>
          <td>{vehicle.lisensePlate}</td>
          <td>{vehicle.totalSeat}</td>
          <td>{vehicle.quality}</td>
          <td>
            <button
              className="edit"
              onClick={() => {
                handleModalShow("Edit", vehicle);
              }}
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              className="delete"
              onClick={() => {
                delVehicle(vehicle);
              }}
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    }
    return myVehicles;
  };

  const getSearchTerm = () => {
    //console.log(inputEl.current.value)
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div className="card right-content-fixsize">
      <Modal show={false} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            className="form-control"
            value={vehicle.idEnterprise}
            onChange={(e) =>
              setVehicle({ ...vehicle, idEnterprise: e.target.value })
            }
          >
            <option>Enterprise</option>
            {getListEnterprise().map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          <Input
            value={vehicle.lisensePlate}
            placeholder={`Bi???n s???`}
            onChange={(e) =>
              setVehicle({ ...vehicle, lisensePlate: e.target.value })
            }
          ></Input>
          <Input
            value={vehicle.totalSeat}
            placeholder={`S??? gh???`}
            onChange={(e) =>
              setVehicle({ ...vehicle, totalSeat: e.target.value })
            }
          ></Input>
          <Input
            value={vehicle.quality}
            placeholder={`Ch???t l?????ng`}
            onChange={(e) =>
              setVehicle({ ...vehicle, quality: e.target.value })
            }
          ></Input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            ????ng
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            L??u thay ?????i
          </Button>
        </Modal.Footer>
      </Modal>

      {/*   MODAL */}
      <div
        className={
          modalShow ? "add-modal__wrapper active" : "add-modal__wrapper"
        }
      >
        <div className={modalShow ? "add-modal active" : "add-modal"}>
          <div className="add-modal__header">{modalTitle}</div>

          <div className="add-modal__body">
            <div className="input-enterprise-name">
              <SelectBox
                type="commonID"
                value={vehicle.idEnterprise}
                onChange={(e) => {
                  setVehicle({ ...vehicle, idEnterprise: e.target.value });
                  checkEditData();
                }}
                list={getListEnterprise()}
                title="Enterprise"
              />

              <InputTitleLeft
                title="Bi???n s???"
                value={vehicle.lisensePlate}
                placeholder={``}
                onChange={(e) => {
                  setVehicle({ ...vehicle, lisensePlate: e.target.value });
                  checkEditData();
                }}
              />

              <InputTitleLeft
                title="S??? gh???"
                value={vehicle.totalSeat}
                placeholder={``}
                onChange={(e) => {
                  setVehicle({ ...vehicle, totalSeat: e.target.value });
                  checkEditData();
                }}
              />
              <InputTitleLeft
                title="Ch???t l?????ng"
                value={vehicle.quality}
                placeholder={``}
                onChange={(e) => {
                  setVehicle({ ...vehicle, quality: e.target.value });
                  checkEditData();
                }}
              />
            </div>
          </div>

          <div className="add-modal__footer">
            <button className="btn-cancel" onClick={handleModalClose}>
              {" "}
              H???y b???
            </button>
            <button
              className="btn-save"
              disabled={!editData}
              onClick={handleModalSave}
            >
              {" "}
              L??u l???i
            </button>
          </div>
        </div>
      </div>

      <div className="card__header">
        <h3>C??c ph????ng ti???n</h3>
        <Button
          onClick={() => {
            handleModalShow("Add");
          }}
        >
          Th??m ph????ng ti???n
        </Button>
      </div>
      <div className="ui-search">
        <input
          ref={inputEl}
          type="text"
          placeholder="Search Here"
          className="prompt"
          value={term}
          onChange={getSearchTerm}
        />
      </div>
      <div className="card__body">
        <Table
          headData={vehicles.header}
          renderHead={(item, ind) => renderHead(item, ind)}
          render2Body={() =>
            renderVehicles(getListVehicle()).length > 0
              ? renderVehicles(getListVehicle())
              : "Kh??ng t??m th???y k???t qu???"
          }
        />
      </div>
      <div className="card__footer"></div>
    </div>
  );
};

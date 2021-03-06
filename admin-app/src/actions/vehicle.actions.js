import axios from "../helpers/axios";
import { vehicleConstants } from "./constants";

export const getAllVehicles = () => {
  return async (dispatch) => {
    dispatch({ type: vehicleConstants.GET_ALL_VEHICLES_REQUEST });
    const res = await axios.get(`vehicle`);
    //console.log(res);
    if (res.status === 200) {
      const vehicleList = res.data;
      dispatch({
        type: vehicleConstants.GET_ALL_VEHICLES_SUCCESS,
        payload: { vehicles: vehicleList },
      });
    } else {
      dispatch({
        type: vehicleConstants.GET_ALL_VEHICLES_FAILURE,
        payload: { errorl: res.data.error },
      });
    }
  };
};

export const addVehicle = (form) => {
  return async (dispatch) => {
    dispatch({ type: vehicleConstants.ADD_NEW_VEHICLE_REQUEST });
    const res = await axios.post(`vehicle/create`, {
      ...form,
    });
    if (res.status === 200) {
      dispatch({
        type: vehicleConstants.ADD_NEW_VEHICLE_SUCCESS,
        payload: { vehicle: res.data },
      });
    } else {
      dispatch({
        type: vehicleConstants.ADD_NEW_VEHICLE_FAILURE,
        payload: { error: res.data.error },
      });
    }
    //console.log(res);
  };
};

export const editVehicle = (form) => {
  return async (dispatch) => {
    dispatch({ type: vehicleConstants.EDIT_VEHICLE_REQUEST });
    const res = await axios.put(`/vehicle/${form._id}`, {
      ...form,
    });
    if (res.status === 200) {
      dispatch({
        type: vehicleConstants.EDIT_VEHICLE_SUCCESS,
        payload: { vehicle: res.data },
      });
    } else {
      dispatch({
        type: vehicleConstants.EDIT_VEHICLE_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const deleteVehicle = (form) => {
  return async (dispatch) => {
    dispatch({ type: vehicleConstants.DELETE_VEHICLE_REQUEST });
    const res = await axios.delete(`/vehicle/${form._id}`);
    if (res.status === 200) {
      dispatch({
        type: vehicleConstants.DELETE_VEHICLE_SUCCESS,
        payload: { id: form._id },
      });
    } else {
      dispatch({
        type: vehicleConstants.DELETE_VEHICLE_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

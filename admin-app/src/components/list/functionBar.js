import React, { useRef } from "react";
import "./functionbar.css";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";

/**
 * @author
 * @function FunctionBar
 **/
export const FunctionBar = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="function-bar__ticket-list">
      <div style={{ display: "none" }}>
        <ComponentToPrint
          selected={props.selected}
          tickets={props.tickets}
          trip={props.trip}
          ref={componentRef}
        />
      </div>

      <button className="print" onClick={handlePrint}>
        <i class="fas fa-print"></i>
      </button>
      <button className="edit">
        <i class="far fa-edit"></i>
      </button>
      <button className="change-chair">
        <i class="fas fa-exchange-alt"></i>
      </button>
      <button className="change-ticket">
        <i class="fas fa-expand-arrows-alt"></i>
      </button>
    </div>
  );
};

import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineFolderView } from "react-icons/ai";

import { NumericFormat } from "react-number-format";
import CardPay1 from "./CardPay1.jsx";
import CardPay2 from "./CardPay2.jsx";
import CardPay3 from "./CardPay3.jsx";
import Cardpay4 from "./Cardpay4.jsx";
import Breadcrumb from "../Componets/Breadcrumb.jsx";
export default function PrintPay({ user, pay }) {
  const [card, setCard] = useState();
  return (
    <div className="App">
      <div>
        {/* <!-- Breadcrumb --> */}
        <Breadcrumb
          to1={"/payment"}
          s1={`Phiếu chi`}
          to2={`/payment/export`}
          s2={`Xuất phiếu chi`}
        />
      </div>
      <h1>DANH SÁCH XUẤT PHIẾU</h1>
      <MyComponent card={card} />
    </div>
  );
}

class ComponentToPrint extends React.Component {
  render({ pay }) {
    return <div>{pay}</div>;
  }
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }
  render() {
    const now = new Date(Date.now());
    const formattedDate = now.toLocaleString();
    let card = JSON.parse(sessionStorage.getItem("card"));
    const fileName = `phiếu thu tiền trọ ${formattedDate}`;
    const html2CanvasOptions = {};
    const html2CanvasOptionsPNG = { width: 580, height: 800 };
    const pdfOptions =
      card == 1 ? { w: 580, h: 800 } : { w: 210, h: 300, x: 0, y: 0 };
    // const pdfOptions = { w: 210, h: 300, x: 0, y: 0 };

    return (
      <React.Fragment>
        <div className="flex justify-center items-end gap-2 my-2">
          <div
            className="mx-2"
            onClick={() =>
              exportComponentAsJPEG(this.componentRef, {
                fileName,
                html2CanvasOptions,
              })
            }
          >
            <p class="relative px-5 py-2 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
              <span class="relative"> Export As JPEG</span>
            </p>
          </div>
          <div
            className="mx-2"
            onClick={() =>
              exportComponentAsPNG(this.componentRef, {
                fileName,
                html2CanvasOptionsPNG,
                pdfOptions,
              })
            }
          >
            <p class="relative px-5 py-2 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
              <span class="relative"> Export As PNG</span>
            </p>
          </div>
          <div
            className="mx-2"
            onClick={() =>
              exportComponentAsPDF(this.componentRef, {
                fileName,
                html2CanvasOptions,
                pdfOptions,
              })
            }
          >
            <p class="relative px-5 py-2 font-medium text-white group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
              <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
              <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
              <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
              <span class="relative"> Export As PDF</span>
            </p>
          </div>
        </div>

        <div ref={this.componentRef}>
          {/* <PrintData /> */}
          {/* {card == "1" ? <PrintData /> : <Card1 />} */}
          {card == "1" ? (
            <CardPay1 />
          ) : (
            <>
              {card == "2" ? (
                <CardPay2 />
              ) : (
                <>
                  {card == "3" ? (
                    <>
                      <CardPay3 />
                    </>
                  ) : (
                    <>
                      <Cardpay4 />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </React.Fragment>
    );
  }
}

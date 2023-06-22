import React, { useState } from "react";

import { NumericFormat } from "react-number-format";
import CardPay2 from "../Paymentslips/CardPay2.jsx";
import CardPay1 from "../Paymentslips/CardPay1.jsx";
import CardPay3 from "../Paymentslips/CardPay3.jsx";
import Cardpay4 from "../Paymentslips/Cardpay4.jsx";
export default function ComponetPrint({ user, pay }) {
  const [card, setCard] = useState();
  return (
    <div className="App">
      <MyComponent card={card} />
    </div>
  );
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
    const value = JSON.parse(sessionStorage.getItem("pay"));
    return (
      <React.Fragment>
        <div ref={this.componentRef} className="mt-6">
          {/* <PrintData /> */}
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

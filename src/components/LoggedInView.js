import { useState } from "react";

const LoggedInPage = (props) => {
  const [network, setNetwork] = useState("");
  const [symbol, setSymbol] = useState("");

  let flag = 0;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const jsonObj = JSON.parse(xhr.responseText);
      for (let i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].chainId === props.network) {
          setNetwork(jsonObj[i].name);
          setSymbol(jsonObj[i].nativeCurrency.symbol);
          flag = 1;
          break;
        }
      }
    }
  };

  xhr.open("GET", `https://chainid.network/chains.json`);
  xhr.send(null);

  if(flag === 1){
    setNetwork(props.network);
  }


  return (
    <>
      <div className="text-center container">
        <br />
        <br />
        <h1 className="text-white">Welcome</h1>
        <br />
        <br />
        <h6 className="text-white">Current network is {network}</h6>
        <br />
        <h6 className="text-white">
          Your address is <i>{props.account}</i>
        </h6>
        <br />
        <h6 className="text-white">
          Your balance is {props.balance} {symbol}
        </h6>
      </div>
    </>
  );
}

export default LoggedInPage;
import Web3 from "web3";
import { useState } from "react";
import LoggedInPage from "./LoggedInView";
import "../styles/Main.css";

const Main = () => {
  const [connected, setConnection] = useState(false);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");

  const checkForProvider = () => {
    let provider = "Provider not detected";

    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      provider = "Provider not detected";
    }

    return provider;
  };

  const connectToProvider = async () => {
    try {
      const provider = checkForProvider();
      if (provider === "Provider not detected") {
        setConnection(false);
      } else {
        await provider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(provider);
        const accountsArr = await web3.eth.getAccounts();
        const currentAcc = accountsArr[0];
        setAccount(currentAcc);
        const balance = await web3.eth.getBalance(currentAcc);
        setBalance(
          parseFloat(web3.utils.fromWei(String(balance), "ether")).toFixed(3)
        );
        setNetwork(await web3.eth.net.getId());
        setConnection(true);
      }
    } catch (err) {
      setConnection(false);
      console.log(err);
    }
  };
  return (
    <>
      {!connected && (
        <div id="loginBox" className="container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <h1 className="text-center text-white" id="loginTitle">
            Login
          </h1>
          <br />

          <div className="text-center">
            <button
              type="submit"
              className="continue"
              onClick={connectToProvider}
            >
              Connect to Wallet
            </button>
          </div>
        </div>
      )}
      {connected && (
        <LoggedInPage network={network} account={account} balance={balance} />
      )}
    </>
  );
};

export default Main;
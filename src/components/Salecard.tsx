/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Buy } from "./Buy";
import { Connect } from "./Connect";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useWeb3React } from "@web3-react/core";
import { NFTContract, rpc } from "../connectors/address";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import abi from "../abi/abi.json";
import { formatUnits } from "@ethersproject/units";
export const Salecard = () => {
  const [mints, setMints] = useState(0);
  const { account, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const getMints = async () => {
      const provider = new JsonRpcProvider(rpc);
      const contract = new Contract(NFTContract, abi, provider);
      console.log(contract);
      contract.on("CreateCryptoBabyNFT", async () => {
        const mint2 = await contract.totalSupply();
        setMints(Number(formatUnits(mint2, 0)));
      });
      const mint1 = await contract.totalSupply();
      setMints(Number(formatUnits(mint1, 0)));
    };
    getMints();
  }, []);
  const classes = UseStyle();
  return (
    <div className={classes.main}>
      <div className={classes.title}>{mints} / 2100</div>
      <Typography  sx={{ml:3, mr:3, mt:2, color: "white"}}>
        CryptoBaby is a free to mint NFT collection where the goal is to educate
        people on Cryptocurrency and NFT’s. Many people are interested in Crypto
        and NFT’s, but don’t have the knowledge to participate safely. This NFT
        community will foster education of Crypto and NFT’s through fun! There
        will be an arc built with utility for members. The community will drive
        the project.
      </Typography>
      <div className={classes.address}>
        <Button
          className={classes.contractButton}
          variant="text"
          endIcon={<OpenInNewIcon />}
          onClick={() =>
            window.open(`https://etherscan.com/token/${NFTContract}`, "_blank")
          }
        >
          NFT Contract
        </Button>
      </div>
      <div className={classes.cost}>5 Free NFT per wallet.</div>

      {!account && <Connect />}
      {account && <Buy price={0} />}
    </div>
  );
};

const UseStyle = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "rgba(170, 170, 170, 0.4) !important",
      backdropFilter: "blur(5px) !important",
      borderRadius: "16px",
      minHeight: "360px",
      boxShadow: "rgba(38, 122, 69, 0.55) 0px 0px 35px;",
    },
    title: {
      paddingTop: "16px",
      fontWeight: "600",
      fontSize: "48px",
      textAlign: "center",
      color: "white",
    },
    address: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "capitalize",
    },
    cost: {
      paddingTop: "8px",
      fontWeight: "600",
      fontSize: "18px",
      textAlign: "center",
      color: "#ffffff !important",
    },
    contractButton: {
      textTransform: "capitalize !important" as any,
      color: "#ffffff !important",
    },
  })
);

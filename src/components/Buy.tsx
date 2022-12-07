/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Chip, IconButton, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Fragment, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { NFTContract } from "../connectors/address";
import abi from "../abi/abi.json";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { toast } from "react-toastify";
import { rpc } from "../connectors/address";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
interface Props {
  price: number;
}
export const Buy = ({ price }: Props) => {
  const classes = UseStyle();
  const { account, library } = useWeb3React<Web3Provider>();

  

  
  const handleMint = async () => {
    if (account && library) {
      try {
        const signer = await library.getSigner();
        
        const contract = new Contract(NFTContract, abi, signer);
        const txResult = await contract.mint();
        await txResult.wait();
        toast.success(`1 CBaby NFT minted successfully!`);
      } catch (err: any) {
        console.log(err);
        if (err) {
          if (err.code === -32000) {
            toast("Insufficient Funds", { type: "error" });
          } else {
            toast.error(err.message);
            console.log(err.code);
          }
        } else {
          if (err.code === 4001) {
            toast.error("User denied transaction signature.");
          } else toast.error("Transaction Error");
        }
      }
    }
  };
  return (
    <>
      <div className={classes.title1}>
        <span>
          <b>Your Address : </b>
          {account}{" "}
        </span>
      </div>
      <div className={classes.title}>Click "Mint NFT" to mint your NFT.</div>

      <Fragment>
        <div
          style={{
            textAlign: "center",
            paddingTop: "8px",
            paddingBottom: "16px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            onClick={() => handleMint()}
            color="primary"
            sx={{
              fontSize: "12px",
              height: "36px",
              backgroundColor: "#000",
              borderRadius: "18px",
              width: "150px",
              marginLeft: "8px",
              mt:2
            }}
            variant="contained"
          >
            {" "}
            Mint NFT
          </Button> 
        </div>
      </Fragment>
    </>
  );
};

const UseStyle = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
    },
    title1: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
    },
  })
);

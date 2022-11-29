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
  const [value, setValue] = useState(1);
  const [rewardValue, setRewardValue] = useState(0);
  const [nfts, setNfts] = useState<number[]>();
  const { account, library } = useWeb3React<Web3Provider>();

  const getSalePriceValue = () => {
    const mintPrice = parseUnits(Number(price * value).toString(), 18);
    return mintPrice.toString();
  };
  useEffect(() => {
    const getRewards = async () => {
      try {
        const provider = new JsonRpcProvider(rpc);
        const contract = new Contract(NFTContract, abi, provider);
        const reward = await contract.getRewards(account);
        const nft: any[] = await contract.walletOfOwner(account);
        if (nft.length > 0) {
          const items = nft.map((item) => {
            return Number(formatUnits(item, 0));
          });
          console.log(items);
          setNfts(items);
        }
        setRewardValue(Number(formatUnits(reward, "ether")));
      } catch (err) {
        console.log(err);
      }
    };
    if (account && library) {
      getRewards();
    }
  }, [account, library]);

  const handleClaimRewards = async () => {
    if (account && library) {
      try {
        const signer = await library.getSigner();
        const contract = new Contract(NFTContract, abi, signer);
        const txResult = await contract.claimRewards(nfts);
        await txResult.wait();
        toast.success(`${rewardValue} claimed successfully!`);
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
  const handleMint = async () => {
    if (account && library) {
      try {
        const signer = await library.getSigner();
        let overrides = {
          value: getSalePriceValue(),
        };
        const contract = new Contract(NFTContract, abi, signer);
        const txResult = await contract.mint(value, overrides);
        await txResult.wait();
        toast.success(`${value} Ascended Masters NFT minted successfully!`);
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

  const increment = () => {
    if (value < 5) {
      setValue((value) => value + 1);
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue((value) => value - 1);
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
      <div className={classes.title}>Click buy to mint your NFT.</div>

      <Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: " 12px",
          }}
        >
          <div onClick={decrement}>
            <IconButton>
              <RemoveCircleOutlinedIcon />
            </IconButton>
          </div>
          <div style={{ fontSize: "22px", width: "60px", textAlign: "center" }}>
            {value}
          </div>
          <div onClick={increment}>
            <IconButton>
              <AddCircleOutlinedIcon />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          Your Rewards : {rewardValue} BNB
        </div>
        <div
          style={{
            textAlign: "center",
            paddingTop: "8px",
            paddingBottom: "16px",
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
            }}
            variant="contained"
          >
            {" "}
            Mint NFT
          </Button>

          <Button
            onClick={handleClaimRewards}
            color="primary"
            sx={{
              fontSize: "12px",
              height: "36px",
              width: "150px",
              backgroundColor: "#000",
              borderRadius: "18px",
              marginLeft: "8px",
            }}
            variant="contained"
            disabled={rewardValue > 0 && nfts!.length > 0 ? false : true}
          >
            {" "}
            Claim Rewards
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

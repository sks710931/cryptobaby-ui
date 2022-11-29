import { rpc } from './address';

import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
const RPC_URLS: { [chainId: number]: string } = {
    5: rpc,1: rpc
  }
export const walletconnect = new WalletConnectConnector({
    rpc: RPC_URLS,
    chainId: 1,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true
  })
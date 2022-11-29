
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
const RPC_URLS: { [chainId: number]: string } = {
    56: "https://bsc-dataseed1.binance.org",
  }
export const walletconnect = new WalletConnectConnector({
    rpc: RPC_URLS,
    chainId: 56,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true
  })
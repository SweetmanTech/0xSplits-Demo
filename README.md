# Getting Started with 0xSplits Demo

SSH

```
git pull origin git@github.com:SweetmanTech/0xSplits-Demo.git
npm i
npm start
```

HTTPS

```
git pull origin https://github.com/SweetmanTech/0xSplits-Demo.git
npm i
npm start
```

## 0xSplits

0xSplits is an open-source, audited, and non-upgradeable protocol for efficiently splitting onchain income. Whenever a Split receives funds, each recipient gets their share. Simple enough for friends, secure enough for anons.

[Official Website](https://www.0xsplits.xyz/)

### Features

- Splits are fully composable on both input & output. Each Split is a payable smart contract that can directly receive ETH & ERC20s from any EOA or SC. Each Recipient is also just an Ethereum address (EOA or SC) for which third-parties may execute withdrawals. With full composability on both ends, Splits is an effective routing layer within any workflow.
- Splits maximize gas efficiency by batching expensive operations & commingling funds. Gas needed to distribute funds is borne by ownership or covered by a third party, eliminating dust and allowing even the smallest Recipient to withdraw their share.
- Each Split exists entirely onchain and the actions necessary for the protocol to operate are incentivized & permissionless. With no trusted third parties, infrastructure dependencies, or upgradable contracts, you can be sure each Split will continue to operate for as long as Ethereum exists.

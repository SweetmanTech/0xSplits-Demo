# Getting Started with 0xSplits Demo

0xSplits is an open-source, audited, and non-upgradeable protocol for efficiently splitting onchain income. Whenever a Split receives funds, each recipient gets their share. Simple enough for friends, secure enough for anons.

- [0xSplits App](https://app.0xsplits.xyz/)
- [Official Website](https://www.0xsplits.xyz/)
- [0xSplits Github](https://github.com/0xSplits)
- [0xSplits Documentation](https://docs.0xsplits.xyz/)

## Free Lesson Videos.

- View all lessons for free on [Youtube here](https://www.youtube.com/watch?v=_OoehngIv4E&list=PLUIDNoExzm94WsSM3uCHu-hfOXo64zCYg).

## Lesson 7 - Project Setup

1. Checkout repo: `git clone git@github.com:SweetmanTech/0xSplits-Demo.git`
2. Change directory: `cd 0xSplits-Demo`
3. Install packages: `yarn` or `npm i`
4. Run app: `yarn start` or `npm run start`

## Lesson 8 - Create Split

1. Checkout branch: `git checkout lesson/8/create-split`
2. Open code editor: `code ./`
3. Run app: `yarn start` or `npm run start`
4. Populate ABI: `src/utils/abi0xSplits.json`

- ABI found here: https://mumbai.polygonscan.com/address/0x2ed6c4b5da6378c7897ac67ba9e43102feb694ee#code

5. Fill in missing methods in `src/utils/Splits.js`.

- `createSplit` & `percentageScale` defined [here](https://docs.0xsplits.xyz/smartcontracts/SplitMain).

6. Create a Split in the UI!
7. Verify the tx was successful in PolygonScan.

## Lesson 9 - Distribute Split

1. Checkout branch: `git checkout lesson/9/distribute`
2. Open code editor: `code ./`
3. Run app: `yarn start` or `npm run start`
4. Fill in missing methods in `src/utils/Splits.js`.

- `distributeETH` defined [here](https://docs.0xsplits.xyz/smartcontracts/SplitMain#distributeeth).

5. Create a Split in the UI!
6. Send MATIC (mumbai) into your SplitsWallet.
7. Paste the created contract address in the Distribute ETH TextField.
8. Click "Distribute Funds" button.
9. Verify the tx was successful in PolygonScan.

## Lesson 10 - Withdraw ETH / MATIC

1. Checkout branch: `git checkout lesson/10/withdraw`
2. Open code editor: `code ./`
3. Run app: `yarn start` or `npm run start`
4. Fill in missing methods in `src/utils/Splits.js`.

- `withdraw` defined [here](https://docs.0xsplits.xyz/smartcontracts/SplitMain#withdraw).

5. Create a Split in the UI!
6. Send MATIC (mumbai) into your SplitsWallet.
7. Paste the created contract address in the Distribute ETH TextField.
8. Click "Distribute Funds" button.
9. Click "Withdraw" button.
10. Verify the tx was successful in PolygonScan.

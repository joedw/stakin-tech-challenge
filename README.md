The Tech Stakin Challenge is a webApp that uses Node  Express as a Backend and ReactJS and React Next as frontend . 

It is a basic/prototype site to display my skill as a FullStack Web Developer , building Backend and Frontend and also Web3 Blockchain Development , talking to to BlockChain transactions using public DBS and Web3 APIs  JSON RPC calls to Nodes and inetermediary services . 

This App is build on Node version 11.50 but any version past this one should work .

To install first clone  or copy the code , make sure Node is installed by checking Node -v in a terminal also check if you have npm installed  . 

Open a Terminal in root folder of project and run npm install .

now cd /data , change the directory in terminal to data directory inside root folder 

now also npm install here .

to start the service that collects data from blockchain you need to be in data folder and just run : node napi.js

now open another terminal in root folder and just run npm run dev to start the app on on your local 

you can navigate to localhost:3000 in your browser to open the app . 

The Data folder contains a little service cronjob that fetches data from Polygon matic sentinel api and Solana Beach Api to update the json file that contains the data . 

On Sentinal Polygon it fetches the current staking amount per latest epoch for Matic Staking it also returns Claimed Rewards amt sometimes if there is , the other transactions are not yet found and that will take some time to develop and research . Staking rewards,Restake etc .. 

On Solana Beach api it fetches the  Staking amount as well , the other transactions are  not yet calculated or found , will take some time to develop and research that . 


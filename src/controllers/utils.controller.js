import { ethers } from 'ethers';
import { response } from 'express';
import { nftsAbi } from "../constants/abis.js";

export const verifyReferralCode = async (req, res)=>{
    const { code } = req.body;


        if (code) {

            const provider = new ethers.providers.WebSocketProvider('wss://fittest-solemn-wave.bsc.discover.quiknode.pro/e6ec1784345546d4425a828f0aad559800849ae8/');

            const contractAddress = process.env.NFTS_CONTRACT_ADDRESS;

            const contract = new ethers.Contract(contractAddress, nftsAbi, provider);
            
            await contract.getReferralAddressFromCode(code)
            .then(response => {
                if (response != "0x0000000000000000000000000000000000000000") return res.send(true);
                else return res.json(false);
                // return res in response.
            })
            .catch(err => {
                return res.json(false);
            });
        }

}
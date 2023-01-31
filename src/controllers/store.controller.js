import { User } from "../models/user.js";
import { boostPrices } from "../constants/prices.js";

export const buyDoubleBoost = async (req, res) => {
    try {
        const { address, amount } = req.body;

        const user = await User.findOne({ address });
        if (!user) return res.status(400).json({ message: "User does not exist." });

        if (user.inventory.tokenBalance < boostPrices.doubleBoost * amount) return res.status(400).json({ message: "Not enough tokens." }); 

        // prevent double spending.
        const newBalance = user.inventory.tokenBalance - boostPrices.doubleBoost * amount ;   
        await User.updateOne({ address:address},  {"inventory.tokenBalance" : newBalance , $inc: {"inventory.doubleBoosts" : amount } }  );
        res.status(200).json({ message: "Success." });
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
        console.log(error);
    }

}

export const buyTripleBoost = async (req, res) => {
    try {
        const { address, amount } = req.body;

        const user = await User.findOne({ address });
        if (!user) return res.status(400).json({ message: "User does not exist." });

        if (user.inventory.tokenBalance < boostPrices.tripleBoost * amount) return res.status(400).json({ message: "Not enough tokens." }); 

        // prevent double spending.
        const newBalance = user.inventory.tokenBalance - boostPrices.tripleBoost * amount ;   
        await User.updateOne({ address:address},  {"inventory.tokenBalance" : newBalance , $inc: {"inventory.tripleBoosts" : amount } }  );
        res.status(200).json({ message: "Success." });

    } catch (error) {
        res.status(500).json({ message: "Server Error." });
        console.log(error);
    }

}

export const buyQuintupleBoost = async (req, res) => {
    try {
        const { address, amount } = req.body;

        const user = await User.findOne({ address });
        if (!user) return res.status(400).json({ message: "User does not exist." });

        if (user.inventory.tokenBalance < boostPrices.quintupleBoost * amount) return res.status(400).json({ message: "Not enough tokens." }); 

        // prevent double spending.
        const newBalance = user.inventory.tokenBalance - boostPrices.quintupleBoost * amount ;   
        await User.updateOne({ address:address},  {"inventory.tokenBalance" : newBalance , $inc: {"inventory.quintupleBoosts" : amount } }  );
        res.status(200).json({ message: "Success." });
    } catch (error) {
        res.status(500).json({ message: "Server Error." });
        console.log(error);
    }

}

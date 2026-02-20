import { json } from "express";
import prodctmodel from "../model/product.model";
exports.getallproducts = async (req, res) => {

    try {

        const prodcts = await prodctmodel.find({}); // find all products 

        if (!prodcts) {
            return res.status(404).json({ message: "No products found" });
        }
        res.json(products);




    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });

    }
}
exports.getFeaturedProducts = async (req, res) => {
    try {

        const products = await prodctmodel.find({ isFeatured: true });

        if (products.length === 0) {
            return res.status(404).json({
                message: "No featured products found"
            });
        }

        res.status(200).json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};









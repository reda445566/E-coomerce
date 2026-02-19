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


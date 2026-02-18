import userModel from "../model.js/user.model";
exports.signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        //validation
        if (!email || !name || !passwprd) {
            res.sataus(404).json("all fields are required")
        }
        //userexisring
        const userexisring = await userModel.findOne({ email });
        if (userexisring) {
            res.status(404).json("user already exists")
        }
        // create user 
        const user = await user.create({ name, email, password });
        res.json("user created");

    } catch (err) {
        console.log(err).json("server is error")
    }

}

exports.login = async (req, res) => {
    res.send("login");
}

exports.logout = async (req, res) => {
    res.send("logout");
}
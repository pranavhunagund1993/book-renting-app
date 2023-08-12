const User = require('../model/userModel')

const adminAuth = async (req,res,next) => {
    try {
        const id = req.user.id // get the id from auth middleware

        const extUser = await User.findById({ _id: id})
        if(!extUser)
            return res.status.json({ msg: "user id not found" })

            // validate role
            if(extUser.role !== "superadmin")
                return res.status(400).json({ msg: "Access denied for non-admin users.."})

            next() // if admin continue to next controller
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = adminAuth
const Rent = require('../model/rentModel')

const rentController = {
    getAll: async (req,res) => {
        try {
            const data = await Rent.find({})
            res.status(200).json({ length: data.length, rents: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSingle: async (req,res) => {
        try {
            let id = req.params.id
            const data = await Rent.findById({ _id: id })
                if(!data)
                    return res.status(404).json({ msg: 'Rent id not found'})
            res.status(200).json({ rent: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    create: async (req,res) => {
        try {
            let extRent = await Rent.findOne({ bookId: req.body.bookId } && { userId: req.body.userId })
                if(extRent)
                    return res.status(400).json({ msg: 'Already you have rented a book..'})

            const data = await Rent.create(req.body)
                return res.status(200).json({ msg: 'Rent details added successfully', rent: data})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    update: async (req,res) => {
        try {
            let id = req.params.id

            let extRent = await Rent.findById({ _id: id })
                if(!extId)
                    return res.status(404).json({ msg: 'Requested Rent id not found'})

                if(extRent.bookId === req.body.bookId && extRent.userId === req.body.userId)
                    return res.status(400).json({ msg: 'Already you have rented a book..'})

                await Rent.findByIdAndUpdate({ _id: id}, {
                    amount: req.body.amount,
                    returnDate: req.body.returnDate,
                    paymentStatus: req.body.paymentStatus
                })
                    return res.status(200).json({ msg: 'Rent details updated successfully'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    delete: async (req,res) => {
        try {
            let id = req.params.id

            let extRent = await Rent.findById({ _id: req.params.id })

                if(!extRent)
                    return res.status(404).json({ msg: 'Requested rent id not found..'})
            
            await Rent.findByIdAndDelete({ _id: id})

            return res.status(200).json({ msg: "rent deleted successfully"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = rentController
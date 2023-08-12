const Category = require('../model/categoryModel')

const categoryCtrl = {
    getAll: async (req,res) => {
        try {
            const data = await Category.find({})
            res.status(200).json({ length: data.length, categories: data })
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    getSingle: async (req,res) => {
        try {
            let id = req.params.id
            let extCat = await Category.findById({ _id: id })

            if(!extCat)
                return res.status(404).json({ msg: 'Requested category id not found' })
            return res.status(200).json({ category: extCat })
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    create: async (req,res) => {
        try {
            let { title, desc } = req.body

            let extCat = await Category.findOne({ title })
                if(extCat) 
                    return res.status(400).json({ msg: 'Category already exists' })

                let newCat = await Category.create({ title, desc })
                    res.status(200).json({ msg: `New category created..`, category: newCat })
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    update: async (req,res) => {
        try {
            let id = req.params.id
                let extCat = await Category.findById({ _id: id })
                if(!extCat)
                    return res.status(404).json({ msg: 'Category not found'})

                let updated = await Category.findByIdAndUpdate({ _id: id}, req.body)
                    res.status(200).json({ msg: 'Category updated successfully', updated})
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
    delete: async (req,res) => {
        try {
            let id = req.params.id
                let extCat = await Category.findById({ _id: id })
                if(!extCat)
                    return res.status(404).json({ msg: 'Category not found'})

                await Category.findByIdAndDelete({ _id: id})
                    res.status(200).json({ msg: 'Category deleted successfully'})
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }
    },
}

module.exports = categoryCtrl
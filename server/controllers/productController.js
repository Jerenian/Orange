
const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/model')
const { where } = require('sequelize')
const jwt = require('jsonwebtoken')
const fs = require('fs')

    const remove = async  (req, res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Нет доступа"})
        }
        const {id} = req.body
        const {img} = await Product.findOne({id})
        fs.rm(path.resolve(__dirname, '..', '..', '..', '..', 'var', 'www', 'static', img), () => {
        })
        const type = await Product.destroy({
            where: {
                id
            },
        });

        res.json(type)
    } catch (error) {
    }
    }
    const create = async (req, res)  =>{
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
               return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
            if (decoded.role !== 'admin') {
                return res.status(403).json({message: "Нет доступа"})
            }
            const {name, price, typeId, description, isPopular, country, length, palette} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            let id = uuid.v4()
            //img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const uploadDir = path.resolve(__dirname, '..', '..', '..', '..', 'var', 'www', 'static');

            const uploadPath = path.resolve(uploadDir, fileName);
            await img.mv(uploadPath);
            const item = await Product.create({id, name, price, typeId, description, isPopular, country, length, img: fileName, palette})
            return res.json(item)
            
        } catch (error) {
        }
    }

    const getAll = async (req, res)=>{

        try {
            const {typeId, categoryId} = req.query
            let product
            if(!typeId && !categoryId) {
                product = await Product.findAll()
            }
            if(typeId && !categoryId) {
                product = await Product.findAll({where: {typeId}})
            }
            
            if(!typeId && categoryId) {
                product = await Product.findAll({where: {categoryId}})
            }

            res.json(product)

        } catch (error) {
        }
    } 
    const getOne = async (req, res) =>{
        
        try {
            const {id} = req.params
            const product = await Product.findOne({where: {id}})
            return res.json(product)
        } catch (error) {
        }
    }


    const update = async(req, res) => {
        try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Нет доступа"})
        }
        const {name, id, price, description, isPopular, palette} = req.body
        let item

        if(req.files) {
            const {img} = req.files 
            let fileName = uuid.v4() + ".jpg"
            if(img){
                //img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const uploadDir = path.resolve(__dirname, '..', '..', '..', '..', 'var', 'www', 'static');

            const uploadPath = path.resolve(uploadDir, fileName);

                await img.mv(uploadPath);
                const product = await Product.findOne({id})
                fs.rm(path.resolve(__dirname, '..', '..', '..', '..', 'var', 'www', 'static', product.img), () => {
                })
            }
            item = await Product.update(
            {
                name: name,
                price: price,
                description: description,
                isPopular: isPopular,
                img: fileName,
                palette: palette,

            },
            { 
                where:{id}
            }
            )
        }
        else {
            item = await Product.update(
            {
                name: name,
                price: price,
                description: description,
                isPopular: isPopular,
                palette: palette

            },
            { 
                where:{id}
            }
            )
        }
        res.json(item)
        
    } catch (error) {
    }

    }

const updatePopular = async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Нет доступа"})
        }
        const {id, isPopular} = req.body

        const item = await Product.update(
        {
            isPopular: isPopular
        },
        {  
            where:{id}
        }
        )
        res.json(item)

    } catch (error) {

    }
}
const filter = async (req,res) => {
    const request = req.body 
    let products
    let filteredProducts
    request?.typeId ? products = await Product.findAll({where: {typeId: request.typeId}}) : products = await Product.findAll()
    if(request?.name.length && request?.price){
        if(request.category.toUpperCase() == "ЦВЕТЫ") {
            request.name = request.name?.map(item => item.toUpperCase())
            filteredProducts = products?.filter(item => request?.name?.includes(item?.name.split(' ')[0].toUpperCase()))
        } else {
            filteredProducts = products?.map(item =>  {
                return request.name?.map(names => {
                    if(item?.description.toUpperCase().includes(names.toUpperCase())) {
                        return item
                    }
                    else{
                        return null
                    }
                })   
            })
        filteredProducts = filteredProducts?.map(item => item[0])?.filter(item => item !== null)
        }
    filteredProducts = filteredProducts?.filter(item =>  request.price.min <= item.price && item.price <= request.price.max)
    } else if(request?.name.length && !request?.price){
        if(request.category.toUpperCase() == "ЦВЕТЫ") {
            request.name = request.name?.map(item => item.toUpperCase())
            filteredProducts = products?.filter(item => request.name.includes(item.name.split(' ')[0].toUpperCase()))
        } else {
            filteredProducts = products?.map(item =>  {
                return request.name?.map(names => {
                    if(item?.description.toUpperCase().includes(names.toUpperCase())) {
                        return item
                    }
                    else{
                        return null
                    }
                })   
            })
        filteredProducts = filteredProducts?.map(item => item[0])?.filter(item => item !== null)
    }
    }else if(!request?.name.length && request?.price){
        filteredProducts = products.filter(item => request.price.min <= item.price && item.price <= request.price.max)
    }
    res.json(filteredProducts)
}
const search = async (req,res) => {
    try{
    const request = req.params.text
    const data = await Product.findAll()
    let result = data.filter(item => JSON.stringify(item.name.toUpperCase()).includes(request.toUpperCase()) || JSON.stringify(item.description.toUpperCase()).includes(request.toUpperCase()));
    res.json(result)
    }
    catch(e) {
        console.log(e.message)
    }
}
const sort = async (req,res) => {

    const data = req.body.data
    const param = req.body.param
    if(param == 'down'){
        data?.sort(function (a, b) {
            if (a.price > b.price) {
                return 1;
            }
            if (a.price < b.price) {
                return -1;
            }
        return 0;
        });
    }
    if(param == 'up'){
        data?.sort(function (a, b) {
            if (a.price > b.price) {
                return -1;
            }
            if (a.price < b.price) {
                return 1;
            }
        return 0;
        });
    
    }
    res.json(data)
  
}
    
module.exports = {getAll, getOne, create, remove, update, updatePopular, filter, search, sort}
import { genrateShortCode } from '../utils/shortUrl.js';
import urlModel from '../models/url.model.js';


export async function shortUrl(req,res) {
    const {url} = req.body;

    if(!url){
        return res.status(401).json({
            Message:"url is required"
        })
    }

    if((url.startsWith('http://')===false) && (url.startsWith('https://') ===false)){
        return res.status(400).json({messgae:"invalid url"})
    }

    if(url.length>2048) res.status(400).json({message:"URL is too long"})


    const urlCode = genrateShortCode()

    const urlmodal = await urlModel.create({
        orignalUrl:url,
        shortUrl:urlCode
    })

    res.status(200).json({
        message:"short the url successfully",
        data:{
            orignalUrl:urlmodal.orignalUrl,
            shortUrl:urlmodal.shortUrl
        }
    })



}

export async function deleteUrll(req,res) {
    const {id} =  req.params

    const urls = await urlModel.findById(id)

    if(!urls){
        return res.status(401).json({
            message:"url not found"
        })
    }

    await urlModel.findByIdAndDelete(id)

    res.status(201).json({
        message:"url dlete successfully"
    })

}

export async function getAllUrl(req,res) {
    
    const url  = await urlModel.find()

    if(!url){
        return res.status(400).json({
            message:"no urls found"
        })
    }

    res.status(201).json({
        messgae:"fetch all url successfully",
        url
    })



}
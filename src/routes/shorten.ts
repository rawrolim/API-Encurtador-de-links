import express from 'express'
import { createUrlShorten, deleteShortCode, getShortCode } from '../controllers/shorten';

const shortenRoutes = express.Router();

shortenRoutes.post('/',createUrlShorten);
shortenRoutes.get('/:shortCode',getShortCode);
shortenRoutes.delete('/:shortCode',deleteShortCode);
shortenRoutes.get('/:shortCode/stats',getShortCode);

export default shortenRoutes;
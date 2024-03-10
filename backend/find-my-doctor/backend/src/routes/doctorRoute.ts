import express, { Router } from "express"
import { filter, refresh, generatePatient, markConsulted, getPatients } from "../controllers"

const BASE_ROUTE: string = '/doctor'
const router: Router = express.Router()

router.post('/new', generatePatient)
router.post('/', filter)
router.post('/refresh', refresh)
router.put('/consult/:patientId', markConsulted)
router.get('/:doctorId', getPatients)

export default { BASE_ROUTE, router }

// @ts-nocheck
import { Request, Response } from "express"
import { pool } from "../../db/db"
import { Doctor } from "../queries"
import { getDistance } from "geolib"
import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()

export const generatePatient = async (req: Request, res: Response) => {
    const client = await pool.connect()
    const { doctorId } = req.body
    if (!doctorId) return res.status(500).send("Invalid Params.")
    try {
        const { rows } = await client.query(Doctor.generatePatient, [doctorId, new Date(Date.now())])
        client.release()
        axios.post(`${process.env.THIS_URL || ""}/doctor/refresh`, { doctorId })
        return res.json(rows[0]).status(200)
    } catch (err) {
        console.log(err)
        client.release()
        return res.json(err).status(500)
    } 
}

export const getPatients = () => {
}

export const markConsulted = () => {
}

export const refresh = async (req: Request, res: Response) => {
    const { doctorId } = req.body
    const client = await pool.connect()
    try {
        await client.query(Doctor.updateToken, [doctorId])
        client.release()
        return res.status(200).send("Successful")
    } catch (err) {
        client.release()
        return res.send(msg).status(400)
    }
}

function timeToMinutes(timeString: string) {
    let hours = 0;
    let minutes = 0;

    const parts = timeString.split(" ");
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "hour" || parts[i] === "hours") {
            hours = parseInt(parts[i - 1], 10) || 0;
        } else if (parts[i] === "min" || parts[i] === "mins") {
            minutes = parseInt(parts[i - 1], 10) || 0;
        }
    }

    const totalMinutes = (hours * 60) + minutes;
    return totalMinutes;
}

export const filter = async (req: Request, res: Response) => {
    let status = 400
    let msg: any = "Invalid params."
    const { latitude, longitude, dist } = req.body
    if (latitude === undefined || longitude === undefined || dist === undefined) return res.send(msg).status(status)

    const client = await pool.connect()

    let rows
    let hospitalIds: any = []
    try {
        let result = await client.query(Doctor.getHospitals)
        rows = result.rows.filter((h: any) => {
            const distInMeters = getDistance({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }, { latitude: h.latitude, longitude: h.longitude })
            const distInKms = distInMeters / 1000
            if (distInKms <= parseFloat(dist)) hospitalIds = [...hospitalIds, h.hospital_id]
            return distInKms <= parseFloat(dist)
        })
        if (rows.length === 0) {
            client.release()
            return res.send([]).status(404)
        }
    } catch (err) {
        console.log(err)
        client.release()
        return res.send("Internal Server Error.").status(500)
    }
    try {
        let { rows: doctors } = await client.query(Doctor.getNearbyDoctors, [hospitalIds])
        const destinations = encodeURIComponent(doctors.map(destination => {
            return destination.latitude + ',' + destination.longitude
        }).join('|'))
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destinations}&origins=${encodeURIComponent(latitude + ',' + longitude)}&key=${process.env.API_KEY}`)
        const arr = data.rows[0].elements.map((e: any) => e.status === 'OK' ? e.duration.text : '-1 mins')
        doctors = doctors.map((x, i) => ({ ...x, time: timeToMinutes(arr[i]) }))
        const doctorIds = new Set()
        doctors.forEach((e) => doctorIds.add(e.doctor_id))
        const ids = [...doctorIds]
        const { rows } = await client.query(Doctor.getCountData, [ids])
        const main = {}
        for (let x of ids) {
            main[x] = new Array(7).fill(0)
        }
        rows.forEach((row) => {
            main[row.doctor_id][6 - row.time_interval] = row.patient_count
        })
        for (let x in main) {
            let c = 0
            for (let i = main[x].length - 1 ; i > -1 ; i --) {
                let t = main[x][i]
                main[x][i] = main[x][i] - c
                c = t
            }
            console.log(x, main[x])
        }
        doctors = doctors.map((doc) => ({...doc, crowd: main[doc.doctor_id]}))
        const model_url = process.env.MODEL_URL || ""
        const { data: d } = await axios.post(`${model_url}/api/cimta`, { data: doctors })

        status = 200
        msg = d
    } catch (err) {
        msg = err
        console.log(err)
    } finally {
        client.release()
        if (status === 200) return res.json(msg).status(status)
        return res.send(msg).status(500)
    }
}

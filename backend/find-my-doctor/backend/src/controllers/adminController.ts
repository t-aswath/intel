import { Request, Response } from "express"
import { pool } from "../../db/db"
import { Admin } from "../queries"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signIn = async (req: Request, res: Response) => {
    let status = 401
    let msg = "Admin not authorized."
    const { uid, pass } = req.body
    if (uid === undefined || pass === undefined) return res.status(status).send(msg)

    const client = await pool.connect()

    try {
        const { rows } = await client.query(Admin.getAdmin, [uid.toString()])
        if (rows.length === 0) return res.status(404).send("NO USER FOUND.")

        if (await bcrypt.compare(pass.toString(), rows[0].pass)) {
            delete rows[0].pass
            const token = jwt.sign({ user: rows[0] }, process.env.JWT_SECRET || '', { expiresIn: '7d' });
            console.log(token)
            res.cookie("access_token", token, { httpOnly: true, maxAge: 86400000 })
            status = 200
            msg = "Admin signed in successfully"
        }
    } catch (err) {
        console.log(err)
        status = 500
        msg = "Internal Server Error."
    } finally {
        client.release()
        return res.status(status).send(msg)
    }
}

export const createAdmin = async (req: Request, res: Response) => {
    const { uid, pass } = req.body
    if (!uid || !pass) return res.status(401).send("Admin not authorized.")

    const client = await pool.connect()

    try {
        const hash = await bcrypt.hash(pass.toString(), 10)
        await client.query(Admin.createAdmin, [uid.toString(), hash])
        client.release()
        console.log(2)

    } catch (err) {
        console.log(err)
        client.release()
        return res.status(500).send("Internal Server Error.")
    } 

    return res.send("Admin created successfully.")
}

import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserRole, Users, UserStatus } from "../../data";


export class AuthMiddleware {
    static async protect(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization");

        if(!authorization) return res.status(401).json({message: "Any token provided!"})

        if (!authorization.startsWith("Bearer ")) return res.status(401).json({message: "Invalid token!"})

        const token = authorization.split(" ").at(1) || "";

        try {
            const payload = await JwtAdapter.verifyToken(token) as {id: string};
            if ( !payload ) return res.status(401).json({message: "Invalid token!"})

            const user = await Users.findOne({
                where: {
                    id: payload.id,
                    status: UserStatus.AVAILABLE,
                }
            })

            if (!user) return res.status(401).json({ message: "Invalid user!"})
            
            req.body.sessionUser = user;
            next();

        } catch (error) {
            console.log(error)
            return res.status(500).json("Internal server error!")
        };
    };

    static restrictTo = (...roles: UserRole[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(req.body.sessionUser.role)) return res.status(401).json({ message: "You're unauthorized to access to this route!"})
        };
    };
};
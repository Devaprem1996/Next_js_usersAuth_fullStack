import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';


connect()

export async function POST(request:NextRequest) {
    
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({ email });
        if (!user) {
            
            return NextResponse.json({ error: "User does not exists" }, { status: 400 }); 
            
        }
        
        
        // check if password is valid
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error:"Password is not valid"},{status:400}); 
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, { expiresIn: "1d" })  
        
        const response = NextResponse.json({ 
            message: "Token created successfully  and login successfully",
            success:true
        });
        
        response.cookies.set("token", token, {  
            httpOnly: true
        })
        
        return response;
        
        
        


    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500});
    }
    
}
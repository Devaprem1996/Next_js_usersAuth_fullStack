import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json();
        const { token } = reqBody; 
        const user = await User.findOne({ verifiedToken: token , verifiedExpires:{$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({
                status: 400,
                message: "Invalid token"
            });
        }

        console.log(user);

        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedExpires = undefined;

        const savedUser =await user.save();
        console.log(savedUser);
        
        return NextResponse.json({
            status: 200,
            message: "Email verified"
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

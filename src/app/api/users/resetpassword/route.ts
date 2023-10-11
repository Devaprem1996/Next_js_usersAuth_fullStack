import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        const { token } = reqBody;
        const user = await User.findOne({
            forgotpasswordToken: token, forgotpasswordExpires: { $gt: Date.now() },
            isVerified: true,
        });
        if (!user) {
            return NextResponse.json({
                status: 400,
                message: "Invalid token"
            });
        }
        console.log(user);

        
        return NextResponse.json({
            status: 200,
            message: "ok to summit new password"
        });


    } catch (error:any) {
        return NextResponse.json(
            { error:error.message}, { status: 500 });
    }
}
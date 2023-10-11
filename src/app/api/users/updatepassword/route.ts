import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'; // Use consistent quotation marks

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        console.log(token);
        // Check if the token is valid and retrieve the user
        const user = await User.findOne({ forgotpasswordToken:token,forgotpasswordExpires:{$gt: Date.now()} });
        
        console.log(user._id);

        if (!user) {
            return NextResponse.json({
                status: 400,
                message: "Invalid token"
            });
        }
            
        // Hash the new password
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Update user's password and clear token and expiration fields
        await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            forgotpasswordToken: "",
            forgotpasswordExpires: "",
        });

        return NextResponse.json({
            status: 200,
            message: 'Password updated',
        });
    } catch (error: any) {
        console.error('Error in POST:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

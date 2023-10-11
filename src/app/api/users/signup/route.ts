import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer'


connect()

export async function POST(request:NextRequest) {
    
    try {
        // request body from browser and  parse request
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // Check if the user is already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({error: 'User Already Exists'},{status:400});
        };

        // hash the password
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt); 

        // create a new user
        const newUser = new User({
            username,
            email,
            password:  hashedPassword
        });

        // save user
        const savedUser = await newUser.save();
        console.log(savedUser);

        // email verification
        await sendEmail({ email, emailType: 'verified', userId: savedUser._id });
        

        return NextResponse.json({
            message: 'User Created Succesfully',
            success:true,
            savedUser
        })
 

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500});
    }
    
}
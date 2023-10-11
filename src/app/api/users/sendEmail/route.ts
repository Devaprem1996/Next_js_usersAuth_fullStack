import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer'

connect();

export async function POST(request: NextRequest) { 
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
        }

        await sendEmail({ email, emailType: 'reset', userId: user._id });

        return NextResponse.json({
            message: 'email sent successfully',
            success: true,
        });


    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
                status: 500
            }
        )
    }

}
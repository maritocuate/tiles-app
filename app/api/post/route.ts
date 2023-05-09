import { NextResponse } from "next/server"

import prisma from "../../libs/prismadb"
import getCurrentUser from '../../actions/getCurrentUsers'

export async function POST(
    request: Request, 
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) return NextResponse.error()

    const body = await request.json()
    const { 
        title,
        description,
        imageSrc,
        category,
    } = body

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error()
        }
    })

    const post = await prisma.post.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            userId: currentUser.id
        }
    })

    return NextResponse.json(post)
}
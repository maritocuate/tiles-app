import prisma from '../../libs/prismadb'

export interface IPostsParams {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?: string
    endDate?: string
    localValue?: string
    category?: string
}

export default async function getPosts(
    params: IPostsParams
) {
    try {
        const {
            userId,
            roomCount, 
            guestCount, 
            bathroomCount, 
            localValue,
            startDate,
            endDate,
            category,
        } = params

        let query: any = {}

        if (userId) {
            query.userId = userId
        }

        if (category) {
            query.category = category
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (localValue) {
            query.localValue = localValue
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.post.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListings = listings.map((listing:any) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeListings
    } catch (error: any) {
        throw new Error(error)
    }
}
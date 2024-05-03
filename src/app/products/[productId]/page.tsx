import BackButton from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { productsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Check, Shield } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

interface PageProps {
    params: {
        productId: string // This param need to be exaclty same folder name [productId]
    }
}

const Page = async ({ params }: PageProps) => {
    const { productId } = params

    if (!productId) return notFound()
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId))

    if (!product) return notFound()

    return <div className="py-8 bg-white pb-8 px-12 divide-y divide-zinc-100 shadow-md rounded-b-md">
        <div>
            <BackButton />

            <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
            </div>

            <div className="aspect-square my-6 border border-border w-52 h-52">
                <div className="relative bg-zinc-100 w-full h-full overflow-hidden rounded-xl">
                    <Image
                        fill
                        loading="eager"
                        className="h-full w-full object-cover object-center"
                        src={`/${product.imageId}`}
                        alt="product-image"
                    />
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-center">
                    <p className="font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                    </p>
                </div>

                <div className="mt-4 space-y-6">
                    <p className="text-base max-w-prose text-muted-foreground">
                        {product.description}
                    </p>
                </div>

                <div className="mt-6 flex items-center">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <p className="ml-4 text-sm text-muted-foreground"> Eligible for express delivery</p>
                </div>
            </div>
        </div>

        <div className=" mt-6">
            <Button className="w-full mt-10">Add to cart</Button>

            <div className="mt-6 text-center">
                <div className="inline-flex">
                    <Shield />
                </div>
            </div>
        </div>
    </div>
}

export default Page
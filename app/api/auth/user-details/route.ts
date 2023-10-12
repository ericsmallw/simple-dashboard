import {useSearchParams} from "next/navigation";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
            'Accept': 'application/json'

        }
    });

   const resBody = await response.json();

    return Response.json(resBody);
}

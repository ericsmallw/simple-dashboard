export async function PATCH(request: Request) {
    const body = await request.json();

    if (!body.name) {
        return Response.json({error: 'Missing required fields'}, {status: 400});
    }

    console.log(body.name);

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}users/${body.userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: body.name,
        })
    });

    const res = await response.json();

    return Response.json(res, {status: res.statusCode});
}




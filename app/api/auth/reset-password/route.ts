export async function PATCH(request: Request) {
    const body = await request.json();
    if (!body.oldPassword || !body.newPassword || !body.newPasswordAgain || !body.userId) {
        return Response.json({error: 'Missing required fields'}, {status: 400});
    }

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}users/${body.userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            password: body.newPassword,
            connection: 'Simple-Dashboard-Connection'
        })
    });

    const res = await response.json();

    return Response.json(res, {status: res.statusCode});
}




'use client';

export default function OnChangeInput(props: any) {
    return (
        <>
            <input
                onKeyUp={($event) => {
                    // @ts-ignore
                    props.keyUpFunction($event.target.value)
                }}
                defaultValue={props.defaultValue}
                className="form-control"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-addon1"
                type="text"
            />
        </>

    )
}

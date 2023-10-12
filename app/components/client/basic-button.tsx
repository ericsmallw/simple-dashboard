'use client';
``
export default function BasicButton(props: any) {
    return (
        <button onClick={props.eventHandler}>{props.buttonText}</button>
    );
}

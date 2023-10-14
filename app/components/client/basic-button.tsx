'use client';
``
export default function BasicButton(props: any) {
    return (
        <button className={props.class} onClick={props.eventHandler}>{props.buttonText}</button>
    );
}

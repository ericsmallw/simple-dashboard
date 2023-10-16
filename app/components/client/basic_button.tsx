'use client';

/**
 * ButtonProps
 * @param {string} class CSS class string
 * @param {any} eventHandler
 * @param {string} buttonText
 */
export class ButtonProps {
  class = '';
  eventHandler: any;
  buttonText= '';
}

/**
 * BasicButton
 * @param {ButtonProps} props
 * @constructor
 */
export default function BasicButton(props: ButtonProps) {
  return (
    <button
      className={props.class}
      onClick={props.eventHandler}
    >
      {props.buttonText}
    </button>
  );
}

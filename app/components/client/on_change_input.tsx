'use client';

/**
 * InputProps
 * @param {string} defaultValue Default value for input
 */
export class InputProps {
  defaultValue = '';
}

/**
 * OnChangeInput
 * @param {InputProps} props
 * @constructor
 */
export default function OnChangeInput(props: InputProps) {
  return (
    <>
      <input
        onKeyUp={($event) => {
          // @ts-ignore
          sessionStorage.setItem('user-name', $event.target.value);
        }}
        defaultValue={props.defaultValue}
        className="form-control"
        placeholder="Name"
        aria-label="Name"
        aria-describedby="basic-addon1"
        type="text"
      />
    </>

  );
}

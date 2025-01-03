// import React from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';

// interface ReCaptchaWrapperProps {
//   sitekey: string;
//   handleRecaptchaChange: (token: string | null) => void;
//   error: string;
// }

// export default class ReCaptchaWrapper extends React.Component<ReCaptchaWrapperProps> {
//   recaptchaRef = null;

//   constructor() {
//     super();

//     this.recaptchaRef = React.createRef();
//   }

//   render() {
//     const { sitekey, handleRecaptchaChange, error } = this.props;

//     return (
//       <>
//         <ReCAPTCHA
//           isolated
//           ref={this.recaptchaRef}
//           size='normal'
//           badge='bottomright'
//           sitekey={sitekey}
//           onChange={handleRecaptchaChange}
//         />
//         <>{error}</>
//       </>
//     );
//   }
// }

export default function Validation(values) {
  const errors = {};
  const email_pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phone_pattern = /^[0-9]{10}$/;
  const birthDate = new Date(values.birthDate);

  const birthYear = birthDate.getFullYear().toString();

  console.log("valuess from types", values);

  if (values.firstname === "") {
    errors.firstname = "FirstName is Required!";
  }

  if (values.lastName === "") {
    errors.lastName = "LastName is Required!";
  }
  if (values.gender === "") {
    errors.gender = "Gender is Required!";
  }

  if (values.birthDate === "") {
    errors.birthDate = "BirthDate is Required!";
  } else if (isNaN(birthDate.getTime())) {
    errors.birthDate = "Invalid Birth Date!";
  } else {
    if (birthYear.length > 4) {
      errors.birthDate = "Birth Year should have no more than 4 digits!";
    }
  }

  if (values.address === "") {
    errors.address = "Address is Required!";
  }
  if (values.jobPosition === "") {
    errors.jobPosition = "Job Position is Required!";
  }
  if (values.team === "") {
    errors.team = "Team is Required!";
  }

  if (values.phoneNo === "") {
    errors.phoneNo = "Phone number is Required!";
  } else if (!phone_pattern.test(values.phoneNo)) {
    errors.phoneNo = "Invalid Phone Number!";
  }

  if (values.email === "") {
    errors.email = "Email is Required!";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Email did'nt match";
  }

  return errors;
}

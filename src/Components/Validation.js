export default function Validation(values, formType) {
  console.log("values::: from Form", formType, values);
  if (formType === "team") {
    return teamValidaion(values);
  } else if (formType === "user") {
    return userValidation(values);
  }
}

function userValidation(values) {
  const errors = {};
  const email_pattern =
    /^\w+([\.-]?\w+)*@(?:(?!gmail\.com)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*|gmail\.com)$/;
  const phone_pattern = /^[0-9]{10}$/;
  const birthDate = new Date(values.birthDate);
  const today = new Date(); // Get today's date
  const minBirthDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

  const birthYear = birthDate.getFullYear().toString();

  console.log("valuess from types", values);

  if (values.firstname === "") {
    errors.firstname = "This field is required";
  }

  if (values.lastName === "") {
    errors.lastName = "This field is required";
  }
  if (values.gender === "") {
    errors.gender = "This field is required";
  }

  if (values.birthDate === "") {
    errors.birthDate = "This field is required";
  } else if (isNaN(birthDate.getTime())) {
    errors.birthDate = "Invalid Birth Date!";
  } else if (birthYear.length > 4) {
    errors.birthDate = "Birth Year should have no more than 4 digits!";
  } else if (birthDate > minBirthDate) {
    errors.birthDate = "Must be at least 16 years old!";
  }

  if (values.address === "") {
    errors.address = "This field is required";
  }
  if (values.jobPosition === "") {
    errors.jobPosition = "This field is required";
  }
  if (values.team === "") {
    errors.team = "This field is required";
  }

  if (values.phoneNo === "") {
    errors.phoneNo = "Phone number is Required!";
  } else if (!phone_pattern.test(values.phoneNo)) {
    errors.phoneNo = "Invalid Phone Number!";
  }

  if (values.email === "") {
    errors.email = "This field is required";
  } else if (!email_pattern.test(values.email)) {
    errors.email = <small>Email did'nt match!</small>;
  }

  return errors;
}

function teamValidaion(values) {
  console.log("TEAM VALIDATION", values);
  console.log("TEAM MEMBERS:::::", values.teamMembers);
  const errors = {};
  if (values.teamName === "") {
    errors.teamName = "This field is Required!";
  }
  if (values.teamLeader === "") {
    errors.teamLeader = "This field is Required!";
  }

  if (values.teamMembers.length === 0) {
    errors.teamMembers = "This field is Required!";
  }
  if (values.teamProject === "") {
    errors.teamProject = "This field is Required!";
  }
  if (values.activityStatus === "") {
    errors.activityStatus = "This field is Required!";
  }
  if (values.dateAssigned === "") {
    errors.dateAssigned = "This field is Required!";
  }

  return errors;
}

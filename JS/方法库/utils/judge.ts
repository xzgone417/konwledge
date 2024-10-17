export function isFalsyString(value: any) {
  if (value) {
    if (value === "null" || value === "undefined" || value === "") {
      return false;
    }
    if (typeof value === "string") {
      try {
        const parsedValue = JSON.parse(value);
        if (
          typeof parsedValue === "object" &&
          Object.keys(parsedValue).length === 0
        ) {
          return false;
        }
        if (Array.isArray(parsedValue) && parsedValue.length === 0) {
          return false;
        }
      } catch (e) {}
    } else {
      try {
        if (typeof value === "object" && Object.keys(value).length === 0) {
          return false;
        }
        if (Array.isArray(value) && value.length === 0) {
          return false;
        }
      } catch (e) {}
    }

    return true;
  } else {
    return false;
  }
}

export const lengthRegex = (params: any) => {
  const regex = /^[a-zA-Z0-9]{6,20}$/;
  if (!params) {
    return 404;
  } else if (!regex.test(params)) {
    return 500;
  } else {
    return false;
  }
};

export const emailRegex = (params: any) => {
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!params) {
    return 404;
  } else if (!emailRegex.test(params)) {
    return 500;
  } else {
    return false;
  }
};

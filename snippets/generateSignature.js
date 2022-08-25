const crypto = require("crypto")

const generateSignature = (data, passPhrase = null) => {
  // Create parameter string
  let pfOutput = ""
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key]).replace(
          /%20/g,
          "+"
        )}&`
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1)
  return crypto.createHash("sha512").update(getString).digest("hex")
}
export default generateSignature

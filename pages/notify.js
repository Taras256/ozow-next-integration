import pfValidIP from "../snippets/pfValidIp"
import pfValidSignature from "../snippets/pfValidSignature"

export default function Notify() {
  const pfData = JSON.parse(JSON.stringify(Request.body))

  let pfParamString = ""
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "hashCheck") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }

  const check1 = pfValidSignature({
    pfData: pfData,
    pfParamString: pfParamString
  })
  const check2 = pfValidIP({ req: req })

  if (check1 && check2 ) {
    console.log("valid", check1, check2)
    // All checks have passed, the payment is successful
  } else {
    console.log("error", check1, check2)
    // Some checks have failed, check payment manually and log for investigation
  }
  return <></>
}

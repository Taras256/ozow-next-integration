const crypto = require("crypto")
const dns = require("dns")
const fs = require("fs")

export default async function register(req, res) {
  const { body } = req
  const pfData = JSON.parse(JSON.stringify(body))
  const data = JSON.stringify(body)

  let pfParamString = ""
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "hashCheck") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }
  // Remove last ampersand
  pfParamString = pfParamString.slice(0, -1)

  const pfValidSignature = (pfData, pfParamString) => {
    const signature = crypto
      .createHash("sha512")
      .update(pfParamString)
      .digest("hex");
    return pfData["hashCheck"] === signature;
  }

  async function ipLookup(domain) {
    return new Promise((resolve, reject) => {
      dns.lookup(domain, { all: true }, (err, address, family) => {
        if (err) {
          reject(err)
        } else {
          const addressIps = address.map(function (item) {
            return item.address
          })
          resolve(addressIps)
        }
      })
    })
  }

  const pfValidIP = async (req) => {
    const validHosts = [
      "pay.ozow.com"
    ];

    let validIps = []
    const pfIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress

    try {
      for (let key in validHosts) {
        const ips = await ipLookup(validHosts[key])
        validIps = [...validIps, ...ips]
      }
    } catch (err) {
      console.error(err)
    }

    const uniqueIps = [...new Set(validIps)]

    if (uniqueIps.includes(pfIp)) {
      return true
    }
    return false
  }

  const pfValidPaymentData = (cartTotal, pfData) => {
    return (
      Math.abs(parseFloat(cartTotal) - parseFloat(pfData["amount"])) <=
      0.01
    )
  }

  const check1 = pfValidSignature(pfData, pfParamString)
  const check2 = await pfValidIP(req)

  if (check1 && check2) {
    fs.writeFileSync("data/users.json", data) //TODO: post to db here
    return res.status(200).json({})
  } else {
    return res.status(200).json({})
  }
}

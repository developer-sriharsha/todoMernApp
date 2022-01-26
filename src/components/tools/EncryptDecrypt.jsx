import React from "react";
import * as Crypto from "crypto-js";

const AES256KEY =
  "<zSa=&HGfcT0OI0gSFQ8qg~6vxkCDPopte0=Ff!:F=)M36Xpcz=Z5hN?0=/GAdd)EOL^qt8!6I@X4e6kzfl28=>s)I=POb$wDmxv:=w0Q^aye1pK:RDLYu>K3n8eF?x%f2gP>=1t2Uh&/Z>8fkFL$Xgnn:q>FoWRr>iV&b3A/7sG)u*x-IMM&p)Ih2G<N90O4$4s?nb5Wa%kvQH#PRVq{<c6YS5=RzM3{YGdI$%/u*/dJ>y0Za-8l9GUh&jXdh20";

/**
 *
 * @param {To encrypt the data} data
 */
export function encryptData(data) {
  var encryptedData;
  encryptedData = Crypto.AES.encrypt(JSON.stringify(data), AES256KEY);
  return encryptedData;
}

/**
 *
 * @param {To decrypt the data } data
 */
export function decryptData(encryptedData) {
  var decryptedData;
  decryptedData = Crypto.AES.decrypt(encryptedData, AES256KEY);
  decryptedData = decryptedData.toString(Crypto.enc.Utf8);
  return JSON.parse(decryptedData);
}

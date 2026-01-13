export type SignatureList = {
  name: string;
  topNum: number;
  bottomNum: number;
};

const signatureList: SignatureList[] = [];

for (let i = 2; i <= 4; i += 1) {
  signatureList.push({
    name: `${i}/${4}`,
    topNum: i,
    bottomNum: 4,
  });
}

export { signatureList };

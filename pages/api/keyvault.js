// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res
    .status(200)
    .json({
      name: "Key Vault",
      privkey:
        "0x1368967605b978718ea9d8f654a9a3cdb4e05bab9e0ce8ffa8b68fcbb9160013",
      nftcontract: "0xE517f7b6170818d6C3e4A5Ace4E8D81f01Db34Bf",
      airdrop: "0xC293Db3cf37943D12000ab022d143E20d3Db05A7",
      rpcurl: "https://eth-goerli.public.blastapi.io",
    });
}
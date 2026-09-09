import { DONATE_FALLBACK } from "@/data/donateContent";

export type DonationContent = {
  title: string;
  instructions: string[];
};

type CmsDonation = {
  title?: string;
  donationInstruction?: string[];
};

export function resolveDonation(cms?: CmsDonation[]): DonationContent {
  const item = cms?.[0];

  const instructions =
    item?.donationInstruction && item.donationInstruction.length > 0
      ? item.donationInstruction
      : DONATE_FALLBACK.donation.instructions;

  return {
    title: item?.title || DONATE_FALLBACK.donation.title,
    instructions,
  };
}

/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */
import type { CampaignMatchPOST200DataImage } from "./campaignMatchPOST200DataImage";

/**
 * The matching campaign
 */
export type CampaignMatchPOST200Data = {
  /** The campaign id */
  id?: string;
  /** The title of the campaign */
  title?: string;
  /** The text to be shown for the campaign */
  text?: string;
  /** The image to be shown for the campaign */
  image?: CampaignMatchPOST200DataImage;
  /** The url the campaign should link to */
  url?: string;
};

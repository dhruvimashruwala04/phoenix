import { Folder } from "@/imports/core/assets/Icons";
import {
  Design,
  Engineering,
  Marketing,
} from "@/imports/onboarding/ui/assets/Icons";
import { Search, Star } from "@/imports/dashboard/ui/assets/Icons";
import {
  Docx,
  Fig,
  Img,
  Mp3,
  Mp4,
  Pdf,
  Xlsx,
  Yaml,
  Zip,
} from "../ui/assets/Icons";

export const categories = [
  { label: "All files", value: "all", icon: Folder },
  { label: "Design", value: "design", icon: Design },
  { label: "Research", value: "research", icon: Search },
  { label: "Engineering", value: "engineering", icon: Engineering },
  { label: "Marketing", value: "marketing", icon: Marketing },
  { label: "Starred", value: "starred", icon: Star },
];

export const previewLogo = {
  pdf: Pdf,
  html: Yaml,
  xlsx: Xlsx,
  doc: Docx,
  docx: Docx,
  jpg: Img,
  jpeg: Img,
  png: Img,
  fig: Fig,
  zip: Zip,
  tar: Zip,
  mp3: Mp3,
  mp4: Mp4,
};

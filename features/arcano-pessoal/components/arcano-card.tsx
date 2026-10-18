import Image from "next/image";
import { CARD_IMAGE_SIZE } from "@/lib/tarot/major-arcana";
import type { MajorArcanum } from "@/lib/tarot/types";

export function ArcanoCard({
  arcanum,
  priority = false,
  sizes = "(min-width: 768px) 240px, 50vw",
}: {
  arcanum: MajorArcanum;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={arcanum.image}
      alt={arcanum.imageAlt}
      width={CARD_IMAGE_SIZE.width}
      height={CARD_IMAGE_SIZE.height}
      sizes={sizes}
      priority={priority}
      className="h-auto w-full rounded-xl shadow-lg"
    />
  );
}

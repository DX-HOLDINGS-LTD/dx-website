import * as React from "react";
import { Play, X, ExternalLink, Sparkles, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import videoPreviewThumbnail from "@/assets/images/dx_video_thumbnail.png";

export interface VideoConfig {
  /**
   * Video source URL. Supported formats:
   * - YouTube: https://www.youtube.com/watch?v=... or https://youtu.be/...
   * - Vimeo: https://vimeo.com/...
   * - Direct MP4 / WebM: https://domain.com/video.mp4
   */
  url?: string;
  /** Display title for the video player */
  title?: string;
  /** Optional custom poster / thumbnail image URL */
  poster?: string;
  /** Type override if auto-detection is not desired */
  type?: "auto" | "youtube" | "vimeo" | "mp4";
  /** Optional subtitle or description */
  description?: string;
}

const DEFAULT_DX_VIDEO: VideoConfig = {
  url: "https://www.youtube.com/shorts/g9es6MxAZrs",
  poster: videoPreviewThumbnail,
};

function parseVideoUrl(url?: string, typeOverride?: VideoConfig["type"]) {
  if (!url) return null;
  const cleanUrl = url.trim();

  if (typeOverride === "mp4" || (!typeOverride && /\.(mp4|webm|ogg)($|\?)/i.test(cleanUrl))) {
    return { type: "mp4" as const, src: cleanUrl };
  }

  // YouTube matchers
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i,
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube" as const,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
      videoId: ytMatch[1],
    };
  }

  // Vimeo matchers
  const vimeoMatch = cleanUrl.match(
    /(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/i,
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo" as const,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&badge=0`,
      videoId: vimeoMatch[1],
    };
  }

  // Fallback to direct video if type set or unknown
  if (typeOverride === "youtube") {
    return { type: "youtube" as const, embedUrl: cleanUrl };
  }
  if (typeOverride === "vimeo") {
    return { type: "vimeo" as const, embedUrl: cleanUrl };
  }
  return { type: "mp4" as const, src: cleanUrl };
}

interface VideoStoryProps {
  config?: VideoConfig;
  logoUrl?: string;
}

export function VideoStory({ config = DEFAULT_DX_VIDEO, logoUrl }: VideoStoryProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const parsed = React.useMemo(
    () => parseVideoUrl(config.url, config.type),
    [config.url, config.type],
  );

  return (
    <section id="video" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold tracking-wider text-primary-hover">
            SEE DX IN ACTION
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Digital dollars, made clear.
          </h2>
        </div>

        {/* 9:16 Shorts Showcase Layout matching the exact video dimension */}
        <div className="mt-12 flex justify-center">
          <div className="group relative aspect-[9/16] w-full max-w-[340px] sm:max-w-[380px] overflow-hidden rounded-3xl border border-border bg-dark shadow-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
            {config.poster ? (
              <img
                src={config.poster}
                alt="Video Thumbnail"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}

            {/* Subtle cinematic gradient overlay to enhance play button contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-dark/40 transition-opacity duration-300 group-hover:opacity-80" />

            {/* Interactive Play Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:size-20"
            >
              <Play className="ml-1 size-7 fill-current sm:size-8" />
            </button>

            {/* Bottom Emerald Progress Accent */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-dark-border">
              <div className="h-full w-1/3 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-2xl border-dark-border bg-dark p-0 text-dark-foreground overflow-hidden shadow-2xl sm:rounded-2xl"
          aria-describedby="video-dialog-description"
        >
          <div className="flex items-center justify-between border-b border-dark-border/60 px-5 py-4">
            <DialogTitle className="text-base font-bold text-dark-foreground sm:text-lg">
              {config.title || "DX Showcase"}
            </DialogTitle>
            {config.url && (
              <a
                href={config.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 text-xs text-primary-hover hover:underline"
              >
                Open on YouTube <ExternalLink className="size-3" />
              </a>
            )}
          </div>

          <div id="video-dialog-description" className="sr-only">
            {config.description || "Video player modal for the DX platform showcase"}
          </div>

          <div className="relative mx-auto flex w-full items-center justify-center bg-black py-2 sm:py-4">
            {parsed?.type === "youtube" || parsed?.type === "vimeo" ? (
              <div className="aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-xl border border-dark-border bg-black shadow-2xl">
                <iframe
                  src={parsed.embedUrl}
                  title={config.title || "DX Video Showcase"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="size-full border-0"
                />
              </div>
            ) : parsed?.type === "mp4" ? (
              <video
                src={parsed.src}
                poster={config.poster}
                controls
                autoPlay
                className="size-full max-h-[70vh] object-contain"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="grid size-full place-items-center bg-gradient-to-b from-dark-surface to-dark p-8 text-center">
                <div className="max-w-md">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/20 text-primary">
                    <Sparkles className="size-8" />
                  </span>
                  <h4 className="mt-5 text-2xl font-extrabold text-white">
                    The DX Story is in Production
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-dark-foreground/70">
                    We are filming our documentary highlighting financial innovation in The Gambia,
                    our local payment integrations with Wave, QMoney, and Afrimoney, and our mission
                    to simplify digital dollars.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      asChild
                      size="lg"
                      onClick={() => setIsOpen(false)}
                      className="bg-primary text-primary-foreground hover:bg-primary-hover"
                    >
                      <a href="#waitlist">Join Waitlist for Premiere</a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsOpen(false)}
                      className="border-dark-border text-dark-foreground hover:bg-dark-surface"
                    >
                      Close Preview
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

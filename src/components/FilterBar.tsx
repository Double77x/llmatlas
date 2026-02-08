import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FilterBarProps {
  isStuck: boolean;
  search: string;
  setSearch: (s: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  activeType: string;
  setActiveType: (s: string) => void;
  activePricing: string;
  setActivePricing: (s: string) => void;
  activeLicense: string;
  setActiveLicense: (s: string) => void;
  resultsCount: number;
  viewMode: "paginated" | "continuous";
  setViewMode: (mode: "paginated" | "continuous") => void;
}

import { Rows, Infinity as InfinityIcon } from "lucide-react";
import { TOOL_TYPES, PRICING_MODELS, LICENSE_OPTIONS, SORT_OPTIONS } from "@/lib/constants";

export function FilterBar({
  isStuck,
  search,
  setSearch,
  sortBy,
  setSortBy,
  activeType,
  setActiveType,
  activePricing,
  setActivePricing,
  activeLicense,
  setActiveLicense,
  resultsCount,
  viewMode,
  setViewMode,
}: FilterBarProps) {
  const types = ["All", ...TOOL_TYPES];
  const pricingOptions = ["All", ...PRICING_MODELS];
  const licenseOptions = ["All", ...LICENSE_OPTIONS];

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out mx-auto flex justify-center",
        isStuck ? "w-full max-w-full px-0" : "container-main mt-6",
      )}>
      <div
        className={cn(
          "w-full transition-all duration-500 ease-in-out pointer-events-auto flex items-center bg-card shadow-sm border border-border",
          isStuck
            ? "py-4 px-6 rounded-none border-x-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "p-3 rounded-xl",
        )}>
        <div
          className={cn(
            "flex flex-col lg:flex-row gap-3 items-center justify-between w-full",
            isStuck ? "max-w-[1400px] mx-auto" : "",
          )}>
            <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
            <Input
              id="search-input"
              name="search"
              placeholder="QUERY THE ATLAS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-muted/50 focus:bg-background border-2 border-input font-mono font-bold uppercase tracking-wider text-[10px] focus-visible:ring-1 focus-visible:ring-ring transition-colors"
            />
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full lg:w-auto items-center">
            {/* View Mode Toggle */}
            <div className="flex border-2 border-input p-0.5 bg-muted/20 mr-2 h-9 items-center">
              <button
                onClick={() => setViewMode("paginated")}
                className={cn(
                  "px-2 h-full transition-all flex items-center justify-center",
                  viewMode === "paginated" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
                title="Paginated View"
                aria-label="Switch to Paginated View"
              >
                <Rows className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("continuous")}
                className={cn(
                  "px-2 h-full transition-all flex items-center justify-center",
                  viewMode === "continuous" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
                title="Continuous Scroll"
                aria-label="Switch to Continuous Scroll"
              >
                <InfinityIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[145px] h-9 text-[10px] font-mono font-bold uppercase tracking-wider bg-card border-2 border-input shadow-sm">
                <span className="truncate">
                  {sortBy === "rank" ? "SORT (RANK)" : SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                </span>
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={activeType} onValueChange={setActiveType}>
              <SelectTrigger className="w-[135px] h-9 text-[10px] font-mono font-bold uppercase tracking-wider bg-card border-2 border-input shadow-sm">
                <span className="truncate">
                  {activeType === "All" ? "CATEGORY" : activeType}
                </span>
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={activePricing} onValueChange={setActivePricing}>
              <SelectTrigger className="w-[135px] h-9 text-[10px] font-mono font-bold uppercase tracking-wider bg-card border-2 border-input shadow-sm">
                <span className="truncate">
                  {activePricing === "All" ? "PRICING" : activePricing}
                </span>
              </SelectTrigger>
              <SelectContent>
                {pricingOptions.map((price) => (
                  <SelectItem
                    key={price}
                    value={price}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    {price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={activeLicense} onValueChange={setActiveLicense}>
              <SelectTrigger className="w-[155px] h-9 text-[10px] font-mono font-bold uppercase tracking-wider bg-card border-2 border-input shadow-sm">
                <span className="truncate">
                  {activeLicense === "All" ? "LICENSE" : activeLicense}
                </span>
              </SelectTrigger>
              <SelectContent>
                {licenseOptions.map((license) => (
                  <SelectItem
                    key={license}
                    value={license}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    {license}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="h-5 w-px bg-border mx-2 hidden lg:block"></div>

            <div className="text-[11px] font-mono text-foreground uppercase tracking-widest font-black whitespace-nowrap">
              {resultsCount} TOOLS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

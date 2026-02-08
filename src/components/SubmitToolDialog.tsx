import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useSubmitSuggestion } from "@/hooks/useSubmitSuggestion";
import { toast } from "sonner";
import { Plus, Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { TOOL_TAGS, TOOL_TYPES } from "@/lib/constants";

const suggestionSchema = z.object({
  name: z.string().min(1, "Tool name is required"),
  url: z.string().url("Invalid website URL"),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
  types: z.array(z.string()).min(1, "Select at least one category"),
});

export function SubmitToolDialog() {
  const [open, setOpen] = useState(false);
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [github, setGithub] = useState("");
  const [pricing, setPricing] = useState("free");
  const [description, setDescription] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { mutate: submit, isPending } = useSubmitSuggestion();

  const filteredTags = TOOL_TAGS.filter((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Zod Validation
    const result = suggestionSchema.safeParse({
      name,
      url,
      github,
      description,
      types: selectedTypes,
    });

    if (!result.success) {
      // Show first error
      toast.error(result.error.issues[0].message);
      return;
    }

    submit(
      {
        name,
        url,
        description,
        github: github || undefined,
        pricing,
        types: selectedTypes,
        tags: selectedTags,
      },
      {
        onSuccess: () => {
          toast.success("Suggestion submitted! We'll review it soon.");
          setOpen(false);
          resetForm();
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : "Failed to submit suggestion");
        },
      },
    );
  };

  const resetForm = () => {
    setName("");
    setUrl("");
    setGithub("");
    setPricing("free");
    setDescription("");
    setSelectedTypes([]);
    setSelectedTags([]);
    setTagSearch("");
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 h-10 bg-primary text-primary-foreground border-2 border-primary hover:bg-transparent hover:text-primary transition-all shadow-[4px_4px_0px_0px_rgba(61,54,55,0.1)] active:translate-x-px active:translate-y-px active:shadow-none font-mono font-bold uppercase tracking-widest text-[11px]">
          <Plus className="h-4 w-4" />
          SUBMIT TOOL
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Suggest New Tool</DialogTitle>
          <DialogDescription>Standardized data entry to ensure seamless migration to the Atlas.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono font-bold uppercase tracking-widest text-[11px]">
                  Tool Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aider"
                  className="rounded-none border-2 border-input text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url" className="font-mono font-bold uppercase tracking-widest text-[11px]">
                  Website URL <span className="text-primary">*</span>
                </Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="rounded-none border-2 border-input text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="font-mono font-bold uppercase tracking-widest text-[11px]">
                  GitHub (Optional)
                </Label>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="rounded-none border-2 border-input text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricing" className="font-mono font-bold uppercase tracking-widest text-[11px]">
                  Pricing Model <span className="text-primary">*</span>
                </Label>
                <Select value={pricing} onValueChange={setPricing} name="pricing">
                  <SelectTrigger id="pricing" className="rounded-none border-2 border-input text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free" className="text-sm">
                      Free
                    </SelectItem>
                    <SelectItem value="freemium" className="text-sm">
                      Freemium
                    </SelectItem>
                    <SelectItem value="paid" className="text-sm">
                      Paid
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-mono font-bold uppercase tracking-widest text-[11px]">
                  Categories <span className="text-primary">*</span> (Min 1)
                </Label>
                <div className="flex flex-wrap gap-2">
                  {TOOL_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1 text-[11px] font-mono font-bold uppercase border-2 transition-all ${
                        selectedTypes.includes(type)
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input text-muted-foreground hover:border-primary/50"
                      }`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-mono font-bold uppercase tracking-widest text-[11px]">
              Description <span className="text-primary">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe agentic capabilities..."
              className="rounded-none border-2 border-input min-h-25 text-sm"
            />
          </div>

          <div className="space-y-3">
            <Label className="font-mono font-bold uppercase tracking-widest text-[11px]">Select Tags</Label>
            <div className="space-y-2">
              <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={tagPopoverOpen}
                    className="w-full justify-between rounded-none border-2 border-input hover:bg-transparent font-sans h-11 text-sm">
                    <span className="truncate">
                      {selectedTags.length > 0 ? `${selectedTags.length} tags selected` : "Select tags..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-(--radix-popover-trigger-width) p-0 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] bg-background z-50"
                  align="start"
                  side="bottom"
                  onOpenAutoFocus={(e) => e.preventDefault()}>
                  <div className="flex items-center border-b-2 border-foreground/10 px-3 py-2">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                      id="tag-search"
                      name="tag-search"
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 font-sans"
                      placeholder="Search tags..."
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-62.5 overflow-y-auto custom-scrollbar p-1" onWheel={(e) => e.stopPropagation()}>
                    {filteredTags.length === 0 ? (
                      <div className="py-6 text-center text-sm font-mono uppercase text-muted-foreground">
                        No tag found.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-0.5 p-1">
                        {filteredTags.map((tag) => (
                          <div
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={cn(
                              "relative flex cursor-pointer select-none items-center justify-between px-3 py-2 text-[11px] font-mono font-bold uppercase transition-colors hover:bg-primary/10",
                              selectedTags.includes(tag) ? "bg-primary/5 text-primary" : "text-foreground",
                            )}>
                            {tag}
                            {selectedTags.includes(tag) && <Check className="h-3 w-3 text-primary" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-2 border-2 border-dashed border-input bg-muted/10">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-none font-mono text-[10px] uppercase px-1.5 py-0.5 bg-foreground text-background hover:bg-foreground flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        aria-label={`Remove tag ${tag}`}
                        className="p-0.5 hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTag(tag);
                        }}
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-none bg-primary text-primary-foreground font-mono font-bold uppercase tracking-[0.2em] hover:bg-primary/90 text-xs">
              {isPending ? "PROCESSING SUBMISSION..." : "CONFIRM SUBMISSION"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

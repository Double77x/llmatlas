import React, { useEffect, useState } from "react";
import { 
  Command,
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { useDebounce } from "use-debounce";
import { useSearchTools } from "@/hooks/useSearchTools";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogHeader 
} from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CommandMenu = ({ open, setOpen }: CommandMenuProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const navigate = useNavigate();
  
  const { data: results = [], isLoading } = useSearchTools(debouncedQuery);

  // Toggle with Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="sm:max-w-[600px] h-[450px] flex flex-col gap-0 [&>button]:hidden p-0"
        onOpenAutoFocus={(e) => {
          const input = document.querySelector('[cmdk-input]');
          if (input) {
            (input as HTMLElement).focus({ preventScroll: true });
          }
          e.preventDefault();
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search Tools</DialogTitle>
        </DialogHeader>

        <Command label="Global Command Menu" className="flex flex-col w-full h-full bg-transparent">
          <CommandInput 
            id="global-command-search"
            name="search"
            value={query}
            onValueChange={setQuery}
            placeholder="SEARCH THE ATLAS REGISTRY..."
          />
          
          <CommandList className="flex-1 overflow-y-auto custom-scrollbar p-2">
            <CommandEmpty>
              {isLoading ? "INITIALIZING SEARCH..." : "NO RECORDS MATCHING QUERY"}
            </CommandEmpty>

            <CommandGroup heading={debouncedQuery ? "SEARCH RESULTS" : "TOP RATED ENTRIES"}>
              {results.map((tool) => (
                <CommandItem
                  key={tool.id}
                  value={tool.name}
                  onSelect={() => {
                    navigate({
                      to: "/",
                      search: (prev) => ({ 
                        ...prev, 
                        search: tool.name,
                        page: 0 
                      }),
                    });
                    setOpen(false);
                    // Also clear the query so it's fresh next time
                    setQuery("");
                  }}
                  className="relative flex cursor-pointer select-none items-center justify-between rounded-none px-4 py-3 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-primary/10 data-[selected='true']:text-primary data-[disabled=true]:opacity-50 transition-colors group"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold uppercase tracking-wide group-data-[selected=true]:text-primary transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground line-clamp-1 font-sans font-medium tracking-normal normal-case">
                      {tool.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 border border-border px-1.5 py-0.5 group-data-[selected=true]:border-primary/30 group-data-[selected=true]:text-primary/60 transition-colors">
                      {tool.types[0]}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
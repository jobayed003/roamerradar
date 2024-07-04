'use client';

import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { LANGUAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Language } from '../../../types';

export function FancyMultiSelect({ setSelectedLanguage }: { setSelectedLanguage: Dispatch<SetStateAction<string[]>> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Language[]>([LANGUAGES[1]]);
  const [inputValue, setInputValue] = useState('');

  const handleUnselect = useCallback((framework: Language) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  const selectables = LANGUAGES.filter((language) => !selected.includes(language));

  useEffect(() => {
    const languages = selected.map((langauge) => langauge.label);
    setSelectedLanguage(languages);
  }, [selected]);

  return (
    <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
      <div
        className={cn(
          'group rounded-xl border-input px-2 text-sm dark:text-white dark:placeholder:text-gray_text placeholder:font-semibold transition-all border-2 border-[#e6e8ec] dark:border-gray_border',
          open && 'border-gray_text dark:border-gray_text'
        )}
      >
        <div className='flex flex-wrap gap-1'>
          {selected.map((language) => {
            return (
              <Badge key={language.value} variant='secondary' className='py-0 h-8 my-auto dark:bg-gray_border'>
                {language.label}
                <button
                  className='ml-1 rounded-full outline-none'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(language);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(language)}
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder='Select languages...'
            className='ml-2 py-3 flex-1 bg-transparent outline-none dark:placeholder:text-gray_text placeholder:text-dark_russian placeholder:font-semibold w-full'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className='absolute top-0 z-10 w-full rounded-xl border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
              <CommandGroup className='h-full overflow-auto dark:bg-dark_bg focus:border-gray_text dark:focus:border-gray_text transition-all border-2 border-[#e6e8ec] dark:border-gray_border rounded-sm'>
                {selectables.map((language) => {
                  return (
                    <CommandItem
                      key={language.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue('');
                        setSelected((prev) => [...prev, language]);
                      }}
                      className={'cursor-pointer'}
                    >
                      {language.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

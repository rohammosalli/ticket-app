"use client";

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun} from 'lucide-react'


import React from 'react'
import { Button } from "./ui/button";

function ToggleMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  if(!mounted) { 
    
  return <Button 
  variant="outline"
  size="icon"
  disabled={true}
  >
  </Button> 
  }
  const dark = theme === 'dark';

    return (
    <Button 
    onClick={() => setTheme(dark ? 'light' : 'dark')} 
    variant="outline"
    size="icon">
        {dark ? (<Sun className="hover:cursor-pointer hover:text-primary" />) : (<Moon className="hover:cursor-pointer hover:text-primary" />)}
    </Button>
  )
}

export default ToggleMode

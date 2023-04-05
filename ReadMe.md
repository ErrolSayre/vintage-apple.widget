# Vintage Apple

An Übersicht widget to add a little vintage flair to your modern Mac.

## System Model

I dynamically generate the vintage model name of your Mac using `system_profiler` and slicing the
various numeric identifiers available there.

Apple Silicon models will generate names more like the early 2000s crossed with 1989, but Intel based Macs really go full-in with a five digit moniker. I‘m particularly fond of the Mac Pro 61000 series.

## Bottom Dockers

If you keep your Dock positioned on the bottom of the screen, you might need to adjust the CSS
inside this widget to give it some space. Just change the `bottom: 20px;` line to something a bit
bigger (e.g. `bottom: 120px;`) till it looks right.
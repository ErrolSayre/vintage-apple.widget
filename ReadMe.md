# Vintage Apple

An Übersicht widget to add a little vintage flair to your modern Mac.

## System Model

I dynamically generate the vintage model name of your Mac using `system_profiler` and slicing the
various numerics available there.

Apple Silicon models will generate names more like the early 2000s crossed with 1989, but Intel
based Macs really go full-in with a multi-digit moniker made up of the CPU speed and number of
cores. I‘m particularly fond of my “Mac Pro 27012/64”.

## Bottom Dockers

If you keep your Dock positioned on the bottom of the screen, you might need to adjust the CSS
inside this widget to give it some space. Just change the `bottom: 20px;` line to something a bit
bigger (e.g. `bottom: 120px;`) till it looks right.